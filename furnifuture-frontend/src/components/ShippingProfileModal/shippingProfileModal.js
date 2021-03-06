import { Avatar, Box, Button, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeShippingProfileModal,
  closeUpdateProfileModal,
  openCreateShippingProfileModal,
} from "../../redux/actions/modal";
import "../../css/profile/profile.css";
import "../../css/profileShipping-modal/profileShipping-modal.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
import axios from "axios";
import { uploadProfileImage } from "../../redux/actions/logIn";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    borderRadius: "35px",
  },
};

Modal.setAppElement("#root");

const ShippingprofileModal = (props) => {
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(true);
  const [imageChanged, setImageChanged] = useState(false);

  const [encodedImage, setEncodedImage] = useState("");

  const user = useSelector((state) => state.authUserReducer);

  let token = window.localStorage.getItem("authToken");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function closeTheModal() {
    dispatch(closeShippingProfileModal());
    setIsOpen(false);
  }

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    await fileReader.readAsDataURL(file);
    fileReader.onload = async function () {
      await setEncodedImage(fileReader.result);
      setImageChanged(true);
    };
    fileReader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  useEffect(() => {
    if (encodedImage && imageChanged) {
      let image = { image: encodedImage };
      const uploadImage = async () => {
        await axios
          .post("http://127.0.0.1:8000/api/user/upload-profile-image", image, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            console.log(resp.data);
            dispatch(uploadProfileImage(encodedImage));
          })
          .catch((err) => {
            console.log(err);
          });
      };
      uploadImage();
    }
  }, [encodedImage, imageChanged]);

  useEffect(() => {
    if (user.image) {
      setEncodedImage(user.image);
    }
  }, [user]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeTheModal}
      style={customStyles}
      contentLabel="Shipping Profile Modal"
    >
      <Box className="profile-shipping-modal">
        <Box className="profile-page-info">
          <Box sx={{ pt: 3 }}>
            <Avatar
              sx={{ mr: 2, width: 96, height: 96 }}
              alt="PP"
              src={encodedImage}
            />

            <Button
              className="shipping-profile-page-btn"
              style={{ position: "relative", top: "-25px" }}
              for="sell-upload-btn"
            >
              <label for="sell-upload-btn">
                <AddPhotoAlternateIcon />
              </label>
            </Button>
            <input
              style={{ opacity: "0", width: "0px" }}
              id="sell-upload-btn"
              type="file"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleImage(e)}
            />
          </Box>
          <Box className="profile-page-name-email">
            <Typography fontWeight={900} fontSize={50}>
              {capitalizeFirstLetter(user.name)}
            </Typography>
            <Typography fontWeight={100} fontSize={30}>
              {capitalizeFirstLetter(user.email)}
            </Typography>
          </Box>
          <Box
            onClick={() => {
              closeTheModal();
              dispatch(openCreateShippingProfileModal());
            }}
            className="profile-page-edit"
          >
            <ManageAccountsIcon sx={{ fontSize: 45 }} />
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{ my: 2, mr: 2 }}
          style={{
            paddingLeft: "8rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ my: 2 }} style={{ display: "flex" }}>
            <PhoneIphoneIcon sx={{ pr: 2, fontSize: 50 }} />
            <Typography fontWeight={100} fontSize={30}>
              {user.phone_number}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }} style={{ display: "flex" }}>
            <LocationOnIcon sx={{ pr: 2, fontSize: 50 }} />
            <Typography fontWeight={100} fontSize={30}>
              {capitalizeFirstLetter(user.location)}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }} style={{ display: "flex" }}>
            <LocalShippingIcon sx={{ pr: 2, fontSize: 50 }} />
            <Typography fontWeight={100} fontSize={30}>
              {user.vehicle_load}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShippingprofileModal;
