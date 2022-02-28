
import React from 'react';
import Main from "./layout/Main";
import {Routes, Route} from 'react-router-dom';
import Navbar from "./components/homeNavbar";
import HomeCarousel from "./components/carousel";
import About from "./pages/about";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <Main>
      { 
        <div>
          <Routes>
          <Route exact path="/" element={<About/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          </Routes>
        </div>
      }
    </Main>
  );
}

export default App;
