import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import "../../css/cart/cart.css";
import FurnitureItem from "../../components/furnitureItem";
import ShippingProfileCard from "../../components/shippingProfileCard/shippingCardProfile";
import { useSelector } from "react-redux";

const Cart = () => {
  let token = window.localStorage.getItem("authToken");

  const [toggle, setToggle] = useState(true);

  const [savedProducts, setSavedProducts] = useState([]);
  const [savedShipping, setShipping] = useState([]);

  const loggedIn = useSelector((state) => state.authReducer);

  const saved_products = useSelector((state) => state.cartProductReducer);
  const saved_shipping = useSelector((state) => state.cartShippingReducer);

  const checkProductSaved = (p_id) => {
    let chck = false;
    if (loggedIn) {
      Object.keys(saved_products).forEach((key) => {
        if (saved_products[key] === p_id) {
          chck = true;
        }
      });
    }
    return chck;
  };

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

  const getSavedProducts = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/user/cart/get-products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSavedProducts(response.data[0]);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getSavedShipping = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/user/cart/get-shipping", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setShipping(response.data[0]);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSavedProducts();
    getSavedShipping();
  }, []);

  return (
    <div className="cart-page">
      <div className="cart-page-heading">
        <Typography className="cart-page-title">Your Cart</Typography>
        <div className="cart-page-navbar">
          <Button
            className="cart-page-navbar-btn"
            style={
              toggle
                ? { backgroundColor: "#6F1A07" }
                : { backgroundColor: "#B4A89E" }
            }
            onClick={() => {
              setToggle(true);
            }}
          >
            Saved Furniture
          </Button>

          <Button
            className="cart-page-navbar-btn"
            style={
              toggle
                ? { backgroundColor: "#B4A89E" }
                : { backgroundColor: "#6F1A07" }
            }
            onClick={() => {
              setToggle(false);
            }}
          >
            Shipping
          </Button>
        </div>
      </div>
      <div className="buy-page-items">
        {toggle &&
          savedProducts.map(
            (item) =>
              checkProductSaved(item._id) && (
                <Grid xs={3} md={4} sm={12}>
                  <FurnitureItem
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    location={item.location}
                    phone_number={item.phone_number}
                    category={item.category}
                    price={item.price}
                    date={item.created_at}
                    img_base64_encoded={item.image}
                    btn="remove"
                    saved_shippings={savedShipping}
                  />
                </Grid>
              )
          )}
        {!toggle &&
          savedShipping.map(
            (item) =>
              checkShippingSaved(item._id) && (
                <Grid xs={4} md={6} sm={12}>
                  <ShippingProfileCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    phone_number={item.phone_number}
                    location={item.location}
                    vehicle_load={item.vehicle_load}
                    btn="remove"
                    image_encoded={item.image}
                  />
                </Grid>
              )
          )}
      </div>
    </div>
  );
};

export default Cart;
