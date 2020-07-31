/**
 * ElasticPress post item component
 */

import React from 'react';
import PropTypes from 'prop-types'; /* eslint-disable-line import/no-extraneous-dependencies */

const PostItem = ({ post }) => {
	return (
		<li>
			<a href={post.permalink}>{post.post_title}</a>
		</li>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
};

export default PostItem;
