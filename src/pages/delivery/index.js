import React, { useState } from 'react';
import SearchBar from "material-ui-search-bar";
import { Autocomplete, Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/delivery/delivery.css';
import FurnitureItem from '../../components/furnitureItem';
import ShippingProfileCard from '../../components/shippingProfileCard/shippingCardProfile';

const Delivery = ()=>{

    const [search, setSearch]= useState('');

    return(
        <div className='buy-page'>
            <div className='deliverypage-title-section'>

                <Typography className='buy-page-title'>
                    Create Your Delivery Profile
                    </Typography>

                <Button style={{padding:'0.5rem 2rem'}} size='large' className='deliverypage-create-deliveryprofile-btn' sx={{mx:2}}>Create</Button>
                </div>

            <div className='buy-furniture-search'>
                <SearchBar 
                 className='buy-search-bar'
                 onChange={(newValue) => setSearch(newValue)}
                //  onRequestSearch={() => doSomethingWith(this.state.value)}
                 />
                 <Autocomplete className='buy-search-category'
                    disablePortal
                    id="combo-box-demo"
                    // options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField
                        //  {...params} 
                         label="Location" />}
                    />
                     <Autocomplete className='buy-search-category'
                    disablePortal
                    id="combo-box-demo"
                    // options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField
                        //  {...params} 
                         label="Vehicle Load" />}
                    />
                <Button className='buy-search-btn'>
                    Search
                </Button>
            </div>
            <div className='delivery-page-items'>
            <ShippingProfileCard/>
            <ShippingProfileCard/>
            <ShippingProfileCard/>
            <ShippingProfileCard/>
            <ShippingProfileCard/>
            </div>
            
        </div>
    );
}

export default Delivery;