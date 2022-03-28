
export const addCartProduct = (product)=>{
    return{
        type:'AddCartProduct',
        payload: product,
    };
 };
 
 export const removeCartProduct = (product)=>{
    return{
        type:'RemoveCartProduct',
        payload: product,
    };
 };
 
 export const addCartShipping = (shipping)=>{
    return{
        type:'AddCartShipping',
        payload: shipping,
    };
 };
 
 export const removeCartShipping = (shipping)=>{
    return{
        type:'RemoveCartShipping',
        payload: shipping,
    };
 };