import { Button, Typography, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  openLogInModal,
  openCreateShippingProfileModal,
} from "../../redux/actions/modal";

import "../../css/aboutHome/aboutHome.css";

const AboutHome = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.authReducer);
  let shippingUser = useSelector((state) => state.authShippingReducer);

  return (
    <div id="about-page-home">
      <div id="about-welcome">
        <Typography className="about-welcome-to-the">
          WELCOME TO THE{" "}
        </Typography>
        <Typography className="about-welcome-furnifuture">
          &nbsp; FURNIFUTURE{" "}
        </Typography>
      </div>
      <div id="about-getstarted">
        <Grid md={6} sm={12} id="about-buy-sell-getstarted">
          <p className="getstarted-title">Buy & Sell Furniture</p>
          <p className="getstarted-description">
            The FurniFuture is an efficient website that connects furniture
            buyers and sellers online. FurniFuture is more than just a buy and
            sell website; it offers a great oppurtinity for users to connect
            with shipping services.
          </p>
          <Button
            onClick={() => {
              !loggedIn && dispatch(openLogInModal());
            }}
            component={Link}
            to={loggedIn && !shippingUser && "/buy"}
            className="getstarted-buysell-button"
          >
            Get Started
          </Button>
        </Grid>
        <Grid md={6} sm={12} id="about-deliver-getstarted">
          <p className="getstarted-title">Deliver Furniture</p>
          <p className="getstarted-description">
            The website encourges people who can work in shipping furniture to
            create their own profiles so that they can have greater chances in
            finding nearby clients.
          </p>
          <Button
            onClick={() => {
              !shippingUser && dispatch(openCreateShippingProfileModal());
            }}
            className="getstarted-delivery-button"
          >
            Get Started
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default AboutHome;
