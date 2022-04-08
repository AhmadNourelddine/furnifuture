import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/actions/modal";
import "../../css/login/login.css";
import "../../css/payment-modal/payment-modal.css";
import ToastSuccess from "../toast/toast-success";
import { removeCartProduct } from "../../redux/actions/cart";
import { sendNotification } from "../../firebase";

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

const PaymentModal = (props) => {
  const userInfo = useSelector((state) => state.authUserReducer);

  const submitPayment = async (event) => {
    event.preventDefault();
    let product_id = { product_id: props.product_id };
    let purchase = {
      product_id: props.product_id,
      user_id: props.user_id,
      shipping_id: props.shipping_id,
      cardInfo: cardInfo,
      price: props.price,
    };
    // await axios
    //   .post("http://127.0.0.1:8000/api/user/cart/remove-product", product_id, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((resp) => {
    //     dispatch(removeCartProduct(props.product_id));
    //     console.log(resp);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // await axios
    //   .post("http://127.0.0.1:8000/api/user/save-purchase", purchase, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((resp) => {
    //     const message = {
    //       data: {
    //         score: "850",
    //         time: "2:45",
    //       },
    //       token: props.shipping_token,
    //     };
    //     sendNotification(message);
    //     console.log(resp);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // const message = {
    //   data: {
    //     score: "850",
    //     time: "2:45",
    //   },
    //   token: props.shipping_token,
    // };
    sendNotification(props.shipping_token, userInfo.name);
    ToastSuccess("Purchased Successfully");
    closeTheModal();
  };

  const [cardInfo, setCardInfo] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(true);

  let token = window.localStorage.getItem("authToken");

  function closeTheModal() {
    setIsOpen(false);
    dispatch(closeModal());
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeTheModal}
      style={customStyles}
      contentLabel="Furniture Modal"
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: "3rem 2rem",
          borderRadius: "15px",
        }}
      >
        <div id="PaymentForm" component="form" onSubmit={submitPayment}>
          <Grid xs={12} md={12} sm={12} sx={{ mb: 2 }}>
            <Cards
              cvc={cardInfo.cvc}
              expiry={cardInfo.expiry}
              focused={cardInfo.focus}
              name={cardInfo.name}
              number={cardInfo.number}
              preview={true}
              issuer="visa"
            />
          </Grid>
          <form>
            <Grid xs={12} md={12} sm={12}>
              <TextField
                className="payment-textfield"
                type="tel"
                name="name"
                required
                label="Name"
                onChange={(e) => {
                  setCardInfo((cardInfo) => ({
                    ...cardInfo,
                    name: e.target.value,
                  }));
                }}
                onFocus={(e) => {
                  setCardInfo((cardInfo) => ({
                    ...cardInfo,
                    focus: e.target.name,
                  }));
                }}
              />
            </Grid>
            <Grid xs={12} md={12} sm={12}>
              <TextField
                className="payment-textfield"
                type="text"
                name="number"
                required
                label="Card Number"
                onChange={(e) => {
                  setCardInfo((cardInfo) => ({
                    ...cardInfo,
                    number: e.target.value,
                  }));
                }}
                onFocus={(e) => {
                  setCardInfo((cardInfo) => ({
                    ...cardInfo,
                    focus: e.target.name,
                  }));
                }}
              />
            </Grid>
            <Grid container direction="row" xs={12} md={12} sm={12}>
              <Grid xs={6} md={6} sm={6}>
                <TextField
                  className="payment-textfield"
                  type="text"
                  name="expiry"
                  required
                  label="Expiry Date"
                  onChange={(e) => {
                    setCardInfo((cardInfo) => ({
                      ...cardInfo,
                      expiry: e.target.value,
                    }));
                  }}
                  onFocus={(e) => {
                    setCardInfo((cardInfo) => ({
                      ...cardInfo,
                      focus: e.target.name,
                    }));
                  }}
                />
              </Grid>
              <Grid xs={6} md={6} sm={6}>
                <TextField
                  className="payment-textfield"
                  type="text"
                  name="cvc"
                  required
                  label="CVC"
                  onChange={(e) => {
                    setCardInfo((cardInfo) => ({
                      ...cardInfo,
                      cvc: e.target.value,
                    }));
                  }}
                  onFocus={(e) => {
                    setCardInfo((cardInfo) => ({
                      ...cardInfo,
                      focus: e.target.name,
                    }));
                  }}
                />
              </Grid>
            </Grid>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                sx={{ mx: 3 }}
                variant="outlined"
                onClick={closeTheModal}
                color="error"
              >
                Cancel
              </Button>
              <Button
                sx={{ backgroundColor: "#5094AA", px: 4, mr: 1 }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Pay
              </Button>
            </Box>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
