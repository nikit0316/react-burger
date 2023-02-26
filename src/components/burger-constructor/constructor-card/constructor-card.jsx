import {useDrag, useDrop} from "react-dnd";
import React, {useRef} from "react";
import styles from './constructor-card.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorCard = (props) => {

    const { element, handleClose, index, moveCard, id } = props;

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <div ref={ref} className={styles.constructorCard} style={{opacity}} data-handler-id={handlerId}>
            <DragIcon />
            <ConstructorElement text={element.name} thumbnail={element.image} price={element.price} handleClose={handleClose} />
        </div>
    )
}

export default ConstructorCard;