import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../shared/hooks';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Button,
    ConstructorElement,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import contructorStyles from './BurgerConstructor.module.css';
import { OrderDetails } from '../OrderDetails';
import { ConstructorItem } from '../ConstructorItem/ConstructorItem';
import { addItemToConstructor, handlePlaceAnOrder } from '../../services/actions/burger-constructor';
import { LOGIN_ROUTE } from '../../shared/routes';
import { IConstructorItem, IIngredientItem, TOrderID } from '../../shared/types';
import { ORDER_REQUEST } from '../../services/constants/burger-constructor';
import { openModal } from '../../services/actions/modal';

export function BurgerConstructor() {
    const { isLogined } = useSelector(store => store.userStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addItem = (item: IIngredientItem) => dispatch(
        addItemToConstructor({ ...item, uuid: uuidv4() })
    );

    const prepareOrderData = () => dispatch({ type: ORDER_REQUEST });
    const placeOrder = (data: TOrderID[]) => dispatch(handlePlaceAnOrder(data));
    const store = useSelector(store => store.burgerConstructor);

    const [, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(ingredient) {
            addItem(ingredient as IIngredientItem)
        }
    });

    const orderData: TOrderID[] | undefined = useMemo(() => {
        if (store) {
            if (store.buns !== null && store.otherItems !== null) {
                return [...store.buns, ...store.otherItems, ...store.buns]
                    .map((item: IConstructorItem) => item._id);
            }
        }

    },[store])

    const handleModalState = () => {
        if (isLogined) {
            prepareOrderData();
            if (orderData) placeOrder(orderData);
        } else {
            navigate(LOGIN_ROUTE);
        }
    };

    console.log('store', store)


    useEffect(() => {
        if (store?.order.success) {
            dispatch(openModal(<OrderDetails order={store.order}/>, null));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store?.order])

    return (
        <section ref={dropTarget}
            className={`${contructorStyles.constructor} pt-25 pb-13`}>
            <ul className={`${contructorStyles.items} pr-2`}>
                {store?.buns?.length && <li
                    className={`${contructorStyles.constructorItem} pl-8`}>
                    <ConstructorElement
                        key={store?.buns[0]._id}
                        type="top"
                        isLocked={true}
                        text={`${store?.buns[0].name} (верх)`}
                        price={store?.buns[0].price}
                        thumbnail={store?.buns[0].image}
                    />
                </li>}
                <div className={contructorStyles.itemWrapper}>
                    {store?.otherItems?.length && store.otherItems
                        .map((item: IIngredientItem & { uuid: string}, index: number) => <ConstructorItem
                            item={item}
                            index={index}
                            key={item.uuid}
                        />)
                    }
                </div>
                {store?.buns?.length && <li className={`${contructorStyles.constructorItem} pl-8`}>
                    <ConstructorElement
                        key={store?.buns[0]._id}
                        type="bottom"
                        isLocked={true}
                        text={`${store?.buns[0].name} (низ)`}
                        price={store?.buns[0].price}
                        thumbnail={store?.buns[0].image}
                    />
                </li>}
            </ul>
            <div className={`${contructorStyles.total} mt-10`}>
                <span className={`${contructorStyles.price} mr-10`}>
                    <p className="text text_type_main-large mr-3">{store?.totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </span>
                {(store?.buns?.length || store?.otherItems?.length) && <Button
                    onClick={handleModalState}
                    htmlType="button"
                    type="primary"
                    size="large"
                >
                    Оформить заказ
                </Button>}
            </div>
        </section>
    )
}