import React from 'react';
import { AutosuggestField, RelatedContent } from '@10up/elasticpress-react';
import '@10up/elasticpress-react/dist/index.css';

const App = () => {
	return (
		<div>
			<AutosuggestField endpoint="http://elasticpress.test/__elasticsearch/elasticpresstest-post-1/_doc/_search" />

			<RelatedContent wpApiRoot="http://elasticpress.test/wp-json" postId={2738} />
		</div>
	);
};

export default App;
