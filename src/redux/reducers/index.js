import authReducer from './authReducer';
import authShippingReducer from './authShippingReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    authReducer,
    authShippingReducer,
});

export default allReducers;

