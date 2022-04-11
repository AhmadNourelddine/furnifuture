const authUserReducer = (state = false, action) => {
  if (action.type === "LoggedIn") {
    return action.payload;
  } else if (action.type === "LoggedOut") {
    return false;
  } else if (action.type === "UploadProfileImage") {
    let editState = state;
    editState.image = action.payload;
    return editState;
  } else if (action.type === "UpdateUser") {
    let updatedUser = state;
    updatedUser.name = action.payload.name;
    updatedUser.email = action.payload.email;
    return updatedUser;
  } else return state;
};

export default authUserReducer;
