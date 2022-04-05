import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import { Autocomplete, Button, Grid, Typography } from "@mui/material";
import { TextField } from "@material-ui/core";
import "../../css/buy/buy.css";
import FurnitureItem from "../../components/furnitureItem";
import { useSelector } from "react-redux";
import { category } from "../../drop-down-list";

const Buy = () => {
  const [searching, setSearching] = useState(false);

  const [search, setSearch] = useState("");
  const [categ, setCateg] = useState("");

  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [resultFound, setResultFound] = useState(true);

  const loggedIn = useSelector((state) => state.authReducer);

  const saved_products = useSelector((state) => state.cartProductReducer);

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

  const getRandomProducts = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/random-products")
      .then((response) => {
        setData(response.data[0]);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchFurniture = async () => {
    let object = {
      search: search,
      category: categ,
    };
    console.log(object);
    await axios
      .post("http://127.0.0.1:8000/api/search-products", object)
      .then((response) => {
        setResult(response.data[0]);
        if (response.data[0].length === 0) {
          setResultFound(false);
        } else {
          setResultFound(true);
        }
        setSearching(true);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <div className="buy-page">
      <Typography style={{ paddingLeft: "2rem" }} className="buy-page-title">
        Find Furniture
      </Typography>
      <div className="buy-furniture-search">
        <SearchBar
          className="buy-search-bar"
          value={search}
          onChange={(newValue) => {
            setSearch(newValue);
            console.log(newValue);
          }}
        />
        <Autocomplete
          className="buy-search-category"
          disablePortal
          options={category}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              variant="standard"
              className="buy-page-search-category-textfield"
              {...params}
              value={categ}
              label="Category"
            />
          )}
          onChange={(event, value) => {
            setCateg(value);
          }}
        />
        <Button onClick={searchFurniture} className="buy-search-btn">
          Search
        </Button>
      </div>
      <div className="buy-page-items">
        {!searching &&
          data.map((item) => (
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
                btn={checkProductSaved(item._id) ? "saved" : "save"}
                img_base64_encoded={item.image}
              />
            </Grid>
          ))}
        {searching &&
          result &&
          result.map((item) => (
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
                btn={checkProductSaved(item._id) ? "saved" : "save"}
                img_base64_encoded={item.image}
              />
            </Grid>
          ))}
        {!resultFound && (
          <Typography fontSize={40} style={{ padding: "2rem 3rem" }}>
            No Results Found ...
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Buy;
