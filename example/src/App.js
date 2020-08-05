import React from 'react';
import {
	AutosuggestField,
	RelatedContent,
	PostContextProvider,
	SearchField,
	Posts,
} from '@10up/elasticpress-react';
import '@10up/elasticpress-react/dist/index.css';

const App = () => {
	return (
		<div>
			<h2>Autosuggest Field</h2>
			<AutosuggestField endpoint="http://elasticpress.test/__elasticsearch/elasticpresstest-post-1/_doc/_search" />

			<h2>Related Posts</h2>
			<RelatedContent wpApiRoot="http://elasticpress.test/wp-json" postId={2738} />

			<h2>Search</h2>
			<PostContextProvider endpoint="http://elasticpress.test/__elasticsearch/elasticpresstest-post-1/_doc/_search">
				<>
					<div>
						<SearchField />
					</div>

					<div>
						<Posts />
					</div>
				</>
			</PostContextProvider>
		</div>
	);
};

export default App;
