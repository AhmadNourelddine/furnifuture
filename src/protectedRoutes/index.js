import {Outlet} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Login from '../pages/Login';

const ProtectedRoutes = ()=>{
        const navigate = useNavigate();
        let auth = useSelector(state=>state.authReducer);
        return auth? <Outlet/> : <Login/>;
};

export default ProtectedRoutes;