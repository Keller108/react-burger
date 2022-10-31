import PropTypes from 'prop-types';
import { Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import contructorStyles from './BurgerConstructor.module.css';
import { ingredientPropType } from '../../shared/const/ingredientPropType';

export function BurgerConstructor({ ingredients }) {
    const bun = ingredients.find(ingredient => ingredient.type === 'bun');
    const otherIngredients = ingredients
        .filter(ingredient => ingredient.type !== 'bun');
    return (
        <section className={`${contructorStyles.constructor} pt-25 pb-13`}>
            <ul className={`${contructorStyles.items} pr-2`}>
                <li key={bun._id}
                    className={`${contructorStyles.constructorItem} pl-8`}
                    style={{cursor: 'default'}}
                >
                    <ConstructorElement
                        key={bun._id}
                        type="top"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>
                <div className={contructorStyles.itemWrapper}>
                    {otherIngredients.map((item) => <li key={item._id}
                        className={`${contructorStyles.constructorItem} mb-4`}>
                            <div className="mr-2">
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                key={item.name}
                                isLocked={false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>)
                    }
                </div>
                <li key={bun._id+1}
                    className={`${contructorStyles.constructorItem} pl-8`}
                    style={{cursor: 'default'}}
                >
                    <ConstructorElement
                        key={bun._id}
                        type="bottom"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>
            </ul>
            <div className={`${contructorStyles.total} mt-10`}>
                <span className={`${contructorStyles.price} mr-10`}>
                    <p className="text text_type_main-large mr-3">610</p>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}