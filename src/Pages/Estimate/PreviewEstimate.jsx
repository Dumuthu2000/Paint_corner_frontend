import './previewEstimate.css'
import Drawer from '../../components/Drawer/Drawer'
import Navbar from '../../components/Navbar/Navbar'
import EstimateSheeetTable from '../../components/Tables/EstimateSheetTable'
import Error from '../../components/Errors/Error'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PreviewEstimate = () => {
    const errorType = [
        "Job Number is required", 
        "Update Successfull",
        "Delete Successfull",
        "This job number having not any Estimate",
      ]
      const [error, setError] = useState([]);
      const [erroVisible, setErrorVisible] = useState("none");
      const [backgroundColor, setBackgroundColor] = useState("#fae0e4")
      const [borderColor, setBorderColor] = useState("#ff0a54")
      const [fontColor, setFontColor] = useState("#ff0a54")
      const [iconColor, setIconColor] = useState("#ff0a54")
    
    const [jobID, setJobID] = useState('');
    const [insuranceDisable, setInsuranceDisable] = useState(true);
    const [insurancePrice, setInsurancePrice] = useState(0);

    const [selectedEstimateID, setSelectedEstimateID] = useState(null);

    const [disable, setDisable] = useState("none");
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
        const tablesDetails = await axios.get(`http://localhost:8080/api/estimatePreview/getEstimate/${jobID}`);
        const estimateDetails = tablesDetails.data;

        const replacementData = estimateDetails.filter((item) => item.tableCategory === "Replacement");
        const refixedData = estimateDetails.filter((item) => item.tableCategory === "Refixed");
        const repairData = estimateDetails.filter((item) => item.tableCategory === "Repair");
        const paintData = estimateDetails.filter((item) => item.tableCategory === "Paint");

        setReplacementTableData(replacementData);
        setRefixedTableData(refixedData);
        setRepairTableData(repairData);
        setPaintTableData(paintData);
    }


    //Edit insurance field
    const insuranceEditHandler=(selectedEstimateID)=>{
        setSelectedEstimateID(selectedEstimateID);
        setInsuranceDisable(false);
    }
    const handleInsurancePrice = (value,estimateId)=>{
        setInsurancePrice(value);
        setReplacementTableData(updateInsurancePrice(value, estimateId, replacementTableData));
        setRefixedTableData(updateInsurancePrice(value, estimateId, refixedTableData));
        setRepairTableData(updateInsurancePrice(value, estimateId, repairTableData));
        setPaintTableData(updateInsurancePrice(value, estimateId, paintTableData));
    }
    const insuranceUpdateHandle=async()=>{
        const formData = {insurancePrice}
        await axios.put(`http://localhost:8080/api/estimatePreview/updateEstimate/${selectedEstimateID}`, formData)
        .then((res)=>{
            setErrorVisible("block");
            setError(errorType[1]);
            setBackgroundColor("#C6F6D5");
            setBorderColor("#2F855A");
            setFontColor("#2F855A");
            setIconColor("#2F855A");
            setTimeout(()=>{
                setErrorVisible("none");
            },1500)

            setInsuranceDisable(true);
            setSelectedEstimateID("");
            //Displaying new tables data
            fetchTablesData();
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

    const updateInsurancePrice = (value, estimateID, array) => {
        // Find the index of the object with the specified estimateID
        const indexToUpdate = array.findIndex(item => item.estimateID === estimateID);
    
        // If the index is found, update the insurancePrice with the specified value
        if (indexToUpdate !== -1) {
            array[indexToUpdate].insurancePrice = value;
        }
    
        return array;
    }

    const insuranceDeleteHandler= async(selectedEstimateID)=>{
        setSelectedEstimateID(selectedEstimateID);
        console.log(selectedEstimateID)
        await axios.delete(`http://localhost:8080/api/estimatePreview/deleteEstimate/${selectedEstimateID}`)
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
            <Navbar  text="Estimate Preview"/>
            <Error value={erroVisible} errorName={error} backColor={backgroundColor} border={borderColor} font={fontColor} icon={iconColor}/>
            <div className="estimateBlock">
                <div className="EstimatSearchJob">
                    <label htmlFor="" style={{fontSize:"18px"}}>Seach Job No:</label>
                    <input type="text" placeholder='Enter Job No' style={{width:"15rem", fontSize:"16px", fontWeight:"bold", color:"red"}} onChange={(e)=>{
                        setJobID(e.target.value)
                    }}/>
                    <button className='searchBtn' style={{padding:"6px", width:"5rem", textAlign:"center"}} onClick={handleSearchJob}>Seach</button>
                </div>
                <div className="estimateSheet">
                    <h2 className='estimateTitle'>Estimate</h2>
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
                    <EstimateSheeetTable
                        tableData = {replacementTableData || []} 
                        tableWidth="100%"
                        disable={insuranceDisable}
                        handleEdit={(estimateID) => insuranceEditHandler(estimateID)}
                        handleUpdate = {(estimateID)=> insuranceUpdateHandle(estimateID)}
                        handleDelete = {(estimateID)=> insuranceDeleteHandler(estimateID)}
                        handleInsurancePrice={handleInsurancePrice}
                        editingRow = {selectedEstimateID}
                        insuranceDisplay = "none"
                    />
                    <h2 className='estimateTitles'>Remove and Refixed Items</h2>
                    <EstimateSheeetTable
                        tableData = {refixedTableData || []} 
                        display="none"
                        disable={insuranceDisable}
                        editingRow = {selectedEstimateID}
                        handleEdit={(estimateID) => insuranceEditHandler(estimateID)}
                        handleUpdate = {(estimateID)=> insuranceUpdateHandle(estimateID)}
                        handleDelete = {(estimateID)=> insuranceDeleteHandler(estimateID)}
                        handleInsurancePrice={handleInsurancePrice}
                        insuranceDisplay = "none"
                    />
                    <h2 className='estimateTitles'>Repair Items</h2>
                    <EstimateSheeetTable
                        tableData = {repairTableData || []}  
                        display="none"
                        disable={insuranceDisable}
                        editingRow = {selectedEstimateID}
                        handleEdit={(estimateID) => insuranceEditHandler(estimateID)}
                        handleUpdate = {(estimateID)=> insuranceUpdateHandle(estimateID)}
                        handleDelete = {(estimateID)=> insuranceDeleteHandler(estimateID)}
                        handleInsurancePrice={handleInsurancePrice}
                        insuranceDisplay = "none"
                    />
                    <h2 className='estimateTitles'>Paint Items</h2>
                    <EstimateSheeetTable
                        tableData = {paintTableData || []}  
                        display="none"
                        disable={insuranceDisable}
                        editingRow = {selectedEstimateID}
                        handleEdit={(estimateID) => insuranceEditHandler(estimateID)}
                        handleUpdate = {(estimateID)=> insuranceUpdateHandle(estimateID)}
                        handleDelete = {(estimateID)=> insuranceDeleteHandler(estimateID)}
                        handleInsurancePrice={handleInsurancePrice}
                        insuranceDisplay = "none"
                    />
                </div>
                <div className="amountContainer" style={{display:disable}}>
                     <div className="btnSection">
                        <Link to="/invoice/insurance/insuranceInvoice"><button className='previewInvoiceBtn'>Create Invoice</button></Link>
                        <Link to={`/estimate-report/${jobID}`}><button className='previewReportBtn'>Preview Report</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PreviewEstimate

