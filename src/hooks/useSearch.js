import { useCallback } from 'react';

import useElasticPress from './useElasticPress';
import { SET_SEARCH_TERMS, SET_LOADING, SET_RESULTS } from '../components/Provider';
import { replacePlaceholderInObjectValues } from '../utils';
import { post } from '../api';

const useSearch = () => {
	const { dispatch, state, getEndpoint } = useElasticPress();

	const refine = useCallback(
		(value, minSearchCharacters) => {
			dispatch({
				type: SET_SEARCH_TERMS,
				payload: value,
			});

			if (value < minSearchCharacters) {
				return;
			}

			dispatch({
				type: SET_LOADING,
				payload: true,
			});

			let newQuery = replacePlaceholderInObjectValues(state.query, '%SEARCH_TERMS%', value);

			newQuery = replacePlaceholderInObjectValues(newQuery, '%PER_PAGE%', state.perPage);

			post(newQuery, getEndpoint('search')).then((response) => {
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
						value,
					},
				});

				dispatch({
					type: SET_LOADING,
					payload: false,
				});
			});
		},
		[dispatch, state.query, state.hitMap, state.perPage, getEndpoint],
	);

	return { refine, searchTerms: state.searchTerms };
};

export default useSearch;
