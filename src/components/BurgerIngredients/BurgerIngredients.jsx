import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ingredientsStyle from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { SWITCH_TAB } from '../../services/actions';

export function BurgerIngredients() {
    const dispatch = useDispatch();

    const ingredients = useSelector(store => store.ingredients.ingredientItems);
    const { tabs, activeTab } = useSelector(store => store.tabs);

    const [current, setCurrent] = useState(activeTab);

    const rootRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

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
        dispatch({
            type: SWITCH_TAB, payload: type
        });
        setCurrent(type);
    };

    function getDistance(parentRef, elementRef) {
        return Math.abs(parentRef.current.getBoundingClientRect()
            .top - elementRef.current.getBoundingClientRect().top);
    }

	const handleScroll = () => {
		const bunDistance = getDistance(rootRef, bunRef);
		const sauceDistance = getDistance(rootRef, sauceRef);
		const mainDistance = getDistance(rootRef, mainRef);

		const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);

		const activeTab = minDistance === bunDistance
            ? 'bun' : minDistance === sauceDistance
            ? 'sauce' : 'main';

        handleSwitchTab(activeTab);
	};

    useEffect(() => {
		document.querySelector(`#${current}`).scrollIntoView();
	}, [current])

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
            <div ref={rootRef} onScroll={handleScroll} className={`${ingredientsStyle.ingredients}`}>
                <IngredientsCategory
                    title="Булки"
                    id="bun"
                    category={buns}
                    ref={bunRef}
                />
                <IngredientsCategory
                    title="Соусы"
                    id="sauce"
                    category={sauces}
                    ref={sauceRef}
                />
                <IngredientsCategory
                    title="Начинка"
                    id="main"
                    category={main}
                    ref={mainRef}
                />
            </div>
        </section>
    )
}
