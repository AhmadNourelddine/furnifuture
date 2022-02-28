import React from 'react';
import Navbar from "../../components/homeNavbar";
import Footer from "../../components/footer";

const Main = ({children}) => {
    return  (
        <div >
            <Navbar />
            {children}
        </div>
    );
};

export default Main;