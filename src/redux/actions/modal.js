
export const openModal = (product)=>{
    return{
        type:'OpenModal',
        payload: product
    };
 };
 
 export const closeModal = ()=>{
    return{
        type:'CloseModal',
    };
 };
 