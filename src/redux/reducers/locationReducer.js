import axios from 'axios';

const getLocation = async()=>{

  let location;
  await axios.get('https://geolocation-db.com/json/')
  .then(result=>{
    console.log(result);
    location = result.data;
  })
  .catch((err)=>{console.log(err)})
  return location;
}

const locationReducer = (state=false, action)=>{
    
    if(action.type ==='SetLocation')
    {
        const location = getLocation();
        return location;
    }
    else return state;
};

export default locationReducer;