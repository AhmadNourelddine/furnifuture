import React, { useState } from "react";
import axios from "axios";
import "../../css/navbar/navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import websiteLogo from "../../assets/furniFuture-logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import loggedOut from "../../redux/actions/logOut.js";
import LoginModal from "../LoginModal";
import {
  openLogInModal,
  openShippingProfileModal,
  openSignUpModal,
} from "../../redux/actions/modal";
import SignUpModal from "../signUpModal";
import ShippingprofileModal from "../ShippingProfileModal/shippingProfileModal";
import CreateDeliveryProfileModal from "../create-delivery-profile-modal";
import { onMessageListener } from "../../firebase";
import ToastSuccess from "../toast/toast-success";

const Navbar = () => {
  const dispatch = useDispatch();

  let authorized = useSelector((state) => state.authReducer);
  let shippingUser = useSelector((state) => state.authShippingReducer);
  let loginModal = useSelector((state) => state.modalLoginReducer);
  let signUpModal = useSelector((state) => state.modalSignUpReducer);
  let shippingprofileModal = useSelector(
    (state) => state.modalShippingProfileReducer
  );
  let openCreateShippingModal = useSelector(
    (state) => state.modalCreateShipping
  );

  onMessageListener()
    .then((payload) => {
      console.log("recieved");
      shippingUser && ToastSuccess("New Order to Deliver");
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  const logOut = async () => {
    let token = window.localStorage.getItem("authToken");
    dispatch(loggedOut());

    await axios
      .post("http://127.0.0.1:8000/api/user/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(loggedOut());
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <AppBar position="static" color="inherit" id="app-bar">
      {/* open the modal when state is true */}
      {loginModal && <LoginModal />}
      {signUpModal && <SignUpModal />}
      {shippingprofileModal && <ShippingprofileModal />}
      {openCreateShippingModal && <CreateDeliveryProfileModal />}

      <Container id="toolbar-container">
        <Toolbar disableGutters>
          <IconButton component={Link} to="/about" sx={{ p: 0 }} size="large">
            <Avatar alt="website Logo" srcSet={websiteLogo} />
            <Typography sx={{ mx: 2, color: "white" }} id="toolbar-furnifuture">
              FurniFuture
            </Typography>
          </IconButton>

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              component={Link}
              to="/about"
              className="toolbar-btn"
              color="inherit"
              key="about"
              sx={{ my: 2, display: "block" }}
            >
              ABOUT
            </Button>

            {!shippingUser && (
              <Button
                component={Link}
                to="/buy"
                className="toolbar-btn"
                color="inherit"
                key="buy"
                sx={{ my: 2, display: "block" }}
              >
                BUY
              </Button>
            )}

            {!shippingUser && (
              <Button
                component={Link}
                to="/sell"
                className="toolbar-btn"
                color="inherit"
                key="sell"
                sx={{ my: 2, display: "block" }}
              >
                SELL
              </Button>
            )}

            {!shippingUser && (
              <Button
                component={Link}
                to="/delivery"
                className="toolbar-btn"
                color="inherit"
                key="delivery"
                sx={{ my: 2, display: "block" }}
              >
                Delivery
              </Button>
            )}

            {!authorized && (
              <Box style={{ display: "flex" }}>
                <Button
                  onClick={() => {
                    dispatch(openLogInModal());
                  }}
                  className="toolbar-btn"
                  id="toolbar-signin"
                  color="inherit"
                  key="signin"
                  sx={{ my: 2, display: "block" }}
                >
                  SIGN IN
                </Button>

                <div id="line-between"></div>
                <Button
                  onClick={() => {
                    dispatch(openSignUpModal());
                  }}
                  className="toolbar-btn"
                  id="toolbar-signup"
                  color="inherit"
                  key="signup"
                  sx={{ my: 2, display: "block" }}
                >
                  SIGN UP
                </Button>
              </Box>
            )}

            {authorized && (
              <Box style={{ display: "flex" }}>
                {!shippingUser && (
                  <Box
                    component={Link}
                    to="/cart"
                    className="toolbar-btn navbar-icons"
                  >
                    <ShoppingCartIcon />
                  </Box>
                )}
                {!shippingUser && (
                  <Box
                    component={Link}
                    to={"profile"}
                    className="toolbar-btn navbar-icons"
                  >
                    <AccountCircleIcon />
                  </Box>
                )}

                {shippingUser && (
                  <Box
                    onClick={() => {
                      dispatch(openShippingProfileModal());
                    }}
                    className="toolbar-btn navbar-icons"
                  >
                    <AccountCircleIcon />
                  </Box>
                )}
                <Box
                  component={Link}
                  to="/about"
                  onClick={logOut}
                  className="toolbar-btn navbar-icons"
                >
                  <LogoutIcon />
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
