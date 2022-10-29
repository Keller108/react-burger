import cardStyle from './Card.module.css';
import imagePath from '../../shared/icons/bun-02.png';
import estimatePath from '../../shared/icons/Subtract.png';

export function Card() {
    return (
        <li className={cardStyle.card}>
            <span className={`${cardStyle.amount} "text text_type_main-medium"`}>1</span>
            <img
                className={cardStyle.image}
                src={imagePath}
                alt="Картинка ингридиента"
            />
            <span>
                <p className="text text_type_main-medium">20</p>
                <img src={estimatePath} alt="Стоимость ингридиента" />
            </span>
            <p className="text text_type_main-default">Краторная булка</p>
        </li>
    )
}