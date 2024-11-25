import { useEffect } from 'react';

const useKeyboardNavigation = (items, setFocusedIndex) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Logic for arrow keys and ENTER/ESC
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [items, setFocusedIndex]);
};

export default useKeyboardNavigation;
