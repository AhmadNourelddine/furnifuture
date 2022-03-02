import React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import "../../css/footer/footer.css";

const Footer = ()=>{

    let Navigate = useNavigate()

    const navigateContactUs = ()=>{

        Navigate('/contact-us')
    }

    return(
        <div style={{ width:"100%", backgroundColor:"black", color:"white"}}>
           <div style={{padding:"2%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <Typography onClick={navigateContactUs} id="contact-us">Contact Us</Typography>
            <Typography>Email</Typography>
            <Typography>Phone Number</Typography>
            <Typography>Services</Typography>
           </div>
        </div>

    )
}

export default Footer;