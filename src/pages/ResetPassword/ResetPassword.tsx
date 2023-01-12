import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPassword.module.css';
import { useDispatch, useSelector } from '../../shared/hooks';
import { resetPasswordRequest } from '../../services/actions/user';
import { LOGIN_ROUTE } from '../../shared/routes';
import { Preloader } from '../../components/Preloader';
import { loaderOff, loaderOn } from '../../services/actions/loader';

type TFormData = {
    password: string;
    token: string;
};

export function ResetPassword() {

    const { isLoading } = useSelector(store => store.appStore);
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleResetPassword = (data: TFormData) => dispatch(resetPasswordRequest(data));
    const clearCode = () => setCode('');

    const handleSubmitResetForm = async (evt: FormEvent) => {
        evt.preventDefault();
        dispatch(loaderOn());

        let result = await handleResetPassword({ password: password, token: code });

        setPassword('');
        clearCode();
        dispatch(loaderOff());

        // if (result && result.success) navigate(LOGIN_ROUTE);
    };

    return (
        <section className={styles.page}>
            {isLoading ? <Preloader /> : <>
                <form className={styles.form}>
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
                        onClick={handleSubmitResetForm}
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
            </>}
        </section>
    )
}