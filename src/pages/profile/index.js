import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import '../../css/profile/profile.css';
import FurnitureItem from '../../components/furnitureItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from 'react-router-dom';
import UpdateProfileModal from '../../components/updateAccountModal/updateAccountModal';
import { openUpdateProfileModal } from '../../redux/actions/modal';
import { useDispatch, useSelector } from 'react-redux';



const Profile = ()=>{ 

    const [data, setData]= useState([]);
    const dispatch = useDispatch();
    let token = window.localStorage.getItem('authToken');
    let user_name = window.localStorage.getItem('user_name');
    let email = window.localStorage.getItem('user_email');

    let openUpdateModal = useSelector(state=>state.modalUpdateProfileReducer);
    const user_products = useSelector(state=>state.userProductsReducer);

    const checkProductExists= (p_id)=>{
        let chck = false;
        Object.keys(user_products).forEach((key)=>{
                        if(user_products[key] === p_id)
                        {chck = true;}
                    });
        console.log(chck);
        return chck;
    }

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
            {openUpdateModal && <UpdateProfileModal/>}
            <Box className='profile-page-info'>
                <Box><AccountCircleIcon sx={{fontSize:150}}/></Box>
                <Box className='profile-page-name-email'>
                    <Typography fontWeight={900} fontSize={50}>{user_name}</Typography>
                    <Typography fontWeight={100} fontSize={30}>{email}</Typography>
                </Box>
                <Button onClick={()=>{dispatch(openUpdateProfileModal())}}
                // component={Link} to="/dashboard" 
                className='profile-page-edit'><ManageAccountsIcon sx={{fontSize:45}}/> </Button>
                </Box>
            <div className='profile-page-items'>
            {         
                data.map((item)=>
                checkProductExists(item._id) &&
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