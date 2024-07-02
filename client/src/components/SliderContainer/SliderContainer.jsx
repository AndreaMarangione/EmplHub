import React, { useRef } from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import './sliderContainer.css';

const SliderContainer = ({ items }) => {
    const ref = useRef();
    const { events } = useDraggable(ref);
    return (
        <div
            className="slider-container"
            {...events}
            ref={ref}>
            <div className="slider-items">
                {items}
            </div>
        </div>
    )
}

export default SliderContainer;
