const modalLoginReducer = (state = false, action) => {
  if (action.type === "OpenLogInModal") {
    return true;
  } else if (action.type === "CloseLogInModal") {
    return false;
  } else return state;
};

export default modalLoginReducer;
