import './jobReport.css'
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import logoImage from '../../../../src/assets/paintCorner.jpg'
import sectionImage from '../../../../src/assets/section1.jpg'
import Error from '../../../components/Errors/Error';
import axios from 'axios';

const JobCardReport = () => {
    const [error, setError] = useState([]);
    const [erroVisible, setErrorVisible] = useState("none");
    const [backgroundColor, setBackgroundColor] = useState("#fae0e4")
    const [borderColor, setBorderColor] = useState("#ff0a54")
    const [fontColor, setFontColor] = useState("#ff0a54")
    const [iconColor, setIconColor] = useState("#ff0a54")  

    const [jobNo, setJobNo] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [insuranceName, setInsuranceName] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [inputDate, setInputDate] = useState('');

    const [disable, setDisable] = useState(false);

    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!jwtToken){
            navigate('/');
        }
    },[jwtToken])
    const handleJobSearchBtn = async()=>{
        try {
            await axios.get(`http://localhost:8080/api/job/searchJob/${jobNo}`)
            .then((res)=>{
                const result = res.data[0];

                setJobNo(result.jobID);
                setVehicleNo(result.vehicleNo);
                setInsuranceName(result.insuranceName);
                setMake(result.vehicleMake);
                setModel(result.vehicleModel);
                setAddress(result.customerAddress);
                setContact(result.customerMobile);
                setInputDate(result.inDate);
                setDisable(true);
            })
        } catch (err) {
            setErrorVisible("block");
            setError("Jon Number is required");
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");

            setTimeout(()=>{
                setErrorVisible("none");
            },2000);
        }
    }
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
  return (
    <div className='jobCardSectionContainer'>
        <Error value={erroVisible} errorName={error} backColor={backgroundColor} border={borderColor} font={fontColor} icon={iconColor}/>
        <div className="searchJob">
            <label htmlFor="" style={{fontSize:"18px"}}>Seach Job No:</label>
            <input type="text" placeholder='Enter Job No'  className='searchInput' onChange={(e)=>{
                setJobNo(e.target.value)
            }} disabled={disable}/>
            <button className='searchBtn' onClick={handleJobSearchBtn}>Seach</button>
        </div>
        <div ref={componentRef} className='jobCardMainContainer'> 
            <div className="jobCardContainer">
                <div style={{width:"70%"}}>
                    <div className="jobReportHeading">
                        <img src={logoImage} alt="Paint Corner" style={{width:"10rem", height:"5rem"}}/>
                        <div className='jobCardDetails'>
                            <h1 className='jobCard'>JOB CARD</h1>
                            <p className='jobNo'>JOB NO :- <span style={{fontWeight:"bold", color:"red"}}>{jobNo}</span></p>
                        </div>
                    </div>
                    <hr />
                    <form action="" style={{marginTop:"10px"}}>
                        <div className='details'>
                            <label htmlFor="">Vehicle No:</label>
                            <input type="text" value={vehicleNo} className='reportField'/>
                        </div>
                        <div className='details'> 
                            <label htmlFor="">Insurance Co:</label>
                            <input type="text"value={insuranceName} className='reportField'/>
                        </div>
                        <div className='details'>
                            <label htmlFor="">Make:</label>
                            <input type="text"value={make} className='reportField'/>
                        </div>
                        <div className='details'>
                            <label htmlFor="">Model:</label>
                            <input type="text"value={model} className='reportField'/>
                        </div>
                        <div className='details' style={{display:"flex"}}>
                            <label htmlFor="">Address:</label>
                            <textarea value={address} cols="23" rows="3" className='addressFiled'></textarea>
                        </div>
                        <div className='details'>
                            <label htmlFor="">Contact No:</label>
                            <input type="text"value={contact} className='reportField'/>
                        </div>
                        <div className='details'>
                            <label htmlFor="">Input:</label>
                            <input type="text"value={inputDate} className='reportField'/>
                        </div>
                        <div className='details'>
                            <label htmlFor="">Output:</label>
                            <input type="text"value={""} className='reportField'/>
                        </div>
                    </form>
                    <div className="table">
                    <table border="1">
                        <thead>
                            <tr>
                                <td>Polish</td>
                                <th colSpan="2" width="150px"></th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Repair Section</td>
                                <td colSpan="2"></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Paint Section</td>
                                <td width="30px"></td>
                                <td width="100px"></td>
                                <td width="100px"></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                <div style={{border:"1px solid black", padding:"10px", width:"40%"}}>
                    <p>SPARE PARTS</p>
                    <div className="sparePartsConatiner">
                        <div style={{padding:"10px"}}>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>

                        </div>
                        <div style={{padding:"10px"}}>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>
                            <p>...........................</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className='signatureBox'>
                <p>........................................................</p>
                <p>Service Advisor Signature</p>
            </div>
            <div className="section">
                <div style={{border:"1px solid black", padding:"10px"}}>
                    <h2 className='sectionName'>DENTING SECTION</h2>
                    <img src={sectionImage} alt="" height="200px" width="320px"/>
                </div>
                <div style={{border:"1px solid black", padding:"10px"}}>
                    <h2 className='sectionName'>PAINTING SECTION</h2>
                    <img src={sectionImage} alt="" height="200px"  width="340px"/>
                </div>
            </div>
            <div className='DRsection'>
                <div style={{border:"1px solid black", marginRight:"10px", padding:"5px"}}>
                    <p><span style={{fontSize:"20px", fontWeight:"bold"}}>DR</span> with Inner Panel.......................................</p>
                    <p>.............................................................................</p>
                    <p>.............................................................................</p>
                    <p>.............................................................................</p>
                </div>
                <div style={{border:"1px solid black", marginRight:"10px", padding:"5px"}}> 
                    <p><span style={{fontSize:"20px", fontWeight:"bold"}}>DR</span> with Inner Panel.......................................</p>
                    <p>.............................................................................</p>
                    <p>.............................................................................</p>
                    <p>.............................................................................</p>
                </div>
            </div>
            <div className="commentsSection">
                <p>Comments</p>
                <p>............................................................................................................................................................................</p>
                <p>............................................................................................................................................................................</p>
            </div>
        </div>
        <div className="jobCardBtnSection">
            <Link to="/new-job"><button className='jobBackBtn'>Back</button></Link>
            <button className='jobPrintBtn' onClick={handlePrint}>Print</button>
        </div>
        
    </div>
  )
}

export default JobCardReport
