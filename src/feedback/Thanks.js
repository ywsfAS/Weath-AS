import React from 'react'
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function Thanks() {
    // Simple thanks page 
    return (
        <div style={{ height: "100vh", display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", fontFamily: "Montserrat" }}>
            <div style={{ marginBottom: "20px", display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>

                <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "3px" }}>Your Opinion Matters</h1>
                <p style={{ fontSize: "20px", color: "gray" }}>Help us improve by sharing your thoughts and experiences.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", padding: "20px 60px", border: "2px solid gray", borderRadius: '10px' }}>
                <CheckCircleIcon sx={{ fontSize: "90px" }} />
                <h3 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "3px" }}>Thank You!</h3>
                <p style={{ textAlign: 'center', color: "gray" }}>Your feedback has been submitted successfully.<br /> We appreciate your time.</p>
                <Link to={"/feedback"}><button className='Forget-button' type="submit" style={{ cursor: "pointer" }} >Submit another feedback</button></Link>
            </div>

        </div>
    )
}
