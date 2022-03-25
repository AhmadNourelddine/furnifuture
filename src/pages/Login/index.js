import React from 'react';
import axios from 'axios';
import "../../css/login/login.css";
import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";
import Box from "@material-ui/core/box";
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import loggedIn from '../../redux/actions/logIn.js';
import isShipping from '../../redux/actions/loggedInShipping'; 
import ToastSuccess from '../../components/toast/toast-success';

const Login = ()=> {

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [error, setError]= useState(false);
  const [redirect, setRedirect]= useState(false);
  
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if(redirect)
    {
      Navigate('/about');
    }
  },[redirect]);


  const logIn = async(event)=>{

    event.preventDefault();
    console.log(email+password)

    let object={
      "email" : email,
      "password": password
    }

    await axios.post("http://127.0.0.1:8000/api/auth/login",object)
          .then((response)=>{return response.data;})
          .then((result)=>{
            ToastSuccess('Signed In Successfully');
            let token = result['access_token'];
            window.localStorage.setItem('authToken', token);
            window.localStorage.setItem('user_name', result.user['name']);
            window.localStorage.setItem('user_email', result.user['email']);
            console.log(result);
            console.log(result.user.saved_products);
            dispatch(loggedIn(result.user));
            if(result.user.is_shipping){
              dispatch(isShipping());} 
            setRedirect(true);
          })
          .catch((err)=>{
            setError(true);
            console.log(err.message);})
  }

  return (

    <Box component="form" onSubmit={logIn}
    style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Box className='login-form' id="signin-box">
    <p id="sign-in">Sign In To Your Account</p>

    <TextField autoComplete="email" required 
    className="outlined-basic" label="Email" variant="outlined" margin="normal" type="email" 
    onChange = {e=>setEmail(e.target.value)}/>

    <TextField autoComplete="current-password" required 
    className="outlined-basic" label="Password" variant="outlined" margin="normal" type="password" 
    onChange = {e=>setPassword(e.target.value)} />
    <InputLabel>{error && 'Email or/and Password are Wrong'}</InputLabel>
    <Button type="submit"
     variant="contained" fullWidth id="signin-btn">
      Log In
    </Button>

    <Typography className='sign-in-page-sign-up-link'>
      Do not have an Account? 
      <Button component={Link} to="/signup">
        <p style={{borderBottom:'solid 0.5px'}}>Sign Up</p>
      </Button> 
    </Typography>

    </Box>
  

    </Box>

  );
}

export default Login;