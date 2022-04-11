const editProductReducer = (state = false, action) => {
  if (action.type === "EditProduct") {
    return action.payload;
  } else if (action.type === "RemoveProduct") {
    return false;
  } else return state;
};

export default editProductReducer;
