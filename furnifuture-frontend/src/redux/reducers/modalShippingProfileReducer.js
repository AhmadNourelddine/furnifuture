const modalShippingProfileReducer = (state = false, action) => {
  if (action.type === "OpenShippingProfileModal") {
    return true;
  } else if (action.type === "CloseShippingProfileModal") {
    return false;
  } else return state;
};

export default modalShippingProfileReducer;
