import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useState } from 'react';
import { editUser } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../shared/hooks';
import styles from './ProfileForm.module.css';

export const ProfileForm = () => {
    const store = useSelector(state => state.userStore);

    const [userName, setUserName] = useState<string>(store?.user?.name ?? '');
    const [userEmail, setUserEmail] = useState<string>(store?.user?.email ?? '');
    const [userPassword, setUserPassword] = useState<string>(store?.user?.password ?? '');

    const dispatch = useDispatch();

    const handleSubmit = () => dispatch(
        editUser({
            email: userEmail,
            name: userName,
            password: userPassword
        })
    );

    const handleFormSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        await handleSubmit();
    };

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <Input
                onChange={e => setUserName(e.target.value)}
                error={false}
                value={userName}
                type='text'
                placeholder='Имя'
                icon='EditIcon'
                name='name'
                errorText='Ошибка'
                size='default'
                extraClass="mb-6"
            />
            <Input
                onChange={e => setUserEmail(e.target.value)}
                error={false}
                value={userEmail}
                type='text'
                placeholder='Логин'
                icon='EditIcon'
                name='email'
                errorText='Ошибка'
                size='default'
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={e => setUserPassword(e.target.value)}
                value={userPassword}
                placeholder='Пароль'
                name='password'
            />
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
                extraClass="mt-8"
            >Сохранить</Button>
        </form>
    )
};