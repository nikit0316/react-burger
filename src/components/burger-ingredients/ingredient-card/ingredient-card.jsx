import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useEffect, useState} from "react";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import Modal from "../../modal/modal";
import {elementPropTypes} from "../../../utils/prop-types";
import {useDrag} from "react-dnd";
import {changeIngredientData} from "../../../services/reducers/modalSlice";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

export const IngredientModal= (props) => {
    const handleCloseIngredientModal = props.handleCloseIngredientModal;
    return (
        <Modal header='Детали ингридиента' onClose={handleCloseIngredientModal}>
            <IngredientDetails />
        </Modal>
)};
const IngredientCard = (props) => {
    const [ingredientVisible, setIngredientVisible] = useState(false);
    const dispatch = useDispatch()
    const element = props.element;
    const id = props.id;
    const navigate = useNavigate();
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
        navigate(`ingredients/${id}`, {state:
        {
            modal: true
        }
    })
    }
    // const handleCloseIngredientModal = () => {
    //     setIngredientVisible(false)
    //     console.log('i tried')
    // }


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
                {/*{ingredientVisible && IngredientModal({handleCloseIngredientModal: handleCloseIngredientModal})}*/}
            </div>
            </>
    );
}

IngredientCard.propTypes = {
    element: elementPropTypes
}
export default IngredientCard;