import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import { Modal } from '../../components/Modal';
import { getIngredients } from '../../services/actions/burger-ingredients';
import styles from './Home.module.css';
import { SHOP_ROUTE } from '../../utils/routes';
import { CLOSE_MODAL } from '../../services/actions';

export function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isActive } = useSelector(store => store.modal);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    const handleCloseModal = () => {
        navigate(SHOP_ROUTE);
        localStorage.removeItem('currentItem');
        return dispatch({ type: CLOSE_MODAL });
    };

    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
                {isActive && <Modal onClose={handleCloseModal} />}
            </DndProvider>
        </main>
    )
}