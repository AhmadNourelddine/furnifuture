import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { closeContactUsModal, closeLogInModal } from '../../redux/actions/modal';
import "../../css/login/login.css";
import "../../css/contactUs/contactUs.css";
import "../../css/contact-us-modal/contact-us-modal.css";

import { useNavigate } from 'react-router-dom';

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

const ContactUsModal = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(true);

  const [email,setEmail]= useState('');       
  const [message,setMessage]= useState('');
  const [subject,setSubject]= useState('');
  const [redirect, setRedirect]= useState(false);

  let Navigate = useNavigate();

  function closeTheModal() {
    dispatch(closeContactUsModal());
    setIsOpen(false);
  }

  useEffect(() => {

    if(redirect)
    {
      navigate('/about');
    }
  },[redirect]);

 const send = async()=>{

    console.log(message)
    let object={
        "email": email,
        "message": message,
        "subject": subject
    }
    await axios.post("http://127.0.0.1:8000/api/contact-us",object)
          .then((response)=>{
            setRedirect(true);
            closeTheModal();
            console.log(response);
          })
          .catch((err)=>{
            console.log(err)
          })
  }

  const cancel = async()=>{
    closeTheModal();
    Navigate('/about')
  }  



  return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeTheModal}
        style={customStyles}
        contentLabel="Furniture Modal"
      >
        <Box style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

        <Box className='contact-us-form-modal' id="contact-us-box">
        <p id="contact-us">Feel Free To Contact Us</p>
        <TextField fullWidth
        className="outlined-basic" label="Email" variant="outlined" margin="dense"
        onChange = {e=>setEmail(e.target.value)}/> 
        <TextField fullWidth
        className="outlined-basic" label="Subject" variant="outlined" margin="dense"
        onChange = {e=>setSubject(e.target.value)}/>
        <TextField fullWidth 
        multiline={true} rows={5} label="Message" className="outlined-basic" variant="outlined" margin="dense"
        onChange = {e=>setMessage(e.target.value)}/>

        <Button onClick={send} variant="contained" id="contact-us-btn"  margin="dense" fullWidth>
            Send
        </Button>
        <Button onClick={cancel} variant="contained" id="contact-us-btn" fullWidth>
            Cancel
        </Button>

        </Box>

        </Box>

      </Modal>
  );
}

export default ContactUsModal;