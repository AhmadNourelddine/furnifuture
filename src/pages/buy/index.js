import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import { Autocomplete, Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/buy/buy.css';
import FurnitureItem from '../../components/furnitureItem';
import FurnitureModal from '../../components/furnitureItem-Modal';



const Buy = ()=>{ 

    const[searching, setSearching]= useState(false);
    const[modal, setModal]= useState(false);

    const [search, setSearch]= useState('');
    const [categ, setCateg]= useState('');

    const [data, setData]= useState([]);
    const [result, setResult]= useState([]);

    let token = window.localStorage.getItem('authToken');
  
    const category = [
        { label: 'Living Room', id: 1 },
        { label: 'Dining Room ', id: 2 },
        { label: 'Bedroom', id: 3 },
        { label: 'Kids', id: 4 }
        ];
    
    let object = {
        "search": search,
        "category": categ
    };
    
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
                    console.log(response);
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
                    options={category}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField
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
                <FurnitureItem 
                key = {item._id}
                id = {item._id}
                title = {item.title} 
                description = {item.description}
                location = {item.location}
                price = {item.price}
                date={item.created_at}
                btn='save'
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
                 price = {item.price}
                 date={item.created_at}
                 btn='save'
                 />) 
            }
            </div>
        </div>
    );
}

export default Buy;