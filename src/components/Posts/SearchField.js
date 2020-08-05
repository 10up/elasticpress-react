/**
 * ElasticPress search field component
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types'; /* eslint-disable-line import/no-extraneous-dependencies */
import { replacePlaceholderInObjectValues } from '../../utils';
import { PostContext } from '../../contexts/PostContext';
import { post } from '../../api';

const SearchField = ({ placeholder, value, name, minSearchCharacters }) => {
	const [searchValue, setSearchValue] = useState(value);
	const [state, dispatch] = useContext(PostContext);

	const onChange = (event) => {
		const searchTerms = event.target.value;

		setSearchValue(searchTerms);

		dispatch({
			type: 'set_search_terms',
			payload: searchTerms,
		});

		if (searchTerms.length >= minSearchCharacters) {
			dispatch({
				type: 'set_loading',
				payload: true,
			});

			let newQuery = replacePlaceholderInObjectValues(
				state.query,
				'%SEARCH_TERMS%',
				searchTerms,
			);

			newQuery = replacePlaceholderInObjectValues(newQuery, '%PER_PAGE%', state.perPage);

			post(newQuery, state.endpoint).then((response) => {
				let newResults = [];
				let totalResults = 0;

				if (response.hits && response.hits.hits) {
					if (response.hits.total && response.hits.total.value) {
						totalResults = parseInt(response.hits.total.value, 10);
					}
					newResults = response.hits.hits.map(state.hitMap);
				}

				dispatch({
					type: 'set_results',
					payload: {
						results: newResults,
						totalResults,
						offset: state.perPage,
						searchTerms,
					},
				});

				dispatch({
					type: 'set_loading',
					payload: false,
				});
			});
		} else {
			dispatch({
				type: 'set_results',
				payload: {
					results: null,
					offset: 0,
					totalResults: null,
					searchTerms,
				},
			});
		}
	};

	return (
		<input
			type="search"
			className="search-field"
			placeholder={placeholder}
			value={searchValue}
			name={name}
			onChange={onChange}
		/>
	);
};

SearchField.defaultProps = {
	name: 's',
	placeholder: 'Search...',
	value: '',
	minSearchCharacters: 3,
};

SearchField.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	minSearchCharacters: PropTypes.number,
};

export default SearchField;
