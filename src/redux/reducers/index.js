import authReducer from './authReducer';
import authShippingReducer from './authShippingReducer';
import editProductReducer from './editProductReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    authReducer,
    authShippingReducer,
    editProductReducer,
});

export default allReducers;

