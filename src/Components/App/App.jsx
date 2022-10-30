import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import data from '../../shared/data/data.json';
import { useEffect, useState } from 'react';

export function App() {
    const [types, setTypes] = useState([]);
    const [buns, setBuns] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [main, setMain] = useState([]);

    const ingredients = data;

    /** Возьмем массив data и найдем уникальные типы ингридиентов
     * добавив их в массив types, чтобы передать в кач-ве пропса в компонент BurgerIngredients
    */
    useEffect(() => {
        let uniqueTypes = new Set();
        ingredients.forEach((item) => uniqueTypes.add(item.type));
        let typesArray = Array.from(uniqueTypes);
        setTypes(typesArray);
    }, [])

    useEffect(() => {
        /** Создадим массив булок на основе массива исходного массва data*/
        let buns = ingredients.filter((item) => item.type === 'bun');
        setBuns(buns);
        /** Создадим массив соусов на основе массива исходного массва data*/
        let sauces = ingredients.filter((item) => item.type === 'sauce');
        setSauces(sauces);
        /** Создадим массив начинок на основе массива исходного массва data*/
        let main = ingredients.filter((item) => item.type === 'main');
        setMain(main);
    }, [types])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <main className={appStyles.main}>
                <BurgerIngredients
                    types={types}
                    buns={buns}
                    sauces={sauces}
                    main={main}
                />
                <BurgerConstructor />
            </main>
        </div>
    );
}
