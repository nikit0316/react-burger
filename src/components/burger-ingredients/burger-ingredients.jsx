import React, {useEffect, useState} from 'react'
import styles from "./burger-ingredients.module.css";
import "simplebar-react/dist/simplebar.min.css";
import { useGetIngredientsQuery } from "../../services/reducers/ingredientAPI";

import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from './ingredient-card/ingredient-card';
import {useSelector} from "react-redux";
import uuid from "react-uuid";
import {Link} from "react-router-dom";
const BurgerIngredients = () => {
    const [tabValue, setTabValue] = useState('bun')
    const {data: ingredients,isLoading} = useGetIngredientsQuery('');
    const { cart } = useSelector(state => state.order)

    useEffect(() => {
        if (!isLoading) {
            const box = document.querySelector('.custom-scroll');
            box.addEventListener("scroll", event => {
                if (box.scrollTop > 300 && box.scrollTop < 810 && tabValue !== 'sauce') {
                    setTabValue('sauce')
                }
                else if (box.scrollTop > 810 && tabValue !== 'main') {
                    setTabValue('main')
                } else if (tabValue !== 'bun'){
                    setTabValue('bun')
                }
            })
        }
    },[isLoading, tabValue])

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {!isLoading && ingredients &&
            <div>
        <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>
        <div className={styles.tab}>
          <Tab value="bun" active={tabValue === "bun"}>
            Булки
          </Tab>
          <Tab value="sauce" active={tabValue === "sauce"}>
            Соусы
          </Tab>
          <Tab value="main" active={tabValue === "main"}>
            Начинки
          </Tab>
        </div>
        <div className={styles.listIngredients + ' custom-scroll'}>
            <p className="text text_type_main-medium pt-10">Булки</p>
            <div className={styles.ingredients}>
              {ingredients.data.map((element) => {
                if (element.type === "bun")
                  return <IngredientCard key={uuid()} element={element} id={element._id} count={cart.filter(x => x._id === element._id).length} />
              })}
            </div>
            <p className="text text_type_main-medium">Соусы</p>
            <div className={styles.ingredients}>
              {ingredients.data.map((element) => {
                if (element.type === "sauce")
                  return <IngredientCard key={uuid()} element={element} id={element._id} count={cart.filter(x => x._id === element._id).length} />;
              })}
            </div>
            <p className="text text_type_main-medium">Начинки</p>
            <div className={styles.ingredients}>
              {ingredients.data.map((element) => {
                if (element.type === "main")
                  return <IngredientCard key={uuid()} element={element} id={element._id} count={cart.filter(x => x._id === element._id).length} />;
              })}
            </div>
        </div>
      </div>
            }
        </>
    );
}
export default BurgerIngredients
