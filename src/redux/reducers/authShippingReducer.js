
const authShippingReducer = (state, action)=>{
    
    if(action.type ==='isShipping'){
        return true;}
    else if(action.type === 'LoggedOut'){
        return false;} 
    else {
        return false;}
};

export default authShippingReducer;