/**
 * ElasticPress related content component
 */

import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import LoadMore from './LoadMore';
import { useElasticPress } from '../../hooks';

const Posts = ({ PostItemComponent, noPostsFoundMessage, LoadMoreComponent }) => {
	const { state } = useElasticPress();

	return (
		<section className={`ep-posts${state.loading ? ' loading' : ''}`}>
			{!state.loading && state.results && state.results.length > 0 && (
				<ul>
					{state.results.map((post) => {
						return <PostItemComponent key={post.ID} post={post} />;
					})}
				</ul>
			)}

			{!state.loading && state.results && !state.results.length && (
				<p>{noPostsFoundMessage}</p>
			)}

			{!state.loading && state.results && state.results.length < state.totalResults && (
				<LoadMoreComponent />
			)}
		</section>
	);
};

Posts.defaultProps = {
	PostItemComponent: PostItem,
	LoadMoreComponent: LoadMore,
	noPostsFoundMessage: 'No posts found.',
};

Posts.propTypes = {
	PostItemComponent: PropTypes.func,
	LoadMoreComponent: PropTypes.func,
	noPostsFoundMessage: PropTypes.string,
};

export default Posts;
