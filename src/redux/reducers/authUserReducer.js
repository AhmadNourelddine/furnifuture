const authUserReducer = (state=false, action)=>{
    
    if(action.type ==='LoggedIn')
    {return action.payload;}
    else if(action.type === 'LoggedOut')
    {return false;}
    else if(action.type === 'UploadProfileImage')
    {   
        let editState = state;
        editState.image = action.payload;
        return editState;
    }
    else return state;
};

export default authUserReducer;