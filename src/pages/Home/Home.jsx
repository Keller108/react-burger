import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import { getIngredients } from '../../services/actions/burger-ingredients';
import styles from './Home.module.css';
import { Modal } from '../../components/Modal/index.js';

export function Home({ handleCloseModal }) {
    const { isActive } = useSelector(store => store.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
            {isActive && <Modal onClose={handleCloseModal}/>}
        </main>
    )
}

Home.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}