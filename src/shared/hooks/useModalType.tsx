import { useSelector } from ".";
import { IngredientDetails } from "../../components/IngredientDetails";
import { OrderDetails } from "../../components/OrderDetails";

export const useModalType = () => {
    const { modalType } = useSelector(store => store.modal);
    const { order } = useSelector(store => store.burgerConstructor);

    let component: JSX.Element | null = null;

    switch (modalType) {
        case 'ingredient': {
            component = <IngredientDetails />
            break
        }
        case 'order': {
            component = <OrderDetails order={order}/>
            break
        }
        default: {
            component = null
        }
    }

    return component;
}