import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/cart/cart.css';
import FurnitureItem from '../../components/furnitureItem';

const Cart = ()=>{


    return(
        <div className='cart-page'>

            <div className='cart-page-heading'>

            <Typography className='cart-page-title'>Your Cart</Typography>
            <div className='cart-page-navbar'>
                <Button className='cart-page-navbar-btn'>Saved Furniture</Button>
                <Button className='cart-page-navbar-btn'>Shipping</Button>
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