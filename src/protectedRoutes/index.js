import {Outlet} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Login from '../pages/Login';

const ProtectedRoutes = ()=>{
        const navigate = useNavigate();
        let auth = useSelector(state=>state.authReducer);
        let checkShipping = useSelector(state=>state.authShippingReducer);
        return (auth && !checkShipping)? <Outlet/> : <Login/>;
};

export default ProtectedRoutes;