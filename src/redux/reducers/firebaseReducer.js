
const firebaseReducer = (state=false, action)=>{
    
    if(action.type ==='SetFirebaseToken')
    {return action.payload;}
    else return state;
};

export default firebaseReducer;