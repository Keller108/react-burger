import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { useEffect, useState } from 'react';

const BASE_API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(BASE_API_URL);
                const result = await res.json();
                setApiData(result.data);
            } catch (error) {
                console.log(`Ошибка при обращении к ресурсу ${BASE_API_URL}:`, error.message)
            }
        }
        getData();
    }, [])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <main className={appStyles.main}>
                <BurgerIngredients
                    data={apiData}
                />
                <BurgerConstructor
                    ingredients={apiData}
                />
            </main>
        </div>
    );
}