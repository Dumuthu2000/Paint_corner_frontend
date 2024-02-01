
import Navbar from '../../../components/Navbar/Navbar'
import Drawer from '../../../components/Drawer/Drawer'
import Error from '../../../components/Errors/Error'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Products = () => {
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

      const [partsTableData, setPartsableData] = useState([]);
      const [itemName, setItemName] = useState('');
      const [itemID, setItemID] = useState(null);

      const [addBtn, setAddBtn] = useState("");
      const [searchWord, setSearchWord] = useState("");

      const navigate = useNavigate();
      const jwtToken = localStorage.getItem("jwtToken");

      //Checking user loggin or not
      useEffect(()=>{
        if(!jwtToken){
            navigate("/");
        }
      })

      const getParts = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/parts/getParts");
          setPartsableData(res.data);
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
        getParts();
      }, []); // Empty dependency array to run the effect only once
    
      const handleVehicleAddBtn = async () => {
        try {
            if (!itemName) {
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
              const formData = {itemName}
        
              await axios.post("http://localhost:8080/api/parts/addParts", formData);
              setErrorVisible("block");
              setError(errorType[3]);
              setBackgroundColor("#C6F6D5");
              setBorderColor("#2F855A");
              setFontColor("#2F855A");
              setIconColor("#2F855A");
              setTimeout(() => {
                setErrorVisible("none");
              }, 1500);
        
              setItemName("");
              getParts();
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

      const handleEdit = (itemID) => {
        const selectedPart = partsTableData.find((data) => data.itemID === itemID);
      
        if (selectedPart) {
          setItemName(selectedPart.itemName);
          setVehicleID(selectedPart.itemID);
          setAddBtn("none");
        } else {
          console.error("Insurance entry not found");
        }
      };

      const handleUpdate=async(itemID)=>{
        const updateFormData = {itemName}
        await axios.put(`http://localhost:8080/api/parts/updatePart/${itemID}`, updateFormData)
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

              getParts();
              setItemID(null);
              setItemName("");
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
    const handleDelete = async(itemID)=>{
        await axios.delete(`http://localhost:8080/api/parts/deletePart/${itemID}`)
        .then((res)=>{
            getParts();
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

    //Search Parts
    const handleSearch = async () => {
        try {
          const formData = { searchWord }; // Use searchWord instead of itemName
          const res = await axios.get("http://localhost:8080/api/parts/searchParts", {formData});
          console.log(res.data)
          setPartsableData(res.data);
        } catch (err) {
          setErrorVisible("block");
          setError(err.message);
          setBackgroundColor("#fae0e4");
          setBorderColor("#ff0a54");
          setFontColor("#ff0a54");
          setIconColor("#ff0a54");
      
          setTimeout(() => {
            setErrorVisible("none");
          }, 2000);
        }
      };
      
      
  return (
    <div className='createEstimateContainer'>
    <Drawer/>
    <div className="estimateContainer">
        <Navbar  text="Add Spare Parts"/>
        <Error value={erroVisible} errorName={error} backColor={backgroundColor} border={borderColor} font={fontColor} icon={iconColor}/>
        <div className="vehiclesContainer">
            <div className="addVehicleSection">
                <form action="">
                    <div className='vehicleInputSection' style={{marginBottom:"10px"}}>
                        <label htmlFor="">Item Name:</label>
                        <input type="text"  className='vehicleFields' placeholder='Enter Spare Part Name' value={itemName} onChange={(e)=>{
                            setItemName(e.target.value)
                        }}/>
                    </div>
                </form>
                <button className='vehicleAddBtn' onClick={handleVehicleAddBtn} style={{display:addBtn}}>Add</button>
            </div>
            <div className="vehiclesSection">
            {/* <div className="searchBox">
                    <label htmlFor="" style={{fontSize:"18px"}}>Search Part:</label>
                    <input type="text" className='vehicleFields' placeholder='Search Spare Part Name' onChange={(e)=>{
                        setSearchWord(e.target.value)
                    }}/>
                    <button className='searchBtn' onClick={handleSearch}>Search</button>
                </div> */}
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {partsTableData.map((data, index)=>(
                                <tr key={index}>
                                    <td>{data.itemName}</td>
                                    <td>
                                        <div className="tableBtn">
                                            <div className="tableBtn">
                                                {itemID === data.itemID ? (
                                                    <>
                                                    <button className='tableUpdateBtn' onClick={() => {handleUpdate(data.itemID) }}>Update</button>
                                                    </>
                                                ) : (
                                                    <>
                                                    <button className='editBtn' onClick={() => {handleEdit(data.itemID) }}>Edit</button>
                                                    <button className='deleteBtn' onClick={() => {handleDelete(data.itemID) }}>Delete</button>
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

export default Products
