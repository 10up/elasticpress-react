import { post } from '../api';

/**
 * Builds a ElasticSearch query from the search state
 *
 * @param {object} query The final ElasticSearch Query
 * @param {string} endpoint
 * @param {string} searchTerm
 * @param {Function} hitMap
 * @returns {object} ElasticSearch query object.
 */
const runEPQuery = async (searchTerm = '', query, endpoint, hitMap) => {
	const response = await post(query, endpoint, searchTerm);

	let results = [];
	let totalResults = 0;

	if (response.hits && response.hits.hits) {
		if (response.hits.total) {
			totalResults = parseInt(response?.hits?.total?.value || response?.hits?.total, 10);
		}

		results = response.hits.hits.map(hitMap);
	}

	return { results, totalResults };
};

export default runEPQuery;
