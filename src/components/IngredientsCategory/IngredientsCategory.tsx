import categoryStyle from './IngredientsCategory.module.css';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from '../Card/Card';
import { ingredientPropType } from '../../shared/types/commonTypes';
import { IngredientDetails } from '../IngredientDetails';
import { OPEN_MODAL } from '../../services/actions';
import { forwardRef, useEffect } from 'react';

type TIngredientsCategoryProps = {
    title: string;
    id: string;
    category: string;
};

export const IngredientsCategory = forwardRef(({ title, id, category }: TIngredientsCategoryProps, ref) => {
    const dispatch = useDispatch();

    const renderModal = cardData => dispatch({
        type: OPEN_MODAL,
        payload: <IngredientDetails />,
        data: cardData
    });

    const renderElement = item => {
        renderModal(item);
        const data = JSON.stringify(item);
        localStorage.setItem('currentItem', data);
    };

    useEffect(() => {
        let item = JSON.parse(localStorage.getItem('currentItem'));
        if (item) renderModal(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h2 ref={ref} id={id} className="text text_type_main-medium">{title}</h2>
            <ul className={`${categoryStyle.ingredients} pt-6 pl-4 pb-10 m-0`}>
                {category.map(item => <Card
                    key={item._id}
                    cardData={item}
                    onCardClick={() => renderElement(item)}
                />)}
            </ul>
        </>
    )
})

IngredientsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    category: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}