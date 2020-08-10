/**
 * ElasticPress search field component
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types'; /* eslint-disable-line import/no-extraneous-dependencies */
import { replacePlaceholderInObjectValues } from '../../utils';
import { post } from '../../api';
import useElasticPress from '../Provider/useElasticPress';
import { SET_SEARCH_TERMS, SET_LOADING, SET_RESULTS } from '../Provider';

const SearchField = ({ placeholder, value, name, minSearchCharacters }) => {
	const [searchValue, setSearchValue] = useState(value);
	const { state, dispatch } = useElasticPress();

	const onChange = (event) => {
		const searchTerms = event.target.value;

		setSearchValue(searchTerms);

		dispatch({
			type: SET_SEARCH_TERMS,
			payload: searchTerms,
		});

		if (searchTerms.length >= minSearchCharacters) {
			dispatch({
				type: SET_LOADING,
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
					type: SET_RESULTS,
					payload: {
						results: newResults,
						totalResults,
						offset: state.perPage,
						searchTerms,
					},
				});

				dispatch({
					type: SET_LOADING,
					payload: false,
				});
			});
		} else {
			dispatch({
				type: SET_RESULTS,
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
