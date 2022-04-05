import React from "react";
import Main from "./layout/Main";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Buy from "./pages/buy";
import Sell from "./pages/sell";
import Delivery from "./pages/delivery";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import ProtectedRoutes from "./protectedRoutes";

function App() {
  return (
    <Main>
      {
        <div>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/sell" element={<Sell />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/cart" element={<Cart />} />
            </Route>
            <Route exact path="/*" element={<About />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/buy" element={<Buy />} />
            <Route exact path="/delivery" element={<Delivery />} />
          </Routes>
        </div>
      }
    </Main>
  );
}

export default App;
