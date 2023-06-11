import React, {FC} from 'react';
import Header from "../../components/Header/Header";
import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const MainLayout:FC = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;
