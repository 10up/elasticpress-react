import { getESEndpoint } from '..';

const config = {
	indexName: 'post-1',
	node: 'https://elasticpress.test/__elasticsearch',
};

describe('getESEndpoint', () => {
	it('returns the correct elasticsearch endpoint', () => {
		expect(getESEndpoint('search', config)).toEqual(
			`${config.node}/${config.indexName}/_doc/_search`,
		);
	});

	it('returns the correct elasticpress.io endpoint', () => {
		expect(
			getESEndpoint('search', {
				...config,
				elasticpressio: 'http://esiohost.com/autosuggest',
			}),
		).toEqual('http://esiohost.com/autosuggest');
	});
});
