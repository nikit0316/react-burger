import styles from './order-details.module.css'
import {ReactComponent as Done} from '../../../graphics.svg'
const OrderDetails = (props) => {
    return (
            <div className={styles.orderModal}>
                <div className={styles.orderStatus}>
                    <p className="text text_type_digits-large" style={{alignSelf: 'center'}}>{props.orderInfo.order.number}</p>
                    <p className="text text_type_main-medium pt-8" style={{textAlign: 'center'}}>{props.orderInfo.name}</p>
                    <div className="pt-15 pb-15" style={{alignSelf:"center"}}>
                        <Done />
                    </div>
                    <p className="text text_type_main-default" style={{alignSelf: 'center'}}>Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default pt-2" style={{alignSelf: 'center'}}>Дождитесь готовности на орбитальной станции</p>
                </div>
            </div>
    )
}

export default OrderDetails;