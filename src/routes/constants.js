import Login from "../pages/Login";
import SignUp from "../pages/Signup";

export const LOGIN_ROUTE = {
    path:'/login',
    name:'login',
    component: Login
}

export const SIGNUP_ROUTE = {
    path:'/signup',
    name:'signup',
    component: SignUp
}

export const NAVBAR_ROUTES = [
    LOGIN_ROUTE,
    SIGNUP_ROUTE
]
