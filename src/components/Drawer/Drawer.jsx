import './drawer.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LogoutIcon from '@mui/icons-material/Logout';


const Drawer = () => {
  const navigate = useNavigate();

  //Get token from local storage
  const jwtToken = localStorage.getItem("jwtToken");

  const handleNewJob = ()=>{
    if(!jwtToken){
      navigate("/");
    }else{
      navigate("/new-job");
    }
  }

  const handleSelectChange = (event) => {
    if(!jwtToken){
      navigate("/");
    }else{
      const selectedOption = event.target.value;
      navigate(selectedOption);
    }
    
  };

  const handleLogout = ()=>{
     localStorage.removeItem("jwtToken");
  }
  return (
    <div className="Container">
      <div className="DrawerContainer">
        <div className="title">Paint Corner</div>
        <div className="linkButtons">
          <Link to={``}><button><DashboardCustomizeIcon className='btnIcons'/>Dashboard</button></Link>
          <Link to={`/new-job`}  onClick={handleNewJob}><button><FiberNewIcon className='btnIcons'/>New Job</button></Link>
          <select className='selectedItems' onChange={handleSelectChange}>
            <option value="/estimate">Estimate</option>
            <option value="/createEstimate">Create Estimate</option>
            <option value="/supplimentryEstimate">Supplimentry Estimate</option>
          </select>
          <select className='selectedItems' onChange={handleSelectChange}>
            <option value="" >Invoices</option>
            <option value="/invoice/insurance/insuranceInvoice">Insurance Invoice</option>
            <option value="/invoice/personalInvoice">Personal Invoice</option>
          </select>
          <select className='selectedItems' onChange={handleSelectChange}>
            <option value="" >Reports</option>
            <option value="/jobCard-report">Job Cards</option>
            <option value="/estimate-preview">Estimates</option>
            <option value="/supplimentry-preview">Supplimentry</option>
            <option value="/invoice/personalInvoice-preview">Personal Invoice</option>
          </select>
          <select className='selectedItems' onChange={handleSelectChange}>
            <option value="" >More Categories</option>
            <option value="/products">Product Items</option>
            <option value="/vehicles">Vehicles</option>
            <option value="/insurance-companies">Insurance Companies</option>
          </select>
        </div>
        <div id="logoutBtn">
            <Link to={`/`} onClick={handleLogout}><button><LogoutIcon className='btnIcons' style={{color:"red"}}/>Logout</button></Link>
        </div>
      </div>
      
    </div>
  );
};

export default Drawer;
