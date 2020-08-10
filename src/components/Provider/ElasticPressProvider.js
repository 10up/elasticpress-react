import React, { useReducer, createContext } from 'react';
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
 * @param {string} [props.endpoint] - The ElasticSearch endpoint.
 * @param {number} [props.perPage] - The number of hits per page.
 * @param {React.Component} [props.hitMap] - A hitMap component.
 * @param {object} [props.query] - An object describing the ElasticSearch query to perform.
 *
 * @returns {React.JSXElementConstructor}
 */
const ElasticPressProvider = ({ children, endpoint, hitMap, query, perPage }) => {
	const [state, dispatch] = useReducer(reducer, {
		...initialState,
		endpoint: endpoint ?? initialState.endpoint,
		hitMap: hitMap ?? initialState.hitMap,
		query: query ?? initialState.query,
		perPage: perPage ?? initialState.perPage,
	});

	return (
		<ElasticPressContext.Provider value={{ state, dispatch }}>
			{children}
		</ElasticPressContext.Provider>
	);
};

ElasticPressProvider.propTypes = {
	children: PropTypes.node.isRequired,
	perPage: PropTypes.number,
	hitMap: PropTypes.func,
	query: PropTypes.object,
	endpoint: PropTypes.string.isRequired,
};

ElasticPressProvider.defaultProps = {
	perPage: 10,
	query: initialState.query,
	hitMap: initialState.hitMap,
};

export default ElasticPressProvider;
