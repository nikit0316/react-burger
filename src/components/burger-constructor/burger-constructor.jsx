import React, {useState} from 'react'
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

const BurgerConstructor = (props) => {
    const [orderVisible, setOrderVisible] = useState(false);
    const handleOpenOrderModal = () => {
        setOrderVisible(true)
    }
    const handleCloseOrderModal = () => {
        setOrderVisible(false)
    }

    const orderModal = (
        <Modal onClose={handleCloseOrderModal}>
            <OrderDetails />
        </Modal>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", maxHeight: '800px' }}>
          <div className={styles.constructorCard + ' ' + styles.baseElement}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={props.data[0].image}
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
          <div className={styles.constructorCard + ' ' + styles.baseElement}>
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