
import * as React from 'react';
import "../../css/signup/signup.css";
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";
import Box from "@material-ui/core/box";


const ContactUs = ()=> {

  const [email,setEmail]= useState('');       
  const [message,setMessage]= useState('');

  let token = window.localStorage.getItem('authToken')
  let Navigate = useNavigate()

  const send = async()=>{

    console.log(message)
    let object={
        "email": email,
        "message": message
    }
    await fetch("http://127.0.0.1:8000/api/auth/contact-us-message",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(object)
    })
          .then((response)=>response.json())
          .then((result)=>{
            console.log(result)
          })
  }

  const cancel = async()=>{
    Navigate('/about')
  }

  return (
    <Box style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Box className='signup-form' id="signup-box">
    <p id="sign-up">Feel Free To Contact Us</p>
    <TextField id="outlined-basic" label="Email" variant="outlined" margin="dense"
    onChange = {e=>setEmail(e.target.value)}/> 
    <TextField multiline={true} rows={5} id="outlined-basic" label="Message" variant="outlined" margin="dense"
    onChange = {e=>setMessage(e.target.value)}/>

    <Button onClick={send} variant="contained" id="signup-btn"  margin="dense" fullWidth>Send</Button>
    <Button onClick={cancel} variant="contained" id="signup-btn" fullWidth>Cancel</Button>

    </Box>
 
    </Box>

  );
}

export default ContactUs;