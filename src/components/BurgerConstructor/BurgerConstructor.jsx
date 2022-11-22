import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Button,
    ConstructorElement,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import contructorStyles from './BurgerConstructor.module.css';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import {
    addItemToConstructor,
    handlePlaceAnOrder,
    ORDER_REQUEST,
} from '../../services/actions/burger-constructor';
import { OPEN_MODAL } from '../../services/actions';
import { ConstructorItem } from '../ConstructorItem/ConstructorItem';

export function BurgerConstructor() {
    const dispatch = useDispatch();

    const addItem = (item) => dispatch(addItemToConstructor(item));
    const prepareOrderData = () => dispatch({ type: ORDER_REQUEST });
    const placeOrder = data => dispatch(handlePlaceAnOrder(data));

    const { buns, otherItems, totalPrice, order } = useSelector(store => store.burgerConstructor);

    const [, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(ingredient) {
            addItem(ingredient)
        }
    });

    const orderData = useMemo(() => {
        return [...buns, ...otherItems, ...buns].map(item => item._id);
    },[buns, otherItems])

    const handleModalState = () => {
        prepareOrderData();
        placeOrder(orderData);
    };

    useEffect(() => {
        if (order.success) {
            dispatch({
                type: OPEN_MODAL,
                payload: <OrderDetails order={order}/>
            });
        }
    }, [order.success])

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
                    {otherItems.length !== 0 && otherItems
                        .map((item, index) => <ConstructorItem
                            item={item}
                            index={index}
                            key={uuidv4()}
                        />)
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