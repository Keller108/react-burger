import { Tabs } from '../Tabs/Tabs';
import ingredientsStyle from './BurgerIngredients.module.css';

export function BurgerIngredients() {
    return (
        <section className={`${ingredientsStyle.container} pt-10`}>
            <h1 className="text text_type_main-large pb-5">
                Соберите бургер
            </h1>
            <Tabs />
        </section>
    )
}