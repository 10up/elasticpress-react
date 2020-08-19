import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const AutosuggestFieldItem = ({ result, focus, index, setFocus }) => {
	const ref = useRef(null);

	useEffect(() => {
		if (focus) {
			// Move element into view when it is focused
			ref.current.focus();
		}
	}, [focus]);

	const handleNavigate = useCallback(() => {
		document.location = result.permalink;
	}, [result.permalink]);

	const handleSelect = useCallback(
		(event) => {
			if (event.key === 'Enter') {
				handleNavigate();
				return;
			}
			// setting focus to that element when it is selected
			setFocus(index);
		},
		[index, setFocus, handleNavigate],
	);

	return (
		<li
			tabIndex={focus ? 0 : -1}
			role="button" /* eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role */
			className={`${styles.dropdownItem} autosuggest-item`}
			ref={ref}
			onClick={handleNavigate}
			onKeyPress={handleSelect}
		>
			{result.post_title}
		</li>
	);
};

AutosuggestFieldItem.propTypes = {
	focus: PropTypes.bool.isRequired,
	result: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	setFocus: PropTypes.func.isRequired,
};

export default AutosuggestFieldItem;
