import React from 'react';
import PropTypes from 'prop-types';
import styles from './load-more.module.css';
import { useSearch } from '../../hooks';

const LoadMore = ({ buttonText }) => {
	const { loadMore } = useSearch();

	return (
		<button
			className={`${styles.button} ep-load-more`}
			onClick={() => {
				loadMore();
			}}
			type="button"
		>
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
