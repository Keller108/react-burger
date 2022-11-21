import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ingredientsStyle from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory';
// import { Preloader } from '../Preloader/Preloader';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { SWITCH_TAB } from '../../services/actions';

export function BurgerIngredients() {

    const dispatch = useDispatch();

    const ingredients = useSelector(store => store.ingredients.ingredientItems);
    const { tabs, activeTab } = useSelector(store => store.tabs);

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

    const handleSwitchTab = (type) => dispatch({
        type: SWITCH_TAB, payload: type
    });

    return (
        <section className={`${ingredientsStyle.container} pt-10`}>
            <h1 className="text text_type_main-large pb-5">
                Соберите бургер
            </h1>
            <div className={`${ingredientsStyle.tabsContainer} pb-10`}>
                {tabs.map((type) => <Tab
                    key={type}
                    value={type}
                    active={activeTab === type}
                    onClick={() => handleSwitchTab(type)}
                >
                    {tabsText[type]}
                </Tab>)}
            </div>
            <div className={`${ingredientsStyle.ingredients}`}>
                <IngredientsCategory
                    title="Булки"
                    category={buns}
                />
                <IngredientsCategory
                    title="Соусы"
                    category={sauces}
                />
                <IngredientsCategory
                    title="Начинка"
                    category={main}
                />
            </div>
        </section>
    )
}
