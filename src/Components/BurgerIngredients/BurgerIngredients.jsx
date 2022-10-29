import { Card } from '../Card/Card';
import { Tabs } from '../Tabs/Tabs';
import ingredientsStyle from './BurgerIngredients.module.css';

export function BurgerIngredients() {
    const array = [1, 2, 3, 4, 5, 6];
    return (
        <section className={`${ingredientsStyle.container} pt-10`}>
            <h1 className="text text_type_main-large pb-5">
                Соберите бургер
            </h1>
            <Tabs />
            <ul className={ingredientsStyle.cards}>
                {array.map((card) => <Card key={card}/>)}
            </ul>
        </section>
    )
}