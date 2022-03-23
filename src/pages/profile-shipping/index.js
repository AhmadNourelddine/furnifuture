import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/profile/profile.css';
import '../../css/profile-shipping/profile-shipping.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from 'react-router-dom';



const ProfileShipping = ()=>{ 

    const [data, setData]= useState([]);

    let token = window.localStorage.getItem('authToken');
    let user_name = window.localStorage.getItem('user_name');
    let email = window.localStorage.getItem('user_email');
    

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
                <Box style={{display:'flex'}}>
                    <AccountCircleIcon sx={{fontSize:50}}/>
                    <Typography fontWeight={100} fontSize={30}>phone number</Typography>
                </Box>
                <Box style={{display:'flex'}}>
                    <AccountCircleIcon sx={{fontSize:50}}/>
                    <Typography fontWeight={100} fontSize={30}>location</Typography>
                </Box>
                <Box style={{display:'flex'}}>
                    <AccountCircleIcon sx={{fontSize:50}}/>
                    <Typography fontWeight={100} fontSize={30}>vehicle load</Typography>
                </Box>
            </Box>
        </div>
    );
}

export default ProfileShipping;