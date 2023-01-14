import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Register.module.css';
import { useDispatch, useSelector } from '../../shared/hooks';
import { signUp } from '../../services/actions/user';
import { IUserModel } from '../../shared/types';
import { SHOP_ROUTE } from '../../shared/routes';

export function RegisterPage() {
    const { isLogined } = useSelector(store => store.userStore);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = () => dispatch(
        signUp({ email: email, password: password, name: name } as IUserModel)
    );

    const clearEmail = () => {
        setEmail('');
    };

    const clearName = () => {
        setName('');
    };

    const submitRegisterForm = async (evt: FormEvent) => {
        evt.preventDefault();
        await handleRegister();

        clearEmail();
        clearName();
        setPassword('');
    };

    useEffect(() => {
        if (isLogined) navigate(SHOP_ROUTE);
    }, [isLogined])

    return (
        <section className={styles.page}>
            <form onSubmit={submitRegisterForm} className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
                <Input
                    onChange={e => setName(e.target.value)}
                    error={false}
                    value={name}
                    onIconClick={clearName}
                    type='text'
                    placeholder='Имя'
                    icon='CloseIcon'
                    name='name'
                    errorText='Ошибка'
                    size='default'
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder='E-mail'
                    name='email'
                    isIcon={true}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder='Пароль'
                    name='password'
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                >
                    Зарегистрироваться
                </Button>
            </form>
            <ul className={styles.links}>
                <li>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Уже зарегистрированы? <Link to="/login">Войти</Link>
                    </p>
                </li>
            </ul>
        </section>
    )
}