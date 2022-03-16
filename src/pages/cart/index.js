import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/cart/cart.css';
import FurnitureItem from '../../components/furnitureItem';
import ShippingProfileCard from '../../components/shippingProfileCard/shippingCardProfile';

const Cart = ()=>{

    const[ClickShipping, setClickShipping]= useState(false);
    const[ClickSavedFurniture, setClickSavedFurniture]= useState(true);

    const[savedProducts, setSavedProducts]= useState([]);
    const[savedShipping, setShipping]= useState([]);


    const[savedFurnitureColor, setsavedFurnitureColor]= useState('#6F1A07'); 
    const[shippingColor, setshippingColor]= useState('#B4A89E');

    let object={user_id: '622fb36b71260000aa0049fc'};

    const getSavedProducts = async()=>{

        await fetch("http://127.0.0.1:8000/api/get-products",{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
            method: "POST",
        })
              .then((response)=> response.json())
              .then((result)=>{
                  setSavedProducts(result[0])
                  console.log('called me')
              })
              .catch(e=>{console.log(e)})
    }

    const getShipping = async()=>{

        await fetch("http://127.0.0.1:8000/api/get-shipping",{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
            method: "POST",
        })
              .then((response)=> response.json())
              .then((result)=>{
                  setShipping(result[0])
                  console.log('called me')
              })
              .catch(e=>{console.log(e)})
    }

    useEffect(() => {

        console.log(ClickShipping);
        console.log(ClickSavedFurniture);
        if(ClickShipping)
        {
            setshippingColor('#6F1A07');
            setsavedFurnitureColor('#B4A89E');
            setClickSavedFurniture(false);
        }
        if(ClickSavedFurniture){
            setshippingColor('#B4A89E');
            setsavedFurnitureColor('#6F1A07');
            setClickShipping(false);
        }

      },[ClickShipping, ClickSavedFurniture]);

      useEffect(() => {
        getSavedProducts();
        getShipping();
      },);

    return(
        <div className='cart-page'>

            <div className='cart-page-heading'>

            <Typography className='cart-page-title'>Your Cart</Typography>
            <div className='cart-page-navbar'>
                <Button className='cart-page-navbar-btn'
                style={{backgroundColor:savedFurnitureColor}}
                onClick={()=>{setClickSavedFurniture(true)}}>Saved Furniture</Button>

                <Button className='cart-page-navbar-btn' 
                style={{backgroundColor:shippingColor}}
                onClick={()=>{setClickShipping(true)}}>Shipping</Button>
            </div>

            </div>
            <div className='buy-page-items'>
            {ClickSavedFurniture &&  savedProducts.map((item)=>
                <FurnitureItem 
                title = {item['title']} 
                description = {item.description}
                location = {item.location}
                price = {item.price}
                date={item.created_at}
                />
                ) }
            {ClickShipping &&  savedShipping.map((item)=>
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