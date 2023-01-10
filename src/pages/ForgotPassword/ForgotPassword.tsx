import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPassword.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordRequest } from '../../services/actions/user';
import { RESET_ROUTE } from '../../shared/routes';
import { Preloader } from '../../components/Preloader';
import { loaderOff, loaderOn } from '../../services/actions/loader';

export function ForgotPassword() {
    //@ts-ignore
    const { isLoading } = useSelector(store => store.appStore);
    const [emailInput, setEmailInput] = useState({
        value: '',
        error: false,
        errText: 'Укажите валидный email'
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckIfUserExists = async (data: { email: string }) => dispatch(
        //@ts-ignore
        forgotPasswordRequest(data)
    );

    const handleSubmitForgotForm = async (evt: FormEvent) => {
        evt.preventDefault();
        dispatch(loaderOn());

        if (emailInput.value) {
            setEmailInput(prev => ({...prev, error: false }));
            let res = await handleCheckIfUserExists({ email: emailInput.value });

            dispatch(loaderOff());
            setEmailInput(prev => ({ ...prev, value: '' }));

            if (res && res.success) navigate(RESET_ROUTE);
        } else {
            setEmailInput(prev => ({...prev, error: true }));
            dispatch(loaderOff());
        }
    };

    return (
        <section className={styles.page}>
            {isLoading ? <Preloader /> : <>
                <form onSubmit={handleSubmitForgotForm}
                    className={styles.form}>
                    <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                    <EmailInput
                        onChange={e => setEmailInput(prev => ({ ...prev, value: e.target.value}))}
                        value={emailInput.value}
                        name='email'
                        placeholder="Укажите email"
                        isIcon={true}
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
            </>}
        </section>
    )
}