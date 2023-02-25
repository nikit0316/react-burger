import React, {useEffect, useState} from 'react'
import styles from "./burger-ingredients.module.css";
import "simplebar-react/dist/simplebar.min.css";
import { useGetIngredientsQuery } from "../../services/reducers/ingredientAPI";

import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from './ingredient-card/ingredient-card';
import {useSelector} from "react-redux";
const BurgerIngredients = () => {
    const [current, setCurrent] = useState("bun");
    const {data: ingredients,error,isLoading} = useGetIngredientsQuery('');
    const { cart } = useSelector(state => state.order)

    return (
        <>
            {/*{ingredients.loading && <div>Loading...</div>}*/}
            {/*{!ingredients.loading && data.length &&*/}
            {isLoading && <div>Loading...</div>}
            {!isLoading && ingredients &&
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
              {ingredients.data.map((element) => {
                if (element.type === "bun")
                  return <IngredientCard key={element._id} element={element} count={cart.filter(x => x._id === element._id).length} />;
              })}
            </div>
            <p className="text text_type_main-medium">Соусы</p>
            <div className={styles.ingredients}>
              {ingredients.data.map((element) => {
                if (element.type === "sauce")
                  return <IngredientCard key={element._id} element={element} count={cart.filter(x => x._id === element._id).length} />;
              })}
            </div>
            <p className="text text_type_main-medium">Начинки</p>
            <div className={styles.ingredients}>
              {ingredients.data.map((element) => {
                if (element.type === "main")
                  return <IngredientCard key={element._id} element={element} count={cart.filter(x => x._id === element._id).length} />;
              })}
            </div>
        </div>
      </div>
            }
        </>
    );
}
export default BurgerIngredients
