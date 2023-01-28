import { useSelector } from ".";
import { IngredientDetails } from "../../components/IngredientDetails";
import { OrderDetails } from "../../components/OrderDetails";
import { OrderInfo } from "../../components/OrderInfo";
import { WithModalPadding } from "../../HOC";
import { ModalType } from "../types";

export const useModalType = () => {
    const { modalType } = useSelector(store => store.modal);
    let component: JSX.Element | null = null;

    switch (modalType) {
        case ModalType.INGREDIENT_VIEW: {
            component = <IngredientDetails />
            break
        }
        case ModalType.ORDER_SUCCESS: {
            component = <OrderDetails />
            break
        }
        case ModalType.ORDER_VIEW: {
            component = <WithModalPadding children={<OrderInfo />} />
            break
        }
        case ModalType.ORDER_HISTORY_VIEW: {
            component = <WithModalPadding children={<OrderInfo />} />
            break
        }
        default: {
            component = null
        }
    }

    return component;
}