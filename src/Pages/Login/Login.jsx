import './login.css';
import loginImage from '../../../src/assets/paintCorner.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Error from '../../components/Errors/Error';

const Login = () => {
    const errorType = [ 
      "All fields are required",
      "Enter valid credentials",

    ]
    const [error, setError] = useState([]);
    const [erroVisible, setErrorVisible] = useState("none");
    const [backgroundColor, setBackgroundColor] = useState("#fae0e4")
    const [borderColor, setBorderColor] = useState("#ff0a54")
    const [fontColor, setFontColor] = useState("#ff0a54")
    const [iconColor, setIconColor] = useState("#ff0a54")
    
    const [enteredUsername, setUsername] = useState('');
    const [enteredPassword, setPassword] = useState('');

    const navigate = useNavigate();
    const handleLogin=async(e)=>{
      e.preventDefault();
      if(!enteredUsername || !enteredPassword){
            setErrorVisible("block");
            setError(errorType[0]);
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");

            setTimeout(()=>{
                setErrorVisible("none");
            },2000);
      }
      const loginData = { enteredUsername, enteredPassword }
      await axios.post("http://localhost:8080/api/user/signin", loginData)
      .then((res)=>{
        const token = res.data.token;
        localStorage.setItem("jwtToken","Bearer " + token);
        navigate('/new-job')
      }).catch((err)=>{
            setErrorVisible("block");
            setError(errorType[1]);
            setBackgroundColor("#fae0e4");
            setBorderColor("#ff0a54");
            setFontColor("#ff0a54");
            setIconColor("#ff0a54");

            setTimeout(()=>{
                setErrorVisible("none");
            },2000);

            setUsername("");
            setPassword("");
      })
        
    }
  return (
    <div className="mainLoginContainer">
      <div style={{marginTop:"3rem"}}>
        <Error value={erroVisible} errorName={error} backColor={backgroundColor} border={borderColor} font={fontColor} icon={iconColor}/>
      </div>
      <div className='loginContainer'>
      <div className="imgContainer">
        <img src={loginImage} alt="Paint Corner" className='imageBox'/>
      </div>
      <div className="loginBox">
        <h2 className='loginTitle'>Login</h2>
        <form action="">
            <label htmlFor="">Username:</label>
            <input type="text" placeholder='Enter Username' style={{width:"12rem", marginBottom:"20px", fontSize:"15px", fontWeight:"bold"}} onChange={(e)=>{
              setUsername(e.target.value)
            }}/><br />
            <label htmlFor="">Password:</label>
            <input type="password" placeholder='Enter Password' style={{width:"12rem", marginBottom:"20px", fontSize:"15px", fontWeight:"bold", marginLeft:"25px"}} onChange={(e)=>{
              setPassword(e.target.value)
            }}/><br />
            <button className='loginBtn' onClick={handleLogin}>Login</button>

        </form>
      </div>
    </div>
    </div>
    
  )
}

export default Login
