import styles from './homepage.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const HomePage = () => {
    return <>
        <DndProvider backend={HTML5Backend}>
        <div className={styles.menuContainer}>
            <BurgerIngredients />
            <div className={styles.burgerConstructorContainer} >
                <BurgerConstructor />
            </div>
        </div>
        </DndProvider>
    </>
}

export default HomePage;