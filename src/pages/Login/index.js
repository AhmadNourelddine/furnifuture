
import React from 'react';
import "../../css/login/login.css";
import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";
import Box from "@material-ui/core/box";
import { Typography } from '@material-ui/core';


const Login = ()=> {

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [redirect, setRedirect]= useState(false);
  
  let Navigate = useNavigate();
  
  useEffect(() => {

    if(redirect)
    {
      Navigate('/about');
    }
  },[redirect]);

 

  const logIn = async()=>{

    console.log(email+password)
    let object={
      "email" : email,
      "password": password
    }

    await fetch("http://127.0.0.1:8000/api/auth/login",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(object)
    })
          .then((response)=>response.json())
          .then((result)=>{
            setRedirect(true);
            let token = result['access_token'];
            window.localStorage.setItem('authToken', token);
            window.localStorage.setItem('user_name', result.user['name']);
            window.localStorage.setItem('user_email', result.user['email']);
            console.log(result);
          })
  }

  return (

    <Box style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Box className='login-form' id="signin-box">
    <p id="sign-in">Sign In To Your Account</p>
    <TextField className="outlined-basic" label="Email" variant="outlined" margin="normal"
    onChange = {e=>setEmail(e.target.value)}/>

    <TextField className="outlined-basic" label="Password" variant="outlined" margin="normal" type="password" 
    onChange = {e=>setPassword(e.target.value)} />

    <Button onClick={logIn} variant="contained" fullWidth id="signin-btn">
      Log In</Button>
      <Typography className='sign-in-page-sign-up-link'>Don’t have an Account? <Button component={Link} to="/signup">Sign Up</Button> </Typography>
    </Box>

  

    </Box>

  );
}

export default Login;