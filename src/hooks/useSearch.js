import { useCallback, useEffect } from 'react';

import useElasticPress from './useElasticPress';
import { setSearchTerm, setLoading, setResults, setOffset } from '../components/Provider';
import { buildQuery, runEPQuery } from '../utils';

const useSearch = () => {
	const {
		dispatch,
		query,
		state: { search, results },
		hitMap,
		loadInitialData,
		getEndpoint,
		onSearch,
	} = useElasticPress();

	const refine = useCallback(
		async (value, options = {}) => {
			const minSearchCharacters = options?.minSearchCharacters ?? 3;
			const offset = options?.offset ?? 0;
			const append = options?.append ?? false;

			dispatch(setSearchTerm(value));

			// if value being searched is empty string and loadInitialData is true we need to reload initial data
			if (typeof value === 'string' && value.length === 0 && loadInitialData) {
				refine(null, options);
				return;
			}

			if (typeof value === 'string' && value.length < minSearchCharacters) {
				return;
			}

			dispatch(setLoading(true));

			const searchState = {
				searchTerm: value,
				offset,
				perPage: search.perPage,
			};

			try {
				const { results, totalResults } = await runEPQuery(
					searchState.searchTerm,
					buildQuery(query, searchState),
					getEndpoint('search'),
					hitMap,
				);

				onSearch(searchState);

				dispatch(setResults({ results, totalResults, append }));
				dispatch(setOffset(offset));
			} catch (exception) {
				// setError();
			}

			dispatch(setLoading(false));
		},
		[dispatch, query, onSearch, search.perPage, hitMap, loadInitialData, getEndpoint],
	);

	const loadMore = useCallback(() => {
		refine(search.searchTerm, {
			minSearchCharacters: 0,
			offset: Number(search.offset) + Number(search.perPage),
			append: true,
		});
	}, [refine, search.offset, search.perPage, search.searchTerm]);

	// loadInitialData
	useEffect(() => {
		if (results.totalResults === null && loadInitialData) {
			refine(null);
		}
	}, [refine, results.totalResults, loadInitialData]);

	return { refine, search, results, loadMore };
};

export default useSearch;
