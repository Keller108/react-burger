import { forwardRef, useEffect } from 'react';
import { useDispatch } from '../../shared/hooks';
import categoryStyle from './IngredientsCategory.module.css';
import { Card } from '../Card';
import { IIngredientItem, ModalType } from '../../shared/types';
import { openModal } from '../../services/actions/modal';
import { setCurrentIngredient } from '../../services/actions/burger-ingredients';

type TIngredientsCategoryProps = {
    title: string;
    id: string;
    category: IIngredientItem[];
};

type Ref = HTMLHeadingElement;

export const IngredientsCategory = forwardRef<Ref, TIngredientsCategoryProps>(({
    title,
    id,
    category
}: TIngredientsCategoryProps, ref ) => {
    const dispatch = useDispatch();

    const renderModal = (cardData: IIngredientItem) => {
        dispatch(openModal(ModalType.INGREDIENT_VIEW));
        dispatch(setCurrentIngredient(cardData));
    };

    const renderElement = (item: IIngredientItem) => {
        renderModal(item);
        const data = JSON.stringify(item);
        localStorage.setItem('currentItem', data);
    };

    useEffect(() => {
        let item = localStorage.getItem('currentItem');
        if (item) renderModal(JSON.parse(item) as IIngredientItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h2 ref={ref} id={id} className="text text_type_main-medium">{title}</h2>
            <ul className={`${categoryStyle.ingredients} pt-6 pl-4 pb-10 m-0`}>
                {category.map((item: IIngredientItem) => <Card
                    key={item._id}
                    cardData={item}
                    onCardClick={() => renderElement(item)}
                />)}
            </ul>
        </>
    )
});