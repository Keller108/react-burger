import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { Main } from '../Main/Main';

export function App() {
    return (
        <div className={appStyles.app}>
            <AppHeader />
            <Main />
        </div>
    );
}
