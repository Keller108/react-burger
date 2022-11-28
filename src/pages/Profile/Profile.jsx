import { useState } from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Profile.module.css';

export function Profile() {
    const [name, setName] = useState('Никита');
    const [login, setLogin] = useState('Keller108');
    const [password, setPassword] = useState('initialPassword');

    return (
        <section className={styles.page}>
            <div className={styles.wrapper}>
                <div className={`${styles.sideColumn} pr-15`}>
                    <ul className={`${styles.tabs} mb-20`}>
                        <li>
                            <p className="text text_type_main-medium">Профиль</p>
                        </li>
                        <li>
                            <p className="text text_type_main-medium text_color_inactive">История заказов</p>
                        </li>
                        <li>
                            <p className="text text_type_main-medium text_color_inactive">Выход</p>
                        </li>
                    </ul>
                    <p className={`${styles.description} text text_type_main-default`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
                <form className={styles.form}>
                    <Input
                        onChange={e => setName(e.target.value)}
                        error={false}
                        value={name}
                        // onIconClick={clearName}
                        type='text'
                        placeholder='Имя'
                        icon='EditIcon'
                        name='name'
                        errorText='Ошибка'
                        size='default'
                        extraClass="mb-6"
                    />
                    <Input
                        onChange={e => setLogin(e.target.value)}
                        error={false}
                        value={login}
                        // onIconClick={clearName}
                        type='text'
                        placeholder='Логин'
                        icon='EditIcon'
                        name='name'
                        errorText='Ошибка'
                        size='default'
                        extraClass="mb-6"
                    />
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder='Пароль'
                        name='password'
                        icon='ClosEditIconeIcon'
                    />
                </form>
                <div className={styles.sideColumn}></div>
            </div>
        </section>
    )
}