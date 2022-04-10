const modalSignUpReducer = (state = false, action) => {
  if (action.type === "OpenSignUpModal") {
    return true;
  } else if (action.type === "CloseSignUpModal") {
    return false;
  } else return state;
};

export default modalSignUpReducer;
