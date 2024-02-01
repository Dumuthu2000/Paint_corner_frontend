import './previewEstimate.css'
import Drawer from '../../components/Drawer/Drawer'
import Navbar from '../../components/Navbar/Navbar'
import SupplimentrySheetTable from '../../components/Tables/SupplimentrySheetTable'
import Error from '../../components/Errors/Error'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PreviewEstimate = () => {
    const errorType = [
        "Job Number is required", 
        "Update Successfull",
        "Delete Successfull",
        "This job number having not any Supplimentry",
      ]
      const [error, setError] = useState([]);
      const [erroVisible, setErrorVisible] = useState("none");
      const [backgroundColor, setBackgroundColor] = useState("#fae0e4")
      const [borderColor, setBorderColor] = useState("#ff0a54")
      const [fontColor, setFontColor] = useState("#ff0a54")
      const [iconColor, setIconColor] = useState("#ff0a54")
    
    const [jobID, setJobID] = useState('');
    const [supNo, setSupNo] = useState('');


    const [selectedSupplimentryID, setSelectedSupplimentryID] = useState(null);
    const [disable, setDisable] = useState(false)

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

    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!jwtToken){
            navigate("/");
        }
    },[jwtToken])

    const handleSearchJob= async()=>{
        if(!jobID){
            setErrorVisible("block");
            setError(errorType[0]);
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");

            setTimeout(()=>{
            setErrorVisible("none");
            },2000);
        }else{
            try {
                // Fetch job details
                const jobDetails = await axios.get(`http://localhost:8080/api/estimate/searchJob/${jobID}`);
                const result = jobDetails.data[0];
                setAccidentDate(result.accidentDate);
                setVehicleNo(result.vehicleNo);
                setVehicleName(result.vehicleModel);
                setCustomerName(result.customerName);
                setCustomerMobile(result.customerMobile);
                setInsuranceName(result.insuranceName);

                setDisable("block");
                fetchTablesData();
            } catch (error) {
                setErrorVisible("block");
                setError(errorType[3]);
                setBackgroundColor("#fae0e4");
                setBorderColor("#ff0a54");
                setFontColor("#ff0a54");
                setIconColor("#ff0a54");

                setTimeout(()=>{
                    setErrorVisible("none");
                },5000);
            }  
        }
    }
    const fetchTablesData= async()=>{
        //Fetch table details
        const tablesDetails = await axios.get(`http://localhost:8080/api/supplimentryPreview/getSupplimenrty/${jobID}/${supNo}`,);
        const supplimentryDetails = tablesDetails.data;

        const replacementData = supplimentryDetails.filter((item) => item.tableCategory === "Replacement");
        const refixedData = supplimentryDetails.filter((item) => item.tableCategory === "Refixed");
        const repairData = supplimentryDetails.filter((item) => item.tableCategory === "Repair");
        const paintData = supplimentryDetails.filter((item) => item.tableCategory === "Paint");

        setReplacementTableData(replacementData);
        setRefixedTableData(refixedData);
        setRepairTableData(repairData);
        setPaintTableData(paintData);
    }
    const insuranceDeleteHandler= async(selectedSupplimentryID)=>{
        setSelectedSupplimentryID(selectedSupplimentryID);
        console.log(selectedSupplimentryID)
        await axios.delete(`http://localhost:8080/api/supplimentryPreview/deleteSupplimentry/${selectedSupplimentryID}`)
        .then((res)=>{
            setErrorVisible("block");
            setError(errorType[2]);
            setBackgroundColor("#fae0e4");
            setBorderColor("#dc2f02");
            setFontColor("#dc2f02");
            setIconColor("#dc2f02");
            setTimeout(()=>{
                setErrorVisible("none");
            },1500)

            fetchTablesData();
            // setSelectedEstimateID("");
        }).catch((err)=>{
            setErrorVisible("block");
            setError(err.message);
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");

            setTimeout(()=>{
                setErrorVisible("none");
            },2000);
        })
    }
  return (
    <div className='createEstimateContainer'>
        <Drawer/>
        <div className="estimateContainer">
            <Navbar  text="Supplimentry Preview"/>
            <Error value={erroVisible} errorName={error} backColor={backgroundColor} border={borderColor} font={fontColor} icon={iconColor}/>
            <div className="estimateBlock">
                <div className="searchJob" style={{width:"90%", display:"flex", alignItems:"center", marginLeft:"66px"}}>
                    <label htmlFor="" style={{fontSize:"18px"}}>Seach Job No:</label>
                    <input type="text" placeholder='Enter Job No'  className='searchInput' onChange={(e)=>{
                        setJobID(e.target.value)
                        }} disabled={disable} style={{width:"15rem"}}/>
                        <input type="text" placeholder='Enter Supplimentry No'  className='searchInput' onChange={(e)=>{
                        setSupNo(e.target.value)
                        }} disabled={disable} style={{width:"15rem"}}/>
                    <button className='searchBtn' onClick={handleSearchJob}>Seach</button>
              </div>
                <div className="estimateSheet">
                    <h2 className='estimateTitle' style={{backgroundColor:"#006d77"}}>Supplimentry <span>{supNo}</span></h2>
                    <h2 className='estimateTitles'>Job Details</h2>
                    <div className="jobDetailsContainer">
                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                            <div>
                                <div>
                                    <label htmlFor="">Accident Date:</label><br />
                                    <input type="text" className='estimateInput' value={accidentDate} disabled/>
                                </div>
                                <div>
                                    <label htmlFor="">Vehicle No:</label><br />
                                    <input type="text" className='estimateInput' value={vehicleNo} disabled/>
                                </div>
                                <div>
                                    <label htmlFor="">Vehicle Name:</label><br />
                                    <input type="text" className='estimateInput' value={vehicleName} disabled/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="">Customer Name:</label><br />
                                    <input type="text" className='estimateInput' value={customerName} disabled/>
                                </div>
                                <div>
                                    <label htmlFor="">Contact No:</label><br />
                                    <input type="text" className='estimateInput' value={customerMobile} disabled/>
                                </div>
                                <div>
                                    <label htmlFor="">Insurance Company:</label><br />
                                    <input type="text" className='estimateInput' value={insuranceName} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className='estimateTitles'>Replacement Items</h2>
                    <SupplimentrySheetTable
                        tableData = {replacementTableData || []} 
                        tableWidth="100%"
                        editingRow = {selectedSupplimentryID}
                        rowColor = "#006d77"
                        insuranceDisplay = "none"
                    />
                    <h2 className='estimateTitles'>Remove and Refixed Items</h2>
                    <SupplimentrySheetTable
                        tableData = {refixedTableData || []} 
                        display="none"
                        editingRow = {selectedSupplimentryID}
                        rowColor = "#006d77"
                        insuranceDisplay = "none"
                    />
                    <h2 className='estimateTitles'>Repair Items</h2>
                    <SupplimentrySheetTable
                        tableData = {repairTableData || []}  
                        display="none"
                        editingRow = {selectedSupplimentryID}
                        rowColor = "#006d77"
                        insuranceDisplay = "none"
                    />
                    <h2 className='estimateTitles'>Paint Items</h2>
                    <SupplimentrySheetTable
                        tableData = {paintTableData || []}  
                        display="none"
                        editingRow = {selectedSupplimentryID}
                        rowColor = "#006d77"
                        insuranceDisplay = "none"
                    />
                </div>
                <div className="amountContainer" style={{display:disable}}>
                     <div className="btnSection">
                        <Link to="/invoice/insurance/insuranceInvoice"><button className='previewInvoiceBtn'>Create Invoice</button></Link>
                        <Link to={`/supplimentry-report/${jobID}/${supNo}`}><button className='previewReportBtn'>Preview Report</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PreviewEstimate

