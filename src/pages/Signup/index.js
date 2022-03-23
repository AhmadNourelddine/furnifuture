
import * as React from 'react';
import "../../css/signup/signup.css";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";
import Box from "@material-ui/core/box";
import axios from 'axios';
import ToastSuccess from '../../components/toast/toast-success';


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

  const signup = async()=>{

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
    <Box style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Box className='signup-form' id="signup-box">
    <p id="sign-up">Create An Account</p>
    <TextField className="outlined-basic" label="Name" variant="outlined" margin="dense"
    onChange = {e=>setName(e.target.value)}/>

    <TextField className="outlined-basic" label="Email" variant="outlined" margin="dense"
    onChange = {e=>setEmail(e.target.value)}/>

    <TextField className="outlined-basic" label="Password" variant="outlined" margin="dense" type="password"
    onChange = {e=>setPassword(e.target.value)}/>

   <TextField className="outlined-basic" label="Confirm Password" variant="outlined" margin="dense" type="password"
    onChange = {e=>setCpassword(e.target.value)}/>

    <Button onClick={signup} variant="contained" id="signup-btn" fullWidth>Sign Up</Button>
    </Box>

    </Box>

  );
}

export default SignUp;