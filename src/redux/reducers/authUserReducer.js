const authUserReducer = (state=false, action)=>{
    
    if(action.type ==='LoggedIn')
    {return action.payload;}
    else if(action.type === 'LoggedOut')
    {return false;}
    else return state;
};

export default authUserReducer;