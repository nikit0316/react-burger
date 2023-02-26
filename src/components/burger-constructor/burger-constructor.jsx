import React, {useCallback, useEffect, useState} from 'react'
import styles from './burger-construcor.module.css'
import {
    Button,
    ConstructorElement, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import "simplebar-react/dist/simplebar.min.css";
import {ReactComponent as Currency} from '../../Subtract.svg'
import OrderDetails from "../modal/order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {addIngredient, deleteIngredient, reorderIngedients} from "../../services/reducers/orderSlice";
import {useGetIngredientsQuery} from "../../services/reducers/ingredientAPI";
import ConstructorCard from "./constructor-card/constructor-card";

const BurgerConstructor = () => {
    const [orderVisible, setOrderVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState();
    const [sum, setSum] = useState(0);
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.order)

    const handleOpenOrderModal = () => {
        // postData(`${BURGER_API_URL}/orders`, {ingredients: ingredientsState.ingredients.map((ingredient) => ingredient._id)})
    }

    const {data: ingredients, error, isLoading} = useGetIngredientsQuery('');

    useEffect(() => {
        if (ingredients && !isLoading) {
            setSum(cart
                .map(ingredient => ingredients.data.find(x => x._id === ingredient._id))
                .reduce((total, ingredient, i) => i === 0 && ingredient.type === 'bun' ? total : total + ingredient.price, 0
            ))
        }
    },[cart])

    const [{ isOver }, dropRef] = useDrop({
        accept: 'ingredient',
        drop: (item) => dispatch(addIngredient(item.element)),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    async function postData(url = '', data = {}) {
    }
    const handleCloseOrderModal = () => {
        setOrderVisible(false)
    }

    const deletesIngredient = (id) => {
        dispatch(deleteIngredient(id))
    }

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

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(reorderIngedients({dragIndex, hoverIndex}))
        // setCards((prevCards) =>
        //     update(prevCards, {
        //         $splice: [
        //             [dragIndex, 1],
        //             [hoverIndex, 0, prevCards[dragIndex]],
        //         ],
        //     }),
        // )
    }, [cart])

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", maxHeight: '800px' }} ref={dropRef}>
                {isOver && <div>Кидай сюда</div>}
                {!isLoading && ingredients &&
          <div className={styles.ingredientList + ' custom-scroll' }>
              {cart
                  .map(ingredient => ingredients.data.find(x => x._id === ingredient._id))
                  .map(((ingredient, i) =>
                      ingredient.type !== 'bun' ?
          <div key={ingredient._id + i}>
            <ConstructorCard
              element={ingredient}
              id={ingredient._id}
              handleClose={(e) => deletesIngredient(ingredient._id, e)}
              index={i}
              moveCard={moveCard}
            />
          </div> : <div key={ingredient._id + i} className={styles.constructorCard + ' ' + styles.baseElement}>
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
          <div className={styles.constructorOrder} style={{alignSelf: "flex-end"}}>
              <p className="text text_type_digits-medium" style={{alignSelf: "center"}}>{sum}</p>
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
                </>
    );
}

// BurgerConstructor.propTypes = {
//     data: PropTypes.arrayOf(elementPropTypes).isRequired
// }
export default BurgerConstructor;