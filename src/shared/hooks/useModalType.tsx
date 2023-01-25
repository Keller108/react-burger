import { useSelector } from ".";
import { IngredientDetails } from "../../components/IngredientDetails";
import { OrderDetails } from "../../components/OrderDetails";
import { OrderInfo } from "../../components/OrderInfo";
import { WithModalPadding } from "../../HOC";

export const useModalType = () => {
    const { modalType } = useSelector(store => store.modal);
    let component: JSX.Element | null = null;

    switch (modalType) {
        case 'INGREDIENT_VIEW': {
            component = <IngredientDetails />
            break
        }
        case 'ORDER_SUCCESS': {
            component = <OrderDetails />
            break
        }
        case 'ORDER_VIEW': {
            component = <WithModalPadding children={<OrderInfo />} />
            break
        }
        default: {
            component = null
        }
    }

    return component;
}