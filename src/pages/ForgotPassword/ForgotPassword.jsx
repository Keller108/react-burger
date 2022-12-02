import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPassword.module.css';
import { useDispatch } from 'react-redux';
import { checkUserExists } from '../../services/actions/user';

export function ForgotPassword() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckIfUserExists = () => dispatch(checkUserExists(email));

    const clearEmail = () => {
        setEmail('');
    };

    const handleSubmitForgotForm = async evt => {
        evt.preventDefault();
        await handleCheckIfUserExists();
        clearEmail();
        navigate('/reset-password');
    };

    return (
        <section className={styles.page}>
            <form onSubmit={handleSubmitForgotForm}
                className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    onIconClick={clearEmail}
                    value={email}
                    name='email'
                    placeholder="Укажите email"
                    icon='CloseIcon'
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                >
                    Восстановить
                </Button>
            </form>
            <ul className={styles.links}>
                <li>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вспомнили пароль? <Link to="/login">Войти</Link>
                    </p>
                </li>
            </ul>
        </section>
    )
}