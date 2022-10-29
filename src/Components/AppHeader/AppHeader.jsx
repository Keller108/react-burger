import { useState } from 'react';
import { BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './AppHeader.module.css';
import { buttonTypes } from '../../shared/const/buttonTypes';

export function AppHeader() {
    const [isIconBurgerPrimary, setIsIconBurgerPrimary] = useState(false);
    const [isIconListPrimary, setIsIconListPrimary] = useState(false);
    const [isIconProfilePrimary, setIsIconProfilePrimary] = useState(false);

    /**  Определение состояния иконки для компонента BurgerIcon */
    let burgerIconType = isIconBurgerPrimary ? buttonTypes.primary : buttonTypes.secondary;

    /** Определение состояния иконки для компонента ListIcon */
    let listIconType = isIconListPrimary ? buttonTypes.primary : buttonTypes.secondary;

    /** Определение состояния иконки для компонента ProfileIcon */
    let profileIconType = isIconProfilePrimary ? buttonTypes.primary : buttonTypes.secondary;

    return (
        <header className={`${appHeaderStyles.header} p-4`}>
            <div className={appHeaderStyles.container}>
                <nav className={appHeaderStyles.navigation}>
                    <div className={appHeaderStyles.headerColumn}>
                        <button
                            className={`${appHeaderStyles.navigationItem}
                                text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
                            onMouseEnter={() => setIsIconBurgerPrimary(true)}
                            onMouseLeave={() => setIsIconBurgerPrimary(false)}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <BurgerIcon type={burgerIconType} />
                            </span>
                            Конструктор
                        </button>
                        <button
                            className={`${appHeaderStyles.navigationItem}
                                text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
                            onMouseEnter={() => setIsIconListPrimary(true)}
                            onMouseLeave={() => setIsIconListPrimary(false)}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <ListIcon type={listIconType} />
                            </span>
                            Лента заказов
                        </button>
                    </div>
                    <div className={appHeaderStyles.headerColumn}>
                        <Logo />
                    </div>
                    <div className={appHeaderStyles.headerColumn}>
                        <button
                            className={`${appHeaderStyles.navigationItem}
                                text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
                            onMouseEnter={() => setIsIconProfilePrimary(true)}
                            onMouseLeave={() => setIsIconProfilePrimary(false)}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <ProfileIcon type={profileIconType} />
                            </span>
                            Личный кабинет
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}