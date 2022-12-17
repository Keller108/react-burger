import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Login.module.css';
import { signIn } from '../../services/actions/user';
import { SHOP_ROUTE } from '../../shared/routes';

export function LoginPage() {
    //@ts-ignore
    const { isLogined } = useSelector(store => store.userStore);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state;
    //@ts-ignore
    const handleLogin = data => dispatch(signIn(data));

    const submitLoginForm = async (evt: FormEvent) => {
        evt.preventDefault();
        let result = await handleLogin({ email: email, password: password });

        setEmail('');
        setPassword('');

        if (result && result.success) {
            navigate(state?.from || SHOP_ROUTE);
        }
    };

    useEffect(() => {
        if (isLogined) navigate(state?.from || SHOP_ROUTE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogined])

    return (
        <section className={styles.page}>
            <form onSubmit={submitLoginForm} className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Вход</h2>
                <EmailInput
                    onChange={(e: ChangeEvent) => {
                        let eventTarget = e.target as HTMLInputElement;
                        setEmail(eventTarget.value);
                    }}
                    value={email}
                    name='email'
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