
import * as React from 'react';
import axios from 'axios';
import "../../css/signup/signup.css";
import "../../css/contactUs/contactUs.css";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";
import Box from "@material-ui/core/box";


const ContactUs = ()=> {

  const [email,setEmail]= useState('');       
  const [message,setMessage]= useState('');
  const [subject,setSubject]= useState('');
  const [redirect, setRedirect]= useState(false);

  let Navigate = useNavigate()
  
  useEffect(() => {

    if(redirect)
    {
      Navigate('/about')
    }
  },[redirect]);

  const send = async()=>{

    console.log(message)
    let object={
        "email": email,
        "message": message,
        "subject": subject
    }
    await axios.post("http://127.0.0.1:8000/api/contact-us",object)
          .then((response)=>{
            setRedirect(true)
            console.log(response)
          })
          .catch((err)=>{
            console.log(err)
          })
  }

  const cancel = async()=>{
    Navigate('/about')
  }  

  return (
    <Box style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Box className='signup-form' id="contact-us-box">
    <p id="contact-us">Feel Free To Contact Us</p>
    <TextField className="outlined-basic" label="Email" variant="outlined" margin="dense"
    onChange = {e=>setEmail(e.target.value)}/> 
    <TextField className="outlined-basic" label="Subject" variant="outlined" margin="dense"
    onChange = {e=>setSubject(e.target.value)}/>
    <TextField fullWidth multiline={true} rows={5} label="Message" className="outlined-basic" variant="outlined" margin="dense"
    onChange = {e=>setMessage(e.target.value)}/>

    <Button onClick={send} variant="contained" id="signup-btn"  margin="dense" fullWidth>Send</Button>
    <Button onClick={cancel} variant="contained" id="signup-btn" fullWidth>Cancel</Button>

    </Box>
 
    </Box>

  );
}

export default ContactUs;