import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card/Card';
import { Tabs } from '../Tabs/Tabs';
import ingredientsStyle from './BurgerIngredients.module.css';
import { ingredientPropType } from '../../shared/const/ingredientPropType';

export function BurgerIngredients({
    types,
    buns,
    sauces,
    main
}) {
    const [currentTab, setCurrentTab] = useState(null);

    useEffect(() => {
        setCurrentTab(types[0])
    }, [types])

    const handlePickTab = (type) => {
        setCurrentTab(type);
    };

    return (
        <section className={`${ingredientsStyle.container} pt-10`}>
            <h1 className="text text_type_main-large pb-5">
                Соберите бургер
            </h1>
            <Tabs currentTab={currentTab} setCurrentTab={handlePickTab} types={types} />
            <div className={`${ingredientsStyle.ingredients}`}>
                {currentTab === 'bun' && <>
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <ul className={`${ingredientsStyle.cards} pt-6 pl-4 pb-10 m-0`}>
                        {buns.map((bun) => <Card key={bun._id} {...bun}/>)}
                    </ul>
                </>}
                {currentTab === 'sauce' && <>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <ul className={`${ingredientsStyle.cards} pt-6 pl-4 pb-10 m-0`}>
                        {sauces.map((sauce) => <Card key={sauce._id} {...sauce}/>)}
                    </ul>
                </>}
                {currentTab === 'main' && <>
                    <h2 className="text text_type_main-medium">Начинка</h2>
                    <ul className={`${ingredientsStyle.cards} pt-6 pl-4 pb-10 m-0`}>
                        {main.map((main) => <Card key={main._id} {...main}/>)}
                    </ul>
                </>}
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    buns: PropTypes.arrayOf(ingredientPropType).isRequired,
    sauces: PropTypes.arrayOf(ingredientPropType).isRequired,
    main: PropTypes.arrayOf(ingredientPropType).isRequired
}
