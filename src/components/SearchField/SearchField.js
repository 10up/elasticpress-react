/**
 * ElasticPress search field component
 */

import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { useSearch } from '../../hooks';

const SearchField = React.forwardRef(
	(
		{ placeholder, initialValue, name, minSearchCharacters, debounceMs, searchTerm, ...rest },
		ref,
	) => {
		const [localSearchTerm, setLocalSearchTerm] = useState('');
		const { refine } = useSearch();

		const search = useCallback(
			debounce(
				(value) => {
					refine(value, { minSearchCharacters });
				},
				debounceMs,
				{ leading: !!debounceMs, maxWait: 500 },
			),
			[refine, minSearchCharacters, debounceMs],
		);

		useEffect(() => {
			setLocalSearchTerm(searchTerm);
		}, [searchTerm]);

		// search if a initial value is provided from parent component
		useEffect(() => {
			if (initialValue) {
				search(initialValue);
			}
		}, [initialValue, search]);

		return (
			<input
				type="search"
				className="search-field"
				placeholder={placeholder}
				value={localSearchTerm || ''}
				name={name}
				onChange={(event) => {
					const { value } = event.target;
					setLocalSearchTerm(value);
					search(value);
				}}
				ref={ref}
				{...rest}
			/>
		);
	},
);

SearchField.defaultProps = {
	name: 's',
	placeholder: 'Search...',
	initialValue: '',
	minSearchCharacters: 3,
	debounceMs: 0,
	searchTerm: '',
};

SearchField.propTypes = {
	name: PropTypes.string,
	initialValue: PropTypes.string,
	placeholder: PropTypes.string,
	minSearchCharacters: PropTypes.number,
	debounceMs: PropTypes.number,
	searchTerm: PropTypes.string,
};

export default SearchField;
