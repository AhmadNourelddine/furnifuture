import React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import {useDispatch} from 'react-redux';
import "../../css/footer/footer.css";
import {openContactUsModal} from '../../redux/actions/modal';

const Footer = ()=>{

    let Navigate = useNavigate();
    const dispatch = useDispatch();

    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', 
        alignItems:'center', padding:'2%', backgroundColor:"#6F1A07", color:"white"}}>
        <div>
        <FacebookRoundedIcon sx={{px:1}}/>
        <TwitterIcon sx={{px:1}}/>
        <InstagramIcon sx={{px:1}}/>
        <LinkedInIcon sx={{px:1}}/>
        </div>
        <div 
        style={{padding:"1%", display:"flex", flexDirection:"row", 
        justifyContent:"space-evenly", alignItems:"center"}}>
        <Typography onClick={()=>{dispatch(openContactUsModal())}} 
        sx={{px:1}} id="footer-contact-us">
            Contact Us
        </Typography>
        <EmailIcon/>
        {/* <Typography>Email</Typography>
        <Typography>Phone Number</Typography>
        <Typography>Services</Typography> */}
        </div>
        <Typography variant="secondary">
            FurniFuture © 2022
        </Typography>
        </div>
    )
}

export default Footer;