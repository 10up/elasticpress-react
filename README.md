# ElasticPress React

> ElasticPress React is a library of React components to supercharge your headless WordPress website with ElasticPress.

[![Support Level](https://img.shields.io/badge/support-active-green.svg)](#support-level) [![Release Version](https://img.shields.io/github/release/10up/elasticpress-react.svg)](https://github.com/10up/elasticpress-react/releases/latest) [![GPLv2 License](https://img.shields.io/github/license/10up/elasticpress-react.svg)](https://github.com/10up/elasticpress-react/blob/develop/LICENSE.md)

## Requirements

* Elasticsearch per [ElasticPress requirements](https://github.com/10up/ElasticPress#requirements).
* WordPress website running [ElasticPress](https://elasticpress.io).

## Installation

To install ElasticPress React, simply install via npm:

```
npm install @10up/elasticpress-react --save
```

You will need an Elasticsearch instance and a WordPress website running [ElasticPress](https://elasticpress.io).

## Components

### Autosuggest

This component outputs a search field that when typed in will autosuggest results to the user.

```js
import { AutosuggestField } from '@10up/elasticpress-react';

const MyComponent = () => {
	<>
		<p>Here is my fancy new component.</p>

		<p>Here's a search input with autosuggest:</p>

		<AutosuggestField
			endpoint="https://myelasticsearchinstance.dev/indexname/_doc/_search"
		/>
	</>
};
```

#### Screenshot

![Autosuggest screenshot](https://github.com/10up/elasticpress-react/raw/develop/screenshots/autosuggest.jpg)

### Related Content

This component outputs content related to a post.

```js
import { RelatedContent } from '@10up/elasticpress-react';

const MyComponent = () => {
	<>
		<p>Here is my fancy new component.</p>

		<p>Here is some related content to post 5:</p>

		<RelatedContent
			wpApiRoot="https://mysite.com/wp-json"
			postId="5"
		/>
	</>
};
```

### Search and Posts

These components provide a provider, a search field, and a posts river. Using these components, you can create a full search experience.

```js
import { PostContextProvider, SearchField, Posts } from '@10up/elasticpress-react';

const MyComponent = () => {
	// Make sure to wrap your components with the provider.
	<PostContextProvider>
		<>
			{ /* This is the search field input. */ }
			<SearchField endpoint="http://elasticpress.test/__elasticsearch/elasticpresstest-post-1/_doc/_search" />

			{ /* This is the posts river. */ }
			<Posts />
		</>
	</PostContextProvider>
};
```

#### Screenshot
![Posts screenshot](https://github.com/10up/elasticpress-react/raw/develop/screenshots/posts.jpg)

## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Changelog

A complete listing of all notable changes to ElasticPress React components are documented in [CHANGELOG.md](https://github.com/10up/elasticpress-react/blob/develop/CHANGELOG.md).

## Contributing

Please read [CODE_OF_CONDUCT.md](https://github.com/10up/elasticpress-react/blob/develop/CODE_OF_CONDUCT.md) for details on our code of conduct, [CONTRIBUTING.md](https://github.com/10up/elasticpress-react/blob/develop/CONTRIBUTING.md) for details on the process for submitting pull requests to us, and [CREDITS.md](https://github.com/10up/elasticpress-react/blob/develop/CREDITS.md) for a listing of maintainers of, contributors to, and libraries used by ElasticPress React components.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10updotcom-wpengine.s3.amazonaws.com/uploads/2016/10/10up-Github-Banner.png" width="850" alt="Work with us at 10up"></a>
