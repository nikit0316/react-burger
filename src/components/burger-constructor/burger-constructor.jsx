import React, {useContext, useEffect, useReducer, useState} from 'react'
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
import {useDrop} from "react-dnd";
import {addIngredient, addNumber} from "../../services/reducers/orderSlice";
import {useGetIngredientsQuery} from "../../services/reducers/ingredientAPI";

const BurgerConstructor = () => {
    const [orderVisible, setOrderVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState();
    const [sum, useSum] = useState(0);
    const dispatch = useDispatch();
    const {cart, number} = useSelector(state => state.order)
    const handleOpenOrderModal = () => {
        // postData(`${BURGER_API_URL}/orders`, {ingredients: ingredientsState.ingredients.map((ingredient) => ingredient._id)})
    }

    const {data: ingredients,error,isLoading} = useGetIngredientsQuery('');

    useEffect(() => {
        console.log(cart)
        console.log(ingredients)
        if (ingredients && !isLoading) {
            console.log('sup')
            console.log(ingredients.data.filter(ingredient => cart.includes(ingredient._id)))
        }
    },[cart])

    const [{ isOver }, dropRef] = useDrop({
        accept: 'ingredient',
        drop: (item) => dispatch(addIngredient(item.id)),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    async function postData(url = '', data = {}) {

    }
    const handleCloseOrderModal = () => {
        setOrderVisible(false)
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

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", maxHeight: '800px' }} ref={dropRef}>
                {isOver && <div>Кидай сюда</div>}
                {isLoading && ingredients &&
          <div>
              {ingredients.data
                  .filter(ingredient => cart.includes(ingredient._id))
                  .map(((ingredient, i) =>
                      ingredient.type !== 'bun' ?
          <div className={styles.constructorCard} key={ingredient._id + i}>
            <DragIcon />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div> : <div key={ingredient._id + i} className={styles.constructorCard + ' ' + styles.baseElement}>
                              <ConstructorElement
                                  type={i > 0 ? 'bottom' : 'top'}
                                  isLocked={true}
                                  text={cart.name + ' (верх)'}
                                  price={cart.price}
                                  thumbnail={cart.image}
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