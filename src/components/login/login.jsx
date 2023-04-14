import styles from './login.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

const Login = () => {
    return <>
    <div className={styles.formContainer}>
        <form className={styles.form}>
            <h2>Вход</h2>
            <input placeholder="E-mail" type="email" />
            <input placeholder="Пароль" type="password" />
            <Button htmlType="button" type="primary" size="medium">Войти</Button>
            <div>
                <a>Вы - новый пользователь?</a>
                <a> Зарегистрироваться</a>
            </div>
            <div>
                <a>Забыли пароль?</a>
                <a> Восстановить пароль</a>
            </div>
        </form>
    </div>
    </>
}

export default Login;