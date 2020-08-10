import React from 'react';
import {
	AutosuggestField,
	RelatedContent,
	SearchField,
	Posts,
	ElasticPressProvider,
} from '@10up/elasticpress-react';
import '@10up/elasticpress-react/dist/index.css';

const App = () => {
	return (
		<div>
			<h2>Autosuggest Field</h2>
			<AutosuggestField endpoint="http://elasticpress.test/__elasticsearch/elasticpresstest-post-1/post/_search" />

			<h2>Related Posts</h2>
			<RelatedContent wpApiRoot="http://elasticpress.test/wp-json" postId={2738} />

			<h2>Search</h2>
			<ElasticPressProvider endpoint="http://elasticpress.test/__elasticsearch/elasticpresstest-post-1/post/_search">
				<>
					<div>
						<SearchField />
					</div>

					<div>
						<Posts />
					</div>
				</>
			</ElasticPressProvider>
		</div>
	);
};

export default App;
