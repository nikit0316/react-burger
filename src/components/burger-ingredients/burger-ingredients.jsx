import React, {useState} from 'react'
import styles from "./burger-ingredients.module.css";
import "simplebar-react/dist/simplebar.min.css";
import PropTypes from "prop-types"
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from './ingredient-card/ingredient-card';
import './../../App.css';
import {elementPropTypes} from "../../utils/prop-types";
const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState("bun");

    return (
      <div>
        <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>
        <div className={styles.tab}>
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.listIngredients + ' custom-scroll'}>
            <p className="text text_type_main-medium pt-10">Булки</p>
            <div className={styles.ingredients}>
              {props.data.map((element) => {
                if (element.type === "bun")
                  return <IngredientCard key={element._id} element={element} />;
              })}
            </div>
            <p className="text text_type_main-medium">Соусы</p>
            <div className={styles.ingredients}>
              {props.data.map((element) => {
                if (element.type === "sauce")
                  return <IngredientCard key={element._id} element={element} />;
              })}
            </div>
            <p className="text text_type_main-medium">Начинки</p>
            <div className={styles.ingredients}>
              {props.data.map((element) => {
                if (element.type === "main")
                  return <IngredientCard key={element._id} element={element} />;
              })}
            </div>
        </div>
      </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(elementPropTypes).isRequired
}
export default BurgerIngredients
