import './error.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Error = (props) => {
  return (
    <div className='errorContainer' style={{display:props.value, background:`${props.backColor}`, border:`5px solid ${props.border}`, color:`${props.font}`}}>
        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <ErrorOutlineIcon style={{color:props.icon}}/>
            <p className='errorMessage'>{props.errorName}</p>
        </div>
    </div>
  )
}

export default Error
