import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ingredientsStyle from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory';
import { Preloader } from '../Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';

export function BurgerIngredients({
    setModalState,
}) {
    const [types,] = useState(['bun', 'sauce', 'main']);
    const [currentTab, setCurrentTab] = useState('bun');

    const dispatch = useDispatch();

    const ingredients = useSelector(store => store.ingredients.ingredientItems);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    const buns = useMemo(() => ingredients
        .filter((item) => item.type === 'bun'), [ingredients]);

    const sauces = useMemo(() => ingredients
        .filter((item) => item.type === 'sauce'), [ingredients]);

    const main = useMemo(() => ingredients
        .filter((item) => item.type === 'main'), [ingredients]);

    const tabsText = {
        bun: "Булки",
        sauce: "Соусы",
        main: "Начинка"
    };

    const handleSwitchTab = (type) => {
        setCurrentTab(type)
    };

    return (
        <section className={`${ingredientsStyle.container} pt-10`}>
            <h1 className="text text_type_main-large pb-5">
                Соберите бургер
            </h1>
            <div className={`${ingredientsStyle.tabsContainer} pb-10`}>
                {types.map((type) => <Tab
                    key={type}
                    value={type}
                    active={currentTab === type}
                    onClick={handleSwitchTab}
                >
                    {tabsText[type]}
                </Tab>)}
            </div>
            <div className={`${ingredientsStyle.ingredients}`}>
                {
                // isLoading ? <Preloader /> :
                <>
                    <IngredientsCategory
                        title="Булки"
                        category={buns}
                        setModalState={setModalState}
                    />
                    <IngredientsCategory
                        title="Соусы"
                        category={sauces}
                        setModalState={setModalState}
                    />
                    <IngredientsCategory
                        title="Начинка"
                        category={main}
                        setModalState={setModalState}
                    />
                </>}
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    setModalState: PropTypes.func.isRequired,
}
