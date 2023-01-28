import styles from './order-details.module.css'
import {ReactComponent as Done} from '../../../graphics.svg'
const OrderDetails = () => {
    return (
            <div className={styles.orderModal}>
                <div className={styles.orderStatus}>
                    <p className="text text_type_digits-large" style={{alignSelf: 'center'}}>03456</p>
                    <p className="text text_type_main-medium pt-8" style={{textAlign: 'center'}}>Идентификатор заказа</p>
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