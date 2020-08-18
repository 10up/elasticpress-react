import { useCallback, useEffect } from 'react';

import useElasticPress from './useElasticPress';
import { SET_SEARCH_TERMS, SET_LOADING, SET_RESULTS } from '../components/Provider';
import { replacePlaceholderInObjectValues } from '../utils';
import { post } from '../api';

const useSearch = () => {
	const { dispatch, state, getEndpoint } = useElasticPress();

	const refine = useCallback(
		(value, options = {}) => {
			const minSearchCharacters = options?.minSearchCharacters ?? 3;
			const offset = options?.offset ?? 0;
			const append = options?.append ?? false;

			dispatch({
				type: SET_SEARCH_TERMS,
				payload: value,
			});

			if (typeof value === 'string' && value.length < minSearchCharacters) {
				return;
			}

			dispatch({
				type: SET_LOADING,
				payload: true,
			});

			const newQuery = replacePlaceholderInObjectValues(state.query, {
				'%SEARCH_TERMS%': value,
				'%PER_PAGE%': state.perPage,
			});

			newQuery.from = offset;

			if (!value) {
				delete newQuery.query;
			}

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
						append,
						totalResults,
						offset: offset + state.perPage,
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

	const loadMore = useCallback(() => {
		refine(state.searchTerms, {
			minSearchCharacters: 0,
			offset: state.offset,
			append: true,
		});
	}, [refine, state.offset, state.searchTerms]);

	// loadInitialData
	useEffect(() => {
		if (state.totalResults === null && state.loadInitialData) {
			refine(null);
		}
	}, [refine, state.totalResults, state.loadInitialData]);

	return { refine, searchTerms: state.searchTerms, results: state.results, loadMore };
};

export default useSearch;
