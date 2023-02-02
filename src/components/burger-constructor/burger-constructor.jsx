import React, {useContext, useEffect, useReducer, useState} from 'react'
import styles from './burger-construcor.module.css'
import {
    Button,
    ConstructorElement, CurrencyIcon, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import "simplebar-react/dist/simplebar.min.css";
import {ReactComponent as Currency} from '../../Subtract.svg'
import OrderDetails from "../modal/order-details/order-details";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import {elementPropTypes} from "../../utils/prop-types";
import {BurgerContext} from "../../services/burger-context";

const ingredientsInitialState = {
    ingredients: [],
    sum: 2510
}
function reducer(state, action) {
    switch (action.type) {
        case "add":
            return {
                ingredients: [...state.ingredients, action.payload],
                sum: state.sum + action.payload.price
            };
        case "reset":
            return ingredientsInitialState;
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}
const BurgerConstructor = () => {
    const [orderVisible, setOrderVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState();
    const [ingredientsState, ingredientsDispatcher] = useReducer(reducer, ingredientsInitialState, undefined)
    const {data} = useContext(BurgerContext)
    const handleOpenOrderModal = () => {
        postData('https://norma.nomoreparties.space/api/orders', {ingredients: ingredientsState.ingredients})

    }

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => setOrderInfo(data))
    }
    const handleCloseOrderModal = () => {
        setOrderVisible(false)
    }
    const getRandomIngredient = () => {
        const number = Math.floor(Math.random() * 15)
        const ingredient = data[number];
        if (ingredient.type === 'bun'){
            return getRandomIngredient();
        }
        else return ingredient;
    }

    useEffect(() => {
        for (let i = 0; i < 3; i++)
        {
            ingredientsDispatcher({type: 'add', payload: getRandomIngredient()})
        }
        return () => ingredientsDispatcher({type: 'reset'})
    },[])

    useEffect(() => {
        if (orderInfo !== undefined) {
            setOrderVisible(true)
        }
    },[orderInfo])

    const orderModal = (
        <Modal onClose={handleCloseOrderModal}>
                <OrderDetails orderInfo={orderInfo}/>
        </Modal>
    );

    const bun = data[0];

    return (
      <div style={{ display: "flex", flexDirection: "column", maxHeight: '800px' }}>
          <div className={styles.constructorCard + ' ' + styles.baseElement}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + ' (верх)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <div>
              {ingredientsState.ingredients.map((ingredient =>
          <div className={styles.constructorCard} key={ingredient._id}>
            <DragIcon />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div>
              ))}
          </div>
          <div className={styles.constructorCard + ' ' + styles.baseElement}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + ' (низ)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <div className={styles.constructorOrder} style={{alignSelf: "flex-end"}}>
              <p className="text text_type_digits-medium" style={{alignSelf: "center"}}>{ingredientsState.sum}</p>
              <div className="pl-2 pr-10" style={{alignSelf: 'center'}}>
                  <Currency />
              </div>
              <Button htmlType="button" type="primary" size="large" onClick={handleOpenOrderModal}>
                  Создать заказ
              </Button>
              <div style={{overflow: 'hidden'}}>
                  {orderVisible && orderModal}
              </div>
          </div>
      </div>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(elementPropTypes).isRequired
}
export default BurgerConstructor;