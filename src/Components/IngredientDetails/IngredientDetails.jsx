import ingredientsDetailsStyle from './IngredientDetails.module.css';
import TEST_IMG_PATH from './assets/img-example.png';

export function IngredientDetails() {
    return (
        <div className={`${ingredientsDetailsStyle.wrapper}
            pt-10 pr-10 pb-15 pl-10`}>
            <h2 className={`${ingredientsDetailsStyle.title}
                text text_type_main-large mt-0 mb-2`}
            >
                Детали ингредиента
            </h2>
            <figure>
                <img className="mt-0 mb-4" src={TEST_IMG_PATH} alt="Картинка ингредиента"/>
                <figcaption className="text text_type_main-default mt-0 mb-8">
                    Биокотлета из марсианской Магнолии
                </figcaption>
            </figure>
            <ul className={ingredientsDetailsStyle.list}>
                <li>
                    <h3 className="text text_type_main-small
                        text_color_inactive mb-5">Калории,ккал</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">244,4</p>
                </li>
                <li>
                    <h3 className="text text_type_main-small
                        text_color_inactive mb-5">Белки, г</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">12,2</p>
                </li>
                <li>
                    <h3 className="text text_type_main-small
                        text_color_inactive mb-5">Жиры, г</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">17,2</p>
                </li>
                <li>
                    <h3 className="text text_type_main-small
                        text_color_inactive mb-5">Углеводы, г</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">10,2</p>
                </li>
            </ul>
        </div>
    )
}