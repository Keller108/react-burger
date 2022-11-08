import PropTypes from 'prop-types';
import { Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import contructorStyles from './BurgerConstructor.module.css';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { useContext, useEffect, useMemo } from 'react';
import { BurgerConstructorContext } from '../../services/productsContext';

export function BurgerConstructor({ setModalState, handleOrderRequest }) {
    const {
        ingredients, totalPrice, setTotalPrice
    } = useContext(BurgerConstructorContext);

    const handleModalState = async () => {
        await handleOrderRequest();
        setModalState({
            isActive: true,
            content: <OrderDetails />
        });
    };

    const bun = useMemo(() => ingredients
        .find(ingredient => ingredient.type === 'bun'), [ingredients]);

    const otherIngredients = useMemo(() => ingredients
        .filter(ingredient => ingredient.type !== 'bun'), [ingredients]);

    const countTotalPrice = useMemo(() => {
        let total;
        let otherIngredientsPrice = otherIngredients.reduce((prev, curr) => {
            return prev + curr.price
        }, 0);

        if (bun) {
            total = otherIngredientsPrice + bun.price;
        }

        return total;
    }, [ingredients])

    useEffect(() => {
        if (bun) {
            setTotalPrice(countTotalPrice);
        }
    }, [ingredients, bun])

    return (
        <section className={`${contructorStyles.constructor} pt-25 pb-13`}>
            <ul className={`${contructorStyles.items} pr-2`}>
                {bun && <li className={`${contructorStyles.constructorItem} pl-8`}>
                    <ConstructorElement
                        key={bun._id}
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>}
                <div className={contructorStyles.itemWrapper}>
                    {otherIngredients.map((item) => <li key={item._id}
                            className={`${contructorStyles.constructorItem}
                            ${contructorStyles.constructorItem_dragable} mb-4`}
                        >
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
                {bun && <li className={`${contructorStyles.constructorItem} pl-8`}>
                    <ConstructorElement
                        key={bun._id}
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>}
            </ul>
            <div className={`${contructorStyles.total} mt-10`}>
                <span className={`${contructorStyles.price} mr-10`}>
                    <p className="text text_type_main-large mr-3">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </span>
                <Button onClick={handleModalState}
                    htmlType="button"
                    type="primary"
                    size="large"
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    setModalState: PropTypes.func.isRequired,
    handleOrderRequest: PropTypes.func.isRequired
}