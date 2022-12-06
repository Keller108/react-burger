import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../services/actions/user';
import { SHOP_ROUTE } from '../../utils/routes';

export function Login() {
    const { isLogined } = useSelector(store => store.userStore);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = data => dispatch(signIn(data));

    const clearEmail = () => {
        setEmail('');
    };

    const submitLoginForm = async evt => {
        evt.preventDefault();

        let result = await handleLogin({ email: email, password: password });
        clearEmail();
        setPassword('');

        if (result && result.success) {
            navigate(SHOP_ROUTE);
        }
    };

    useEffect(() => {
        isLogined && navigate(SHOP_ROUTE);
    }, [])

    return (
        <section className={styles.page}>
            <form onSubmit={submitLoginForm} className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Вход</h2>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    onIconClick={clearEmail}
                    value={email}
                    name='email'
                    icon='CloseIcon'
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
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