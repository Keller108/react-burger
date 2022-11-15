import categoryStyle from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import { Card } from '../Card/Card';
import { ingredientPropType } from '../../utils/types/commonTypes';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

export function IngredientsCategory({ title, category, setModalState }) {
    const renderModal = (cardData) => {
        setModalState({
            isActive: true,
            content: <IngredientDetails data={cardData} />
        })
    };

    return (
        <>
            <h2 className="text text_type_main-medium">{title}</h2>
            <ul className={`${categoryStyle.ingredients} pt-6 pl-4 pb-10 m-0`}>
                {category.map((item) => <Card
                    key={item._id}
                    cardData={item}
                    onCardClick={() => renderModal(item)}
                />)}
            </ul>
        </>
    )
}

IngredientsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    setModalState: PropTypes.func.isRequired
}