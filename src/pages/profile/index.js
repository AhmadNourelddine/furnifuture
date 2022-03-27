import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import '../../css/profile/profile.css';
import FurnitureItem from '../../components/furnitureItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from 'react-router-dom';



const Profile = ()=>{ 

    const [data, setData]= useState([]);

    let token = window.localStorage.getItem('authToken');
    let user_name = window.localStorage.getItem('user_name');
    let email = window.localStorage.getItem('user_email');
    
    const getUserProducts = async()=>{

        await axios.get('http://127.0.0.1:8000/api/user/product/created',{
            headers: {"Authorization" : `Bearer ${token}`} 
        })
            .then((response)=>{
                    setData(response.data['user_products']);
                    console.log(response);
                })
            .catch(e=>{console.log(e)})
    }

    
    useEffect(() => {
            getUserProducts();
    },[]);

    return(

        <div className='profile-page'>
            <Box className='profile-page-info'>
                <Box><AccountCircleIcon sx={{fontSize:150}}/></Box>
                <Box className='profile-page-name-email'>
                    <Typography fontWeight={900} fontSize={50}>{user_name}</Typography>
                    <Typography fontWeight={100} fontSize={30}>{email}</Typography>
                </Box>
                <Box  component={Link} to="/dashboard" className='profile-page-edit'><ManageAccountsIcon sx={{fontSize:45}}/> </Box>
                </Box>
            <div className='profile-page-items'>
            {         
                data.map((item)=>
                <FurnitureItem 
                key = {item._id}
                id = {item._id}
                title = {item.title} 
                description = {item.description}
                location = {item.location}
                category = {item.category}
                phone_number = {item.phone_number}
                price = {item.price}
                date={item.created_at}
                btn='delete'
                sell_btn='update'
                img_base64_decoded = {item.image}
                />) 
            }
            </div>
            
        </div>
    );
}

export default Profile;