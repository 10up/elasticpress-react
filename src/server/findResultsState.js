import React from 'react';
import { renderToString } from 'react-dom/server';
import { buildQuery, runEPQuery } from '../utils';

/**
 * Runs the necessary EP Queries to populate the results state.
 *
 * @param {*} App
 * @param {*} props
 *
 * @returns {object}
 */
const findResultsState = async (App, props) => {
	if (!props) {
		throw new Error(
			'The function `findResultsState` must be called with props: `findResultsState(App, props)`',
		);
	}

	let context = {};

	renderToString(
		<App
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
			onSSR={(c) => {
				context = c;
			}}
		/>,
	);

	const {
		getEndpoint,
		hitMap,
		query,
		state: {
			search: { searchTerm, perPage, offset },
		},
	} = context;

	try {
		const { results, totalResults } = await runEPQuery(
			searchTerm,
			buildQuery(query, {
				searchTerm,
				offset,
				perPage,
			}),
			getEndpoint('search'),
			hitMap,
		);

		return {
			items: results,
			totalResults,
		};
	} catch (exception) {
		console.log('exception', exception);
		return {
			items: {},
			totalResults: 0,
		};
	}
};

export default findResultsState;
