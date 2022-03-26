import authReducer from './authReducer';
import authUserReducer from './authUserReducer';
import authShippingReducer from './authShippingReducer';
import editProductReducer from './editProductReducer';
import modalReducer from './modalReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    authReducer,
    authShippingReducer,
    editProductReducer,
    authUserReducer,
    modalReducer,
});

export default allReducers;

