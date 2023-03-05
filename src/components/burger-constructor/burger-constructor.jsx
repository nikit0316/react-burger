import React, {useCallback, useEffect, useState} from 'react'
import styles from './burger-construcor.module.css'
import {
    Button,
    ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import "simplebar-react/dist/simplebar.min.css";
import {ReactComponent as Currency} from '../../Subtract.svg'
import OrderDetails from "../modal/order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredient, deleteIngredient, reorderIngedients} from "../../services/reducers/orderSlice";
import {useGetIngredientsQuery, useAddOrderMutation} from "../../services/reducers/ingredientAPI";
import ConstructorCard from "./constructor-card/constructor-card";
import {changeData} from "../../services/reducers/modalSlice";
import uuid from 'react-uuid';

const BurgerConstructor = () => {
    const [orderVisible, setOrderVisible] = useState(false);
    const [sum, setSum] = useState(0);
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.order)
    const [addNewOrder] = useAddOrderMutation();

    const handleOpenOrderModal = async () => {
        // postData(`${BURGER_API_URL}/orders`, {ingredients: ingredientsState.ingredients.map((ingredient) => ingredient._id)})
        const result = await addNewOrder({ingredients: cart.map(ingredient => ingredient._id)})
            .unwrap()
            .catch((error) => {
                throw new Error(error)
            })
        dispatch(changeData(result))
        setOrderVisible(true)
    }

    const {data: ingredients, isLoading} = useGetIngredientsQuery('');

    useEffect(() => {
        if (ingredients && !isLoading) {
            setSum(cart
                .map(ingredient => ingredients.data.find(x => x._id === ingredient._id))
                .reduce((total, ingredient, i) => i === 0 && ingredient.type === 'bun' ? total : total + ingredient.price, 0
            ))
        }
    },[cart, ingredients, isLoading])

    const [{ isOver }, dropRef] = useDrop({
        accept: 'ingredient',
        drop: (item) => dispatch(addIngredient(item.element)),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    const handleCloseOrderModal = () => {
        setOrderVisible(false)
    }

    const deletesIngredient = (id) => {
        dispatch(deleteIngredient(id))
    }

    const orderModal = (
        <Modal onClose={handleCloseOrderModal}>
                <OrderDetails/>
        </Modal>
    );

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(reorderIngedients({dragIndex, hoverIndex}))
    }, [cart])

    return (
        <>
            <div className={styles.constructorContainer} style={{ display: "flex", flexDirection: "column", maxHeight: '800px' }} ref={dropRef}>
                {isOver && <div>Кидай сюда</div>}
                {!isLoading && ingredients &&
          <div className={styles.ingredientList + ' custom-scroll' }>
              {cart
                  .map(ingredient => ingredients.data.find(x => x._id === ingredient._id))
                  .map(((ingredient, i) =>
                      ingredient.type !== 'bun' ?
          <div key={uuid()}>
            <ConstructorCard
              element={ingredient}
              id={ingredient._id}
              handleClose={(e) => deletesIngredient(ingredient._id, e)}
              index={i}
              moveCard={moveCard}
            />
          </div> : <div key={uuid()} className={styles.constructorCard + ' ' + styles.baseElement}>
                              <ConstructorElement
                                  type={i > 0 ? 'bottom' : 'top'}
                                  isLocked={true}
                                  text={ingredient.name + (i <= 0 ? '(верх)' : '(низ)')}
                                  price={ingredient.price}
                                  thumbnail={ingredient.image}
                              />
                          </div>
              ))}
          </div>
            }
          <div className={styles.constructorOrder}>
              <p className="text text_type_digits-medium">{sum}</p>
              <div className="pl-2 pr-10">
                  <Currency />
              </div>
              <Button htmlType="button" type="primary" size="large" onClick={handleOpenOrderModal}>
                  Создать заказ
              </Button>
              <div>
                  {orderVisible && orderModal}
              </div>
          </div>
      </div>
                </>
    );
}

// BurgerConstructor.propTypes = {
//     data: PropTypes.arrayOf(elementPropTypes).isRequired
// }
export default BurgerConstructor;