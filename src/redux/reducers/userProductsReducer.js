
const userProductsReducer = (state=false, action)=>{
    
    if(action.type ==='LoggedIn'){
        if(action.payload.user_products !== undefined)
       { return action.payload.user_products;}
       else return state;
    }
    else if(action.type === 'DeleteCreatedProduct'){
        let filteredUserproducts = state.filter(item => item !== action.payload);
        return filteredUserproducts;
    }
    else if(action.type === 'CreateNewProduct'){
        state.push(action.payload);
        return state;
    }
    else if(action.type === 'LoggedOut'){
        return false;} 
    else return state;
};

export default userProductsReducer;