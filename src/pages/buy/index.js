import React, { useState } from 'react';
import SearchBar from "material-ui-search-bar";
import { Autocomplete, Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/buy/buy.css';
import FurnitureItem from '../../components/furnitureItem';

const Buy = ()=>{

    const [search, setSearch]= useState('');

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
                    id="combo-box-demo"
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
            <FurnitureItem />
            <FurnitureItem />
            <FurnitureItem />
            <FurnitureItem />
            </div>
            
        </div>
    );
}

export default Buy;