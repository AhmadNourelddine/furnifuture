

export const loggedIn = (user)=>{
   return{
       type:'LoggedIn',
       payload:user,
   };
};

export const uploadProfileImage = (image)=>{
    return{
        type:'UploadProfileImage',
        payload: image,
    };
 };