import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginModal from "../components/LoginModal";

const ProtectedRoutes = () => {
  let auth = useSelector((state) => state.authReducer);
  let checkShipping = useSelector((state) => state.authShippingReducer);
  return auth && !checkShipping ? <Outlet /> : <LoginModal />;
};

export default ProtectedRoutes;
