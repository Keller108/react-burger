import categoryStyle from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import { Card } from '../Card/Card';
import { ingredientPropType } from '../../shared/types/commonTypes';

export function IngredientsCategory({ title, category, setModalState }) {
    return (
        <>
            <h2 className="text text_type_main-medium">{title}</h2>
            <ul className={`${categoryStyle.ingredients} pt-6 pl-4 pb-10 m-0`}>
                {category.map((item) => <Card
                    key={item._id}
                    cardData={item}
                    setModalState={setModalState}
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