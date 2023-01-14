import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from '../../shared/hooks';
import { deleteItemFromConstructor, moveItemInConstructor } from '../../services/actions/burger-constructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ConstructorItem.module.css';
import { IConstructorItem } from '../../shared/types';

type TConstructorItemProps = {
    item: IConstructorItem;
    index: number;
};

export function ConstructorItem({ item, index }: TConstructorItemProps) {
    const elementRef = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();

    const removeItem = (item: IConstructorItem) => dispatch(
        deleteItemFromConstructor(item)
    );

    const id = item._id;

    const moveItem = (dragIndex: number, hoverIndex: number) => dispatch(
        moveItemInConstructor(hoverIndex, dragIndex)
    );

	const [, drop] = useDrop({
		accept: 'item',
		hover(item: IConstructorItem & { index: number }, monitor) {
			if (!elementRef.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

            if (elementRef.current) {
                const hoverBoundingRect = elementRef.current.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();

                let hoverClientY: number;

                if (clientOffset) {
                    hoverClientY = clientOffset.y - hoverBoundingRect.top;

                    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                        return;
                    }

                    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                        return;
                    }
                }
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