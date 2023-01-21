import { useSelector } from ".";
import { IngredientDetails } from "../../components/IngredientDetails";
import { OrderDetails } from "../../components/OrderDetails";
import { OrderInfo } from "../../components/OrderInfo";

export const useModalType = () => {
    const { modalType } = useSelector(store => store.modal);
    const { order } = useSelector(store => store.burgerConstructor);

    let component: JSX.Element | null = null;

    switch (modalType) {
        case 'INGREDIENT_VIEW': {
            component = <IngredientDetails />
            break
        }
        case 'ORDER_SUCCESS': {
            component = <OrderDetails order={order}/>
            break
        }
        case 'ORDER_VIEW': {
            component = <OrderInfo />
            break
        }
        default: {
            component = null
        }
    }

    return component;
}