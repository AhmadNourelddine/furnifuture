import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/aboutHome/aboutHome.css';

const AboutHome = ()=>{

    const navigate = useNavigate();

    return(
        <div id='about-page-home'>
            <div id='about-welcome'>
                <Typography className="about-welcome-to-the">WELCOME TO THE </Typography>
                <Typography className="about-welcome-furnifuture">&nbsp; FURNIFUTURE </Typography>
            </div>
            <div id='about-getstarted'>
                <div id='about-buy-sell-getstarted'>
                    <p className="getstarted-title">Buy & Sell Furniture</p>
                    <p className="getstarted-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <Button component={Link} to="/signup"
                    className="getstarted-buysell-button">Get Started</Button>
                </div>
                <div id='about-deliver-getstarted'>
                    <p className="getstarted-title">Deliver Furniture</p>
                    <p className="getstarted-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <Button component={Link} to="/create-shipping-profile"
                    className="getstarted-delivery-button">Get Started</Button>
                </div>
            </div>
        </div>
    );
}

export default AboutHome;