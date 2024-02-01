import paintCornerLogo from '../../../../src/assets/paintCornerLogo.jpg'
import InvoiceTable from '../../../components/Tables/InvoiceTable';
import { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Link, useParams  } from 'react-router-dom'
import axios from 'axios'

const InvoiceReport = () => {
    const { jobID } = useParams();

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

    const [insuranceTotal, setInsuranceTotal] = useState(0);

    const [isReplacementEmpty, setReplacementIsEmpty] = useState("");
    const [isRefixedEmpty, setIsRefixedEmpty] = useState("");
    const [isRepairEmpty, setIsRepairEmpty] = useState("");
    const [isPaintEmpty, setIsPaintEmpty] = useState("");

    useEffect(async () => {
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
            const tablesDetailsResponse = await axios.get(`http://localhost:8080/api/invoice/getInvoice/${jobID}`);
            const estimateDetails = tablesDetailsResponse.data;
    
            const replacementData = estimateDetails.filter((item) => item.tableCategory === "Replacement");
            const refixedData = estimateDetails.filter((item) => item.tableCategory === "Refixed");
            const repairData = estimateDetails.filter((item) => item.tableCategory === "Repair");
            const paintData = estimateDetails.filter((item) => item.tableCategory === "Paint");


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

            //Get Insurance price total
            const insurancePriceTotal = await axios.get(`http://localhost:8080/api/invoice/insuranceTotal/${jobID}`);
            const totalInsuranceResult = insurancePriceTotal.data[0];
            setInsuranceTotal(parseFloat(totalInsuranceResult.totalInsurance).toFixed(2));

        } catch (err) {
            console.log(err.message);
        }
    }, [jobID]);
    

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
      const handleBackButtonClick = () => {
        // Navigate to "/estimate-preview" and trigger a page refresh
        window.location.href = "/invoice/insurance/insuranceInvoice";
      }; 
  return (
    <>
        <div className="estimateBlocks" ref={componentRef}>
            <div className="estimateSheet">
                {/* <img src={paintCornerLogo} alt="" width="100%" height="100rem"/> */}
                <h2 className='estimateTitle' style={{backgroundColor:"#926c15"}}>Invoice</h2>
                <h2 className='estimateTitles'>JOB DETAILS</h2>
                <div className="jobDetailsContainer" style={{marginBottom:"5px"}}>
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
                <hr />
                <h2 className='estimateTitles' style={{display:isReplacementEmpty}}>REPLACEMENT ITEMS</h2>
                <InvoiceTable
                    tableData = {replacementTableData || []} 
                    tableWidth="100%"
                    view={"none"}
                    tableView = {isReplacementEmpty}
                    headerDisplay = "none"
                    insuranceDisplay = "none"
                    InputDisplay = "none"
                />
                <h2 className='estimateTitles' style={{display:isRefixedEmpty}}>REMOVE AND FIXED ITEMS</h2>
                <InvoiceTable
                    tableData = {refixedTableData || []} 
                    display="none"
                    view={"none"}
                    tableView = {isRefixedEmpty}
                    headerDisplay = "none"
                    insuranceDisplay = "none"
                    InputDisplay = "none"
                />
                <h2 className='estimateTitles' style={{display:isRepairEmpty}}>REPAIR ITEMS</h2>
                <InvoiceTable
                    tableData = {repairTableData || []}  
                    display="none"
                    view={"none"}
                    tableView = {isRepairEmpty}
                    headerDisplay = "none"
                    insuranceDisplay = "none"
                    InputDisplay = "none"
                />
                <h2 className='estimateTitles' style={{display:isPaintEmpty}}>PAINT ITEMS</h2>
                <InvoiceTable
                    tableData = {paintTableData || []}  
                    display="none"
                    view={"none"}
                    tableView = {isPaintEmpty}
                    headerDisplay = "none"
                    insuranceDisplay = "none"
                    InputDisplay = "none"
                />
            </div>
            <div className="totalSection">
                <p className='totalTitle'>Total: Rs. <span style={{color:"#ef233c"}}>{insuranceTotal}</span></p>
            </div>
            <div className="footerSection" style={{marginBottom:"75px", marginTop:"30px"}}>
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

export default InvoiceReport

