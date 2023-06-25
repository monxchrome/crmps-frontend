import React from "react";
import { NavLink } from "react-router-dom";

import css from "./styles/e422.module.css";

const E404Page = () => {
  return (
    <div className={css.Father}>
      <p className={css.zoomArea}> Oops... we have some problem </p>
      <section className={css.errorContainer}>
        <span>4</span>
        <span>
          <span className={css.screenReaderText}>2</span>
        </span>
        <span>2</span>
      </section>
      <div className={css.linkContainer}>
        <NavLink to={"/orders"} className={css.moreLink} rel="noreferrer">
          Visit the original article
        </NavLink>
      </div>
    </div>
  );
};

export default E404Page;
