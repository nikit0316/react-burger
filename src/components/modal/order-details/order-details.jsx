import styles from './order-details.module.css'
import {ReactComponent as Done} from '../../../graphics.svg'
import {useSelector} from "react-redux";
const OrderDetails = () => {
    const {orderNumber, orderName} = useSelector(state => state.modal)
    return (
            <div className={styles.orderModal}>
                <div className={styles.orderStatus}>
                    <p className="text text_type_digits-large">{orderNumber}</p>
                    <p className="text text_type_main-medium pt-8">{orderName}</p>
                    <div className="pt-15 pb-15">
                        <Done />
                    </div>
                    <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default pt-2">Дождитесь готовности на орбитальной станции</p>
                </div>
            </div>
    )
}

export default OrderDetails;