import React, { useReducer, createContext, useCallback } from 'react';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import reducer, { initialState } from './reducer';
import query from '../SearchField/query';

export const ElasticPressContext = createContext(initialState);

/**
 * @typedef {import('react')} React
 *
 */

/**
 * The ElasticPress Provider
 *
 * @param {object} props - The components props.
 * @param {string} [props.node] - The ElasticSearch node.
 * @param {string} [props.indexName] - The ElasticSearch index name.
 * @param {Function} [props.hitMap] - A function that maps the result of hits.
 * @param {object} [props.searchState] - The search state (optional);
 * @param {number} [props.perPage] - The number of hits per page.
 * @param {Function} [props.onSearch] - Callback function triggered whenever a function is executed
 * @param {object} [props.query] - An object describing the ElasticSearch query to perform.
 *
 * @returns {React.JSXElementConstructor}
 */
const ElasticPressProvider = ({
	children,
	node,
	indexName,
	hitMap,
	loadInitialData,
	searchState,
	resultsState,
	query,
	onSSR,
	onSearch,
}) => {
	invariant(node, 'You must specify a ElasticSearch node');
	invariant(indexName, 'You must specify a indexName');

	const [state, dispatch] = useReducer(reducer, {
		...initialState,
		search: searchState ?? initialState.state,
		results: resultsState ?? initialState.results,
	});

	/**
	 * Returns the ES endpoint for the desired query.
	 *
	 * @param {string} type The query type.
	 * @returns {string} Endpoint url
	 */
	const getEndpoint = useCallback(
		(type = 'search') => {
			if (type === 'search') {
				return `${node}/${indexName}/_doc/_search`;
			}

			return '';
		},
		[indexName, node],
	);

	const contextValue = {
		node,
		indexName,
		loadInitialData,
		state,
		hitMap,
		query,
		getEndpoint,
		dispatch,
		onSearch,
	};

	if (typeof window === 'undefined' && typeof onSSR === 'function') {
		onSSR(contextValue);
	}

	return (
		<ElasticPressContext.Provider value={contextValue}>{children}</ElasticPressContext.Provider>
	);
};

ElasticPressProvider.propTypes = {
	children: PropTypes.node.isRequired,
	searchState: PropTypes.shape({
		searchTerm: PropTypes.string,
		perPage: PropTypes.number,
	}),
	resultsState: PropTypes.shape({}),
	loadInitialData: PropTypes.bool,
	hitMap: PropTypes.func,
	query: PropTypes.object,
	node: PropTypes.string.isRequired,
	indexName: PropTypes.string.isRequired,
	onSSR: PropTypes.func,
	onSearch: PropTypes.func,
};

ElasticPressProvider.defaultProps = {
	searchState: initialState.search,
	resultsState: initialState.resultsState,
	query,
	hitMap: (hit) => {
		return hit._source;
	},
	loadInitialData: true,
	onSSR: null,
	onSearch: () => {},
};

export default ElasticPressProvider;
