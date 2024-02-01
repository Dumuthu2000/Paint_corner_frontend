import './supplimentryReport.css'
import paintCornerLogo from '../../../../src/assets/paintCornerLogo.jpg'
import SupplimentrySheetTable from '../../../components/Tables/SupplimentrySheetTable';
import { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Link, useParams, useNavigate  } from 'react-router-dom'
import axios from 'axios'

const SupplimentryReport = () => {
    const { jobID, supNo } = useParams();

    const [accidentDate, setAccidentDate] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerMobile, setCustomerMobile] = useState('');
    const [insuranceName, setInsuranceName] = useState('');

    const [replacementTableData, setReplacementTableData] = useState([]);
    const [refixedTableData, setRefixedTableData] = useState([]);
    const [repairTableData, setRepairTableData] = useState([]);
    const [paintTableData, setPaintTableData] = useState([]);

    const [companyTotal, setCompanyTotal] = useState(0);
    const [insuranceTotal, setInsuranceTotal] = useState(0);

    const [isReplacementEmpty, setReplacementIsEmpty] = useState("");
    const [isRefixedEmpty, setIsRefixedEmpty] = useState("");
    const [isRepairEmpty, setIsRepairEmpty] = useState("");
    const [isPaintEmpty, setIsPaintEmpty] = useState("");

    const [supplimentryCounts, setSupplimentryCount] = useState('');

    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    useEffect(async () => {
        if(!jwtToken){
            navigate("/");
        }
        try {
            // Fetch job details
            const jobDetailsResponse = await axios.get(`http://localhost:8080/api/estimate/searchJob/${jobID}`);
            const result = jobDetailsResponse.data[0];
            setAccidentDate(result.accidentDate);
            setVehicleNo(result.vehicleNo);
            setVehicleName(result.vehicleModel);
            setCustomerName(result.customerName);
            setCustomerMobile(result.customerMobile);
            setInsuranceName(result.insuranceName);
    
            // Fetch table details
            const tablesDetailsResponse = await axios.get(`http://localhost:8080/api/supplimentryPreview/getSupplimenrty/${jobID}/${supNo}`);
            const estimateDetails = tablesDetailsResponse.data;
    
            const replacementData = estimateDetails.filter((item) => item.tableCategory === "Replacement");
            const refixedData = estimateDetails.filter((item) => item.tableCategory === "Refixed");
            const repairData = estimateDetails.filter((item) => item.tableCategory === "Repair");
            const paintData = estimateDetails.filter((item) => item.tableCategory === "Paint");

            console.log(paintData)

            if (replacementData.length === 0) {
                setReplacementIsEmpty("none");
            }
            if (refixedData.length === 0) {
                setIsRefixedEmpty("none");
            }
            if (repairData.length === 0) {
                setIsRepairEmpty("none");
            }
            if (paintData.length === 0) {
                setIsPaintEmpty("none");
            }
            
    
            setReplacementTableData(replacementData);
            setRefixedTableData(refixedData);
            setRepairTableData(repairData);
            setPaintTableData(paintData);

            //Get copany price total
            const itemPriceTotal = await axios.get(`http://localhost:8080/api/supplimentryPreview/getSupplimentryTotalPrice/${jobID}/${supNo}`);
            const totalResult = itemPriceTotal.data[0];
            setCompanyTotal(parseFloat(totalResult.totalCompanySupplimentryAmount).toFixed(2));

             //Get Insurance price total
             const insurancePriceTotal = await axios.get(`http://localhost:8080/api/supplimentryPreview/getSupplimentryTotalInsurancePrice/${jobID}`);
             const totalInsuranceResult = insurancePriceTotal.data[0];
             setInsuranceTotal(parseFloat(totalInsuranceResult.totalSupplimentryInsuranceAmount).toFixed(2));
        } catch (err) {
            console.log(err.message);
        }
        try {
            const countData = { jobID }; // Assuming jobID is a query parameter
            const countDetails = await axios.get(`http://localhost:8080/api/supplimentryPreview/supplimentryCount`, {
              params: countData, // Use params to send data as query parameters
            });
            const countResult = countDetails.data[0];
            setSupplimentryCount(countResult.supplimentryCount);
          } catch (error) {
            console.log(error.message);
          }
    }, [jobID, jwtToken]);
    

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    const handleBackButtonClick = () => {
        window.location.href = "/supplimentry-preview";
      }; 
  return (
    <>
        <div className="estimateBlocks" ref={componentRef}>
            <div className="estimateSheet">
                {/* <img src={paintCornerLogo} alt="" width="100%" height="100rem"/> */}
                <h2 className='estimateTitle' style={{backgroundColor:"#006d77"}}>Supplimentry <span>{supNo}</span></h2>
                <h2 className='estimateTitles'>JOB DETAILS</h2>
                <div className="jobDetailsContainer">
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <div>
                            <div className='estimateJobDetails'>
                                <h4>Vehicle No:</h4>
                                <p style={{ fontSize:"14.5px"}}>{vehicleNo}</p>
                            </div>
                            <div className='estimateJobDetails'>
                                <h4>Accident Date:</h4>
                                <p style={{fontSize:"14.5px"}}>{accidentDate}</p>
                            </div>
                            <div className='estimateJobDetails'>
                                <h4>Vehicle Name:</h4>
                                <p style={{fontSize:"14.5px"}}>{vehicleName}</p>
                            </div>
                        </div>
                        <div>
                            <div className='estimateJobDetails'>
                                <h4>Customer Name:</h4>
                                <p style={{fontSize:"14.5px"}}>{customerName}</p>
                            </div>
                            <div className='estimateJobDetails'>
                                <h4>Contact No:</h4>
                                <p style={{fontSize:"14.5px"}}>{customerMobile}</p>
                            </div>
                            <div className='estimateJobDetails'>
                                <h4>Insurance Company:</h4>
                                <p style={{fontSize:"14.5px"}}>{insuranceName}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='estimateTitles' style={{display:isReplacementEmpty}}>REPLACEMENT ITEMS</h2>
                <SupplimentrySheetTable
                    tableData = {replacementTableData || []} 
                    tableWidth="100%"
                    view={"none"}
                    tableView = {isReplacementEmpty}
                    rowColor = "#006d77"
                    headerDisplay = "none"
                    insuranceDisplay = "none"
                />
                <h2 className='estimateTitles' style={{display:isRefixedEmpty}}>REMOVE AND REFIXED ITEMS</h2>
                <SupplimentrySheetTable
                    tableData = {refixedTableData || []} 
                    display="none"
                    view={"none"}
                    tableView = {isRefixedEmpty}
                    rowColor = "#006d77"
                    headerDisplay = "none"
                    insuranceDisplay = "none"
                />
                <h2 className='estimateTitles' style={{display:isRepairEmpty}}>REPAIR ITEMS</h2>
                <SupplimentrySheetTable
                    tableData = {repairTableData || []}  
                    display="none"
                    view={"none"}
                    tableView = {isRepairEmpty}
                    rowColor = "#006d77"
                    headerDisplay = "none"
                    insuranceDisplay = "none"
                />
                <h2 className='estimateTitles' style={{display:isPaintEmpty}}>PAINT ITEMS</h2>
                <SupplimentrySheetTable
                    tableData = {paintTableData || []}  
                    display="none"
                    view={"none"}
                    tableView = {isPaintEmpty}
                    rowColor = "#006d77"
                    headerDisplay = "none"
                    insuranceDisplay = "none"
                />
            </div>
            <div className="totalSection">
                <p className='totalTitle' style={{marginBottom:"10px"}}>Total: Rs. <span style={{color:"#ef233c"}}>{companyTotal}</span></p>
                {/* <p className='totalTitle'>Insurance Total: Rs. <span style={{color:"#ef233c"}}>{insuranceTotal}</span></p> */}
            </div>
            <div className="footerSection" style={{marginBottom:"75px", marginTop:"20px"}}>
                    <div className="dateSection">
                    <p>...............................................................</p>
                    <p>Date</p>
                </div>
                    <div className="signSection">
                    <p>...............................................................</p>
                    <p>Service Advisor's Signature</p>
                </div>
            </div>
        </div>                   

        <div className="amountContainer">
            <div className="btnSection">
                <Link to="/estimate-preview"><button className='backBtn' onClick={handleBackButtonClick}>Back</button></Link>
                <Link to="/estimate-report"><button className='previewBtn' onClick={handlePrint}>Print</button></Link>
            </div>
        </div>
    </>
   
  )
}

export default SupplimentryReport

