import React, {useState} from 'react'
import styles from './burger-construcor.module.css'
import {
    Button,
    ConstructorElement, CurrencyIcon, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import "simplebar-react/dist/simplebar.min.css";
import {ReactComponent as Currency} from '../../Subtract.svg'
import ModalOverlay from "../modal/modal-overlay/modal-overlay";
import OrderDetails from "../modal/order-details/order-details";
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
const BurgerConstructor = (props) => {
    const [orderVisible, setOrderVisible] = useState(false);
    const handleOpenOrderModal = () => {
        setOrderVisible(true)
    }
    const handleCloseOrderModal = () => {
        setOrderVisible(false)
    }

    const orderModal = (
        <ModalOverlay onClose={handleCloseOrderModal}>
            <OrderDetails />
        </ModalOverlay>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", maxHeight: '800px' }}>
          <div className={styles.constructorCard}>
            <DragIcon />
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={props.data[0].image}
              extraClass={styles.cardInfo}
            />
          </div>
          <div className={styles.constructorCard}>
            <DragIcon />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={props.data[0].image}
            />
          </div>
          <div className={styles.constructorCard}>
            <DragIcon />
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={props.data[0].image}
            />
          </div>
          <div className={styles.constructorOrder} style={{alignSelf: "flex-end"}}>
              <p className="text text_type_digits-medium" style={{alignSelf: "center"}}>450</p>
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