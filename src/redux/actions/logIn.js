

export const loggedIn = (user)=>{
   return{
       type:'LoggedIn',
       payload:user,
   };
};

export const updateUser = (user)=>{
    return{
        type:'UpdateUser',
        payload:user,
    };
 };

export const uploadProfileImage = (image)=>{
    return{
        type:'UploadProfileImage',
        payload: image,
    };
 };


 export const setFirebaseToken = (token)=>{
    return{
        type:'SetFirebaseToken',
        payload: token,
    };
 };
