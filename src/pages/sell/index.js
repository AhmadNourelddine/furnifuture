import React, { useEffect, useLayoutEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Button, CardMedia, Divider, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import '../../css/sell/sell.css';
import img from '../../assets/furniFuture-logo.png';

const Sell = ()=>{

    const [update, setUpdate]= useState(false);
    const [productUpdate, setProductUpdate]= useState({});

    const [title, setTitle]= useState('');
    const [description, setDescription]= useState('');
    const [price, setPrice]= useState('');
    const [location, setLocation]= useState('');
    const [category, setCategory]= useState('');
    const [phoneNb, setPhoneNb]= useState('');
    const [product_id, setProduct_id]= useState('');

    let token = window.localStorage.getItem('authToken');

    let navigate = useNavigate();

    let item ={
        "product_id": product_id,
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
        .then((resp)=>{console.log(resp); navigate('/profile');})
        .catch((err)=>{console.log(err)})
       }
    }

    useEffect(()=>{
        if(window.localStorage.getItem('product')){
                        let passedData = window.localStorage.getItem('product');
                        setProductUpdate(JSON.parse(passedData));
                        setProduct_id(JSON.parse(passedData).product_id);
                        setTitle(JSON.parse(passedData).title);
                        setPrice(JSON.parse(passedData).price);
                        setCategory(JSON.parse(passedData).category);
                        setLocation(JSON.parse(passedData).location);
                        setPhoneNb(JSON.parse(passedData).phone_number);
                        setDescription(JSON.parse(passedData).description);
                        console.log(productUpdate);
                        window.localStorage.removeItem('product');
                        setUpdate(true);
                    }},[]);

    return(
        <div className='sell-page'>
           
            <Typography className='sell-page-title'>Sell Furniture</Typography>
            
            <div className='sell-page-form'>
                <div className='sell-page-inputs-and-image'>
                    <div className='sell-page-form-col1'>
                        <div className='sellpage-input-row'>
                            <Typography>Title</Typography>
                            <TextField value={title}
                             onChange={(e)=>{setTitle(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Price</Typography>
                        <TextField value={price}
                         onChange={(e)=>{setPrice(e.target.value)}} 
                         className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                        </div>
                        <div className='sellpage-input-row'>
                            <Typography>Category</Typography>
                            <TextField value={category}
                             onChange={(e)=>{setCategory(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                            <Typography>Location</Typography>
                            <TextField value={location}
                             onChange={(e)=>{setLocation(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                            <Typography>Phone Number</Typography>
                            <TextField value={phoneNb} 
                             onChange={(e)=>{setPhoneNb(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Description</Typography>
                        <TextField defaultValue={description} 
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