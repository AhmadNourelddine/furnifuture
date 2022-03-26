import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import img from '../../assets/furniFuture-logo.png';
import axios from 'axios';
import SuggestedShipping from '../suggestedShipping/suggestedShipping';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/actions/modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const FurnitureModal = (props) => {

  let subtitle;

  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(true);
  const [data, setData]= useState([]);

  let token = window.localStorage.getItem('authToken');

  const loggedIn = useSelector(state=>state.authReducer);

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

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
      setIsOpen(false);
      console.log(resp);})
    .catch((err)=>{console.log(err)})
    }
}

useEffect(()=>{suggestShippings()},[]);

  return (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeTheModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Card style={{width:'35rem'}}>
        <CardMedia style={{padding:"2rem 5rem", width:"auto", margin:"auto"}}
          component="img"
          height="200"
          image={img}
          alt="furniture"
        />
        <Box style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <Box sx={{px:2}}>
            <CardContent>
              <Box>
                <Typography fontWeight={'900'} fontSize={25}>{props.title}</Typography>
                <Typography  sx={{
                                      display: '-webkit-box',
                                      overflow: 'hidden',
                                      WebkitBoxOrient: 'vertical',
                                      WebkitLineClamp: 4,
                                      fontWeight: 300,
                                      height: 100,
                                  }}
                variant='subtitle2'>{props.description}</Typography>
              </Box>
              <Box>
                <Typography sx={{fontSize:10}}>{props.phone_number}</Typography>
                <Typography sx={{fontSize:10, fontWeight:'light'}}>{props.date}</Typography>
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
          <Box sx={{m:1}} style={{height:'15rem', borderRadius:'10px', color:'white', backgroundColor:'#304451'}}>
            <CardContent style={{paddingBottom:'0'}}>
              <Box>
                <Typography sx={{pb:1}}>Suggested Delivery</Typography>
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