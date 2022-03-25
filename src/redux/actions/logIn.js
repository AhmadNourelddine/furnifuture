

const loggedIn = (user)=>{
   return{
       type:'LoggedIn',
       payload:user,
   };
};

export default loggedIn;