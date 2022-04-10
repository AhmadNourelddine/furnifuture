const cartProductReducer = (state = false, action) => {
  if (action.type === "LoggedIn") {
    if (action.payload.saved_products !== undefined) {
      return action.payload.saved_products;
    } else return state;
  } else if (action.type === "RemoveCartProduct") {
    let filteredSavedproducts = state.filter((item) => item !== action.payload);
    return filteredSavedproducts;
  } else if (action.type === "AddCartProduct") {
    state.push(action.payload);
    return state;
  } else if (action.type === "LoggedOut") {
    return false;
  } else return state;
};

export default cartProductReducer;
