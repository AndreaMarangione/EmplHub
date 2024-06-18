import { useState, useEffect } from 'react';

const useClick = () => {
    const [click, setClick] = useState({
        x: 0,
        y: 0,
        target: {}
    })
    const handleClick = (e) => {
        setClick({
            x: e.clientX,
            y: e.clientY,
            target: e.target
        })
    }
    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        }
    }, [])
    return click;
}

export default useClick;
