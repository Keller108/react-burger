import PropTypes from 'prop-types';
import { Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import contructorStyles from './BurgerConstructor.module.css';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { useContext, useEffect, useMemo, useState } from 'react';
import { BurgerConstructorContext } from '../../services/productsContext';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToConstructor, deleteItemFromConstructor } from '../../services/actions/burger-constructor';
import { useDrop } from 'react-dnd';

export function BurgerConstructor({ setModalState, handleOrderRequest }) {
    const { otherItems, totalPrice } = useSelector(store => store.constructor);
    const dispatch = useDispatch();

    const addItem = (item) => dispatch(addItemToConstructor(item));

    const [, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(ingredient) {
            addItem(ingredient)
        }
    });

    const removeItem = item => dispatch(deleteItemFromConstructor(item));

    // const [items, setItems] = useState([]);
    // const {
    //     initialData, ingredients, orderState, setOrderState, totalPrice, setTotalPrice
    // } = useContext(BurgerConstructorContext);

    // const bun = useMemo(() => initialData
    //     .find(ingredient => ingredient.type === 'bun'), [initialData]);

    // const otherIngredients = useMemo(() => initialData
    //     .filter(ingredient => ingredient.type !== 'bun'), [initialData]);

    // useEffect(() => {
    //     /** В коде ниже я использую временные данные, для мапинга масива
    //      * ингредиентов в конструкторе. В дальнейшем будет реализовано
    //      * добавление эл-тов в конструктор из BurgerIngredients
    //      */
    //     if (bun && otherIngredients) {
    //         const topBun = {...bun, name: `${bun.name} (верх)`};
    //         const bottomBun = {...bun, name: `${bun.name} (низ)`};
    //         setItems([topBun, ...otherIngredients, bottomBun]);
    //     }
    // }, [bun, otherIngredients])

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

    // const handleModalState = async () => {
    //     await handleOrderRequest();
    // };

    // useEffect(() => {
    //     if (orderState.success) {
    //         setModalState({
    //             isActive: true,
    //             content: <OrderDetails order={orderState.order}/>
    //         });
    //     }
    // }, [orderState.success])

    return (
        <section ref={dropTarget} className={`${contructorStyles.constructor} pt-25 pb-13`}>
            <ul className={`${contructorStyles.items} pr-2`}>
                {/* {bun && <li className={`${contructorStyles.constructorItem} pl-8`}>
                    <ConstructorElement
                        key={bun._id}
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>} */}
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
                {/* {bun && <li className={`${contructorStyles.constructorItem} pl-8`}>
                    <ConstructorElement
                        key={bun._id}
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>} */}
            </ul>
            <div className={`${contructorStyles.total} mt-10`}>
                <span className={`${contructorStyles.price} mr-10`}>
                    <p className="text text_type_main-large mr-3">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </span>
                {/* <Button onClick={handleModalState}
                    htmlType="button"
                    type="primary"
                    size="large"
                >
                    Оформить заказ
                </Button> */}
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    setModalState: PropTypes.func.isRequired,
    handleOrderRequest: PropTypes.func.isRequired
}