import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';

export function App() {
    return (
        <div className={appStyles.app}>
            <AppHeader />
            <main className={appStyles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    );
}
