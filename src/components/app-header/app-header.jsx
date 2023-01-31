import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.menuItemBlock}>
        <div className={styles.menuItem}>
          <div className="pl-5 pr-2">
            <BurgerIcon type="primary" />
          </div>
          <a href='../' className="text text_type_main-default pr-5 pt-4 pb-4" style={{textDecoration: 'none', color: '#FFFFFF'}}>
            Конструктор
          </a>
        </div>
        <div className={styles.menuItem}>
          <div className="pl-5 pr-2">
            <ListIcon type="secondary" />
          </div>
          <a href='../' className="text text_type_main-default text_color_inactive pr-5 pt-4 pb-4" style={{textDecoration: 'none'}}>
            Лента заказов
          </a>
        </div>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.menuItem}>
        <div className="pl-5 pr-2">
          <ProfileIcon type="secondary" />
        </div>
        <a href='../' className="text text_type_main-default text_color_inactive pr-5 pt-4 pb-4" style={{textDecoration: 'none'}}>
          Личный кабинет
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
