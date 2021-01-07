/**
 * ElasticPress autosuggest field
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import AutosuggestFieldItem from './AutosuggestFieldItem';
import useRoveFocus from '../../hooks/useRoveFocus';
import { useElasticPress } from '../../hooks';
import SearchField from '../SearchField/SearchField';

const AutosuggestField = ({ initialValue, placeholder, name, minSearchCharacters }) => {
	const {
		state: { search, results },
	} = useElasticPress();

	const [focus, setFocus] = useRoveFocus(search.perPage);
	const inputRef = useRef(null);

	useEffect(() => {
		if (focus === -1 && inputRef.current) {
			// Move element into view when it is focused
			inputRef.current.focus();
		}
	}, [focus]);

	return (
		<div className={`${styles.container} ep-autosuggest-container`}>
			<SearchField
				name={name}
				initialValue={initialValue}
				placeholder={placeholder}
				minSearchCharacters={minSearchCharacters}
				ref={inputRef}
			/>
			{results?.items?.length > 0 && (
				<div className={`${styles.dropdownContainer} ep-autosuggest`}>
					<ul className={`${styles.dropdownList} autosuggest-list`} role="listbox">
						{results?.items?.map((result, index) => {
							return (
								<AutosuggestFieldItem
									key={result.ID}
									setFocus={setFocus}
									index={index}
									focus={focus === index}
									result={result}
								/>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

AutosuggestField.defaultProps = {
	name: 's',
	placeholder: 'Search...',
	initialValue: '',
	minSearchCharacters: 3,
};

AutosuggestField.propTypes = {
	name: PropTypes.string,
	initialValue: PropTypes.string,
	placeholder: PropTypes.string,
	minSearchCharacters: PropTypes.number,
};

export default AutosuggestField;
