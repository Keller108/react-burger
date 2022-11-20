import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import contructorStyles from './BurgerConstructor.module.css';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import {
    addItemToConstructor,
    deleteItemFromConstructor,
    handleOrderRequest
} from '../../services/actions/burger-constructor';

export function BurgerConstructor() {
    const { buns, otherItems, totalPrice } = useSelector(store => store.constructor);
    const order = useSelector(state => state.constructor.order);

    const dispatch = useDispatch();

    const addItem = (item) => dispatch(addItemToConstructor(item));
    const removeItem = item => dispatch(deleteItemFromConstructor(item));

    const [, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(ingredient) {
            addItem(ingredient)
        }
    });

    const handleModalState = () => {
        dispatch(handleOrderRequest());

    };

    // const topBun = {...buns, name: `${buns.name} (верх)`};
    // const bottomBun = {...buns, name: `${buns.name} (низ)`};

    // const [items, setItems] = useState([]);
    // const {
    //     initialData, ingredients, orderState, setOrderState, totalPrice, setTotalPrice
    // } = useContext(BurgerConstructorContext);

    // const bun = useMemo(() => initialData
    //     .find(ingredient => ingredient.type === 'bun'), [initialData]);

    // const otherIngredients = useMemo(() => initialData
    //     .filter(ingredient => ingredient.type !== 'bun'), [initialData]);

    // useEffect(() => {
    //     if (items) {
    //         setOrderState(prevState => ({...prevState, constructorItems: items}));
    //     }
    // }, [items, orderState.constructorItems])

    // const countTotalPrice = useMemo(() => {
    //     let total;
    //     let otherIngredientsPrice = otherIngredients.reduce((prev, curr) => {
    //         return prev + curr.price
    //     }, 0);

    //     if (bun) {
    //         total = otherIngredientsPrice + (bun.price * 2);
    //     }

    //     return total;
    // }, [ingredients])

    // useEffect(() => {
    //     if (bun) {
    //         setTotalPrice(countTotalPrice);
    //     }
    // }, [ingredients, bun])

    // useEffect(() => {
    //     if (orderState.success) {
    //         setModalState({
    //             isActive: true,
    //             content: <OrderDetails order={orderState.order}/>
    //         });
    //     }
    // }, [orderState.success])

    return (
        <section ref={dropTarget}
            className={`${contructorStyles.constructor} pt-25 pb-13`}>
            <ul className={`${contructorStyles.items} pr-2`}>
                {buns.length !== 0 && <li
                    className={`${contructorStyles.constructorItem} pl-8`}>
                    <ConstructorElement
                        key={buns[0]._id}
                        type="top"
                        isLocked={true}
                        text={`${buns[0].name} (верх)`}
                        price={buns[0].price}
                        thumbnail={buns[0].image}
                    />
                </li>}
                <div className={contructorStyles.itemWrapper}>
                    {otherItems && otherItems.map((item) => <li draggable key={item._id}
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
                                handleClose={() => removeItem(item)}
                            />
                        </li>)
                    }
                </div>
                {buns.length !== 0 && <li className={`${contructorStyles.constructorItem} pl-8`}>
                    <ConstructorElement
                        key={buns[0]._id}
                        type="bottom"
                        isLocked={true}
                        text={`${buns[0].name} (низ)`}
                        price={buns[0].price}
                        thumbnail={buns[0].image}
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
    // setModalState: PropTypes.func.isRequired,
    // handleOrderRequest: PropTypes.func.isRequired
}