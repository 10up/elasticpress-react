/**
 * ElasticPress related content component
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types'; /* eslint-disable-line import/no-extraneous-dependencies */
import { PostContext } from '../../contexts/PostContext';
import PostItem from './PostItem';

const Posts = ({ PostItemComponent, noPostsFoundMessage }) => {
	const [state] = useContext(PostContext);

	return (
		<section className={`ep-posts${state.loading ? ' loading' : ''}`}>
			{!state.loading && state.posts && state.posts.length ? (
				<ul>
					{state.posts.map((post) => {
						return <PostItemComponent key={post.ID} post={post} />;
					})}
				</ul>
			) : (
				''
			)}

			{!state.loading && state.posts && !state.posts.length ? (
				<p>{noPostsFoundMessage}</p>
			) : (
				''
			)}
		</section>
	);
};

Posts.defaultProps = {
	PostItemComponent: PostItem,
	noPostsFoundMessage: 'No posts found.',
};

Posts.propTypes = {
	PostItemComponent: PropTypes.func,
	noPostsFoundMessage: PropTypes.string,
};

export default Posts;
