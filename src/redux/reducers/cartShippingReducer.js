
const cartShippingReducer = (state=false, action)=>{
    
    if(action.type ==='LoggedIn'){
        if(action.payload.saved_shipping  !== undefined)
       { return action.payload.saved_shipping;}
       else return state;
    }
    else if(action.type === 'RemoveCartShipping'){
        let filteredSavedShipping = state.filter(item => item !== action.payload);
        return filteredSavedShipping;
    }
    else if(action.type === 'AddCartShipping'){
        state.push(action.payload);
        return state;
    } 
    else if(action.type === 'LoggedOut'){
        return false;} 
    else return state;
};

export default cartShippingReducer;