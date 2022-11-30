import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Register.module.css';
import { useDispatch } from 'react-redux';
import { signUp } from '../../services/actions/user';

export function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleRegister = () => dispatch(signUp({ email: email, password: password, name: name }));

    const onChange = e => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        } else {
            setName(e.target.value);
        }
    };

    const clearEmail = () => {
        setEmail('');
    };

    const clearName = () => {
        setName('');
    };

    const submitRegisterForm = async (evt) => {
        evt.preventDefault();
        await handleRegister();
        clearEmail();
        clearName();
    };

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
                    onChange={onChange}
                    onIconClick={clearEmail}
                    value={email}
                    placeholder='E-mail'
                    name='email'
                    icon='CloseIcon'
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChange}
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