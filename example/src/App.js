import React from 'react';
import { AutosuggestField } from 'elasticpress-react';
import 'elasticpress-react/dist/index.css';

const App = () => {
  return (
    <AutosuggestField endpoint='http://elasticpress.test/__elasticsearch/elasticpresstest-post-1/_doc/_search' />
  );
};

export default App;
