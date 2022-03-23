import React from 'react';
import Main from "./layout/Main";
import {Routes, Route} from 'react-router-dom';
import About from "./pages/about";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import UpdateProfile from "./pages/update-profile";
import ContactUs from './pages/contactUs/ContactUs';
import Buy from './pages/buy';
import Sell from './pages/sell';
import Delivery from './pages/delivery';
import CreateShippingProfile from './pages/create-shipping-profile/create-shipping-profile';
import Cart from './pages/cart';
import Profile from './pages/profile';
import ProfileShipping from './pages/profile-shipping';
import ProtectedRoutes from './protectedRoutes';

function App() {
  return (
    <Main>
      { 
        <div>
          <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route exact path="/sell" element={<Sell/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/profile-shipping" element={<ProfileShipping/>} />
            <Route path="/dashboard" element={<UpdateProfile />} />
            <Route exact path="/cart" element={<Cart/>} />
          </Route>
          <Route exact path="/*" element={<About/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/buy" element={<Buy/>} />
          <Route exact path="/delivery" element={<Delivery/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/contact-us" element={<ContactUs/>} />
          <Route exact path="/create-shipping-profile" element={<CreateShippingProfile/>} />
          </Routes>
        </div>
      }
    </Main>
  );
}


export default App;
