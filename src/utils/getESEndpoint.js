/**
 * Returns the elasticsearch endpoint
 *
 * @param {string} type The type of the endpoint to return
 * @param {object} config - ElasticPress config object.
 * @param {string} [config.node] - The ElasticSearch node.
 * @param {string} [config.indexName] - The ElasticSearch indexName.
 * @param {string} [config.elasticpressio] - The ElasticPress.io host (optional).
 *
 * @returns {string}
 */
export default (type = 'search', config) => {
	const { node, indexName, elasticpressio } = config;

	if (type === 'search' && typeof elasticpressio === 'undefined') {
		return `${node}/${indexName}/_doc/_search`;
	}

	if (type === 'search' && typeof elasticpressio === 'string') {
		return config.elasticpressio;
	}

	return '';
};
