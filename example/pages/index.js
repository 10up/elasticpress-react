import React from 'react';
import Head from 'next/head';
import {
	AutosuggestField,
	RelatedContent,
	SearchField,
	Posts,
	ElasticPressProvider,
	findResultsState,
} from '@10up/elasticpress-react';

import styles from '../styles/Home.module.css';

const Search = (props) => (
	<ElasticPressProvider
		node="http://elasticpress.test/__elasticsearch"
		indexName="elasticpresstest-post-1"
		{...props}
	>
		<div>
			<SearchField />
		</div>

		<div>
			<Posts />
		</div>
	</ElasticPressProvider>
);

// eslint-disable-next-line
const Home = ({ resultsState }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<ElasticPressProvider
					node="http://elasticpress.test/__elasticsearch"
					indexName="elasticpresstest-post-1"
					loadInitialData={false}
				>
					<AutosuggestField />
				</ElasticPressProvider>

				<h2>Related Posts</h2>
				<RelatedContent wpApiRoot="http://elasticpress.test/wp-json" postId={2738} />

				<h2>Search</h2>
				<Search resultsState={resultsState} />
			</main>

			<footer className={styles.footer}>
				<a href="10up.com" target="_blank" rel="noopener noreferrer">
					Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
				</a>
			</footer>
		</div>
	);
};

export async function getServerSideProps() {
	const props = {};
	const resultsState = await findResultsState(Search, props);

	return {
		props: { resultsState },
	};
}

export default Home;
