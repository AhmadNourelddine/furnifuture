import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import img from "../../assets/missing-image.jpg";
import axios from "axios";
import SuggestedShipping from "../suggestedShipping/suggestedShipping";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/actions/modal";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DoneIcon from "@mui/icons-material/Done";
import {
  addCartProduct,
  addCartShipping,
  addCartSuggestedShipping,
} from "../../redux/actions/cart";
import "../../css/furnitureItem-modal/furnitureItem-modal.css";
import { Link } from "react-router-dom";

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

const FurnitureModal = (props) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(true);
  const [city, setCity] = useState("");
  const [savedShippings, setSavedShippings] = useState([]);
  const [chosenShipping, setChosenShipping] = useState("");
  const [data, setData] = useState([]);

  let token = window.localStorage.getItem("authToken");

  const loggedIn = useSelector((state) => state.authReducer);

  const location = useSelector((state) => state.locationReducer);

  // console.log(location);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function closeTheModal() {
    dispatch(closeModal());
    setIsOpen(false);
  }

  const getUserCity = async () => {
    await axios
      .get("https://geolocation-db.com/json/")
      .then((response) => {
        // console.log(response.data);
        setCity(response.data.city);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSavedShipping = (shipping_id) => {
    if (savedShippings.includes(shipping_id)) {
      setSavedShippings(savedShippings.filter((item) => item !== shipping_id));
    } else {
      setSavedShippings((students) => [...savedShippings, shipping_id]);
    }
  };

  const suggestShippings = async () => {
    // console.log(city);
    let location = { city_user: city || "", city_product: props.location };
    await axios
      .post("http://127.0.0.1:8000/api/suggest-shipping", location)
      .then((response) => {
        setData(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const clcikedButton = async () => {
    if (!loggedIn) {
      alert("please log in");
      return;
    }

    if (props.btn === "save") {
      let product_id = { product_id: props.id };
      let shipping = { shipping_id: chosenShipping };
      // let shippings = { saved_shippings: savedShippings };

      await axios
        .post("http://127.0.0.1:8000/api/user/cart/save-product", product_id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          dispatch(addCartProduct(props.id));
          closeTheModal();
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });

      if (chosenShipping) {
        await axios
          .post("http://127.0.0.1:8000/api/user/cart/save-shipping", shipping, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            dispatch(addCartShipping(chosenShipping));
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    //   if (savedShippings) {
    //     await axios
    //       .post(
    //         "http://127.0.0.1:8000/api/user/cart/save-suggested-shipping",
    //         shippings,
    //         {
    //           headers: { Authorization: `Bearer ${token}` },
    //         }
    //       )
    //       .then((resp) => {
    //         dispatch(addCartSuggestedShipping(savedShippings));
    //         closeTheModal();
    //         console.log(resp);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // }
  };

  useEffect(() => {
    if (city) {
      suggestShippings();
    }
  }, [city]);

  useEffect(() => {
    getUserCity();
  }, []);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeTheModal}
      style={customStyles}
      contentLabel="Furniture Modal"
    >
      <Card style={{ width: "35rem", borderRadius: "35px", padding: "1rem" }}>
        <CardMedia
          className="furniture-modal-image"
          style={{
            padding: "2rem 5rem",
            width: "fit-content",
            margin: "auto",
          }}
          component="img"
          height="200"
          image={props.img_base64_encoded || img}
          alt="furniture"
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Box sx={{ px: 2 }}>
            <CardContent>
              <Box>
                <Box style={{ display: "flex", alignItems: "baseline" }}>
                  <Typography fontWeight={"900"} fontSize={25}>
                    {capitalizeFirstLetter(props.title)}
                  </Typography>
                  <Typography sx={{ pl: 4 }} fontWeight={"600"} fontSize={15}>
                    "{capitalizeFirstLetter(props.category)}"
                  </Typography>
                </Box>
                <Divider />
                <Typography
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 4,
                    fontWeight: 300,
                    height: 100,
                    pt: 2,
                  }}
                  variant="subtitle2"
                >
                  {capitalizeFirstLetter(props.description)}
                </Typography>
              </Box>
              <Box>
                <Box sx={{ pb: 2 }}>
                  <Button className="whatsapp-btn">
                    <a
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "white",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"https://wa.me/" + props.phone_number}
                    >
                      <WhatsAppIcon sx={{ mr: 1, color: "inherit" }} />

                      <Typography
                        sx={{
                          fontWeight: 300,
                          color: "white",
                        }}
                        variant="subtitle2"
                      >
                        {props.phone_number}
                      </Typography>
                    </a>
                  </Button>

                  <Box sx={{ pb: 5 }} style={{ display: "flex" }}>
                    <Typography
                      sx={{ pr: 5, fontWeight: "light" }}
                      variant="subtitle2"
                    >
                      Date: {props.date}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: "light" }}
                      variant="subtitle2"
                    >
                      Location: {capitalizeFirstLetter(props.location)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                style={{
                  width: "18rem",
                  position: "absolute",
                  bottom: "1.5rem",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Typography variant="h5" sx={{ py: 2 }}>
                    {props.price}
                  </Typography>
                  <Button
                    disabled={props.btn === "saved" ? true : false}
                    onClick={clcikedButton}
                    style={{
                      color: "white",
                      backgroundColor: "#5094AA",
                      opacity: props.btn === "saved" ? "1" : "0.7",
                    }}
                    endIcon={props.btn === "saved" && <DoneIcon />}
                    className="sell-furniture-item-button"
                  >
                    {props.btn === "saved" ? "Added" : "Add to Cart"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Box>
          <Box
            sx={{ m: 1 }}
            style={{
              alignSelf: "flex-end",
              height: "15rem",
              borderRadius: "10px",
              color: "white",
              backgroundColor: "#304451",
            }}
          >
            <CardContent style={{ paddingBottom: "0" }}>
              <Box>
                <Typography style={{ whiteSpace: "nowrap" }} sx={{ pb: 1 }}>
                  Suggested Delivery
                </Typography>
              </Box>

              <FormControl>
                <RadioGroup
                  onChange={(e) => {
                    console.log(e.target.value);
                    setChosenShipping(e.target.value);
                  }}
                >
                  {Object.keys(data).map((key) => (
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <SuggestedShipping
                        name={data[key].name}
                        location={data[key].location}
                        phone_number={data[key].phone_number}
                      />
                      {/* <Checkbox
                    onChange={() => {
                      handleSavedShipping(data[key]._id);
                    }}
                  /> */}
                      <FormControlLabel
                        sx={{ pl: 4, pb: 2, m: 0 }}
                        value={data[key]._id}
                        control={<Radio />}
                        label=""
                        color="inherit"
                      />
                    </Box>
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
};

export default FurnitureModal;
