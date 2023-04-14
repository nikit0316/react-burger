import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { useNavigate } from 'react-router-dom';
const AppHeader = () => {

  const navigate = useNavigate();
  const change = () => {
    navigate('/login');
  }
  return (
    <header className={styles.header}>
      <div className={styles.menuItemBlock}>
        <div className={styles.menuItem}>
          <div className="pl-5 pr-2">
            <BurgerIcon type="primary" />
          </div>
          <a className="text text_type_main-default pr-5 pt-4 pb-4">
            Конструктор
          </a>
        </div>
        <div className={styles.menuItem}>
          <div className="pl-5 pr-2">
            <ListIcon type="secondary" />
          </div>
          <a href='../' className="text text_type_main-default text_color_inactive pr-5 pt-4 pb-4">
            Лента заказов
          </a>
        </div>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div onClick={change} className={styles.menuItem}>
        <div className="pl-5 pr-2">
          <ProfileIcon type="secondary" />
        </div>
        <a className="text text_type_main-default text_color_inactive pr-5 pt-4 pb-4">
          Личный кабинет
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
