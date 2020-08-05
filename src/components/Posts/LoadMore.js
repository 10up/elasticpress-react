import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { PostContext } from '../../contexts/PostContext';
import styles from './load-more.module.css';
import { replacePlaceholderInObjectValues } from '../../utils';
import { post } from '../../api';

const LoadMore = ({ buttonText }) => {
	const [state, dispatch] = useContext(PostContext);
	const handleLoadMore = () => {
		dispatch({
			type: 'set_loading',
			payload: true,
		});

		let newQuery = replacePlaceholderInObjectValues(
			state.query,
			'%SEARCH_TERMS%',
			state.searchTerms,
		);

		newQuery = replacePlaceholderInObjectValues(newQuery, '%PER_PAGE%', state.perPage);

		newQuery.from = state.offset;

		post(newQuery, state.endpoint).then((response) => {
			let newResults = [];
			let totalResults = 0;

			if (response.hits && response.hits.hits) {
				if (response.hits.total && response.hits.total.value) {
					totalResults = parseInt(response.hits.total.value, 10);
				}
				newResults = response.hits.hits.map(state.hitMap);
			}

			dispatch({
				type: 'set_results',
				payload: {
					results: state.results.concat(newResults),
					totalResults,
					offset: state.offset + state.perPage,
				},
			});

			dispatch({
				type: 'set_loading',
				payload: false,
			});
		});
	};

	return (
		<button className={`${styles.button} ep-load-more`} onClick={handleLoadMore} type="button">
			{buttonText}
		</button>
	);
};

LoadMore.defaultProps = {
	buttonText: 'Load More',
};

LoadMore.propTypes = {
	buttonText: PropTypes.string,
};

export default LoadMore;
