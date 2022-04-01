import authReducer from './authReducer';
import authUserReducer from './authUserReducer';
import authShippingReducer from './authShippingReducer';
import editProductReducer from './editProductReducer';
import modalReducer from './modalReducer';
import cartProductReducer from './cartProductReducer';
import cartShippingReducer from './cartShippingReducer';
import modalLoginReducer from './modalLoginReducer';
import modalSignUpReducer from './modalSignUpReducer';
import modalUpdateProfileReducer from './modalUpdateProfileReducer';
import modalShippingProfileReducer from './modalShippingProfileReducer';
import userProductsReducer from './userProductsReducer';
import locationReducer from './locationReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    authReducer,
    authShippingReducer,
    editProductReducer,
    authUserReducer,
    modalReducer,
    cartProductReducer,
    cartShippingReducer, 
    modalLoginReducer, 
    modalSignUpReducer,
    modalUpdateProfileReducer,
    modalShippingProfileReducer,
    userProductsReducer,
    locationReducer,
});

export default allReducers;

