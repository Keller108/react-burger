import { Card } from '../Card/Card';
import { Tabs } from '../Tabs/Tabs';
import ingredientsStyle from './BurgerIngredients.module.css';

export function BurgerIngredients({
    types,
    buns,
    sauces,
    main
}) {
    console.log(buns);
    return (
        <section className={`${ingredientsStyle.container} pt-10`}>
            <h1 className="text text_type_main-large pb-5">
                Соберите бургер
            </h1>
            <Tabs types={types} />
            <h2 className="text text_type_main-medium">Булки</h2>
            <ul className={`${ingredientsStyle.cards} pt-6 pl-4 pb-10 m-0`}>
                {buns.map((bun) => <Card key={bun._id} {...bun}/>)}
            </ul>
            <h2 className="text text_type_main-medium">Соусы</h2>
            <ul className={`${ingredientsStyle.cards} pt-6 pl-4 pb-10 m-0`}>
                {sauces.map((sauce) => <Card key={sauce._id} {...sauce}/>)}
            </ul>
            <h2 className="text text_type_main-medium">Начинка</h2>
            <ul className={`${ingredientsStyle.cards} pt-6 pl-4 pb-10 m-0`}>
                {main.map((main) => <Card key={main._id} {...main}/>)}
            </ul>
        </section>
    )
}