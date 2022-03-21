import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { Button, CardMedia, Divider, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import '../../css/sell/sell.css';
import img from '../../assets/furniFuture-logo.png';

const Sell = ()=>{

    const [update, setUpdate]= useState(false);

    const [title, setTitle]= useState('');
    const [description, setDescription]= useState('');
    const [price, setPrice]= useState('');
    const [location, setLocation]= useState('');
    const [category, setCategory]= useState('');
    const [phoneNb, setPhoneNb]= useState('');

    let token = window.localStorage.getItem('authToken');
    let passedData = window.localStorage.getItem('product');

    let productUpdate = JSON.parse(passedData);

    console.log(productUpdate);

    let item ={
        "title": title,
        "description": description,
        "price": price,
        "location": location,
        "phone_number": phoneNb,
        "category": category,
    };

    const sellProduct = async()=>{

       if(!update){
        await axios.post('http://127.0.0.1:8000/api/user/product/sell',item,{
            headers: {"Authorization" : `Bearer ${token}`} 
        })
        .then((resp)=>{console.log(resp)})
        .catch((err)=>{console.log(err)})
       }
       else {
        await axios.post('http://127.0.0.1:8000/api/user/product/edit',item,{
            headers: {"Authorization" : `Bearer ${token}`} 
        })
        .then((resp)=>{console.log(resp)})
        .catch((err)=>{console.log(err)})
       }
    }

    useEffect(()=>{if(productUpdate){setUpdate(true)}},[]);

    return(
        <div className='sell-page'>
           
            <Typography className='sell-page-title'>Sell Furniture</Typography>
            
            <div className='sell-page-form'>
                <div className='sell-page-inputs-and-image'>
                    <div className='sell-page-form-col1'>
                        <div className='sellpage-input-row'>
                            <Typography>Title</Typography>
                            <TextField defaultValue={productUpdate && productUpdate.title}
                             onChange={(e)=>{setTitle(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Price</Typography>
                        <TextField defaultValue={productUpdate && productUpdate.price}
                         onChange={(e)=>{setPrice(e.target.value)}} 
                         className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                        </div>
                        <div className='sellpage-input-row'>
                            <Typography>Category</Typography>
                            <TextField defaultValue={productUpdate && productUpdate.category}
                             onChange={(e)=>{setCategory(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                            <Typography>Location</Typography>
                            <TextField defaultValue={productUpdate && productUpdate.location}
                             onChange={(e)=>{setLocation(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                            <Typography>Phone Number</Typography>
                            <TextField defaultValue={productUpdate && productUpdate.phone_number}
                             onChange={(e)=>{setPhoneNb(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Description</Typography>
                        <TextField defaultValue={productUpdate && productUpdate.description} 
                         onChange={(e)=>{setDescription(e.target.value)}}
                         multiline={true} rows={5} className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense" />
                        </div>
                    </div>
                    <div className='sell-page-form-col2'>
                        <div className='sellpage-image'>
                        <CardMedia
                        component="img"
                        height='100%'
                        image={img}
                        alt="furniture"
                        /></div>
                        <Divider sx={{my:3}} light/>
                        <div className='sellpage-upload-image-section'>
                            <Button><CameraAltIcon color="error"/></Button>
                            <Typography>Upload Image</Typography>
                            </div>
                        <div>
                        <Button onClick={sellProduct}
                         sx={{mx:2}} style={{color:'white ', backgroundColor:'#5094AA'}}>
                        {update? 'Update' : 'Create'}
                        </Button>
                        </div>
                    </div>
            
                </div>
            </div>
            
        </div>
    );
}

export default Sell;