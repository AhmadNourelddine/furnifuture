const authShippingReducer = (state = false, action) => {
  if (action.type === "isShipping") {
    return true;
  } else if (action.type === "LoggedOut") {
    return false;
  } else return state;
};

export default authShippingReducer;
