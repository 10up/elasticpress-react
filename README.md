# ElasticPress React

ElasticPress React is a library of React components to supercharge your headless WordPress website with ElasticPress.

## Requirements

* ElasticSearch
* WordPress website running [ElasticPress](https://elasticpress.io)

## Install

To install ElasticPress React, simply install via npm:

```
npm install @10up/elasticpress-react --save
```

You will need an Elasticsearch instance and a WordPress website running [ElasticPress](https://elasticpress.io).

## Components

### Autosuggest

This component outputs a search field that when typed in will autosuggest results to the user.

```js
import { AutosuggestField } from 'elasticpress-react';

const MyComponent = () => {
  <>
    <p>Here is my fancy new component.</p>

    <p>Here's a search input with autosuggest:</p>

    <AutosuggestField
      endpoint="http://myelasticsearchinstance.dev/indexname/_doc/_search"
      />
  </>
};
```

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10updotcom-wpengine.s3.amazonaws.com/uploads/2016/10/10up-Github-Banner.png" width="850" alt="Work with us at 10up"></a>
