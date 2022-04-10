import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLogInModal,
  closeSignUpModal,
  openLogInModal,
} from "../../redux/actions/modal";
import "../../css/signup/signup.css";

import { Link, useNavigate } from "react-router-dom";

import "../../css/signupModal/signUpModal.css";

import ToastSuccess from "../toast/toast-success";
import isShipping from "../../redux/actions/loggedInShipping";

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

const SignUpModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(true);
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  function closeTheModal() {
    dispatch(closeSignUpModal());
    setIsOpen(false);
  }

  const signup = async (event) => {
    event.preventDefault();
    console.log(email + password);
    let object = {
      name: name,
      email: email,
      password: password,
      password_confirmation: Cpassword,
    };
    await axios
      .post("http://127.0.0.1:8000/api/auth/register", object)
      .then((result) => {
        ToastSuccess("Registered Successfully");
        closeTheModal();
        dispatch(openLogInModal());
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeTheModal}
      style={customStyles}
      contentLabel="Furniture Modal"
    >
      <Box
        component="form"
        onSubmit={signup}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box className="signup-form-modal" id="signup-box-modal">
          <p id="sign-up">Create An Account</p>

          <TextField
            required
            autoComplete="given-name"
            className="outlined-basic"
            label="Name"
            variant="outlined"
            margin="dense"
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            required
            autoComplete="email"
            className="outlined-basic"
            label="Email"
            variant="outlined"
            margin="dense"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            required
            autoComplete="new-password"
            error={password !== "" && !password.match(/^.{6,}$/)}
            helperText={
              password !== "" &&
              !password.match(/^.{6,}$/) &&
              "Password should be at least 6 character"
            }
            className="outlined-basic"
            label="Password"
            variant="outlined"
            margin="dense"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            required
            autoComplete="new-password"
            error={Cpassword !== "" && Cpassword !== password}
            helperText={
              Cpassword !== "" &&
              Cpassword !== password &&
              "please confrim password"
            }
            className="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            margin="dense"
            type="password"
            onChange={(e) => setCpassword(e.target.value)}
          />

          <Button type="submit" variant="contained" id="signup-btn" fullWidth>
            Sign Up
          </Button>

          <Typography className="sign-in-page-sign-up-link">
            Already Have An Account?
            <Button
              onClick={() => {
                closeTheModal();
                dispatch(openLogInModal());
              }}
            >
              <p style={{ borderBottom: "solid 0.5px" }}>Sign In</p>
            </Button>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignUpModal;
