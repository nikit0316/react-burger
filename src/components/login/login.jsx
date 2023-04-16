import styles from './login.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useCallback, useRef, useState} from "react";
import {useAuth} from "../../utils/auth";

const Login = () => {
    const navigate = useNavigate()
    let auth = useAuth();

    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let login = useCallback(
        e => {
            e.preventDefault();
            auth.signIn(form);
        },
        [auth, form]
    );

    if (auth.user) {
            navigate('/')
    }
    const toRegister = () => {
        navigate("/register")
    }

    const toForgot = () => {
        navigate("/forgot-password")
    }

    return <>
    <div className={styles.formContainer}>
        <form className={styles.form}>
            <h2>Вход</h2>
            <input value={form.email} placeholder="E-mail" type="email" name="email" onChange={onChange} />
            <input value={form.password} placeholder="Пароль" type="password" name="password" onChange={onChange} />
            <Button onClick={login} htmlType="button" type="primary" size="medium">Войти</Button>
            <div>
                <a>Вы - новый пользователь?</a>
                <a onClick={toRegister}> Зарегистрироваться</a>
            </div>
            <div>
                <a>Забыли пароль?</a>
                <a onClick={toForgot}> Восстановить пароль</a>
            </div>
        </form>
    </div>
    </>
}

export default Login;