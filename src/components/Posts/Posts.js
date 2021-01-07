/**
 * ElasticPress related content component
 */

import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import LoadMore from './LoadMore';
import { useElasticPress } from '../../hooks';

const Posts = ({ PostItemComponent, noPostsFoundMessage, LoadMoreComponent }) => {
	const {
		state: { loading, results },
	} = useElasticPress();

	return (
		<section className={`ep-posts${loading ? ' loading' : ''}`}>
			{!loading && results?.items?.length > 0 && (
				<ul>
					{results?.items.map((post) => {
						return <PostItemComponent key={post.ID} post={post} />;
					})}
				</ul>
			)}

			{!loading && !results?.items?.length && <p>{noPostsFoundMessage}</p>}

			{!loading && results?.items?.length < results?.totalResults && <LoadMoreComponent />}
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
