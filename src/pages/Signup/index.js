
import * as React from 'react';
import "../../css/signup/signup.css";
import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";
import Box from "@material-ui/core/box";
import axios from 'axios';
import ToastSuccess from '../../components/toast/toast-success';
import { Typography } from '@mui/material';


const SignUp = ()=> {

  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [Cpassword,setCpassword]= useState('');
  const [redirect,setRedirect]= useState(false);

  let Navigate = useNavigate()
  useEffect(() => {

    if(redirect)
    {
      Navigate('/login')
    }
  },[redirect]);

  const signup = async(event)=>{
    event.preventDefault();
    console.log(email+password)
    let object={
      "name":name,
      "email" : email,
      "password": password,
      "password_confirmation": Cpassword
    }
    await axios.post("http://127.0.0.1:8000/api/auth/register",object)
          .then((result)=>{
            ToastSuccess('Registered Successfully');
            setRedirect(true)
            console.log(result)
          })
          .catch((err)=>console.log(err))
  }
  return (
    <Box component="form" onSubmit={signup} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Box className='signup-form' id="signup-box">
    <p id="sign-up">Create An Account</p>

    <TextField required autoComplete='given-name'
    className="outlined-basic" label="Name" variant="outlined" margin="dense"
    onChange = {e=>setName(e.target.value)}/>

    <TextField required autoComplete='email'
    className="outlined-basic" label="Email" variant="outlined" margin="dense" type="email"
    onChange = {e=>setEmail(e.target.value)}/>

    <TextField required autoComplete='new-password'
     error={password !=='' && !password.match(/^.{6,}$/)}
     helperText={password !=='' && !password.match(/^.{6,}$/) && 'Password should be at least 6 character'}
     className="outlined-basic" label="Password" variant="outlined" margin="dense" type="password"
     onChange = {e=>setPassword(e.target.value)}/>

   <TextField required autoComplete='new-password'
    error={Cpassword!=='' && Cpassword !== password} 
    helperText={Cpassword!=='' && Cpassword !== password && 'please confrim password'}
    className="outlined-basic" label="Confirm Password" variant="outlined" margin="dense" type="password"
    onChange = {e=>setCpassword(e.target.value)}/>

    <Button type="submit" variant="contained" id="signup-btn" fullWidth>Sign Up</Button>

    
    <Typography className='sign-in-page-sign-up-link'>
      Already Have An Account? 
      <Button component={Link} to="/login">
        <p style={{borderBottom:'solid 0.5px'}}>Sign In</p>
      </Button> 
    </Typography>

    </Box>

    </Box>

  );
}

export default SignUp;