const cartShippingReducer = (state = false, action) => {
  if (action.type === "LoggedIn") {
    if (action.payload.saved_shipping !== undefined) {
      return action.payload.saved_shipping;
    } else return state;
  } else if (action.type === "RemoveCartShipping") {
    let array = state;
    let filteredSavedShipping = array.filter((item) => item !== action.payload);
    return filteredSavedShipping;
  } else if (action.type === "AddCartShipping") {
    let array = state;
    array.push(action.payload);
    return array;
  } else if (action.type === "AddCartSuggestedShipping") {
    let array = state;
    let saved_shippings = action.payload;
    saved_shippings.map((shipping) => {
      array.push(shipping);
    });
    return array;
  } else if (action.type === "LoggedOut") {
    return false;
  } else return state;
};

export default cartShippingReducer;
