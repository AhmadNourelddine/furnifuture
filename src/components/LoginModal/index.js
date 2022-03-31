import { Box, Button, Card, CardContent, CardMedia, Divider, InputLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closeLogInModal, openSignUpModal } from '../../redux/actions/modal';
import { loggedIn } from '../../redux/actions/logIn';
import "../../css/login/login.css";

import { Link, useNavigate } from 'react-router-dom';

import '../../css/loginModal/loginModal.css';

import ToastSuccess from '../toast/toast-success';
import isShipping from '../../redux/actions/loggedInShipping';

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

const LoginModal = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(true);
  const [data, setData]= useState([]);

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [error, setError]= useState(false);
  const [redirect, setRedirect]= useState(false);

  let token = window.localStorage.getItem('authToken');


  function closeTheModal() {
    dispatch(closeLogInModal());
    setIsOpen(false);
  }

  useEffect(() => {

    if(redirect)
    {
      navigate('/about');
    }
  },[redirect]);

  const logIn = async(event)=>{

    event.preventDefault();
    console.log(email+password)

    let object={
      "email" : email,
      "password": password
    }

    await axios.post("http://127.0.0.1:8000/api/auth/login",object)
          .then((response)=>{return response.data;})
          .then((result)=>{
            let token = result['access_token'];
            window.localStorage.setItem('authToken', token);
            window.localStorage.setItem('user_name', result.user['name']);
            window.localStorage.setItem('user_email', result.user['email']);
            console.log(result);
            dispatch(loggedIn(result.user));
            if(result.user.is_shipping){
              dispatch(isShipping());}
            ToastSuccess('Signed In Successfully');
            closeTheModal();
            setRedirect(true);
          })
          .catch((err)=>{
            setError(true);
            console.log(err.message);})
  }


  return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeTheModal}
        style={customStyles}
        contentLabel="Furniture Modal"
      >
              <Box component="form" onSubmit={logIn}
    style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Box className='login-form-modal' id="signin-box-modal">
    <Typography id="sign-in">Sign In To Your Account</Typography>

    <TextField autoComplete="email" required 
    className="outlined-basic" label="Email" variant="outlined" margin="normal" type="email" 
    onChange = {e=>setEmail(e.target.value)}/>

    <TextField autoComplete="current-password" required 
    className="outlined-basic" label="Password" variant="outlined" margin="normal" type="password" 
    onChange = {e=>setPassword(e.target.value)} />
    <InputLabel>{error && 'Email or/and Password are Wrong'}</InputLabel>
    <Button type="submit"
     variant="contained" fullWidth id="signin-btn"> 
      Log In
    </Button>

    <Typography className='sign-in-page-sign-up-link'>
      Do not have an Account? 
      <Button onClick={()=>{closeTheModal(); dispatch(openSignUpModal());}}
      // component={Link} to="/signup"
      >
        <p style={{borderBottom:'solid 0.5px'}}>Sign Up</p>
      </Button> 
    </Typography>

    </Box>
  

    </Box>
     
      </Modal>
  );
}

export default LoginModal;