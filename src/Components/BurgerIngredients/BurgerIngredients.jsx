import { useState } from 'react';
import PropTypes from 'prop-types';
import ingredientsStyle from './BurgerIngredients.module.css';
import { ingredientPropType } from '../../shared/const/ingredientPropType';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory';

export function BurgerIngredients({
    data
}) {
    const [types,] = useState(['bun', 'sauce', 'main']);
    const [currentTab, setCurrentTab] = useState('bun');

    const handleSwitchTab = (type) => {
        setCurrentTab(type)
    };

    const buns = data.filter((item) => item.type === 'bun');
    const sauces = data.filter((item) => item.type === 'sauce');
    const main = data.filter((item) => item.type === 'main');

    const tabsText = {
        bun: "Булки",
        sauce: "Соусы",
        main: "начинка"
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
                <IngredientsCategory title="Булки" category={buns} />
                <IngredientsCategory title="Соусы" category={sauces} />
                <IngredientsCategory title="Начинка" category={main} />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}
