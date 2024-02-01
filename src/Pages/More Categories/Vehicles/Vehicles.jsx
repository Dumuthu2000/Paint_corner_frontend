import './vehicles.css'
import Navbar from '../../../components/Navbar/Navbar'
import Drawer from '../../../components/Drawer/Drawer'
import Error from '../../../components/Errors/Error'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Vehicles = () => {
    const errorType = [ 
        "Vehicles are not available",
        "All fields are required",
        "This model and make already created",
        "New vehicle added successfully",
        "Update Successfull",
        "Delete Successfull",
      ]
      const [error, setError] = useState([]);
      const [erroVisible, setErrorVisible] = useState("none");
      const [backgroundColor, setBackgroundColor] = useState("#fae0e4")
      const [borderColor, setBorderColor] = useState("#ff0a54")
      const [fontColor, setFontColor] = useState("#ff0a54")
      const [iconColor, setIconColor] = useState("#ff0a54")

      const [vehiclesTableData, setVehiclesTableData] = useState([]);
      const [model, setModel] = useState('');
      const [make, setMake] = useState('');
      const [vehicleID, setVehicleID] = useState(null);

      const [addBtn, setAddBtn] = useState("");
      const navigate = useNavigate();
      const jwtToken = localStorage.getItem("jwtToken");

      //Checking user loggin or not
      useEffect(()=>{
        if(!jwtToken){
            navigate("/");
        }
      },[jwtToken])
      const getVehicle = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/vehicles/getVehicles");
          setVehiclesTableData(res.data);
        } catch (err) {
            setErrorVisible("block");
            setError(errorType[0]);
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");

            setTimeout(()=>{
                setErrorVisible("none");
            },5000);
        }
      };
    
      useEffect(() => {
        getVehicle();
      }, []); // Empty dependency array to run the effect only once
    
      const handleVehicleAddBtn = async () => {
        try {
            if (!model || !make) {
                setErrorVisible("block");
                setError(errorType[1]);
                setBackgroundColor("#fae0e4");
                setBorderColor("#ff0a54");
                setFontColor("#ff0a54");
                setIconColor("#ff0a54");
    
                setTimeout(()=>{
                    setErrorVisible("none");
                },2000);
            } else {
              const formData = {
                model,
                make
              };
        
              await axios.post("http://localhost:8080/api/vehicles/addVehicle", formData);
              setErrorVisible("block");
              setError(errorType[3]);
              setBackgroundColor("#C6F6D5");
              setBorderColor("#2F855A");
              setFontColor("#2F855A");
              setIconColor("#2F855A");
              setTimeout(() => {
                setErrorVisible("none");
              }, 1500);
        
              setModel("");
              setMake("");
              getVehicle();
            }
        } catch (err) {
            setErrorVisible("block");
            setError(errorType[1]);
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");

            setTimeout(()=>{
                setErrorVisible("none");
            },2000);
        }
        
      }

      const handleEdit = (vehicleID) => {
        const selectedVehicle = vehiclesTableData.find((data) => data.vehicleID === vehicleID);
      
        if (selectedVehicle) {
          setMake(selectedVehicle.make);
          setModel(selectedVehicle.model);
          setVehicleID(selectedVehicle.vehicleID);
          setAddBtn("none");
        } else {
          console.error("Insurance entry not found");
        }
      };

      const handleUpdate=async(vehicleID)=>{
        const updateFormData = {make, model}
        await axios.put(`http://localhost:8080/api/vehicles/updateVehicle/${vehicleID}`, updateFormData)
        .then((res)=>{
            setErrorVisible("block");
              setError(errorType[4]);
              setBackgroundColor("#C6F6D5");
              setBorderColor("#2F855A");
              setFontColor("#2F855A");
              setIconColor("#2F855A");
              setTimeout(() => {
                setErrorVisible("none");
              }, 1500);

              getVehicle();
              setVehicleID(null);
              setModel("");
              setMake("");
              setAddBtn("");
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
    
    const handleDelete = async(vehicleID)=>{
        await axios.delete(`http://localhost:8080/api/vehicles/deleteVehicle/${vehicleID}`)
        .then((res)=>{
            getVehicle();
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
        <Navbar  text="Add Vehicles"/>
        <Error value={erroVisible} errorName={error} backColor={backgroundColor} border={borderColor} font={fontColor} icon={iconColor}/>
        <div className="vehiclesContainer">
            <div className="addVehicleSection">
                <form action="">
                    <div className='vehicleInputSection' style={{marginBottom:"20px"}}>
                        <label htmlFor="">Vehicle Make</label>
                        <input type="text"  className='vehicleFields' placeholder='Enter Vehicle Make' value={make} onChange={(e)=>{
                            setMake(e.target.value)
                        }}/>
                    </div>
                    <div className='vehicleInputSection'>
                        <label htmlFor="">Vehicle Model</label>
                        <input type="text" className='vehicleFields' placeholder='Enter Vehicle Model' value={model} onChange={(e)=>{
                            setModel(e.target.value);
                        }}/>
                    </div>
                </form>
                <button className='vehicleAddBtn' onClick={handleVehicleAddBtn} style={{display:addBtn}}>Add</button>
            </div>
            <div className="vehiclesSection">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Vehicle Make</th>
                            <th>Vehicle Model</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {vehiclesTableData.map((data, index)=>(
                                <tr key={index}>
                                    <td>{data.make}</td>
                                    <td>{data.model}</td>
                                    <td>
                                        <div className="tableBtn">
                                            <div className="tableBtn">
                                                {vehicleID === data.vehicleID ? (
                                                    <>
                                                    <button className='tableUpdateBtn' onClick={() => {handleUpdate(data.vehicleID) }}>Update</button>
                                                    </>
                                                ) : (
                                                    <>
                                                    <button className='editBtn' onClick={() => {handleEdit(data.vehicleID) }}>Edit</button>
                                                    <button className='deleteBtn' onClick={() => {handleDelete(data.vehicleID) }}>Delete</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                 </tr>
                            ))
                            }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
  )
}

export default Vehicles
