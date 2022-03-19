import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/cart/cart.css';
import FurnitureItem from '../../components/furnitureItem';
import ShippingProfileCard from '../../components/shippingProfileCard/shippingCardProfile';

const Cart = ()=>{

    let token = window.localStorage.getItem('authToken');

    const[toggle, setToggle]= useState(true);

    const[savedProducts, setSavedProducts]= useState([]);
    const[savedShipping, setShipping]= useState([]);


    const getSavedProducts = async()=>{

        await axios.get('http://127.0.0.1:8000/api/user/cart/get-products',{
            headers: {"Authorization" : `Bearer ${token}`} 
        })
        .then((response)=>{
                setSavedProducts(response.data[0])
                console.log(response)
            })
        .catch(e=>{console.log(e)})

    }

    const getShipping = async()=>{

        await axios.get('http://127.0.0.1:8000/api/user/cart/get-shipping',{
            headers: {"Authorization" : `Bearer ${token}`} 
        })
        .then((response)=>{
                setShipping(response.data[0])
                console.log(response)
            })
        .catch(e=>{console.log(e)})

    }

      useEffect(() => {
        getSavedProducts();
        getShipping();
      },[]);

    return(
        <div className='cart-page'>

            <div className='cart-page-heading'>

            <Typography className='cart-page-title'>Your Cart</Typography>
            <div className='cart-page-navbar'>
                <Button className='cart-page-navbar-btn'
                style={toggle? {backgroundColor: '#6F1A07'} : {backgroundColor: '#B4A89E'}}
                onClick={()=>{setToggle(true)}}>Saved Furniture</Button>

                <Button className='cart-page-navbar-btn' 
                style={toggle? {backgroundColor: '#B4A89E'} : {backgroundColor: '#6F1A07'}}
                onClick={()=>{setToggle(false)}}>Shipping</Button>
                
            </div>

            </div>
            <div className='buy-page-items'>
            {toggle &&  savedProducts.map((item)=>
                <FurnitureItem 
                title = {item['title']} 
                description = {item.description}
                location = {item.location}
                price = {item.price}
                date={item.created_at}
                />
                ) }
            {!toggle &&  savedShipping.map((item)=>
                <ShippingProfileCard 
                name = {item.name} 
                phone_number = {item.phone_number}
                location = {item.location}
                vehicle_load = {item.vehicle_load}
                />
                ) }
            </div>
            
        </div>
    );
}

export default Cart;