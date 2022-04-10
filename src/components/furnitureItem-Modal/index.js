import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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
import { closeModal, openLogInModal } from "../../redux/actions/modal";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DoneIcon from "@mui/icons-material/Done";
import { addCartProduct, addCartShipping } from "../../redux/actions/cart";
import "../../css/furnitureItem-modal/furnitureItem-modal.css";
import SavedShipping from "../savedShipping";
import PaymentModal from "../payment";

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
  const [chosenShipping, setChosenShipping] = useState("");
  const [chosenShippingToken, setChosenShippingToken] = useState("");
  const [data, setData] = useState([]);
  const [openPayment, setOpenPayment] = useState(false);

  let token = window.localStorage.getItem("authToken");

  const loggedIn = useSelector((state) => state.authReducer);

  const userInfo = useSelector((state) => state.authUserReducer);

  const saved_shipping = useSelector((state) => state.cartShippingReducer);

  const checkShippingSaved = (p_id) => {
    let chck = false;
    if (loggedIn) {
      Object.keys(saved_shipping).forEach((key) => {
        if (saved_shipping[key] === p_id) {
          chck = true;
        }
      });
    }
    return chck;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function closeTheModal() {
    dispatch(closeModal());
    setIsOpen(false);
  }

  const suggestShippings = async () => {
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
    let product_id = { product_id: props.id };
    let shipping = { shipping_id: chosenShipping };

    if (!loggedIn) {
      dispatch(openLogInModal());
      return;
    }

    if (props.btn === "save") {
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
            closeTheModal();
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (props.btn === "cart") {
      setOpenPayment(true);
    }
  };

  useEffect(() => {
    if (city) {
      suggestShippings();
    }
  }, [city]);

  useEffect(() => {
    const user_city = window.localStorage.getItem("city");
    setCity(user_city);
  }, []);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeTheModal}
      style={customStyles}
      contentLabel="Furniture Modal"
    >
      {openPayment && (
        <PaymentModal
          product_id={props.id}
          user_id={userInfo._id}
          shipping_id={chosenShipping}
          shipping_token={chosenShippingToken}
          price={props.price}
        />
      )}
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
                    width: 300,
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
                      href={
                        "https://web.whatsapp.com/send/?phone=" +
                        props.phone_number +
                        "&text"
                      }

                      // href={"https://wa.me/" + props.phone_number}
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
                      style={{ whiteSpace: "nowrap" }}
                      sx={{ pr: 5, fontWeight: "light" }}
                      variant="subtitle2"
                    >
                      Date: {props.date}
                    </Typography>
                    <Typography
                      style={{ whiteSpace: "nowrap" }}
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
                  {props.is_sold && (
                    <Button
                      disabled="true"
                      className="sell-furniture-item-button"
                      style={{
                        color: "white",
                        backgroundColor: "#5094AA",
                        opacity: "1",
                      }}
                      variant="outlined"
                      endIcon={<DoneIcon />}
                    >
                      Sold
                    </Button>
                  )}
                  {!props.is_sold && (
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
                      {(props.btn !== "cart" &&
                        (props.btn === "saved" ? "Added" : "Add to Cart")) ||
                        "Purchase"}
                    </Button>
                  )}
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
              overflowY: "scroll",
              position: "absolute",
              right: "1rem",
            }}
          >
            <CardContent style={{ paddingBottom: "0" }}>
              <Box>
                <Typography
                  style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  sx={{ pb: 1 }}
                >
                  {props.btn !== "cart"
                    ? "Suggested Delivery"
                    : "Saved Delivery"}
                </Typography>
              </Box>

              {props.btn !== "cart" && (
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
                          image={data[key].image}
                        />
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
              )}
              {props.btn === "cart" && (
                <FormControl>
                  <RadioGroup
                    onChange={(e) => {
                      console.log(e.target.value);
                      console.log(e.target.name);
                      setChosenShipping(e.target.value);
                      setChosenShippingToken(e.target.name);
                    }}
                  >
                    {props.saved_shippings.map(
                      (item) =>
                        checkShippingSaved(item._id) && (
                          <Box>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <SavedShipping
                                name={item.name}
                                location={item.location}
                                phone_number={item.phone_number}
                                image={item.image}
                              />
                              <FormControlLabel
                                sx={{ pl: 4, pb: 2, m: 0 }}
                                value={item._id}
                                name={item.firebaseToken || ""}
                                control={<Radio style={{ color: "white" }} />}
                                label=""
                                color="inherit"
                              />
                            </Box>
                          </Box>
                        )
                    )}
                  </RadioGroup>
                </FormControl>
              )}
            </CardContent>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
};

export default FurnitureModal;
