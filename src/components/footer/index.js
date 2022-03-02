import React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const Footer = ()=>{

    let Navigate = useNavigate()

    const navigateContactUs = ()=>{

        Navigate('/contact-us')
    }

    return(
        <div style={{ width:"100%", backgroundColor:"black", color:"white"}}>
           <div style={{padding:"2%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <Typography onClick={navigateContactUs}>Contact Us</Typography>
            <Typography>Email</Typography>
            <Typography>Phone Number</Typography>
           </div>
        </div>

    )
}

export default Footer;