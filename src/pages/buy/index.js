import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import { Autocomplete, Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/buy/buy.css';
import FurnitureItem from '../../components/furnitureItem';



const Buy = ()=>{ 

    const [search, setSearch]= useState('');
    const [data, setData]= useState([]);

    const getRandomProducts = async()=>{

        await axios.get('http://127.0.0.1:8000/api/random-products')
            .then((response)=>{
                    setData(response.data[0])
                    console.log(response)
                })
            .catch(e=>{console.log(e)})
    }

    useEffect(() => {
            getRandomProducts();
    },[]);

    return(

        <div className='buy-page'>
            <Typography className='buy-page-title'>Find Furniture</Typography>
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
                        className="buy-page-search-category-textfield"
                         {...params} 
                         label="Category" />}
                    />
                <Button className='buy-search-btn'>
                    Search
                </Button>
            </div>
            <div className='buy-page-items'>
            {            
                data.map((item)=>
                <FurnitureItem 
                key = {item._id}
                id = {item._id}
                title = {item.title} 
                description = {item.description}
                location = {item.location}
                price = {item.price}
                date={item.created_at}
                btn='save'
                />
                ) 
            }
            </div>
            
        </div>
    );
}

export default Buy;