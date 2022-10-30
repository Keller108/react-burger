import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import contructorStyles from './BurgerConstructor.module.css';

export function BurgerConstructor({ buns, sauces, main }) {
    let allIngredients = [...buns, ...sauces, ...main];

    /** На текущем этапе вывел на компонент все ингридиенты, чтобы проверить верстку.
     * В дальнейшем сюда будут добавляться добавленные в конструктор элементы */
    return (
        <section className={`${contructorStyles.constructor} pt-25 pb-13`}>
            <ul className={`${contructorStyles.items} pr-2`}>
                {allIngredients.map(item => {
                    if (allIngredients.indexOf(item) !== 0 && allIngredients.indexOf(item) !== allIngredients.length - 1) {
                        return <li className={contructorStyles.constructorItem}>
                            <div className="mr-2">
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                type={allIngredients.indexOf(item) === 0
                                    ? "top" : allIngredients.indexOf(item) === allIngredients.length - 1
                                        ? "bottom" : null}
                                isLocked={(allIngredients.indexOf(item) === 0
                                    ? true : allIngredients.indexOf(item) === allIngredients.length - 1) ? true
                                        : false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    } else {
                        return <li className={`${contructorStyles.constructorItem} pl-8`} style={{cursor: 'default'}}>
                            <ConstructorElement
                                type={allIngredients.indexOf(item) === 0
                                    ? "top" : allIngredients.indexOf(item) === allIngredients.length - 1
                                        ? "bottom" : null}
                                isLocked={(allIngredients.indexOf(item) === 0
                                    ? true : allIngredients.indexOf(item) === allIngredients.length - 1) ? true
                                        : false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    }
                })}
            </ul>
            <div className={`${contructorStyles.total} mt-10`}>
                <span className={`${contructorStyles.price} mr-10`}>
                    <p className="text text_type_main-large mr-3">610</p>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}