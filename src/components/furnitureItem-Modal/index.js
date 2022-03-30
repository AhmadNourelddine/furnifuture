import { Box, Button, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import img from '../../assets/missing-image.jpg';
import axios from 'axios';
import SuggestedShipping from '../suggestedShipping/suggestedShipping';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/actions/modal';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from 'react-router-dom';
import { addCartProduct } from '../../redux/actions/cart';
import '../../css/furnitureItem-modal/furnitureItem-modal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding:'0px',
    borderRadius:'35px',
  },
};

Modal.setAppElement('#root');

const FurnitureModal = (props) => {

  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(true);
  const [data, setData]= useState([]);

  let token = window.localStorage.getItem('authToken');

  const loggedIn = useSelector(state=>state.authReducer);


  function closeTheModal() {
    dispatch(closeModal());
    setIsOpen(false);
  }

  const suggestShippings = async()=>{

    await axios.get('http://127.0.0.1:8000/api/suggest-shipping')
    .then((response)=>{
            setData(response.data)
            console.log(response)
        })
    .catch(e=>{console.log(e)})

}

const clcikedButton = async()=>{

  if(!loggedIn){
    alert('please log in'); return;}

 if(props.btn === 'save'){
      let product_id = {"product_id":props.id};
      await axios.post('http://127.0.0.1:8000/api/user/cart/save-product',product_id,{
        headers: {"Authorization" : `Bearer ${token}`} 
    })
    .then((resp)=>{
      dispatch(addCartProduct(props.id));
      closeTheModal();
      console.log(resp);})
    .catch((err)=>{console.log(err)})
    }
}

useEffect(()=>{suggestShippings()},[]);

  return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeTheModal}
        style={customStyles}
        contentLabel="Furniture Modal"
      >
        <Card style={{width:'35rem', borderRadius:'35px', padding:'1rem'}}>
        <CardMedia style={{padding:"2rem 5rem", width:"auto", margin:"auto"}}
          component="img"
          height="200"
          image={props.img_base64_decoded? props.img_base64_decoded: img}
          alt="furniture"
        />
        <Box style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <Box sx={{px:2}}>
            <CardContent>
              <Box>
                <Box style={{display:'flex', alignItems:'baseline'}}>
                <Typography fontWeight={'900'} fontSize={25}>{props.title}</Typography>
                <Typography  
                sx={{pl:4}} fontWeight={'600'} fontSize={15}>
                  "{props.category}"
                </Typography>
                </Box>
                <Typography  sx={{
                                      display: '-webkit-box',
                                      overflow: 'hidden',
                                      WebkitBoxOrient: 'vertical',
                                      WebkitLineClamp: 4,
                                      fontWeight: 300,
                                      height: 100,
                                      pt:2,
                                  }}
                variant='subtitle2'>{props.description}</Typography>
              </Box>
              <Box>
              
                <Box sx={{display:'flex'}}>
                  
                <a target='_blank' rel="noopener noreferrer" 
                href={'https://wa.me/'+props.phone_number}>
                  <WhatsAppIcon/>
                </a>

                <Typography sx={{fontSize:15}}>
                  {props.phone_number}
                </Typography>
                </Box>
                <Box sx={{pb:5}} style={{display:'flex'}}>
                <Typography sx={{pr:5, fontSize:12, fontWeight:'light'}}>
                  Date: {props.date}
                </Typography>
                <Typography sx={{fontSize:12, fontWeight:'light'}}>
                 Location: {props.location}
                </Typography>
                </Box>

                
              </Box>
              <Box style={{width:'18rem', position:'absolute', bottom:'1.5rem'}}>
              <Box style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <Typography variant='h5' sx={{py:2}}>{props.price}</Typography>
                <Button disabled={props.btn==='saved' ? true: false} 
                onClick={clcikedButton} 
                className='sell-furniture-item-button'>{props.btn}</Button>
              </Box>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{m:1}} 
          style={{alignSelf:'flex-end', height:'15rem', borderRadius:'10px', color:'white', backgroundColor:'#304451'}}>
            <CardContent style={{paddingBottom:'0'}}>
              <Box>
                <Typography style={{whiteSpace:'nowrap'}} sx={{pb:1}}>
                  Suggested Delivery
                </Typography>
              </Box>
             { Object.keys(data).map((key)=> 
                <SuggestedShipping
                  name={data[key].name}
                  location={data[key].location}
                  phone_number={data[key].phone_number}
                />
              
              )}
            </CardContent>
          </Box>
        </Box>
        </Card>
      </Modal>
  );
}

export default FurnitureModal;