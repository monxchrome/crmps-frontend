import React from 'react';
import css from './styles/footer.module.css'
import {Text} from "@nextui-org/react";

const Footer = () => {
    const src = 'https://cdn-icons-png.flaticon.com/256/25/25694.png';

    return (
        <div className={css.Father}>
            <div className={css.Home}>
                <div className={css.ImgDiv}>
                    <img src={src} alt="" className={css.Img}/>
                </div>
                <div>
                    <Text>Home</Text>
                </div>
            </div>
        </div>
    );
};

export default Footer;
