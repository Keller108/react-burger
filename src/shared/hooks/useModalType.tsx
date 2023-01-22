import { useSelector } from ".";
import { IngredientDetails } from "../../components/IngredientDetails";
import { OrderDetails } from "../../components/OrderDetails";
import { OrderInfo } from "../../components/OrderInfo";
import { WithModalPadding } from "../../HOC";
import { useOrderData } from "./useOrderData";

export const useModalType = () => {
    const { modalType } = useSelector(store => store.modal);
    const orderData = useOrderData();

    let component: JSX.Element | null = null;

    switch (modalType) {
        case 'INGREDIENT_VIEW': {
            component = <IngredientDetails />
            break
        }
        case 'ORDER_SUCCESS': {
            component = <OrderDetails order={orderData}/>
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