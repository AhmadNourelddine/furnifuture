
const authReducer = (state, action)=>{
    
    if(action.type ==='LoggedIn')
    {return true;}
    else if(action.type === 'isShipping')
    {return true;}
    else if(action.type === 'LoggedOut')
    {return false;}
    else 
    {return false;}
};

export default authReducer;