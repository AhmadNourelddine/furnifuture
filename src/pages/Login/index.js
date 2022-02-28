
import React from 'react';
import "../../css/login/login.css";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";


const Login = ()=> {

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [redirect, setRedirect]= useState(false);

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
            console.log(result)
          })
  }
  
  return (
    <div className='login-form'>
    <h1>Sign In</h1>
    <TextField id="outlined-basic" label="UserName" variant="outlined" 
    onChange = {e=>setEmail(e.target.value)}/>

    <TextField id="outlined-basic" label="Password" variant="outlined" 
    onChange = {e=>setPassword(e.target.value)}/>

    <Button onClick={logIn} variant="contained">Log In</Button>
    </div>

  );
}

export default Login;