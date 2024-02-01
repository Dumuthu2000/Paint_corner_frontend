import Navbar from '../../../components/Navbar/Navbar'
import Drawer from '../../../components/Drawer/Drawer'
import Error from '../../../components/Errors/Error'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Insurance = () => {
    const errorType = [ 
        "Vehicles are not available",
        "All fields are required",
        "This model and make already created",
        "New vehicle added successfully",
        "Update Successfull",
        "Delete Successfull",
        "Enter valid contact number"
      ]
      const [error, setError] = useState([]);
      const [erroVisible, setErrorVisible] = useState("none");
      const [backgroundColor, setBackgroundColor] = useState("#fae0e4")
      const [borderColor, setBorderColor] = useState("#ff0a54")
      const [fontColor, setFontColor] = useState("#ff0a54")
      const [iconColor, setIconColor] = useState("#ff0a54")

      const [insuranceTableData, setInsuranceTableData] = useState([]);
      const [insuranceName, setInsuranceName] = useState('');
      const [insuranceMobile, setInsuranceMobile] = useState('');
      const [insuranceID, setInsuranceID] = useState(null);

      const [addBtn, setAddBtn] = useState("");

      const navigate = useNavigate();
      const jwtToken = localStorage.getItem("jwtToken");

      //Checking user loggin or not
      useEffect(()=>{
        if(!jwtToken){
            navigate("/");
        }
      })

      const getInsurance = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/insurance/getInsurance");
          setInsuranceTableData(res.data);
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
        getInsurance();
      }, []); // Empty dependency array to run the effect only once
    
      const handleInsuranceAddBtn = async () => {
        try {
            if (!insuranceName || !insuranceMobile) {
                setErrorVisible("block");
                setError(errorType[1]);
                setBackgroundColor("#fae0e4");
                setBorderColor("#ff0a54");
                setFontColor("#ff0a54");
                setIconColor("#ff0a54");
    
                setTimeout(()=>{
                    setErrorVisible("none");
                },2000);
            }else if(insuranceMobile.length != 10){
                setErrorVisible("block");
                setError(errorType[6]);
                setBackgroundColor("#fae0e4");
                setBorderColor("#ff0a54");
                setFontColor("#ff0a54");
                setIconColor("#ff0a54");
    
                setTimeout(()=>{
                    setErrorVisible("none");
                },2000);
            }
             else {
              const formData = {insuranceName, insuranceMobile}
        
              await axios.post("http://localhost:8080/api/insurance/addInsurance", formData);
              setErrorVisible("block");
              setError(errorType[3]);
              setBackgroundColor("#C6F6D5");
              setBorderColor("#2F855A");
              setFontColor("#2F855A");
              setIconColor("#2F855A");
              setTimeout(() => {
                setErrorVisible("none");
              }, 1500);
        
              setInsuranceName("");
              setInsuranceMobile("");
              getInsurance();
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

      const handleEdit = (insuranceID) => {
        const selectedInsurance = insuranceTableData.find((data) => data.insuranceID === insuranceID);
      
        if (selectedInsurance) {
          setInsuranceName(selectedInsurance.insuranceName);
          setInsuranceMobile(selectedInsurance.insuranceMobile);
          setInsuranceID(selectedInsurance.insuranceID);
          setAddBtn("none");
        } else {
          console.error("Insurance entry not found");
        }
      };
      

      const handleUpdate=async(insuranceID)=>{
        const updateFormData = {insuranceName, insuranceMobile}
        if (!insuranceName || !insuranceMobile) {
            setErrorVisible("block");
            setError(errorType[1]);
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");

            setTimeout(()=>{
                setErrorVisible("none");
            },2000);
        }else if(insuranceMobile.length != 10){
            setErrorVisible("block");
            setError(errorType[6]);
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");

            setTimeout(()=>{
                setErrorVisible("none");
            },2000);
        }
        else{
            await axios.put(`http://localhost:8080/api/insurance/updateInsurance/${insuranceID}`, updateFormData)
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

                getInsurance();
                setInsuranceID(null);
                setInsuranceName("");
                setInsuranceMobile("");
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
      }
    const handleDelete = async(insuranceID)=>{
        await axios.delete(`http://localhost:8080/api/insurance/deleteInsurance/${insuranceID}`)
        .then((res)=>{
            getInsurance();
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
        <Navbar  text="Add Insurance Company"/>
        <Error value={erroVisible} errorName={error} backColor={backgroundColor} border={borderColor} font={fontColor} icon={iconColor}/>
        <div className="vehiclesContainer">
            <div className="addVehicleSection">
                <form action="">
                    <div className='vehicleInputSection' style={{marginBottom:"10px"}}>
                        <label htmlFor="">Insurance Name:</label>
                        <input type="text"  className='vehicleFields' placeholder='Enter Insurance Name' value={insuranceName} onChange={(e)=>{
                            setInsuranceName(e.target.value)
                        }}/>
                    </div>
                    <div className='vehicleInputSection' style={{marginBottom:"10px"}}>
                        <label htmlFor="">Contact No:</label>
                        <input type="text"  className='vehicleFields' placeholder='Enter Contact No' value={insuranceMobile} onChange={(e)=>{
                            setInsuranceMobile(e.target.value)
                        }}/>
                    </div>
                </form>
                <button className='vehicleAddBtn' onClick={handleInsuranceAddBtn} style={{display:addBtn}}>Add</button>
            </div>
            <div className="vehiclesSection">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Insurance Name</th>
                            <th>Contact No</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {insuranceTableData.map((data, index)=>(
                                <tr key={index}>
                                    <td>{data.insuranceName}</td>
                                    <td>{data.insuranceMobile}</td>
                                    <td>
                                        <div className="tableBtn">
                                            <div className="tableBtn">
                                                {insuranceID === data.insuranceID ? (
                                                    <>
                                                    <button className='tableUpdateBtn' onClick={() => {handleUpdate(data.insuranceID) }}>Update</button>
                                                    </>
                                                ) : (
                                                    <>
                                                    <button className='editBtn' onClick={() => {handleEdit(data.insuranceID) }}>Edit</button>
                                                    <button className='deleteBtn' onClick={() => {handleDelete(data.insuranceID) }}>Delete</button>
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

export default Insurance
