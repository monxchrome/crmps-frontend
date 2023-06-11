import React from 'react';
import {User} from "@nextui-org/react";
import css from './styles/order.module.css'
import {NavLink} from "react-router-dom";

const Order = ({order}:{order: any}) => {
    const avatar = 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'
    const arrow = 'https://www.freeiconspng.com/thumbs/arrow-icon/arrow-icon--myiconfinder-23.png'
    const {
        _id,
        name,
        surname,
    } = order
    return (
        <NavLink to={_id} className={css.Father}>
                <User src={avatar} name={`${name}  ${surname}`} size="lg"/>
                <div>
                    <img src={arrow} alt="" className={css.Arrow}/>
                </div>
        </NavLink>
    );
};

export default Order;
