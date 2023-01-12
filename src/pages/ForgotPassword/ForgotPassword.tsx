import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPassword.module.css';
import { useDispatch, useSelector } from '../../shared/hooks';
import { forgotPasswordRequest, setDefault } from '../../services/actions/user';
import { RESET_ROUTE } from '../../shared/routes';
import { Preloader } from '../../components/Preloader';
import { loaderOff, loaderOn } from '../../services/actions/loader';

export function ForgotPassword() {
    const { isLoading } = useSelector(store => store.appStore);
    const { request, success } = useSelector(store => store.userStore);
    const [emailInput, setEmailInput] = useState({
        value: '',
        error: false,
        errText: 'Укажите валидный email'
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckIfUserExists = (data: { email: string }) => dispatch(
        forgotPasswordRequest(data)
    );

    const handleSubmitForgotForm = (evt: FormEvent) => {
        evt.preventDefault();
        // dispatch(loaderOn());

        if (emailInput.value) {
            setEmailInput(prev => ({...prev, error: false }));
            handleCheckIfUserExists({ email: emailInput.value });
            // dispatch(loaderOff());
            setEmailInput(prev => ({ ...prev, value: '' }));
        } else {
            setEmailInput(prev => ({...prev, error: true }));
            // dispatch(loaderOff());
        }
    };

    useEffect(() => {
        if (success === true) {
            navigate(RESET_ROUTE);
            setDefault();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    useEffect(() => console.log('success status', success), [success]);

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