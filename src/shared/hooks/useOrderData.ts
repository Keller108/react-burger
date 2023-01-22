import { useSelector } from ".";

export const useOrderData = () => {
    const { order } = useSelector(store => store.burgerConstructor);
    let data = localStorage.getItem('currentOrder');
    if (data) {
        return data = JSON.parse(data);
    } else return order;
};