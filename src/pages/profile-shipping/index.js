import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/profile/profile.css';
import '../../css/profile-shipping/profile-shipping.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ProfileShipping = ()=>{ 

    const [data, setData]= useState([]);

    let token = window.localStorage.getItem('authToken');
    let user_name = window.localStorage.getItem('user_name');
    let email = window.localStorage.getItem('user_email');

    const userInfo = useSelector(state=>state.authUserReducer);

    return(

        <div className='profile-page-shipping'>
            <Box className='profile-page-info'>
                <Box><AccountCircleIcon sx={{fontSize:150}}/></Box>
                <Box className='profile-page-name-email'>
                    <Typography fontWeight={900} fontSize={50}>{user_name}</Typography>
                    <Typography fontWeight={100} fontSize={30}>{email}</Typography>
                </Box>
                <Box component={Link} to="/create-shipping-profile" className='profile-page-edit'>
                    <ManageAccountsIcon sx={{fontSize:45}}/> 
                </Box>
            </Box>
            <Box sx={{py:10}} 
            style={{paddingLeft:'10rem', display:'flex', flexDirection:'column',
             justifyContent:'flex-start', alignItems:'flex-start'}}>
                <Box sx={{my:2}} style={{display:'flex'}}>
                    <PhoneIphoneIcon sx={{pr:2, fontSize:50}}/>
                    <Typography fontWeight={100} fontSize={30}>{userInfo.phone_number}</Typography>
                </Box>
                <Box sx={{my:2}} style={{display:'flex'}}>
                    <LocationOnIcon sx={{pr:2, fontSize:50}}/>
                    <Typography fontWeight={100} fontSize={30}>{userInfo.location}</Typography>
                </Box>
                <Box sx={{my:2}} style={{display:'flex'}}>
                    <LocalShippingIcon sx={{pr:2, fontSize:50}}/>
                    <Typography fontWeight={100} fontSize={30}>{userInfo.vehicle_load}</Typography>
                </Box>
            </Box>
        </div>
    );
}

export default ProfileShipping;