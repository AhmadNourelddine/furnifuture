import * as React from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import websiteLogo from '../../assets/furniFuture-logo.png';


const Navbar = () => {

    return(
        <AppBar position="static" color="inherit" id="app-bar">
        <Container>
          <Toolbar disableGutters >

          <IconButton component={Link} to="/about" sx={{ p: 0 }} size="large" >

                <Avatar alt="website Logo" srcSet={websiteLogo} />
                <Typography  sx={{mx:2, color: 'white'}}>FurniFuture</Typography>
              </IconButton>
              
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} 
              style={{display:"flex", justifyContent:"flex-end"}}>
              
              <Button component={Link} to="/about" className="toolbar-btn" color="inherit"
                key="about"
                sx={{ my: 2, display: 'block' }}
              >
                ABOUT
              </Button>
            
          
              <Button component={Link} to="/login" className="toolbar-btn" color="inherit"
                key="signin"
                sx={{ my: 2, display: 'block' }}
              >
                SIGNIN
              </Button>
            
              
              <Button component={Link} to="/signup" className="toolbar-btn" color="inherit"
                key="signup"
                sx={{ my: 2, display: 'block' }}
              >
                SIGNUP
              </Button>
              
          </Box>
              </Toolbar>
          </Container>
        </AppBar>
        
        
    );
}
export default Navbar;