import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IIngredientItem } from '../../shared/types';
import ingredientsDetailsStyle from './IngredientDetails.module.css';

export function IngredientDetails() {
    const [currentItem, setCurrentItem] = useState<IIngredientItem | null>(null);
    //@ts-ignore
    const { currentData } = useSelector(store => store.modal);
    const [items,] = useState(
        () => {
            let item = localStorage.getItem('ingredients');
            if (item) return [...JSON.parse(item)];
        }
    );
    const { ingredientId } = useParams();

    useEffect(() => {
        setCurrentItem(items?.find(i => i._id === ingredientId));
    }, [items, ingredientId])

    let card: IIngredientItem | null;

    if (!currentData) {
        card = currentItem;
    } else {
        card = currentData;
    }

    return (
        <div className={`${ingredientsDetailsStyle.wrapper}
            pt-10 pr-10 pb-15 pl-10`}>
            <h2 className={`${ingredientsDetailsStyle.title}
                text text_type_main-large mt-0 mb-0`}
            >
                Детали ингредиента
            </h2>
            <figure className={ingredientsDetailsStyle.figure}>
                <img className="mt-0 mb-4" src={card?.image_large ?? ''} alt="Картинка ингредиента"/>
                <figcaption className="text text_type_main-medium mt-0 mb-8">
                    {card?.name ?? ''}
                </figcaption>
            </figure>
            <ul className={ingredientsDetailsStyle.list}>
                <li>
                    <h3 className="text text_type_main-default
                        text_color_inactive mb-5">Калории,ккал</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">{card?.calories ?? ''}</p>
                </li>
                <li>
                    <h3 className="text text_type_main-default
                        text_color_inactive mb-5">Белки, г</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">{card?.proteins ?? ''}</p>
                </li>
                <li>
                    <h3 className="text text_type_main-default
                        text_color_inactive mb-5">Жиры, г</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">{card?.fat ?? ''}</p>
                </li>
                <li>
                    <h3 className="text text_type_main-default
                        text_color_inactive mb-5">Углеводы, г</h3>
                    <p className="text text_type_digits-default
                        text_color_inactive">{card?.carbohydrates ?? ''}</p>
                </li>
            </ul>
        </div>
    )
}