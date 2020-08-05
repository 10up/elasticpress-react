/**
 * ElasticPress related content component
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types'; /* eslint-disable-line import/no-extraneous-dependencies */
import { PostContext } from '../../contexts/PostContext';
import PostItem from './PostItem';
import LoadMore from './LoadMore';

const Posts = ({ PostItemComponent, noPostsFoundMessage, LoadMoreComponent }) => {
	const [state] = useContext(PostContext);

	return (
		<section className={`ep-posts${state.loading ? ' loading' : ''}`}>
			{!state.loading && state.results && state.results.length ? (
				<ul>
					{state.results.map((post) => {
						return <PostItemComponent key={post.ID} post={post} />;
					})}
				</ul>
			) : (
				''
			)}

			{!state.loading && state.results && !state.results.length ? (
				<p>{noPostsFoundMessage}</p>
			) : (
				''
			)}

			{!state.loading && state.results && state.results.length < state.totalResults ? (
				<LoadMoreComponent />
			) : (
				''
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
