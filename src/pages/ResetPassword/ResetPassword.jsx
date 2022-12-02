import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPassword.module.css';
import { useDispatch } from 'react-redux';
import { resetPasswordRequest } from '../../services/actions/user';

export function ResetPassword() {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const dispatch = useDispatch();
    const handleResetPassword = dispatch(resetPasswordRequest({
        password: password,
        token: code
    }));

    const clearCode = () => {
        setCode('');
    };

    const handleSubmitResetForm = async () => {
        await handleResetPassword();
        setPassword('');
        clearCode();
    };

    return (
        <section className={styles.page}>
            <form onSubmit={handleSubmitResetForm}
                className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder='Введите новый пароль'
                    name='password'
                    extraClass="mb-6"
                />
                <Input
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    error={false}
                    onIconClick={clearCode}
                    icon='CloseIcon'
                    type='text'
                    placeholder='Введите код из письма'
                    name='code'
                    errorText='Ошибка'
                    size='default'
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                >
                    Сохранить
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