
import React from 'react';
import "../../css/login/login.css";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";
import Box from "@material-ui/core/box";


const Login = ()=> {

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [redirect, setRedirect]= useState(false);

  let Navigate = useNavigate()

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
            setRedirect(true)
            let token = result['access_token']
            window.localStorage.setItem('authToken', token)
            console.log(result)
          })
      if(redirect)
      {
        Navigate('/dashboard')
      }
  }

  return (

    <Box className='login-form' >
    <h1>Sign In</h1>
    <TextField id="outlined-basic" label="UserName" variant="outlined" style={{margin:"1%"}}
    onChange = {e=>setEmail(e.target.value)}/>

    <TextField id="outlined-basic" label="Password" variant="outlined" style={{margin:"1%"}} 
    onChange = {e=>setPassword(e.target.value)} />

    <Button onClick={logIn} variant="contained">Log In</Button>
    </Box>

  );
}

export default Login;