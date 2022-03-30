
export const openModal = (product)=>{
    return{
        type:'OpenModal',
        payload: product,
    };
 };
 
 export const closeModal = ()=>{
    return{
        type:'CloseModal',
    };
 };
 
 export const openLogInModal = (product)=>{
    return{
        type:'OpenLogInModal',
        payload: product,
    };
 };
 
 export const closeLogInModal = ()=>{
    return{
        type:'CloseLogInModal',
    };
 };
 
 export const openSignUpModal = (product)=>{
    return{
        type:'OpenSignUpModal',
        payload: product,
    };
 };
 
 export const closeSignUpModal = ()=>{
    return{
        type:'CloseSignUpModal',
    };
 };
 
 export const openUpdateProfileModal = ()=>{
    return{
        type:'OpenUpdateProfileModal',
    };
 };
 
 export const closeUpdateProfileModal = ()=>{
    return{
        type:'CloseUpdateProfileModal',
    };
 };

 export const openShippingProfileModal = ()=>{
    return{
        type:'OpenShippingProfileModal',
    };
 };
 
 export const closeShippingProfileModal = ()=>{
    return{
        type:'CloseShippingProfileModal',
    };
 };