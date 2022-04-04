import React from "react";
import { Box, Typography } from "@mui/material";
import "../../css/profile/profile.css";
import "../../css/profileShipping-modal/profileShipping-modal.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeShippingProfileModal } from "../../redux/actions/modal";

const ProfileShipping = () => {
  const dispatch = useDispatch();
  let user_name = window.localStorage.getItem("user_name");
  let email = window.localStorage.getItem("user_email");

  const userInfo = useSelector((state) => state.authUserReducer);

  return (
    <Box className="profile-page-shipping">
      <Box className="profile-page-info">
        <Box>
          <AccountCircleIcon sx={{ fontSize: 150 }} />
        </Box>
        <Box className="profile-page-name-email">
          <Typography fontWeight={900} fontSize={50}>
            {user_name}
          </Typography>
          <Typography fontWeight={100} fontSize={30}>
            {email}
          </Typography>
        </Box>
        <Box
          onClick={() => {
            dispatch(closeShippingProfileModal());
          }}
          component={Link}
          to="/create-shipping-profile"
          className="profile-page-edit"
        >
          <ManageAccountsIcon sx={{ fontSize: 45 }} />
        </Box>
      </Box>
      <Box
        sx={{ py: 10 }}
        style={{
          paddingLeft: "10rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ my: 2 }} style={{ display: "flex" }}>
          <PhoneIphoneIcon sx={{ pr: 2, fontSize: 50 }} />
          <Typography fontWeight={100} fontSize={30}>
            {userInfo.phone_number}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }} style={{ display: "flex" }}>
          <LocationOnIcon sx={{ pr: 2, fontSize: 50 }} />
          <Typography fontWeight={100} fontSize={30}>
            {userInfo.location}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }} style={{ display: "flex" }}>
          <LocalShippingIcon sx={{ pr: 2, fontSize: 50 }} />
          <Typography fontWeight={100} fontSize={30}>
            {userInfo.vehicle_load}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileShipping;
