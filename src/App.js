
import React from 'react';
import Main from "./layout/Main";
import {Routes, Route} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import About from "./pages/about";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import ContactUs from './pages/contactUs/ContactUs';

function App() {
  return (
    <Main>
      { 
        <div>
          <Routes>
          <Route exact path="/*" element={<About/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/contact-us" element={<ContactUs/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      }
    </Main>
  );
}


export default App;
