/**
 * ElasticPress search field component
 */

import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSearch } from '../../hooks';

const SearchField = ({ placeholder, initialValue, name, minSearchCharacters }) => {
	const { refine, searchTerms } = useSearch();

	const search = useCallback(
		(searchTerms) => {
			refine(searchTerms, minSearchCharacters);
		},
		[refine, minSearchCharacters],
	);

	// search if a initial value is provided from parent component
	useEffect(() => {
		search(initialValue);
	}, [initialValue, search]);

	return (
		<input
			type="search"
			className="search-field"
			placeholder={placeholder}
			value={searchTerms}
			name={name}
			onChange={(event) => search(event.target.value)}
		/>
	);
};

SearchField.defaultProps = {
	name: 's',
	placeholder: 'Search...',
	initialValue: '',
	minSearchCharacters: 3,
};

SearchField.propTypes = {
	name: PropTypes.string,
	initialValue: PropTypes.string,
	placeholder: PropTypes.string,
	minSearchCharacters: PropTypes.number,
};

export default SearchField;
