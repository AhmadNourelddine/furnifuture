import React, { useEffect } from "react";
import axios from "axios";
import "../../css/update-profile/update-profile.css";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/button";
import Box from "@material-ui/core/box";
import ToastSuccess from "../../components/toast/toast-success";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");

  let token = window.localStorage.getItem("authToken");

  const update = async () => {
    console.log(email + password);
    let info = {
      name: name,
      email: email,
      password: password,
      password_confirmation: Cpassword,
    };
    await axios
      .post("http://127.0.0.1:8000/api/user/update-profile", info, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        ToastSuccess("Updated Profile Successfully");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setName(window.localStorage.getItem("user_name"));
    setEmail(window.localStorage.getItem("user_email"));
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box className="update-profile-form" id="update-profile-box">
        <p id="update-profile">Update Account Info</p>
        <TextField
          value={name}
          className="outlined-basic"
          label="Name"
          variant="outlined"
          margin="dense"
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          value={email}
          className="outlined-basic"
          label="Email"
          variant="outlined"
          margin="dense"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          className="outlined-basic"
          label="Password"
          variant="outlined"
          margin="dense"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          className="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          margin="dense"
          type="password"
          onChange={(e) => setCpassword(e.target.value)}
        />

        <Button
          onClick={update}
          variant="contained"
          id="update-profile-btn"
          fullWidth
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
