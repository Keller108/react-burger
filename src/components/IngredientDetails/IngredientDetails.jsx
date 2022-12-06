import ingredientsDetailsStyle from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';

export function IngredientDetails() {
    const { currentData } = useSelector(store => store.modal);
    return (
        <div className={`${ingredientsDetailsStyle.wrapper}
            pt-10 pr-10 pb-15 pl-10`}>
            <h2 className={`${ingredientsDetailsStyle.title}
                text text_type_main-large mt-0 mb-0`}
            >
                Детали ингредиента
            </h2>
            <figure className={ingredientsDetailsStyle.figure}>
                <img className="mt-0 mb-4" src={currentData.image_large} alt="Картинка ингредиента"/>
                <figcaption className="text text_type_main-medium mt-0 mb-8">
                    {currentData.name}
                </figcaption>
            </figure>
            <ul className={ingredientsDetailsStyle.list}>
                <li>
                    <h3 className="text text_type_main-default
                        text_color_inactive mb-5">Калории,ккал</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">{currentData.calories}</p>
                </li>
                <li>
                    <h3 className="text text_type_main-default
                        text_color_inactive mb-5">Белки, г</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">{currentData.proteins}</p>
                </li>
                <li>
                    <h3 className="text text_type_main-default
                        text_color_inactive mb-5">Жиры, г</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">{currentData.fat}</p>
                </li>
                <li>
                    <h3 className="text text_type_main-default
                        text_color_inactive mb-5">Углеводы, г</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">{currentData.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}