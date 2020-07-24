import React from 'react';
import { AutosuggestField, RelatedContent } from 'elasticpress-react';
import 'elasticpress-react/dist/index.css';

const App = () => {
	return (
		<div>
			<AutosuggestField endpoint="http://elasticpress.test/__elasticsearch/elasticpresstest-post-1/_doc/_search" />

			<RelatedContent
				endpoint="http://elasticpress.test/__elasticsearch/elasticpresstest-post-1/_doc/_search"
				postId="2738"
			/>
		</div>
	);
};

export default App;
