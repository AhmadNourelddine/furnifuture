import * as React from 'react';
import {useState ,useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea } from '@mui/material';
import '../../css/furnitureItem-sell/furnitureItem-sell.css';
import img from '../../assets/furniFuture-logo.png';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import FurnitureModal from '../furnitureItem-Modal';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../../redux/actions/editProduct';
import { useSelect } from '@mui/base';

export default function FurnitureItem(props) {

  let navigate = useNavigate();

  let token = window.localStorage.getItem('authToken');

  const loggedIn = useSelector(state=>state.authReducer);

  const[modal, setModal]= useState(false);

  const[save, setSave]= useState(false);

  const[buy, setBuy]= useState(false);
  const[cart, setCart]= useState(false);
  const[profile, setProfile]= useState(false);

  const dispatch = useDispatch();

  useEffect(()=>{
                 if(props.btn === 'save'){setBuy(true)}
                 else if (props.btn === 'remove'){setCart(true)}
                 else if(props.btn === 'saved'){setBuy(true); setSave(true);}
                 else {setProfile(true)}
                },[]);

  let key = {"product_id": props.id,};

  const updateItem = ()=>{
    let item={
      "product_id":props.id,
      "title":props.title,
      "description":props.description,
      "location":props.location,
      "category":props.category,
      "phone_number":props.phone_number,
      "date":props.date,
      "price":props.price,
      "sell-btn": props.sell_btn,
    };

    dispatch(editProduct(item));
    // window.localStorage.setItem('product',JSON.stringify(item));
      navigate("/sell");
  }

  const clcikedButton = async()=>{
    if(!loggedIn){alert('please Sign In'); return;}
    if(props.btn === 'save'){
      await axios.post('http://127.0.0.1:8000/api/user/cart/save-product',key,{
        headers: {"Authorization" : `Bearer ${token}`} 
    })
    .then((resp)=>{
      setSave(true);
      console.log(resp);})
    .catch((err)=>{console.log(err)})
    }
    else if(props.btn === 'remove'){
      await axios.post('http://127.0.0.1:8000/api/user/cart/remove-product',key,{
        headers: {"Authorization" : `Bearer ${token}`} 
    })
    .then((resp)=>{
      // window.location.reload(false)
      console.log(resp);})
    .catch((err)=>{console.log(err)})
    }
  }
  return (
    <Box>
       {modal && <FurnitureModal
                  title={props.title}
                  description={props.description}
                  phone_number={props.phone_number}
                  date={props.date}
                  price={props.price}
                  />}
      <Card className="furniture-item-card" sx={{ maxWidth: 345 }} style={{margin:"1.5rem 1rem", padding:"3rem 1rem", borderRadius:"20px"}}>
      <CardActionArea onClick={()=>{setModal(true)}}  
       style={{display:"flex", flexDirection:"column"}}>

        {profile && 
        <Box style={{alignSelf:"flex-end"}}>
          <EditIcon onClick={updateItem}
           sx={{fontSize:30}}/>
          </Box>}

        <CardMedia style={{padding:"2rem 5rem"}}
          component="img"
          height="140"
          image={img}
          alt="furniture"
        />
        <div style={{padding:"1rem 2rem"}}>
          <Typography style={{fontWeight:"900"}} gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography className='content-box' variant="body2" color="text.secondary">
          {props.description}
          </Typography>

          <div className="sell-furniture-item-date-location">         
            
           <Typography className="sell-furniture-item-location content-box" variant="h6" component="div" color="text.secondary">
           {props.location}
          </Typography>

          <Typography className="sell-furniture-item-date content-box" variant="h6" component="div" color="text.secondary">
          {props.date}
          </Typography></div>

        </div>
      </CardActionArea>
      <div style={{padding: "0 2rem", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

      <Typography className="sell-furniture-item-price" variant="h5" color="text.secondary">
         {props.price}
          </Typography>
        <Button disabled={save}
          onClick={clcikedButton}
          className="sell-furniture-item-button" size="small" style={{padding:"auto"}}>
          {buy && (save? 'saved' : props.btn)}
          {cart && 'remove'}
          {profile && 'delete'}
        </Button>
      </div>
    </Card>
  </Box>
  );
}