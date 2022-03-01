import React from 'react';
import Typography from '@mui/material/Typography';

const Footer = ()=>{
    return(
        <div style={{ width:"100%", backgroundColor:"black", color:"white"}}>
           <div style={{padding:"2%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <Typography>Contact Us</Typography>
            <Typography>Email</Typography>
            <Typography>Phone Number</Typography>
           </div>
        </div>

    )
}

export default Footer;