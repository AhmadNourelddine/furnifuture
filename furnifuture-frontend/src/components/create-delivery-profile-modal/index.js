import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCreateShippingProfileModal,
  openLogInModal,
} from "../../redux/actions/modal";
import { useNavigate } from "react-router-dom";
import "../../css/signUp-shipping-modal/signUp-shipping-modal.css";
import MuiPhoneNumber from "material-ui-phone-number";
import ToastSuccess from "../toast/toast-success";
import { PhotoCamera } from "@material-ui/icons";
import { loggedIn, uploadProfileImage } from "../../redux/actions/logIn";
import { locations, Vehicle_loads } from "../../drop-down-list";

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

const CreateDeliveryProfileModal = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [phoneNb, setPhoneNb] = useState("");
  const [location, setLocation] = useState("");
  const [vehicleLoad, setVehicleLoad] = useState("");
  const [imageEncoded, setImageEncoded] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(true);

  let token = window.localStorage.getItem("authToken");

  const userToUpdate = useSelector((state) => state.authUserReducer);

  function closeTheModal() {
    dispatch(closeCreateShippingProfileModal());
    setIsOpen(false);
  }

  const Navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      setImageEncoded(fileReader.result);
      console.log(imageEncoded);
    };
    fileReader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  useEffect(() => {
    if (redirect) {
      Navigate("/about");
    }
  }, [redirect]);

  useEffect(() => {
    if (userToUpdate && userToUpdate.is_shipping) {
      setName(userToUpdate.name);
      setEmail(userToUpdate.email);
      setPhoneNb(userToUpdate.phone_number);
      setLocation(userToUpdate.location);
      setVehicleLoad(userToUpdate.vehicle_load);
      setImageEncoded(userToUpdate.image);
    }
  }, [userToUpdate]);

  const createShippingProfile = async (event) => {
    event.preventDefault();
    console.log(email + password);

    let object = {
      name: name,
      email: email,
      location: location,
      phone_number: phoneNb,
      vehicle_load: vehicleLoad,
      password: password,
      password_confirmation: Cpassword,
    };

    if (imageEncoded) {
      object.image = imageEncoded;
    }

    if (userToUpdate.is_shipping) {
      await axios
        .post(
          "http://127.0.0.1:8000/api/user/update-shipping-profile",
          object,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          ToastSuccess("Updated Successfully");
          setRedirect(true);
          dispatch(loggedIn(object));
          dispatch(uploadProfileImage(imageEncoded));
          closeTheModal();
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err);
        });
    } else {
      await axios
        .post("http://127.0.0.1:8000/api/auth/register-shipping", object)
        .then((response) => {
          ToastSuccess("Registerd Successfully");
          setRedirect(true);
          dispatch(openLogInModal());
          closeTheModal();
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err);
        });
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeTheModal}
      style={customStyles}
      contentLabel="Create shipping profile Modal"
    >
      <Container
        component="form"
        onSubmit={createShippingProfile}
        style={{
          padding: "3rem 2rem",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <Grid container direction="column">
          <Grid container direction="column" alignItems="center">
            <Grid xs="auto" sx={{ pr: 2 }}>
              <Avatar
                alt="Profile Picture"
                src={imageEncoded}
                sx={{ width: 76, height: 76 }}
              />
            </Grid>
            <Grid xs="auto">
              <Button
                for="sell-upload-btn"
                style={{ position: "absolute", left: "290px", top: "95px" }}
              >
                <label for="sell-upload-btn">
                  <PhotoCamera />
                </label>
              </Button>
              <input
                style={{ opacity: "0", width: "0px" }}
                id="sell-upload-btn"
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleImage(e)}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" sx={{ py: 1 }}>
            <Grid xs={6} sx={{ pr: 2 }}>
              <TextField
                className="fix-modal-textfield"
                value={name}
                autoComplete="given-name"
                required
                onChange={(e) => setName(e.target.value)}
                label="Name"
              />
            </Grid>
            <Grid xs={6} sx={{ pl: 2 }}>
              <TextField
                className="fix-modal-textfield"
                value={email}
                autoComplete="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" sx={{ py: 1 }}>
            <Grid xs={6} sx={{ pr: 2 }}>
              <TextField
                className="fix-modal-textfield"
                label="Password"
                error={password !== "" && !password.match(/^.{6,}$/)}
                helperText={
                  password !== "" &&
                  !password.match(/^.{6,}$/) &&
                  "Password should be at least 6 character"
                }
                autoComplete="new-password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid xs={6} sx={{ pl: 2 }}>
              <TextField
                className="fix-modal-textfield"
                label="Confirm Password"
                error={Cpassword !== "" && Cpassword !== password}
                helperText={
                  Cpassword !== "" &&
                  Cpassword !== password &&
                  "please confrim password"
                }
                autoComplete="new-password"
                type="password"
                required
                onChange={(e) => setCpassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box>
            <Grid xs={12} sx={{ py: 1, pr: 2 }}>
              <Autocomplete
                required
                className="createdelivery-modal-autocomplete-section"
                style={{ width: "auto" }}
                disablePortal
                options={locations}
                value={location}
                renderInput={(params) => (
                  <TextField
                    required
                    label="Location"
                    className="fix-modal-textfield"
                    fullwidth
                    {...params}
                  />
                )}
                onChange={(event, value) => {
                  value && setLocation(value);
                }}
              />
            </Grid>
          </Box>
          <Box>
            <Grid xs={12} sx={{ py: 1, pr: 2 }}>
              <Autocomplete
                required
                className="createdelivery-modal-autocomplete-section"
                style={{ width: "auto" }}
                disablePortal
                options={Vehicle_loads}
                value={vehicleLoad}
                renderInput={(params) => (
                  <TextField
                    label="Vehicle Load 'Kg'"
                    className="fix-modal-textfield"
                    fullwidth
                    required
                    {...params}
                  />
                )}
                onChange={(event, value) => {
                  value && setVehicleLoad(value);
                }}
              />
            </Grid>
          </Box>
          <Grid container sx={{ py: 2 }} direction="row" alignItems="center">
            <Grid xs={6}>
              <MuiPhoneNumber
                required
                className="fix-modal-textfield"
                label="Phone Number"
                variant="outlined"
                value={phoneNb}
                defaultCountry={"lb"}
                onChange={(e) => {
                  setPhoneNb(e);
                }}
              />
            </Grid>
            <Grid xs={6} sx={{ pl: 8 }}>
              <Button
                style={{
                  padding: "5px 15px",
                  borderRadius: "5px",
                  marginLeft: "8px",
                  color: "black",
                  backgroundColor: "#D86544",
                }}
                onClick={() => {
                  closeTheModal();
                }}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  padding: "5px 15px",
                  borderRadius: "5px",
                  marginLeft: "8px",
                  color: "white",
                  backgroundColor: "#5094AA",
                }}
                type="submit"
                variant="contained"
              >
                {userToUpdate.is_shipping ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
};

export default CreateDeliveryProfileModal;
