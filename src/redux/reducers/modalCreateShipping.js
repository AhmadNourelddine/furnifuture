const modalCreateShipping = (state = false, action) => {
  if (action.type === "OpenCreateShippingProfileModal") {
    return true;
  } else if (action.type === "CloseCreateShippingProfileModal") {
    return false;
  } else return state;
};

export default modalCreateShipping;
