import { SET_RESULTS, SET_LOADING, SET_SEARCH_TERMS, SET_OFFSET } from './actions';

export const initialState = {
	search: {
		searchTerm: null,
		perPage: 10,
		offset: 0,
	},
	results: {
		items: null,
		totalResults: null,
	},
	loading: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case SET_RESULTS: {
			const { append, totalResults, results } = action.payload;
			return {
				...state,
				results: {
					...state.results,
					totalResults,
					items: append ? state.results.items.concat(results) : results,
				},
			};
		}
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case SET_SEARCH_TERMS:
			return {
				...state,
				search: {
					...state.search,
					searchTerm: action.payload,
				},
			};
		case SET_OFFSET:
			return {
				...state,
				search: {
					...state.search,
					offset: action.payload,
				},
			};
		default:
			return state;
	}
};

export default reducer;
