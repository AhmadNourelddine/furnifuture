
const modalUpdateProfileReducer = (state=false, action)=>{
    
    if(action.type ==='OpenUpdateProfileModal')
    {return true;}
    else if(action.type === 'CloseUpdateprofileModal')
    {return false;}
    else return state;
};

export default modalUpdateProfileReducer;