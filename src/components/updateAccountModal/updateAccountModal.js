import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closeLogInModal, closeSignUpModal, closeUpdateProfileModal, openLogInModal } from '../../redux/actions/modal';
import "../../css/profile/profile.css";
import "../../css/profileModal/profileModal.css";
import ToastSuccess from '../toast/toast-success';

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

const UpdateProfileModal = (props) => {

  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(true);

  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [Cpassword,setCpassword]= useState('');

  function closeTheModal() {
    dispatch(closeUpdateProfileModal());
    setIsOpen(false);
  }

  let token = window.localStorage.getItem('authToken');

  const update = async()=>{

    console.log(email+password)
    let info={
      "name":name,
      "email" : email,
      "password": password,
      "password_confirmation": Cpassword
    }
    await axios.post("http://127.0.0.1:8000/api/user/update-profile", info, {
        headers: {
          'Authorization': 'Bearer '+token
        },
    })
          .then((response)=>{
            ToastSuccess('Updated Profile Successfully');
            console.log(response)})
          .catch((err)=>{
            console.log(err)
          })
  }

  useEffect(()=>{
    setName(window.localStorage.getItem('user_name'));
    setEmail(window.localStorage.getItem('user_email'));
  },[]);

  return (

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeTheModal}
        style={customStyles}
        contentLabel="Furniture Modal"
      >
        <Box style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

        <Box className='update-profile-form' id="update-profile-box-modal">
        <p id="update-profile">Update Account Info</p>
        <TextField value={name} className="outlined-basic" label="Name" variant="outlined" margin="dense"
        onChange = {e=>setName(e.target.value)}/>

        <TextField value={email} className="outlined-basic" label="Email" variant="outlined" margin="dense"
        onChange = {e=>setEmail(e.target.value)}/>

        <TextField className="outlined-basic" label="Password" variant="outlined" margin="dense" type="password"
        onChange = {e=>setPassword(e.target.value)}/>

        <TextField className="outlined-basic" label="Confirm Password" variant="outlined" margin="dense" type="password"
        onChange = {e=>setCpassword(e.target.value)}/>

        <Button onClick={update} variant="contained" id="update-profile-btn" fullWidth>Update</Button>
        </Box>

        </Box>
     
      </Modal>
  );
}

export default UpdateProfileModal;