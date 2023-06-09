import React, {FC} from 'react';
import css from './styles/header.module.css'
import {Text} from "@nextui-org/react";

const Header:FC = () => {
    return (
        <div className={css.Father}>
            <div className={css.Mother}>
                <div>
                    <Text size="$md" className={css.Content}>Content Window</Text>
                </div>
                <div>
                    <Text h2 className={css.Dashboard}>Dashboard</Text>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Header;
