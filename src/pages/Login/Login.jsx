import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Login.module.css';
import { useDispatch } from 'react-redux';
import { signIn } from '../../services/actions/user';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleLogin = () => dispatch(signIn({ email: email, password: password }));

    const onChange = e => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const clearEmail = () => {
        setEmail('');
    };

    const submitLoginForm = async (evt) => {
        evt.preventDefault();
        await handleLogin();
        clearEmail();
    };

    return (
        <section className={styles.page}>
            <form onSubmit={submitLoginForm} className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Вход</h2>
                <EmailInput
                    onChange={onChange}
                    onIconClick={clearEmail}
                    value={email}
                    name='email'
                    icon='CloseIcon'
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
                        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
                        </p>
                </li>
            </ul>
        </section>
    )
}