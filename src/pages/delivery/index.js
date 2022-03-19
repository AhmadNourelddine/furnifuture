import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import { Autocomplete, Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/delivery/delivery.css';
import FurnitureItem from '../../components/furnitureItem';
import ShippingProfileCard from '../../components/shippingProfileCard/shippingCardProfile';
import { Link } from 'react-router-dom';

const Delivery = ()=>{

    const [search, setSearch]= useState('');
    const [data, setData]= useState([]);


    const getRandomShippings = async()=>{

        await axios.get('http://127.0.0.1:8000/api/random-shippings')
        .then((response)=>{
                setData(response.data)
                console.log(response)
            })
        .catch(e=>{console.log(e)})

    }

    useEffect(() => {

            getRandomShippings();

            },[]);

    return(
        <div className='buy-page'>
            <div className='deliverypage-title-section'>

                <Typography className='buy-page-title'>
                    Create Your Delivery Profile
                    </Typography>

                <Button component={Link} to="/create-shipping-profile" 
                        style={{padding:'0.5rem 2rem'}} size='large' 
                        className='deliverypage-create-deliveryprofile-btn' 
                        sx={{mx:2}}>Create</Button>
                </div>

            <div className='buy-furniture-search'>
                <SearchBar 
                 className='buy-search-bar'
                 onChange={(newValue) => setSearch(newValue)}
                //  onRequestSearch={() => doSomethingWith(this.state.value)}
                 />
                 <Autocomplete className='buy-search-category'
                    disablePortal
                    // id="combo-box-demo"
                    // options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField
                         {...params} 
                         label="Location" />}
                    />
                     <Autocomplete className='buy-search-category'
                    disablePortal
                    // id="combo-box-demo"
                    // options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField
                         {...params} 
                         label="Vehicle Load" />}
                    />
                <Button className='buy-search-btn'>
                    Search
                </Button>
            </div>
            <div className='delivery-page-items'>
            {   
                Object.keys(data).map((key)=>
                <ShippingProfileCard 
                name = {data[key].name} 
                phone_number = {data[key].phone_number}
                location = {data[key].location}
                vehicle_load = {data[key].vehicle_load}
                />
                )

            }
            </div>
            
        </div>
    );
}

export default Delivery;