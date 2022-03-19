import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import '../../css/createDelivery-profile/createDelivery-profile.css';

const CreateShippingProfile = ()=>{

    return(
            <Box style={{backgroundColor:'#ECDCCF'}}>

            <Container className='createdelivery-profile-page'>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>First Name</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>

                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Last Name</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Email</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Password</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Location</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Phone Number</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>
                <Box className='createdelivery-input'>
                    <Typography variant='h4' sx={{my:2}}>Vehicle Load Capacity</Typography>
                    <Box className='createdelivery-input-section'>
                        <TextField className='createdelivery-input-textfield'></TextField>
                    </Box>
                </Box>

                <Box className='deliveryprofile-cancel-create-btns'>
                    <Button style={{color:'white ', backgroundColor:'#D86544'}}>Cancel</Button>
                    <Button sx={{mx:2}} style={{color:'white ', backgroundColor:'#5094AA'}}>Create</Button>
                </Box>

            </Container>

            </Box>
    );

}

export default CreateShippingProfile;