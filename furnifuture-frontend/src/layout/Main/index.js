import React from "react";
import Navbar from "../../components/homeNavbar";

const Main = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Main;
