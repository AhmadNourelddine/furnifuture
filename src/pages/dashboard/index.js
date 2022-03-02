
import * as React from 'react';
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

  let token = window.localStorage.getItem('authToken')
  let Navigate = useNavigate()

  const update = async()=>{

    console.log(email+password)
    let object={
      "name":name,
      "email" : email,
      "password": password,
      "password_confirmation": Cpassword
    }
    await fetch("http://127.0.0.1:8000/api/auth/update-profile",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
        method: "POST",
        body: JSON.stringify(object)
    })
          .then((response)=>response.json())
          .then((result)=>{
            console.log(result)
          })
  }
  return (
    <Box style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Box className='signup-form' id="signup-box">
    <p id="sign-up">Update Account Info</p>
    <TextField id="outlined-basic" label="Name" variant="outlined" margin="dense"
    onChange = {e=>setName(e.target.value)}/>

    <TextField id="outlined-basic" label="Email" variant="outlined" margin="dense"
    onChange = {e=>setEmail(e.target.value)}/>

    <TextField id="outlined-basic" label="Password" variant="outlined" margin="dense" type="password"
    onChange = {e=>setPassword(e.target.value)}/>

   <TextField id="outlined-basic" label="Confirm Password" variant="outlined" margin="dense" type="password"
    onChange = {e=>setCpassword(e.target.value)}/>

    <Button onClick={update} variant="contained" id="signup-btn" fullWidth>Update</Button>
    </Box>
 
    </Box>

  );
}

export default Dashboard;