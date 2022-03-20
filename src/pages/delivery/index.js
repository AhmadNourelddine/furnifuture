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

    const[searching, setSearching]= useState(false);

    const [search, setSearch]= useState('');
    const [location, setLocation]= useState('');
    const [vehicle_load, setVehicle_load]= useState('');

    const [data, setData]= useState([]);
    const [result, setResult]= useState([]);

    let object = {
        "search":search,
        "location": location,
        "vehicle_load": vehicle_load
    };

    let locations = ["Beirut", "Saida", "Nabateye", "Zahle"];
    let Vehicle_loads = ["500", "1000", "1500", "2000"];

    const getRandomShippings = async()=>{

        await axios.get('http://127.0.0.1:8000/api/random-shippings')
        .then((response)=>{
                setData(response.data)
                console.log(response)
            })
        .catch(e=>{console.log(e)})

    }
    const searchShipping = async()=>{

        await axios.post('http://127.0.0.1:8000/api/search-shipping', object)
            .then((response)=>{
                    setResult(response.data[0]);
                    setSearching(true);
                    console.log(response);
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
                    options={locations}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField
                         {...params} 
                         label="Location" />}
                    onChange = {(event, value)=>{value && setLocation(value)}}
                    />
                     <Autocomplete className='buy-search-category'
                    disablePortal
                    options={Vehicle_loads}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField
                         {...params} 
                         label="Vehicle Load" />}
                    onChange = {(event, value)=>{value && setVehicle_load(value)}}
                    />
                <Button onClick = {searchShipping} className='buy-search-btn'>
                    Search
                </Button>
            </div>
            <div className='delivery-page-items'>
            {!searching &&  
                Object.keys(data).map((key)=>
                <ShippingProfileCard 
                key = {data[key]._id}
                id = {data[key]._id}
                name = {data[key].name} 
                phone_number = {data[key].phone_number}
                location = {data[key].location}
                vehicle_load = {data[key].vehicle_load}
                btn = 'save'
                />)
            }
             {/* {searching && 
                 result.map((item)=>
                 <ShippingProfileCard 
                 key = {item._id}
                 id = {item._id}
                 name = {item.name} 
                 location = {item.location}
                 vehicle_load = {item.vehicle_load}
                 phone_number={item.phone_number}
                 btn='save'
                 />) 
            } */}
            {searching &&  
                Object.keys(result).map((key)=>
                <ShippingProfileCard 
                key = {data[key]._id}
                id = {data[key]._id}
                name = {data[key].name} 
                phone_number = {data[key].phone_number}
                location = {data[key].location}
                vehicle_load = {data[key].vehicle_load}
                btn = 'save'
                />)
            }
            </div>
            
        </div>
    );
}

export default Delivery;