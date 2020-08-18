import { SET_RESULTS, SET_LOADING, SET_SEARCH_TERMS } from './actions';
import { query as esQuery } from '../SearchField';

export const initialState = {
	results: null,
	searchTerms: null,
	perPage: 10,
	offset: 0,
	totalResults: null,
	loading: false,
	query: esQuery,
	hitMap: (hit) => {
		return hit._source;
	},
	node: null,
	indexName: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case SET_RESULTS: {
			const { append, ...payload } = action.payload;
			return {
				...state,
				...payload,
				results: append ? state.results.concat(payload.results) : payload.results,
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
				searchTerms: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
