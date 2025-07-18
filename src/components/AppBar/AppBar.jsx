import React from "react";
import Icon from "../UI/Icon/Icon";
import styles from "./AppBar.module.css";
import { current } from "@reduxjs/toolkit";
import Container from "../Container/Container";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

function AppBar() {
  return (
    <Container>
      <header className={styles.headerWrapper}>
        <Icon
          className={styles.logo}
          width={136}
          height={15}
          stroke={"transparent"}
          name="icon-TravelTrucks"
        />
        <div className={styles.navBox}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(styles.navLink, { [styles.active]: isActive })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              clsx(styles.navLink, { [styles.active]: isActive })
            }
          >
            Catalog
          </NavLink>
        </div>
      </header>
    </Container>
  );
}

export default AppBar;
