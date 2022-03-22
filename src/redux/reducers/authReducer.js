
const authReducer = (state, action)=>{
    
    if(action.type ==='LoggedIn')
    {return true;}
    else if(action.type === 'loggedOut')
    {return false;}
    else 
    {return false;}
    // switch(action.type){
    //     case 'LoggedIn':
    //         return true
    //     case 'LoggedOut':
    //         return false;
    //     defualt:
    //         return false;
    // }
};

export default authReducer;