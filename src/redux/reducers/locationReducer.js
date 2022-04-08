import axios from "axios";

const getLocation = async () => {
  let location;
  await axios
    .get("https://geolocation-db.com/json/")
    .then((result) => {
      console.log(result);
      location = result.data;
      window.localStorage.setItem("city", location.city);
      return location;
    })
    .catch((err) => {
      console.log(err);
    });
};

const locationReducer = (state = false, action) => {
  if (action.type === "SetLocation") {
    return getLocation();
  } else {
    return state;
  }
};
export default locationReducer;
