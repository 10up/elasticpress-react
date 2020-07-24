import React, { useEffect, useRef, useCallback } from 'react';
import styles from './styles.module.css';

const AutosuggestFieldItem = ({ result, focus, index, setFocus }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (focus) {
      // Move element into view when it is focused
      ref.current.focus();
    }
  }, [focus]);

  const handleSelect = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleNavigate();
        return;
      }
      // setting focus to that element when it is selected
      setFocus(index);
    },
    [result, index, setFocus]
  );

  const handleNavigate = (event) => {
    document.location = result.permalink;
  };

  return (
    <li
      tabIndex={focus ? 0 : -1}
      role='button'
      className={styles.dropdownItem + ' autosuggest-item'}
      ref={ref}
      onClick={handleNavigate}
      onKeyPress={handleSelect}
    >
      {result.post_title}
    </li>
  );
};

export default AutosuggestFieldItem;
