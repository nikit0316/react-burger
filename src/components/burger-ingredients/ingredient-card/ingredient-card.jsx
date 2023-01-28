import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import ModalOverlay from "../../modal/modal-overlay/modal-overlay";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import PropTypes from "prop-types";

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
const IngredientCard = (props) => {
    const [ingredientVisible, setIngredientVisible] = useState(false);

    const handleOpenIngredientModal = () => {
        setIngredientVisible(true)
    }
    const handleCloseIngredientModal = () => {
        setIngredientVisible(false)
    }


    const ingredientModal = (
        <ModalOverlay header='Детали ингридиента' onClose={handleCloseIngredientModal}>
            <IngredientDetails element={props.element}/>
        </ModalOverlay>
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
    props: PropTypes.instanceOf(elementPropTypes)
}
export default IngredientCard;