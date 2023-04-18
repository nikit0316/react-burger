import styles from '../login/login.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useCallback, useRef, useState} from "react";
import {useAuth} from "../../utils/auth";

const Registration = () => {
    const navigate = useNavigate();
    let auth = useAuth();
    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let register = useCallback(
        e => {
            e.preventDefault();
            auth.register(form);
        },
        [auth, form]
    );

    if (auth.user) {
        navigate('/')
    }
    const toLogin = () => {
        navigate('/login')
    }

    return <>
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <h2>Регистрация</h2>
                <input placeholder="Имя" name="name" type="text" onChange={onChange} />
                <input placeholder="E-mail" name="email" type="email" onChange={onChange} />
                <input placeholder="Пароль" name="password" type="password" onChange={onChange} />
                <Button onClick={register} htmlType="button" type="primary" size="medium">Зарегистрироваться</Button>
                <div >
                    <a>Уже зарегистрированы?</a>
                    <a onClick={toLogin}> Войти</a>
                </div>
            </form>
        </div>
    </>
}

export default Registration;