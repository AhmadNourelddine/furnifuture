const modalContactUs = (state=false, action)=>{
    
    if(action.type ==='OpenContactUsModal')
    {return true;}
    else if(action.type === 'CloseContactUsModal')
    {return false;}
    else return state;
};

export default modalContactUs;