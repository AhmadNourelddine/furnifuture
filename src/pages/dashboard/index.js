
import * as React from 'react';
import axios from 'axios';
import "../../css/signup/signup.css";
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";
import Box from "@material-ui/core/box";


const Dashboard = ()=> {

  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [Cpassword,setCpassword]= useState('');

  let token = window.localStorage.getItem('authToken');

  const update = async()=>{

    console.log(email+password)
    let info={
      "name":name,
      "email" : email,
      "password": password,
      "password_confirmation": Cpassword
    }
    await axios.post("http://127.0.0.1:8000/api/user/update-profile", info, {
        headers: {
          'Authorization': 'Bearer '+token
        },
    })
          .then((response)=>console.log(response))
          .catch((err)=>{
            console.log(err)
          })
  }
  
  return (
    <Box style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Box className='signup-form' id="signup-box">
    <p id="sign-up">Update Account Info</p>
    <TextField className="outlined-basic" label="Name" variant="outlined" margin="dense"
    onChange = {e=>setName(e.target.value)}/>

    <TextField className="outlined-basic" label="Email" variant="outlined" margin="dense"
    onChange = {e=>setEmail(e.target.value)}/>

    <TextField className="outlined-basic" label="Password" variant="outlined" margin="dense" type="password"
    onChange = {e=>setPassword(e.target.value)}/>

   <TextField className="outlined-basic" label="Confirm Password" variant="outlined" margin="dense" type="password"
    onChange = {e=>setCpassword(e.target.value)}/>

    <Button onClick={update} variant="contained" id="signup-btn" fullWidth>Update</Button>
    </Box>
 
    </Box>

  );
}

export default Dashboard;