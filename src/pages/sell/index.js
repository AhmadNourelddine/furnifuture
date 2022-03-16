import React, { useState } from 'react';
import { Button, CardMedia, Divider, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import '../../css/sell/sell.css';
import img from '../../assets/furniFuture-logo.png';

const Sell = ()=>{

    const [search, setSearch]= useState('');

    return(
        <div className='sell-page'>
            <Typography className='sell-page-title'>Sell Furniture</Typography>
            
            <div className='sell-page-form'>
                <div className='sell-page-inputs-and-image'>
                    <div className='sell-page-form-col1'>
                        <div className='sellpage-input-row'>
                            <Typography>Product Name</Typography>
                            <TextField className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Product Name</Typography>
                        <TextField className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                        </div>
                        <div className='sellpage-input-row'>
                            <Typography>Product Name</Typography>
                            <TextField className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense"/>
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Description</Typography>
                        <TextField multiline={true} rows={5} className="outlined-basic sell-page-input-textfield" variant="outlined" margin="dense" />
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
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Sell;