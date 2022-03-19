import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/navbar/navbar.css';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import websiteLogo from '../../assets/furniFuture-logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Navbar = () => {

    const[token, setToken]= useState('');
    let authtoken = window.localStorage.getItem('authToken');

    console.log(token);

    const logOut = async()=>{

      window.localStorage.removeItem('authToken');
      setToken('');

      await axios.post('http://127.0.0.1:8000/api/user/logout',{
          headers: {"Authorization" : `Bearer ${token}`},
      })
      .then((response)=>{
              window.localStorage.removeItem('authToken');
              console.log(response)
          })
      .catch(e=>{console.log(e)})

  }

  useEffect(()=>{setToken(window.localStorage.getItem('authToken'))},[])

    return(
        <AppBar position="static" color="inherit" id="app-bar">
        <Container id="toolbar-container">
          <Toolbar disableGutters >

          <IconButton component={Link} to="/about" sx={{ p: 0 }} size="large" >

                <Avatar alt="website Logo" srcSet={websiteLogo} />
                <Typography  sx={{mx:2, color: 'white'}} id="toolbar-furnifuture">
                  FurniFuture</Typography>
              </IconButton>
              
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} 
              style={{display:"flex", justifyContent:"flex-end"}}>
              
              <Button component={Link} to="/about" className="toolbar-btn" color="inherit"
                key="about"
                sx={{ my: 2, display: 'block' }}
              >
                ABOUT
              </Button>

              <Button component={Link} to="/buy" className="toolbar-btn" color="inherit"
                key="signin"
                sx={{ my: 2, display: 'block' }}
              >
                BUY
              </Button>

              <Button component={Link} to="/sell" className="toolbar-btn" color="inherit"
                key="signin"
                sx={{ my: 2, display: 'block' }}
              >
                SELL
              </Button>
            
              <Button component={Link} to="/delivery" className="toolbar-btn" color="inherit"
                key="signin"
                sx={{ my: 2, display: 'block' }}
              >
                Delivery
              </Button>


              {!token && 
              <Box style={{display:"flex"}}>
              <Button component={Link} to="/login" className="toolbar-btn" id="toolbar-signin" color="inherit"
                key="signin"
                sx={{ my: 2, display: 'block' }}
              >
                SIGN IN
              </Button>
              
              <div id="line-between"></div>
              <Button component={Link} to="/signup" className="toolbar-btn" id="toolbar-signup" color="inherit"
                key="signup"
                sx={{ my: 2, display: 'block' }}
              >
                SIGN UP
              </Button>
              </Box>
              }

              {token && 
              <Box style={{display:"flex"}}>
              <Box component={Link} to="/cart" className="toolbar-btn">
                <ShoppingCartIcon/>
              </Box>
              <Box component={Link} to="/dashboard" className="toolbar-btn">
                <AccountCircleIcon/>
              </Box>
              <Box component={Link} to="/about" onClick={logOut} className="toolbar-btn">
                <LogoutIcon/>
              </Box>
              </Box>
              }
              

              
          </Box>
              </Toolbar>
          </Container>
        </AppBar>
        
        
    );
}
export default Navbar;