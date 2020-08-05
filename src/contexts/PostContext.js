import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import { query as esQuery } from '../components/Posts/query';

const PostContext = createContext();

let initialState = {
	results: null,
	searchTerms: null,
	perPage: 10,
	offset: 0,
	totalResults: null,
	loading: false,
	query: null,
	hitMap: null,
	endpoint: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'set_results':
			return {
				...state,
				...action.payload,
			};
		case 'set_loading':
			return {
				...state,
				loading: action.payload,
			};
		case 'set_search_terms':
			return {
				...state,
				searchTerms: action.payload,
			};
		default:
			throw new Error();
	}
};

const PostContextProvider = ({ children, endpoint, hitMap, query, perPage }) => {
	initialState = {
		...initialState,
		endpoint,
		hitMap,
		query,
		perPage,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	return <PostContext.Provider value={[state, dispatch]}>{children}</PostContext.Provider>;
};

PostContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
	perPage: PropTypes.number,
	hitMap: PropTypes.func,
	query: PropTypes.object,
	endpoint: PropTypes.string.isRequired,
};

PostContextProvider.defaultProps = {
	perPage: 10,
	query: esQuery,
	hitMap: (hit) => {
		return hit._source;
	},
};

export { PostContextProvider, PostContext };
