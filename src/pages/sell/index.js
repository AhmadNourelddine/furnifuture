import React, { useEffect, useLayoutEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Autocomplete, Button, CardMedia, Divider, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import '../../css/sell/sell.css';
import img from '../../assets/missing-image.jpg';
import { useSelector } from 'react-redux';
import MuiPhoneNumber from 'material-ui-phone-number';



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
    const [currency, setCurrency]= useState('LBP');
    const [imageEncoded, setImageEncoded]= useState('');
    const [imagePreview, setImagePreview]= useState(null);

    let token = window.localStorage.getItem('authToken');

    const locations = ["Beirut", "Tripoli", "Sidon", "Tyre",
    "Jounieh", "Byblos", "Aley", "Nabatieh",
    "Baalbeck", "Zahle", "Zhgarta-Ehden", "Batroun"];

    const categories = ['Living Room', 'Dining Room ', 'Bedroom', 'Bathroom',
     'kitchen', 'Garden & Outdoor', 'Home Decoration & Acceessories'];

    const currencies =['$', 'LBP'];

    let navigate = useNavigate();

    let productToUpdate = useSelector(state=>state.editProductReducer);
    console.log(productToUpdate);

    const handleImage = (e)=>{
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file));
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (){
            setImageEncoded(fileReader.result);
            console.log(imageEncoded);
        }
        fileReader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const sellProduct = async()=>{

        let item ={
            "product_id": product_id,
            "title": title,
            "description": description,
            "price": price+' '+currency,
            "location": location,
            "phone_number": phoneNb,
            "category": category,
            "image": imageEncoded,
        };

       if(!update){
        await axios.post('http://127.0.0.1:8000/api/user/product/sell',item,{
            headers: {"Authorization" : `Bearer ${token}`} 
        })
        .then((resp)=>{console.log(resp); navigate('/profile')})
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
        if(productToUpdate){
        setUpdate(true);
        setProduct_id(productToUpdate.product_id);
        setTitle(productToUpdate.title);
        setPrice(productToUpdate.price);
        setCategory(productToUpdate.category);
        setLocation(productToUpdate.location);
        setPhoneNb(productToUpdate.phone_number);
        setDescription(productToUpdate.description);
        } },[]);

    return(
        <div className='sell-page'>
            <Typography className='sell-page-title'>
                {update? 'Edit Your Furniture': 'Sell Furniture'}
            </Typography>
            
            <div className='sell-page-form'>
                <div className='sell-page-inputs-and-image'>
                    <div className='sell-page-form-col1'>
                        <div className='sellpage-input-row'>
                            <Typography>Title</Typography>
                            <TextField value={title}
                             onChange={(e)=>{setTitle(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield"
                             variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Price</Typography>
                            <div style={{display:'flex', width:'14rem'}}>
                            <TextField value={price}
                                onChange={(e)=>{setPrice(e.target.value)}} 
                                className="outlined-basic sell-page-input-textfield"
                                variant="outlined" margin="dense"/>
                            <Autocomplete
                                className='sell-page-currency-textfield'
                                disablePortal
                                options={currencies}
                                value={currency}
                                renderInput={(params) => 
                                <TextField className="sell-page-currency-autocomplete"
                                margin="dense" variant="outlined"
                                    {...params} 
                                     />}
                                onChange = {(event, value)=>{value && setCurrency(value)}}
                                />
                            </div>
                        </div>
                        <div className='sellpage-input-row'>
                            <Typography>Category</Typography>
                            <Autocomplete
                                disablePortal
                                options={categories}
                                value={category}
                                renderInput={(params) => 
                                <TextField className='sell-page-input-textfield'
                                margin="dense" variant="outlined"
                                    {...params} 
                                     />}
                                onChange = {(event, value)=>{value && setCategory(value)}}
                                />
                            </div>
                        <div className='sellpage-input-row'>
                            <Typography>Location</Typography>
                            <Autocomplete
                                disablePortal
                                options={locations}
                                value={location}
                                renderInput={(params) => 
                                <TextField className='sell-page-input-textfield'
                                margin="dense" variant="outlined" 
                                    {...params} 
                                     />}
                                onChange = {(event, value)=>{value && setLocation(value)}}
                                />
                            </div>
                        <div className='sellpage-input-row'>
                            <Typography>Phone Number</Typography>
                            <MuiPhoneNumber variant="outlined" className="outlined-basic sell-page-input-textfield" 
                            value={phoneNb} defaultCountry={'lb'} 
                            onChange={(e)=>{console.log(e);setPhoneNb(e)}}/>
                            {/* <TextField value={phoneNb} 
                             onChange={(e)=>{setPhoneNb(e.target.value)}}
                             className="outlined-basic sell-page-input-textfield" 
                             variant="outlined" margin="dense"/> */}
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Description</Typography>
                        <TextField defaultValue={description} 
                         onChange={(e)=>{setDescription(e.target.value)}}
                         multiline={true} rows={5} 
                         className="outlined-basic sell-page-input-textfield" 
                         variant="outlined" margin="dense" />
                        </div>
                    </div>

                    <div className='sell-page-form-col2'>

                        <div className='sell-page-image-upload-btn'>

                        <div className='sellpage-image'>
                        <CardMedia style={{borderRadius:'10px'}}
                        component="img"
                        height='100%'
                        image={imagePreview? imagePreview : productToUpdate.image || img}
                        alt="furniture"
                        /></div>
                        <Divider sx={{my:3}} light/>
                        <div className='sellpage-upload-image-section'>
                                                        
                            <Button for='sell-upload-btn'>
                            <label for='sell-upload-btn'>
                            <CameraAltIcon color="error"/>
                            </label>
                            </Button>
                            
                            <input style={{opacity:'0', width:'0px'}} 
                            id='sell-upload-btn' type='file' accept=".jpeg, .png, .jpg"
                            onChange={(e)=>handleImage(e)} />
                            <Typography>Upload Image</Typography>

                        </div>
                        </div>

                        <div className='sell-page-create-btn'>

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