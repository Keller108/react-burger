import { IngredientDetails } from '../../components/IngredientDetails';
import styles from './Ingredient.module.css';

export function IngredientPage() {
    return (
        <section className={styles.page}>
            <IngredientDetails />
        </section>
    )
}