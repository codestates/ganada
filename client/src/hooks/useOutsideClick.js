import { useState, useEffect } from 'react';

export const useOutsideClick = (element, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const outSideClick = (e) => {
      if (element.current !== null && !element.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener('click', outSideClick);
    }
    return () => {
      window.removeEventListener('click', outSideClick);
    };
  }, [isActive, element]);
  return [isActive, setIsActive];
};
