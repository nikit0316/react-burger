import styles from '../login/login.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useRef} from "react";
import {useAuth} from "../../utils/auth";

const Profile = () => {
    const navigate = useNavigate();
    let auth = useAuth();
    const toOrders = () => {
        navigate('orders')
    }

    const toLogin = () => {
        navigate('/login')
    }

    const logout = useCallback(
        () => {
            auth.signOut()
                .then(toLogin)
        },
        [auth]
    );


    return <>
        <div className={styles.formContainer}>
            <div className={styles.profileMenu}>
                <div className={styles.profileOption}>Профиль</div>
                <div className={styles.profileOption} onClick={toOrders}>Истории заказов</div>
                <div className={styles.profileOption} onClick={logout}>Выход</div>
            </div>
            <form style={{paddingRight: '320px'}} className={styles.form}>
                <input placeholder="Имя" name="name" type="text" />
                <input placeholder="E-mail" name="email" type="email" />
                <input placeholder="Пароль" name="password" type="password" />
            </form>
        </div>
    </>
}

export default Profile;