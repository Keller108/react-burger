import { forwardRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import categoryStyle from './IngredientsCategory.module.css';
import { Card } from '../Card';
import { IngredientDetails } from '../IngredientDetails';
import { OPEN_MODAL } from '../../services/actions';
import { IIngredientItem } from '../../shared/types';

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

    const renderModal = (cardData: IIngredientItem) => dispatch({
        type: OPEN_MODAL,
        payload: <IngredientDetails />,
        data: cardData
    });

    const renderElement = (item: IIngredientItem) => {
        renderModal(item);
        const data = JSON.stringify(item);
        localStorage.setItem('currentItem', data);
    };

    useEffect(() => {
        let item: IIngredientItem = JSON.parse(localStorage.getItem('currentItem') ?? '');
        if (item) renderModal(item);
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