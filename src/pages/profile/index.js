import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import "../../css/profile/profile.css";
import FurnitureItem from "../../components/furnitureItem";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UpdateProfileModal from "../../components/updateAccountModal/updateAccountModal";
import { openUpdateProfileModal } from "../../redux/actions/modal";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { uploadProfileImage } from "../../redux/actions/logIn";

const Profile = () => {
  const [data, setData] = useState([]);
  const [encodedImage, setEncodedImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();

  let token = window.localStorage.getItem("authToken");

  let openUpdateModal = useSelector((state) => state.modalUpdateProfileReducer);

  const user_products = useSelector((state) => state.userProductsReducer);
  const user = useSelector((state) => state.authUserReducer);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file));
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      setEncodedImage(fileReader.result);
    };
    fileReader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  useEffect(() => {
    if (encodedImage) {
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
  }, [encodedImage]);

  const checkProductExists = (p_id) => {
    let chck = false;
    Object.keys(user_products).forEach((key) => {
      if (user_products[key] === p_id) {
        chck = true;
      }
    });
    console.log(chck);
    return chck;
  };

  const getUserProducts = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/user/product/created", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data["user_products"]);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserProducts();
  }, []);

  useEffect(() => {
    setProfileImage(user.image);
  }, [user]);

  return (
    <div className="profile-page">
      {openUpdateModal && <UpdateProfileModal />}
      <Box className="profile-page-info">
        <Box style={{ position: "relative", top: "25px" }}>
          <Avatar
            sx={{ mr: 2, width: 96, height: 96 }}
            alt="PP"
            src={encodedImage || profileImage}
          />

          <Button
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
            {user.name}
          </Typography>
          <Typography fontWeight={100} fontSize={30}>
            {user.email}
          </Typography>
        </Box>
        <Button
          onClick={() => {
            dispatch(openUpdateProfileModal());
          }}
          // component={Link} to="/dashboard"
          className="profile-page-edit"
        >
          <ManageAccountsIcon sx={{ fontSize: 45 }} />{" "}
        </Button>
      </Box>
      <div className="profile-page-items">
        {data.map(
          (item) =>
            checkProductExists(item._id) && (
              <Grid xs={3} md={4} sm={12}>
                <FurnitureItem
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  description={item.description}
                  location={item.location}
                  category={item.category}
                  phone_number={item.phone_number}
                  price={item.price}
                  date={item.created_at}
                  btn="delete"
                  sell_btn="update"
                  img_base64_encoded={item.image}
                />
              </Grid>
            )
        )}
      </div>
    </div>
  );
};

export default Profile;
