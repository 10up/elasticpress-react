/**
 * ElasticPress related content component
 */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { get } from '../../api';
import { replacePlaceholderInObjectValues } from '../../utils';

const RelatedContent = ({ query, wpApiRoot, numItems, postId }) => {
	const [results, setResults] = useState(false);
	const [loading, setLoading] = useState(false);

	const getResults = useCallback(() => {
		let newQuery = replacePlaceholderInObjectValues(query, '%POST_ID%', postId);

		newQuery = replacePlaceholderInObjectValues(newQuery, '%NUM_ITEMS%', numItems);

		setLoading(true);

		get(newQuery, `${wpApiRoot}/wp/v2/posts/${postId}/related?number=${numItems}`).then(
			(posts) => {
				setResults(posts);

				setLoading(false);
			},
		);
	}, [postId, query, wpApiRoot, numItems]);

	useEffect(() => {
		getResults();
	}, [getResults]);

	return (
		<section className={`ep-related-content${loading ? ' loading' : ''}`}>
			{results ? (
				<ul>
					{results.map((result) => (
						<li key={result.id}>
							<a href={result.link}>{result.title.rendered}</a>
						</li>
					))}
				</ul>
			) : (
				''
			)}
		</section>
	);
};

export const query = {
	from: 0,
	size: '%NUM_ITEMS%',
	sort: [
		{
			post_date: {
				order: 'desc',
			},
		},
	],
	query: {
		more_like_this: {
			like: {
				_id: '%POST_ID%',
			},
			fields: ['post_title', 'post_content', 'terms.post_tag.name'],
			min_term_freq: 1,
			max_query_terms: 12,
			min_doc_freq: 1,
		},
	},
	post_filter: {
		bool: {
			must: [
				{
					terms: {
						'post_type.raw': ['post'],
					},
				},
				{
					terms: {
						post_status: ['publish'],
					},
				},
			],
		},
	},
};

RelatedContent.defaultProps = {
	numItems: 5,
	query,
	wpApiRoot: '/wp-json',
};

RelatedContent.propTypes = {
	query: PropTypes.object,
	wpApiRoot: PropTypes.string,
	numItems: PropTypes.number,
	postId: PropTypes.number.isRequired,
};

export default RelatedContent;
