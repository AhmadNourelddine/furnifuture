import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Avatar, Typography, Divider, Button } from '@mui/material';
import { Box } from '@mui/system';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../css/shippingProfile-delivery/shippingProfile-delivery.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCartShipping, removeCartShipping } from '../../redux/actions/cart';
import { openLogInModal } from '../../redux/actions/modal';

const ShippingProfileCard = (props)=>{

  let token = window.localStorage.getItem('authToken');

  const[save, setSave]= useState(false);

  const[shipping, setShipping]= useState(false);
  const[cart, setCart]= useState(false);

  const isloggedIn = useSelector(state=>state.authReducer);

  const dispatch =  useDispatch();

  useEffect(()=>{
                 if (props.btn === 'remove'){setCart(true)}
                 else if (props.btn === 'saved'){setShipping(true); setSave(true);}
                 else{setShipping(true)}
                },[]);

  let key = {"shipping_id": props.id,};

  const clcikedButton = async()=>{
    if(!isloggedIn){dispatch(openLogInModal()); return;}
    if(props.btn === 'save'){
      await axios.post('http://127.0.0.1:8000/api/user/cart/save-shipping',key,{
        headers: {"Authorization" : `Bearer ${token}`} 
    })
    .then((resp)=>{
      setSave(true);
      dispatch(addCartShipping(props.id));
      console.log(resp);})
    .catch((err)=>{console.log(err)})
    }
    else if(props.btn === 'remove'){
      await axios.post('http://127.0.0.1:8000/api/user/cart/remove-shipping',key,{
        headers: {"Authorization" : `Bearer ${token}`} 
    })
    .then((resp)=>{
      dispatch(removeCartShipping(props.id));
      console.log(resp);}) 
    .catch((err)=>{console.log(err)})
    }
  }

     return(   <Card className='shipping-profile-delivery-card' sx={{mx:5, my:3}}>
                <Box sx={{mx:2, my:3}} className='avatar-and-name'>
                <Avatar sx={{mr:2, width: 76, height: 76 }} alt="PP" 
                src={props.image_encoded} />
                  {/* <AccountCircleIcon style={{fontSize:'60'}}/> */}
                <Typography variant='h1' fontSize='large' sx={{mx:2}}>{props.name}</Typography>
                </Box>
                <Divider light/>

                <Box sx={{mx:4, my:3}}>

                <Box sx={{my:2}} className='shippingprofile-info-row'>
                <LocalPhoneIcon/>
                <Typography sx={{mx:2}}>{props.phone_number}</Typography>
                </Box>
                <Box sx={{my:2}} className='shippingprofile-info-row'>
                <LocationOnIcon/>
                <Typography sx={{mx:2}}>{props.location}</Typography>
                </Box>
                <Box sx={{my:2}} className='shippingprofile-info-row'>
                <LocalShippingIcon/>
                <Typography sx={{mx:2}}>{props.vehicle_load}</Typography>
                </Box>

                </Box>

                <Box sx={{mx:2, my:3}} className='shippingprofile-delivery-save'>
                    <Button disabled={save}
                     onClick={clcikedButton}
                     style={{color: 'white', backgroundColor: '#D86544'}}>
                         {shipping && (save ? 'saved' : props.btn)}
                         {cart && 'remove'}
                    </Button>
                </Box>
        </Card>
     );
}

export default ShippingProfileCard;