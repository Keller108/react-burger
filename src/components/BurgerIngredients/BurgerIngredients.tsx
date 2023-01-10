import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ingredientsStyle from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory';
import { SWITCH_TAB } from '../../services/constants/tab';
import { IIngredientItem } from '../../shared/types';
import { switchTab } from '../../services/actions/tab';

export function BurgerIngredients() {
    const dispatch = useDispatch();
    //@ts-ignore
    const ingredients = useSelector(store => store.ingredients.ingredientItems);
    //@ts-ignore
    const { tabs, activeTab } = useSelector(store => store.tabs);
    const [current, setCurrent] = useState<string>(activeTab);

    const rootRef = useRef<HTMLHeadingElement>(null);
	const bunRef = useRef<HTMLHeadingElement>(null);
	const sauceRef = useRef<HTMLHeadingElement>(null);
	const mainRef = useRef<HTMLHeadingElement>(null);

    const buns = useMemo(() => ingredients
        .filter((item: IIngredientItem) => item.type === 'bun'), [ingredients]);

    const sauces = useMemo(() => ingredients
        .filter((item: IIngredientItem) => item.type === 'sauce'), [ingredients]);

    const main = useMemo(() => ingredients
        .filter((item: IIngredientItem) => item.type === 'main'), [ingredients]);

    const tabsText = {
        bun: "Булки",
        sauce: "Соусы",
        main: "Начинка"
    };

    const handleSwitchTab = (type: string) => {
        dispatch(switchTab(type));
        setCurrent(type);
    };

    const getDistance = (
        parentRef: RefObject<HTMLHeadingElement>,
        elementRef: RefObject<HTMLHeadingElement>
    ): number => {
        if (parentRef && parentRef.current && elementRef && elementRef.current) {
            return Math.abs(parentRef.current.getBoundingClientRect()
                .top - elementRef.current.getBoundingClientRect().top);
        } else return 0;
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
        document.querySelector(`#${current}`)?.scrollIntoView();
	}, [current])

    return (
        <section className={`${ingredientsStyle.container} pt-10`}>
            <h1 className="text text_type_main-large pb-5">
                Соберите бургер
            </h1>
            <div className={`${ingredientsStyle.tabsContainer} pb-10`}>
                {tabs.map((type: string) => <Tab
                    key={type}
                    value={type}
                    active={activeTab === type}
                    onClick={() => handleSwitchTab(type)}
                >
                    {tabsText[type as keyof typeof tabsText]}
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
