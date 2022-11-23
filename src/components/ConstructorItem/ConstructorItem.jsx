import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deleteItemFromConstructor, MOVE_ITEM } from '../../services/actions/burger-constructor';
import itemStyles from './ConstructorItem.module.css';

export function ConstructorItem({ item, index }) {
    const elementRef = useRef(null);
    const dispatch = useDispatch();

    const removeItem = item => dispatch(deleteItemFromConstructor(item));

    const id = item._id;

    const moveItem = (dragIndex, hoverIndex) => dispatch({
			type: MOVE_ITEM,
			toIndex: hoverIndex,
			fromIndex: dragIndex
    })

	const [, drop] = useDrop({
		accept: 'item',
		hover(item, monitor) {
			if (!elementRef.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = elementRef.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDrag }, drag] = useDrag({
		type: 'item',
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	});

	const opacity = isDrag ? 0 : 1;

	drag(drop(elementRef));

    return <li
            draggable
            ref={elementRef}
            className={`${itemStyles.constructorItem}
            ${itemStyles.constructorItem_dragable} mb-4`}
            style={{ opacity }}
        >
        <div className="mr-2">
            <DragIcon type="primary" />
        </div>
        <ConstructorElement
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => removeItem(item)}
        />
    </li>
}