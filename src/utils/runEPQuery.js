import { post } from '../api';

/**
 * Builds a ElasticSearch query from the search state
 *
 * @param {object} query The final ElasticSearch Query
 * @param {string} endpoint
 * @param {Function} hitMap
 * @returns {object} ElasticSearch query object.
 */
const runEPQuery = async (query, endpoint, hitMap) => {
	const response = await post(query, endpoint);
	let results = [];
	let totalResults = 0;

	if (response.hits && response.hits.hits) {
		if (response.hits.total && response.hits.total.value) {
			totalResults = parseInt(response.hits.total.value, 10);
		}
		results = response.hits.hits.map(hitMap);
	}

	return { results, totalResults };
};

export default runEPQuery;
