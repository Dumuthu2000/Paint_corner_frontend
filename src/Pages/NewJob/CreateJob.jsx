import './createJob.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'
import Drawer from '../../components/Drawer/Drawer'
import Navbar from '../../components/Navbar/Navbar'
import Error from '../../components/Errors/Error'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateJob = () => {
    const [vehicleNo, setVehicleNo] = useState('');
    const [insuranceName, setInsuranceName] = useState('');
    const [vehicleMake, setVehicleMake] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerMobile, setCustomerMobile] = useState('');
    const [accidentDate, setAccidentDate] = useState('');
    const [inDate, setInDate] = useState(new Date());

    //Errors
    const errorType = ["All fields are required", "Enter valid mobile number" ,"Job is created successfully"]
    const [error, setError] = useState([]);
    const [erroVisible, setErrorVisible] = useState("none");
    const [backgroundColor, setBackgroundColor] = useState("#fae0e4")
    const [borderColor, setBorderColor] = useState("#ff0a54")
    const [fontColor, setFontColor] = useState("#ff0a54")
    const [iconColor, setIconColor] = useState("#ff0a54")

    //Options
    const [insuranceOptions, setInsuranceOptions] = useState([]);
    const [vehicleMakeOptions, setVehicleMakeOptions] = useState([]);
    const [vehicleModelOptions, setVehicleModelOptions] = useState([]);
    //Navigation another page
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem("jwtToken");

    //Get insurance names for select options
    useEffect(()=>{
        if(!jwtToken){
            navigate('/')
        }
        const fetchInsurance = async()=>{
            await axios.get('http://localhost:8080/api/job/insurance')
            .then((res)=>{
                const formattedOptions = res.data.map((insurance)=>({
                    value: insurance.insuranceName,
                    label: insurance.insuranceName,
                }));
                setInsuranceOptions(formattedOptions);
            }).catch((err)=>{
                alert(err.message);
            })
        }

        const fetchVehicleMake = async()=>{
            await axios.get('http://localhost:8080/api/job/vehicle/make')
            .then((res)=>{
                const formattedVehicleMake = res.data.map((make)=>({
                    value: make.make,
                    label: make.make,
                }));
                setVehicleMakeOptions(formattedVehicleMake)
            })
        }

        const fetchVehicleModel = async()=>{
            await axios.get('http://localhost:8080/api/job/vehicle/model')
            .then((res)=>{
                const formattedVehicleMake = res.data.map((model)=>({
                    value: model.model,
                    label: model.model,
                }));
                setVehicleModelOptions(formattedVehicleMake)
            })
        }
        fetchInsurance();
        fetchVehicleMake();
        fetchVehicleModel();
    },[jwtToken]);

    const handleSelectChange = (insuranceName) => {
        setInsuranceName(insuranceName);
      };
    4
    const handleSelectVehicleMake = (vehicleMake)=>{
        setVehicleMake(vehicleMake);
    }
    
    const handleSelectVehicleModel = (vehicleModel)=>{
        setVehicleModel(vehicleModel);
    }
    //Hnadle Job Form
    const handleJobForm=async(e)=>{
        e.preventDefault();
        const formData = {vehicleNo, insuranceName: insuranceName.value, vehicleMake: vehicleMake.value, vehicleModel: vehicleModel.value, customerName, customerAddress, customerMobile, accidentDate, inDate};

        //Error handling
        if(!jwtToken){
            setErrorVisible("block");
            setError("Please Login");
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");
            setTimeout(()=>{
                setErrorVisible("none");
                navigate('/job-report');
            },1500)
            navigate('/');
            return false;
        }
        else if(!vehicleNo || !insuranceName || !vehicleMake || !vehicleModel || !customerName || !customerAddress || !customerMobile  || !accidentDate || !inDate){
            setError(errorType[0]);
            setErrorVisible("block");
            setTimeout(()=>{
                setErrorVisible("none");
            },2000)
        }else{
            if(customerMobile.length != 10){
                setError(errorType[1]);
                setErrorVisible("block");
                setTimeout(()=>{
                    setErrorVisible("none");
                },2000)
            }else{
                await axios.post(`http://localhost:8080/api/job/createJob`, formData,{
                    headers:{Authorization:jwtToken}
                })
                .then((res)=>{
                    
                    //alert("job created successfully");
                    setErrorVisible("block");
                    setError(errorType[2]);
                    setBackgroundColor("#C6F6D5");
                    setBorderColor("#2F855A");
                    setFontColor("#2F855A");
                    setIconColor("#2F855A");
                    setTimeout(()=>{
                        setErrorVisible("none");
                        navigate('/job-report');
                    },1500)
                    navigate('/job-report')
                }).catch((err)=>{
                    setErrorVisible("block");
                    setError(err.message);
                    setBackgroundColor("#fae0e4");
                    setBorderColor("#ff0a54");
                    setFontColor("#ff0a54");
                    setIconColor("#ff0a54");
                })
            }
            
        }
        
    }
  return (
    <div className="createJobContainer">
        <Drawer/>
        <div className="jobContainer">
            <Navbar className='navbarComponent' text="Create Job"/>
            <Error value={erroVisible} errorName={error} backColor={backgroundColor} border={borderColor} font={fontColor} icon={iconColor}/>
            <div className="jobform">
                <h1 style={{marginBottom:"20px", color:"#c9184a"}}>New Job Form Details</h1>
                <form action="">
                    <div className='formDetails'>
                        <label htmlFor="" style={{marginRight:'71px'}}>Vehicle No:</label>
                        <input type="text" placeholder='Enter Vehicle No' required onChange={(e)=>{
                            setVehicleNo(e.target.value)
                        }}/>
                    </div>
                    <div className='formDetails'>
                        <label htmlFor="" style={{marginRight:'0px'}}>Insurance Company:</label>
                        <Select
                            options={insuranceOptions}
                            isSearchable={true}
                            placeholder="Select Insurance Company"
                            className='insuranceOptions'
                            value={insuranceName}
                            onChange={handleSelectChange}
                            required
                        />
                    </div>
                    <div className='formDetails'>
                        <label htmlFor="" style={{marginRight:'112px'}}>Make:</label>
                        <Select
                            options={vehicleMakeOptions}
                            isSearchable={true}
                            placeholder="Select Vehicle Make"
                            className='insuranceOptions'
                            value={vehicleMake}
                            onChange={handleSelectVehicleMake}
                            required
                        />
                    </div>
                    <div className='formDetails'>
                        <label htmlFor="" style={{marginRight:'105px'}}>Model:</label>
                        <Select
                            options={vehicleModelOptions}
                            isSearchable={true}
                            placeholder="Select Vehicle Model"
                            className='insuranceOptions'
                            value={vehicleModel}
                            onChange={handleSelectVehicleModel}
                            required
                        />
                    </div>
                    <div className='formDetails'>
                        <label htmlFor="" style={{marginRight:'25px'}}>Customer Name:</label>
                        <input type="text" placeholder='Enter Customer Name' required onChange={(e)=>{
                            setCustomerName(e.target.value)
                        }}/>
                    </div>
                    <div className='formDetails'>
                        <label htmlFor="" style={{marginRight:'90px'}}>Address:</label>
                        <input type="text" placeholder='Enter Customer Address' required onChange={(e)=>{
                            setCustomerAddress(e.target.value)
                        }}/>
                    </div>
                    <div className='formDetails'>
                        <label htmlFor="" style={{marginRight:'65px'}}>Contact No:</label>
                        <input type="text" placeholder='Enter Conatct Number' required onChange={(e)=>{
                            setCustomerMobile(e.target.value)
                        }}/>
                    </div>
                    <div className='formDetails'>
                        <label htmlFor="" style={{marginRight:'45px'}}>Accident Date:</label>
                        <DatePicker selected={accidentDate} onChange={(date)=>setAccidentDate(date)} placeholderText='Select Date'/>
                    </div>
                    <div className='formDetails'>
                        <label htmlFor="" style={{marginRight:'100px'}}>In Date:</label>
                        <DatePicker selected={inDate} onChange={(date)=>setInDate(date)} placeholderText='Select Date'/>
                    </div>
                    <div className='formDetails'>
                        {/* <Link to="/job-report" style={{margin: "10px auto"}}></Link> */}
                        <button className='submitBtn' onClick={handleJobForm} style={{margin: "10px auto"}}>Create Job</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateJob
