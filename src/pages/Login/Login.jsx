import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Login.module.css';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChange = e => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };

    const clearEmail = () => {
        setEmail('');
    };

    return (
        <section className={styles.page}>
            <form className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Вход</h2>
                <EmailInput
                    onChange={onChange}
                    value={email}
                    name='email'
                    icon={'CloseIcon'}
                    onIconClick={clearEmail}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChange}
                    value={password}
                    name='password'
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                >
                   Войти
                </Button>
            </form>
            <ul className={styles.links}>
                <li>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
                    </p>
                </li>
                <li>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль? <Link to="/reset-password">Восстановить пароль</Link>
                        </p>
                </li>
            </ul>
        </section>
    )
}