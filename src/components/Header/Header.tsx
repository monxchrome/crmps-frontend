import { Text } from "@nextui-org/react";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import css from "./styles/header.module.css";

const Header: FC = () => {
  return (
    <div className={css.Father}>
      <NavLink to={"/orders"} className={css.Mother}>
        <div>
          <Text size="$md" className={css.Content}>
            Content Window
          </Text>
        </div>
        <div>
          <Text h2 className={css.Dashboard}>
            Dashboard
          </Text>
        </div>
      </NavLink>
    </div>
  );
};

export default Header;
