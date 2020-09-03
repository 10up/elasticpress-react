import React from 'react';
import { renderToString } from 'react-dom/server';
import { buildQuery, runEPQuery } from '../utils';

const findResultsState = async (App, props) => {
	if (!props) {
		throw new Error(
			'The function `findResultsState` must be called with props: `findResultsState(App, props)`',
		);
	}

	let context = {};

	renderToString(
		<App
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

	const { results, totalResults } = await runEPQuery(
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
};

export default findResultsState;
