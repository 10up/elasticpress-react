export const SET_RESULTS = 'SET_RESULTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_SEARCH_TERMS = 'SET_SEARCH_TERMS';
export const REFINE = 'REFINE';
export const SET_OFFSET = 'SET_OFFSET';

export const setSearchTerm = (value) => ({
	type: SET_SEARCH_TERMS,
	payload: value,
});

export const setLoading = (isLoading) => ({
	type: SET_LOADING,
	payload: isLoading,
});

export const setResults = ({ results, totalResults, append = true }) => ({
	type: SET_RESULTS,
	payload: {
		results,
		totalResults,
		append,
	},
});

export const setOffset = (offset) => ({
	type: SET_OFFSET,
	payload: offset,
});
