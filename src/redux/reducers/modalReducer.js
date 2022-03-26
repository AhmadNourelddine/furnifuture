
const modalReducer = (state=false, action)=>{
    
    if(action.type ==='OpenModal')
    {return true;}
    else if(action.type === 'CloseModal')
    {return false;}
    else return state;
};

export default modalReducer;