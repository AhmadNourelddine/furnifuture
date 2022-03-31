import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Autocomplete, Divider } from '@mui/material';
import axios from 'axios';
import '../../css/createDelivery-profile/createDelivery-profile.css';
import "../../css/signup/signup.css";
import { useNavigate } from 'react-router-dom';
import ToastSuccess from '../../components/toast/toast-success';
import { useSelector } from 'react-redux';
import MuiPhoneNumber from 'material-ui-phone-number';

const CreateShippingProfile = ()=>{

        const [name, setName]= useState('');
        const [email, setEmail]= useState('');
        const [password, setPassword]= useState('');
        const [Cpassword, setCpassword]= useState('');
        const [phoneNb, setPhoneNb]= useState('');
        const [location, setLocation]= useState('');
        const [vehicleLoad, setVehicleLoad]= useState('');

        const [redirect, setRedirect]= useState(false);

        const userToUpdate = useSelector(state=>state.authUserReducer);

        const locations = ["Beirut", "Tripoli", "Sidon", "Tyre",
                     "Jounieh", "Byblos", "Aley", "Nabatieh",
                     "Baalbeck", "Zahle", "Zhgarta-Ehden", "Batroun"];

        const Vehicle_loads = ["500", "1000", "1500", "2000"];
      
        const Navigate = useNavigate()
        useEffect(() => {
      
          if(redirect)
          {
            Navigate('/login');
          }
        },[redirect]);

        useEffect(()=>{
            if(userToUpdate && userToUpdate.is_shipping){
                setName(userToUpdate.name);
                setEmail(userToUpdate.email);
                setPhoneNb(userToUpdate.phone_number);
                setLocation(userToUpdate.location);
                setVehicleLoad(userToUpdate.vehicle_load);
            }
        },[]);
      
        const create = async(event)=>{
            
          event.preventDefault();  
          console.log(email+password)
          let object={
            "name":name,
            "email" : email,
            "location" : location,
            "phone_number" : phoneNb,
            "vehicle_load" : vehicleLoad,
            "password": password,
            "password_confirmation": Cpassword
          }
          await axios.post("http://127.0.0.1:8000/api/auth/register-shipping",object)
                    .then((response)=>{
                    ToastSuccess('Registerd Successfully');
                    setRedirect(true);
                    console.log(response);
                    })
                    .catch((err)=>{
                        console.log(err.response);
                        console.log(err);})
        }

    return(
            <Box style={{backgroundColor:'#ECDCCF', height:'100%', minHeight:'100vh'}}>

            <div className='create-delivery-title-section'>

            <Typography className='create-delivery-page-title'>
            Create Your Delivery Profile
            </Typography>

            </div>

            <Divider sx={{my:3, mx:3}} light/>

            <Container component="form" onSubmit={create}
             className='createdelivery-profile-page'>

                <Box style={{display:'flex', flexDirection:'column'}}>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Name</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField value={name} autoComplete='given-name'
                         required onChange = {e=>setName(e.target.value)}
                         className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Email</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField value={email} autoComplete='email' type="email"
                        required onChange = {e=>setEmail(e.target.value)}
                        className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Password</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField 
                        error={password !=='' && !password.match(/^.{6,}$/)}
                        helperText={password !=='' && !password.match(/^.{6,}$/) && 'Password should be at least 6 character'}
                        autoComplete='new-password' type="password"
                        required onChange = {e=>setPassword(e.target.value)} 
                        className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Password Confirm</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField 
                        error={Cpassword!=='' && Cpassword !== password} 
                        helperText={Cpassword!=='' && Cpassword !== password && 'please confrim password'}
                        autoComplete='new-password' type="password"
                        required onChange = {e=>setCpassword(e.target.value)}
                        className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>
            </Box>
            <Box style={{display:'felx', flexDirection:'column'}}>

            <Box className='createdelivery-input'>
                <Typography variant='h4' sx={{my:2}}>Location</Typography>
                        <Box className='createdelivery-input-section'>
                            <Autocomplete className='createdelivery-autocomplete-section'
                                disablePortal
                                options={locations}
                                value={location}
                                sx={{ width: 300 }}
                                renderInput={(params) => 
                                <TextField className='delivery-dropMenu-textfield'
                                    {...params} 
                                     />}
                                onChange = {(event, value)=>{value && setLocation(value)}}
                                />
                        </Box>
            </Box>

            <Box className='createdelivery-input'>
                <Typography variant='h4' sx={{my:2}}>Vehicle Load</Typography>
                        <Box className='createdelivery-input-section'>
                            <Autocomplete className='createdelivery-autocomplete-section'
                                disablePortal
                                options={Vehicle_loads}
                                value={vehicleLoad}
                                sx={{ width: 300 }}
                                renderInput={(params) => 
                                <TextField className='delivery-dropMenu-textfield'
                                    {...params} 
                                     />}
                                onChange = {(event, value)=>{value && setVehicleLoad(value)}}
                                />
                        </Box>
            </Box>

            <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Phone Number</Typography>
                    <Box className='createdelivery-input-section'>
                    <MuiPhoneNumber 
                    variant="outlined" className="createdelivery-input-textfield" 
                    value={phoneNb} defaultCountry={'lb'} 
                    onChange={(e)=>{setPhoneNb(e)}}/>
                    </Box>
            </Box>

                <Box style={{alignSelf:'flex-end'}} className='deliveryprofile-cancel-create-btns'>
                    <Button onClick={()=>{Navigate('/about')}}
                    style={{width:'7rem', border: 'solid 0.5px black', color:'black ', backgroundColor:'#D86544'}}>
                        Cancel
                    </Button>
                    <Button type="submit"
                     sx={{mx:2}} 
                     style={{width:'7rem', border: 'solid 0.5px black', color:'white ', backgroundColor:'#5094AA'}}>Create</Button>
                </Box>
            </Box>


            </Container>

            </Box>
    );

}
export default CreateShippingProfile;