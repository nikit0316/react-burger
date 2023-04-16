import styles from '../login/login.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const email = useRef(null);
    const restorePassword = async () => {
        console.log({email: email.current.value})
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
            body: JSON.stringify({email: email.current.value})
        })
    }

    const toLogin = () => {
        navigate('/login')
    }
    return <>
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <h2>Восстановление пароля</h2>
                <input ref={email} placeholder="Укажите e-mail" type="email" />
                 <Button onClick={restorePassword} htmlType="button" type="primary" size="medium">Восстановить</Button>
                <div>
                    <a>Вспомнили пароль?</a>
                    <a onClick={toLogin}> Войти</a>
                </div>
            </form>
        </div>
    </>
}

export default ForgotPassword;