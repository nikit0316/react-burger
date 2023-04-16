import styles from '../login/login.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";

const ResetPassword = () => {
    const navigate = useNavigate();

    const passwordRef = useRef(null);
    const tokenRef = useRef(null);
    const changePassword = async () => {
        console.log({email: passwordRef.current.value})
        return await fetch('https://norma.nomoreparties.space/api/password-reset', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({password: passwordRef.current.value, token: tokenRef.current.value})
        })
    }

    const toLogin = () => {
        navigate('/login')
    }
    return <>
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <h2>Восстановление пароля</h2>
                <input ref={passwordRef} placeholder="Введите новый пароль" type="email" />
                <input ref={tokenRef} placeholder="Введите код из письма" type="email" />
                <Button onClick={changePassword} htmlType="button" type="primary" size="medium">Сохранить</Button>
                <div>
                    <a>Вспомнили пароль?</a>
                    <a onClick={toLogin}> Войти</a>
                </div>
            </form>
        </div>
    </>
}

export default ResetPassword;