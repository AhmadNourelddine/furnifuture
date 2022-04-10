import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea } from "@mui/material";
import "../../css/furnitureItem-sell/furnitureItem-sell.css";
import img from "../../assets/missing-image.jpg";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import FurnitureModal from "../furnitureItem-Modal";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../redux/actions/editProduct";
import { openLogInModal, openModal } from "../../redux/actions/modal";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { addCartProduct, removeCartProduct } from "../../redux/actions/cart";
import { deleteCreatedProduct } from "../../redux/actions/userProducts";

export default function FurnitureItem(props) {
  const token = window.localStorage.getItem("authToken");

  const loggedIn = useSelector((state) => state.authReducer);
  const checkModal = useSelector((state) => state.modalReducer);
  const saved_products = useSelector((state) => state.cartProductReducer);

  const [save, setSave] = useState(false);
  const [buy, setBuy] = useState(false);
  const [cart, setCart] = useState(false);
  const [profile, setProfile] = useState(false);
  const [date, setDate] = useState("");
  const [lbpPrice, setLbpPrice] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const adjustDate = (date) => {
    const arrayStrings = date.split("-");
    const reverseArray = arrayStrings.reverse();
    const joinArray = reverseArray.join("-");
    return joinArray;
  };

  useEffect(() => {
    const splitDate = props.date.split("T");
    const date = adjustDate(splitDate[0]);
    const splitPrice = props.price.split(" ");
    if (splitPrice[1] === "LBP") {
      const newPrice = Number(splitPrice[0]) / 1000;
      setLbpPrice(newPrice + "K  LBP");
    }
    setDate(date);
    if (props.btn === "save") {
      // the user is the buy page
      setBuy(true);
    } else if (props.btn === "remove") {
      // the user is the cart page
      setCart(true);
    } else if (props.btn === "saved") {
      // the user is the buy page and product is already saved
      setBuy(true);
      setSave(true);
    } else {
      // the user is the profile page
      setProfile(true);
    }
  }, []);

  let key = { product_id: props.id };

  const updateItem = () => {
    let item = {
      product_id: props.id,
      title: props.title,
      description: props.description,
      location: props.location,
      category: props.category,
      phone_number: props.phone_number,
      date: props.date,
      price: props.price,
      "sell-btn": props.sell_btn,
      image: props.img_base64_encoded,
    };

    dispatch(editProduct(item)); //add product to be edited to the redux state
    navigate("/sell");
  };

  const clcikedButton = async () => {
    if (!loggedIn) {
      dispatch(openLogInModal());
      return;
    }

    if (props.btn === "save") {
      await axios
        .post("http://127.0.0.1:8000/api/user/cart/save-product", key, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          setSave(true);
          dispatch(addCartProduct(props.id));
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (props.btn === "remove") {
      await axios
        .post("http://127.0.0.1:8000/api/user/cart/remove-product", key, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          dispatch(removeCartProduct(props.id));
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (props.btn === "delete") {
      await axios
        .post("http://127.0.0.1:8000/api/user/product/delete", key, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          dispatch(deleteCreatedProduct(props.id));
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box>
      {(buy || cart) && checkModal === props.id && (
        <FurnitureModal
          key={props.id}
          id={props.id}
          title={props.title}
          description={props.description}
          phone_number={props.phone_number}
          location={props.location}
          date={date}
          category={props.category}
          price={props.price}
          btn={(!cart && (save ? "saved" : "save")) || "cart"}
          img_base64_encoded={props.img_base64_encoded}
          saved_shippings={props.saved_shippings || ""}
          is_sold={props.is_sold}
        />
      )}

      <Card
        className="furniture-item-card"
        style={{
          margin: "1.5rem auto",
          padding: "3rem 1rem",
          borderRadius: "20px",
        }}
      >
        <CardActionArea
          onClick={() => {
            (buy || cart) && dispatch(openModal(props.id));
          }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {profile && (
            <Box style={{ alignSelf: "flex-end" }}>
              <EditIcon onClick={updateItem} sx={{ fontSize: 30 }} />
            </Box>
          )}

          <CardMedia
            style={{ borderRadius: "10px" }}
            component="img"
            height="200"
            width="300"
            image={props.img_base64_encoded || img}
            alt="furniture"
          />
          <div style={{ alignSelf: "flex-start", padding: "1rem" }}>
            <Typography
              style={{ fontWeight: "900" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {capitalizeFirstLetter(props.title)}
            </Typography>
            <Typography
              className="sell-furniture-item-content-box"
              variant="body2"
              color="text.secondary"
            >
              {capitalizeFirstLetter(props.description)}
            </Typography>

            <div className="sell-furniture-item-date-location">
              <Typography
                sx={{ fontSize: 13, fontWeight: "light" }}
                className="sell-furniture-item-date content-box"
                component="div"
                color="text.secondary"
              >
                {date}
              </Typography>
            </div>
          </div>
        </CardActionArea>
        <div className="sell-furniture-item-price-button">
          <Typography
            className="sell-furniture-item-price"
            variant="h5"
            color="text.secondary"
          >
            {lbpPrice || props.price}
          </Typography>
          {/* when the furniture item is sold */}
          {props.is_sold && (
            <Button
              disabled={true}
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
          {/* when user in buy page */}
          {!props.is_sold && buy && (
            <Button
              disabled={save}
              onClick={clcikedButton}
              className="sell-furniture-item-button"
              style={{
                color: "white",
                backgroundColor: "#5094AA",
                opacity:
                  // opacity is 1 when furniture item is already in the cart or is sold
                  save || props.btn === "saved" || checkProductSaved(props.id)
                    ? "1"
                    : "0.7",
              }}
              variant="outlined"
              // show endIcon when furniture item is already in the cart or is sold
              endIcon={
                (save ||
                  props.btn === "saved" ||
                  checkProductSaved(props.id)) && <DoneIcon />
              }
            >
              {/* when furniture item is added to  cart show "added" else "add to cart" */}
              {save || props.btn === "saved" || checkProductSaved(props.id)
                ? "Added"
                : "Add to Cart"}
            </Button>
          )}
          {/* when use is in cart page */}
          {!props.is_sold && cart && (
            <Button
              onClick={clcikedButton}
              className="sell-furniture-item-button"
              style={{ color: "white", backgroundColor: "#D86544" }}
              variant="outlined"
            >
              Remove
            </Button>
          )}
          {/* when use is in profile page */}
          {!props.is_sold && profile && (
            <Button
              onClick={clcikedButton}
              className="sell-furniture-item-button"
              style={{ color: "white", backgroundColor: "#D86544" }}
              variant="outlined"
              endIcon={<DeleteOutlineIcon />}
            >
              Delete
            </Button>
          )}
        </div>
      </Card>
    </Box>
  );
}
