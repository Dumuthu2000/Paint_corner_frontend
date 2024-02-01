import './insuranceInvoice.css'
import Drawer from '../../../components/Drawer/Drawer'
import Navbar from '../../../components/Navbar/Navbar'
import InvoiceTable from '../../../components/Tables/InvoiceTable'
import Error from '../../../components/Errors/Error'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const InsuranceInvoice = () => {
    const errorType = [
        "Job Number is required",
        "Update Successfull",
        "Delete Successfull",
        "This job number having not any Estimate or Supplimentry",
      ]
      const [error, setError] = useState([]);
      const [erroVisible, setErrorVisible] = useState("none");
      const [backgroundColor, setBackgroundColor] = useState("#fae0e4")
      const [borderColor, setBorderColor] = useState("#ff0a54")
      const [fontColor, setFontColor] = useState("#ff0a54")
      const [iconColor, setIconColor] = useState("#ff0a54")
    
    const [jobID, setJobID] = useState(''); 

    const [disable, setDisable] = useState();
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

    const [invoiceID, setInvoiceID] = useState('');
    const [selectedInvoiceID, setSelectedInvoiceID] = useState('');
    const [insurancePrice, setInsurancePrice] = useState(0);

    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!jwtToken){
            navigate("/")
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
            } catch (err) {
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
        const tablesDetails = await axios.get(`http://localhost:8080/api/invoice/getInvoice/${jobID}`);
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

    //--------------------------------------------------------------------Insurance price editing--------------------------------------------------------------
    const insuranceEditHandler=(selectedInvoiceID)=>{
        setSelectedInvoiceID(selectedInvoiceID);
    }
    const handleInsurancePrice = (value,invoiceID)=>{
        setInsurancePrice(value);
        setReplacementTableData(updateInsurancePrice(value, invoiceID, replacementTableData));
        setRefixedTableData(updateInsurancePrice(value, invoiceID, refixedTableData));
        setRepairTableData(updateInsurancePrice(value, invoiceID, repairTableData));
        setPaintTableData(updateInsurancePrice(value, invoiceID, paintTableData));
    }
    const insuranceUpdateHandle=async()=>{
        const formData = {insurancePrice}
        await axios.put(`http://localhost:8080/api/invoice/updateInvoice/${selectedInvoiceID}`, formData)
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

            setSelectedInvoiceID('');
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
    const updateInsurancePrice = (value, invoiceID, array) => {
        // Find the index of the object with the specified estimateID
        const indexToUpdate = array.findIndex(item => item.invoiceID === invoiceID);
    
        // If the index is found, update the insurancePrice with the specified value
        if (indexToUpdate !== -1) {
            array[indexToUpdate].insurancePrice = value;
        }
    
        return array;
    }
  return (
    <div className='createEstimateContainer'>
        <Drawer/>
        <div className="estimateContainer">
            <Navbar  text="Invoice / With-Insurance"/>
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
                    <h2 className='estimateTitle' style={{backgroundColor:"#926c15"}}>Invoice</h2>
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
                    <InvoiceTable
                        tableData = {replacementTableData || []} 
                        tableWidth="100%"
                        view = "none"
                        rowColor = "#926c15"
                        editingRow = {selectedInvoiceID}
                        handleEdit={(invoiceID) => insuranceEditHandler(invoiceID)}
                        handleUpdate = {(invoiceID)=> insuranceUpdateHandle(invoiceID)}
                        handleInsurancePrice={handleInsurancePrice}
                        reportView = "none"                      
                    />
                    <h2 className='estimateTitles'>Remove and Refixed Items</h2>
                    <InvoiceTable
                        tableData = {refixedTableData || []} 
                        display="none"
                        view = "none"
                        rowColor = "#926c15"
                        editingRow = {selectedInvoiceID}
                        handleEdit={(invoiceID) => insuranceEditHandler(invoiceID)}
                        handleUpdate = {(invoiceID)=> insuranceUpdateHandle(invoiceID)}
                        handleInsurancePrice={handleInsurancePrice}
                        reportView = "none" 
                    />
                    <h2 className='estimateTitles'>Repair Items</h2>
                    <InvoiceTable
                        tableData = {repairTableData || []}  
                        display="none"
                        view = "none"
                        rowColor = "#926c15"
                        editingRow = {selectedInvoiceID}
                        handleEdit={(invoiceID) => insuranceEditHandler(invoiceID)}
                        handleUpdate = {(invoiceID)=> insuranceUpdateHandle(invoiceID)}
                        handleInsurancePrice={handleInsurancePrice}
                        reportView = "none" 
                    />
                    <h2 className='estimateTitles'>Paint Items</h2>
                    <InvoiceTable
                        tableData = {paintTableData || []}  
                        display="none"
                        view = "none"
                        rowColor = "#926c15"
                        editingRow = {selectedInvoiceID}
                        handleEdit={(invoiceID) => insuranceEditHandler(invoiceID)}
                        handleUpdate = {(invoiceID)=> insuranceUpdateHandle(invoiceID)}
                        handleInsurancePrice={handleInsurancePrice}
                        reportView = "none" 
                    />
                </div>
                <div className="amountContainer" style={{display:disable}}>
                     <div className="btnSection">
                        <Link to="/dashbaord"><button className='invoiceBackBtn'>Back</button></Link>
                        <Link to={`/invoice/insurance/invoiceReport/${jobID}`}><button className='previewReportBtn'>Preview Invoice</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InsuranceInvoice

