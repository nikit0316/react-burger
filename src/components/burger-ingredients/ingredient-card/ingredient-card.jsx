import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import Modal from "../../modal/modal";
import {elementPropTypes} from "../../../utils/prop-types";
const IngredientCard = (props) => {
    const [ingredientVisible, setIngredientVisible] = useState(false);

    const handleOpenIngredientModal = () => {
        setIngredientVisible(true)
    }
    const handleCloseIngredientModal = () => {
        setIngredientVisible(false)
    }


    const ingredientModal = (
        <Modal header='Детали ингридиента' onClose={handleCloseIngredientModal}>
            <IngredientDetails element={props.element}/>
        </Modal>
    );

    return (
        <>
      <div className={styles.ingredientCard} onClick={handleOpenIngredientModal}>
        <Counter />
        <img src={props.element.image} alt="oops" ></img>
        <div className={styles.price}>
          <p className="text text_type_main-large pt-1 pb-1 pr-2">
            {props.element.price}
          </p>
          <CurrencyIcon />
        </div>
        <p className="text text_type_main-default">{props.element.name}</p>
      </div>
            <div style={{overflow: 'hidden'}}>
                {ingredientVisible && ingredientModal}
            </div>
            </>
    );
}

IngredientCard.propTypes = {
    element: elementPropTypes
}
export default IngredientCard;