import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import Modal from "../../modal/modal";
import {elementPropTypes} from "../../../utils/prop-types";
import {useDrag} from "react-dnd";
import {changeIngredientData} from "../../../services/reducers/modalSlice";
import {useDispatch} from "react-redux";
const IngredientCard = (props) => {
    const [ingredientVisible, setIngredientVisible] = useState(false);
    const dispatch = useDispatch()
    const element = props.element;
    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingredient',
        item: { element },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    const handleOpenIngredientModal = () => {
        dispatch(changeIngredientData(element))
        setIngredientVisible(true)
    }
    const handleCloseIngredientModal = () => {
        setIngredientVisible(false)
    }

    const ingredientModal = (
        <Modal header='Детали ингридиента' onClose={handleCloseIngredientModal}>
            <IngredientDetails/>
        </Modal>
    );

    return (
        <>
      <div className={styles.ingredientCard} onClick={handleOpenIngredientModal} ref={dragRef}>
        <Counter count={props.count}/>
        <img src={props.element.image} alt="oops" ></img>
        <div className={styles.price}>
          <p className="text text_type_main-large pt-1 pb-1 pr-2">
            {props.element.price}
          </p>
          <CurrencyIcon />
        </div>
        <p className="text text_type_main-default">{props.element.name}</p>
      </div>
            <div>
                {ingredientVisible && ingredientModal}
            </div>
            </>
    );
}

IngredientCard.propTypes = {
    element: elementPropTypes
}
export default IngredientCard;