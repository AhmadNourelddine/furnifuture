import React from 'react';
import { Card, Avatar, Typography, Divider, Button } from '@mui/material';
import { Box } from '@mui/system';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import '../../css/shippingProfile-delivery/shippingProfile-delivery.css';

const ShippingProfileCard = ()=>{

     return(   <Card className='shipping-profile-delivery-card' sx={{mx:5, my:3}}>
                <Box sx={{mx:2, my:3}} className='avatar-and-name'>
                <Avatar variant='square'>PP</Avatar>
                <Typography variant='h1' fontSize='large' sx={{mx:2}}>User Name</Typography>
                </Box>
                <Divider light/>

                <Box sx={{mx:2, my:3}}>

                <Box sx={{my:2}} className='shippingprofile-info-row'>
                <Avatar><LocalPhoneIcon/></Avatar>
                <Typography sx={{mx:2}}>Phone Number</Typography>
                </Box>
                <Box sx={{my:2}} className='shippingprofile-info-row'>
                <Avatar><LocationOnIcon/></Avatar>
                <Typography sx={{mx:2}}>Location</Typography>
                </Box>
                <Box sx={{my:2}} className='shippingprofile-info-row'>
                <Avatar><LocalShippingIcon/></Avatar>
                <Typography sx={{mx:2}}>Vehicle Load</Typography>
                </Box>

                </Box>

                <Box sx={{mx:2, my:3}} className='shippingprofile-delivery-save'>
                    <Button style={{backgroundColor:'#D86544'}}>Save</Button>
                </Box>
        </Card>
     );
}

export default ShippingProfileCard;