import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/cart/cart.css';
import FurnitureItem from '../../components/furnitureItem';

const Cart = ()=>{

    const[ClickShipping, setClickShipping]= useState(false);
    const[ClickSavedFurniture, setClickSavedFurniture]= useState(true);

    const[savedFurnitureColor, setsavedFurnitureColor]= useState('#6F1A07'); 
    const[shippingColor, setshippingColor]= useState('#B4A89E');

    useEffect(() => {

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
            <FurnitureItem />
            <FurnitureItem />
            <FurnitureItem />
            <FurnitureItem />
            </div>
            
        </div>
    );
}

export default Cart;