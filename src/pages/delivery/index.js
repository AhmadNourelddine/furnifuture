import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import { Autocomplete, Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/delivery/delivery.css';
import ShippingProfileCard from '../../components/shippingProfileCard/shippingCardProfile';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Delivery = ()=>{

    const[searching, setSearching]= useState(false);

    const [search, setSearch]= useState('');
    const [location, setLocation]= useState('');
    const [vehicle_load, setVehicle_load]= useState('');

    const [data, setData]= useState([]);
    const [result, setResult]= useState([]);

    const loggedIn = useSelector(state=>state.authReducer);
    const user = useSelector(state=>state.authUserReducer);
    // const saved_shipping = user.saved_shipping;
    const saved_shipping = useSelector(state=>state.cartShippingReducer);

    let object = {
        "search":search,
        "location": location,
        "vehicle_load": vehicle_load
    };

    const checkShippingSaved= (p_id)=>{
        let chck = false;
        if(loggedIn)
        {
            Object.keys(saved_shipping).forEach((key)=>{
                if(saved_shipping[key] === p_id)
                {chck = true;}
            });
        }
        console.log(chck);
        return chck;
    }

    let locations = ["Beirut", "Tripoli", "Sidon", "Tyre",
                     "Jounieh", "Byblos", "Aley", "Nabatieh",
                     "Baalbeck", "Zahle", "Zhgarta-Ehden", "Batroun"];
                     
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

            <div className='delivery-furniture-search'>
                <SearchBar 
                 className='delivery-search-bar'
                 onChange={(newValue) => setSearch(newValue)}
                //  onRequestSearch={() => doSomethingWith(this.state.value)}
                 />
                 <Autocomplete className='delivery-search-category'
                    disablePortal
                    options={locations}
                    sx={{ width: 300, mr:2 }}
                    renderInput={(params) => <TextField className='delivery-dropMenu-textfield'
                         {...params} 
                         label="Location" />}
                    onChange = {(event, value)=>{value && setLocation(value)}}
                    />
                     <Autocomplete className='delivery-search-category'
                    disablePortal
                    options={Vehicle_loads}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField className='delivery-dropMenu-textfield'
                         {...params} 
                         label="Vehicle Load" />}
                    onChange = {(event, value)=>{value && setVehicle_load(value)}}
                    />
                <Button onClick = {searchShipping} className='delivery-search-btn'>
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
                btn = {loggedIn && checkShippingSaved(data[key]._id)? 'saved' : 'save'}
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
                btn = {checkShippingSaved(data[key]._id)? 'saved' : 'save'}
                />)
            }
            </div>
            
        </div>
    );
}

export default Delivery;