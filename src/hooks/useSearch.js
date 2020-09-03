import { useCallback, useEffect } from 'react';

import useElasticPress from './useElasticPress';
import { setSearchTerm, setLoading, setResults, setOffset } from '../components/Provider';
import { buildQuery } from '../utils';
import { post } from '../api';

const useSearch = () => {
	const {
		dispatch,
		query,
		state: { search, results },
		hitMap,
		loadInitialData,
		getEndpoint,
	} = useElasticPress();

	const refine = useCallback(
		async (value, options = {}) => {
			const minSearchCharacters = options?.minSearchCharacters ?? 3;
			const offset = options?.offset ?? 0;
			const append = options?.append ?? false;

			dispatch(setSearchTerm(value));

			// if value being searched is empty string and loadInitialData is true we need to reload initial data
			if (typeof value === 'string' && value.length === 0 && loadInitialData) {
				refine(null);
				return;
			}

			if (typeof value === 'string' && value.length < minSearchCharacters) {
				return;
			}

			dispatch(setLoading(true));

			const response = await post(
				buildQuery(query, {
					searchTerm: value,
					offset,
					perPage: search.perPage,
				}),
				getEndpoint('search'),
			);
			let newResults = [];
			let totalResults = 0;

			if (response.hits && response.hits.hits) {
				if (response.hits.total && response.hits.total.value) {
					totalResults = parseInt(response.hits.total.value, 10);
				}
				newResults = response.hits.hits.map(hitMap);
			}

			dispatch(setResults({ results: newResults, totalResults, append }));
			dispatch(setOffset(offset + search.perPage));
			dispatch(setLoading(false));
		},
		[dispatch, query, search.perPage, hitMap, loadInitialData, getEndpoint],
	);

	const loadMore = useCallback(() => {
		refine(search.searchTerm, {
			minSearchCharacters: 0,
			offset: search.offset,
			append: true,
		});
	}, [refine, search.offset, search.searchTerm]);

	// loadInitialData
	useEffect(() => {
		if (results.totalResults === null && loadInitialData) {
			refine(null);
		}
	}, [refine, results.totalResults, loadInitialData]);

	return { refine, search, results, loadMore };
};

export default useSearch;
