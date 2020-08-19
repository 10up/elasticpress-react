import React, { useReducer, createContext, useCallback } from 'react';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import reducer, { initialState } from './reducer';

export const ElasticPressContext = createContext(initialState);

/**
 * @typedef {import('react')} React
 */

/**
 * The ElasticPress Provider
 *
 * @param {object} props - The components props.
 * @param {string} [props.node] - The ElasticSearch node.
 * @param {string} [props.indexName] - The ElasticSearch index name.
 * @param {number} [props.perPage] - The number of hits per page.
 * @param {React.Component} [props.hitMap] - A hitMap component.
 * @param {object} [props.query] - An object describing the ElasticSearch query to perform.
 *
 * @returns {React.JSXElementConstructor}
 */
const ElasticPressProvider = ({
	children,
	node,
	indexName,
	hitMap,
	query,
	perPage,
	loadInitialData,
}) => {
	invariant(node, 'You must specify a ElasticSearch node');
	invariant(indexName, 'You must specify a indexName');

	const [state, dispatch] = useReducer(reducer, {
		...initialState,
		node: node ?? initialState.node,
		indexName: indexName ?? initialState.indexName,
		hitMap: hitMap ?? initialState.hitMap,
		query: query ?? initialState.query,
		perPage: perPage ?? initialState.perPage,
		loadInitialData: loadInitialData ?? initialState.loadInitialData,
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
				return `${state.node}/${state.indexName}/_doc/_search`;
			}

			return '';
		},
		[state.indexName, state.node],
	);

	return (
		<ElasticPressContext.Provider value={{ state, getEndpoint, dispatch }}>
			{children}
		</ElasticPressContext.Provider>
	);
};

ElasticPressProvider.propTypes = {
	children: PropTypes.node.isRequired,
	perPage: PropTypes.number,
	hitMap: PropTypes.func,
	query: PropTypes.object,
	loadInitialData: PropTypes.bool,
	node: PropTypes.string.isRequired,
	indexName: PropTypes.string.isRequired,
};

ElasticPressProvider.defaultProps = {
	perPage: initialState.perPage,
	query: initialState.query,
	hitMap: initialState.hitMap,
	loadInitialData: initialState.loadInitialData,
};

export default ElasticPressProvider;
