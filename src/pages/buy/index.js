import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import { Autocomplete, Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/buy/buy.css';
import FurnitureItem from '../../components/furnitureItem';
import FurnitureModal from '../../components/furnitureItem-Modal';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@material-ui/icons';



const Buy = ()=>{ 

    const[searching, setSearching]= useState(false);
    const[modal, setModal]= useState(false);

    const [search, setSearch]= useState('');
    const [categ, setCateg]= useState('');

    const [data, setData]= useState([]);
    const [result, setResult]= useState([]);

    let token = window.localStorage.getItem('authToken');

    const loggedIn = useSelector(state=>state.authReducer);

    const user = useSelector(state=>state.authUserReducer);

    const saved_products = useSelector(state=>state.cartProductReducer);

  
    const category = ['Living Room', 'Dining Room ', 'Bedroom', 'Bathroom',
     'kitchen', 'Garden & Outdoor', 'Home Decoration & Acceessories'];
    
    let object = {
        "search": search,
        "category": categ
    };
    
    const checkProductSaved= (p_id)=>{
            let chck = false;
            if(loggedIn)
            {
                Object.keys(saved_products).forEach((key)=>{
                    if(saved_products[key] === p_id)
                    {chck = true;}
                });
            }
            console.log(chck);
            return chck;
    }

    console.log(checkProductSaved("623629dded37000059004254"))

    const getRandomProducts = async()=>{

        await axios.get('http://127.0.0.1:8000/api/random-products')
            .then((response)=>{
                    setData(response.data[0]);
                    console.log(response);
                })
            .catch(e=>{console.log(e)})
    }

    const searchFurniture = async()=>{

        await axios.post('http://127.0.0.1:8000/api/search-products', object)
            .then((response)=>{
                    setResult(response.data[0]);
                    setSearching(true);
                    // console.log(response);
                })
            .catch(e=>{console.log(e)})
    }
    
    useEffect(() => {
            getRandomProducts();
    },[]);

    return(

        <div className='buy-page'>
            <Typography style={{paddingLeft:'2rem'}} 
            className='buy-page-title'>Find Furniture</Typography>
            <div className='buy-furniture-search'>
                <SearchBar 
                 className='buy-search-bar'
                 onChange={(newValue) => setSearch(newValue)}
                //  onRequestSearch={() => doSomethingWith(this.state.value)}
                 />
                 <Autocomplete className='buy-search-category'
                    disablePortal
                    options={category}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField variant="standard"
                        className="buy-page-search-category-textfield"
                         {...params} 
                         label="Category" />}
                    onChange = {(event, value)=>{value && setCateg(value.label)}}
                    />
                <Button onClick={searchFurniture} className='buy-search-btn'>
                    Search
                </Button>
            </div>
            <div className='buy-page-items'>
           
            {!searching &&           
                data.map((item)=>
                <FurnitureItem  style={{flexGrow:'1'}}
                key = {item._id}
                id = {item._id}
                title = {item.title} 
                description = {item.description}
                location = {item.location}
                phone_number = {item.phone_number}
                category ={item.category}
                price = {item.price}
                date={item.created_at}
                btn={checkProductSaved(item._id)? 'saved' : 'save'}
                img_base64_decoded = {item.image}
                />) 
            }
            {searching && 
                 result.map((item)=>
                 <FurnitureItem 
                 key = {item._id}
                 id = {item._id}
                 title = {item.title} 
                 description = {item.description}
                 location = {item.location}
                 phone_number = {item.phone_number}
                 category ={item.category}
                 price = {item.price}
                 date={item.created_at}
                 btn={checkProductSaved(item._id) ? 'saved' : 'save'}
                 img_base64_decoded = {item.image}
                 />)
            }   
            </div>
        </div>
    );
}

export default Buy;