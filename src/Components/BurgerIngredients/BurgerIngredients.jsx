import { useState } from 'react';
import PropTypes from 'prop-types';
import ingredientsStyle from './BurgerIngredients.module.css';
import { ingredientPropType } from '../../shared/types/commonTypes';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory';

export function BurgerIngredients({
    data,
    setModalState
}) {
    const [types,] = useState(['bun', 'sauce', 'main']);
    const [currentTab, setCurrentTab] = useState('bun');

    const buns = data.filter((item) => item.type === 'bun');
    const sauces = data.filter((item) => item.type === 'sauce');
    const main = data.filter((item) => item.type === 'main');

    const tabsText = {
        bun: "Булки",
        sauce: "Соусы",
        main: "Начинка"
    };

    const handleSwitchTab = (type) => {
        setCurrentTab(type)
    }

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
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}
