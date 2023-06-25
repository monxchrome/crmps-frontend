import React from 'react';
import css from './styles/footer.module.css'
import {Text} from "@nextui-org/react";
import {NavLink} from "react-router-dom";

const Footer = () => {
    const src = 'https://cdn-icons-png.flaticon.com/256/25/25694.png';

    return (
        <div className={css.Father}>
            <NavLink to={'/orders'} className={css.Home}>
                <div className={css.ImgDiv}>
                    <img src={src} alt="" className={css.Img}/>
                </div>
                <div className={css.HomeText}>
                    <Text className={css.HomeT}>Home</Text>
                </div>
            </NavLink>
        </div>
    );
};

export default Footer;
