import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import '../../css/sell/sell.css';

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
                            <TextField className='sellpage-input-row-textinput'></TextField>
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Product Name</Typography>
                        <TextField className='sellpage-input-row-textinput'></TextField>
                        </div>
                        <div className='sellpage-input-row'>
                            <Typography>Product Name</Typography>
                            <TextField className='sellpage-input-row-textinput'></TextField>
                            </div>
                        <div className='sellpage-input-row'>
                        <Typography>Description</Typography>
                        <TextField multiline={true} rows={5} className='sellpage-input-row-textinput'></TextField>
                        </div>
                    </div>
                    <div className='sell-page-form-col2'>
                        <div className='sellpage-image'></div>
                        <div className='sellpage-upload-image-section'>
                            <Button></Button>
                            <Typography>Upload Image</Typography>
                            </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Sell;