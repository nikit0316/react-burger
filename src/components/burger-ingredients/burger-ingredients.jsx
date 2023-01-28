import React, {useState} from 'react'
import styles from "./burger-ingredients.module.css";
import "simplebar-react/dist/simplebar.min.css";
import PropTypes from "prop-types"
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from './ingredient-card/ingredient-card';
import './../../App.css';

const element = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  replyTo: PropTypes.number,
  text: PropTypes.string.isRequired
});

const elementPropTypes = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
})


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
                  return <IngredientCard element={element} />;
              })}
            </div>
            <p className="text text_type_main-medium">Соусы</p>
            <div className={styles.ingredients}>
              {props.data.map((element) => {
                if (element.type === "sauce")
                  return <IngredientCard element={element} />;
              })}
            </div>
            <p className="text text_type_main-medium">Начинки</p>
            <div className={styles.ingredients}>
              {props.data.map((element) => {
                if (element.type === "main")
                  return <IngredientCard element={element} />;
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
