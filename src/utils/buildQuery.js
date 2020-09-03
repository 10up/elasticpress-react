import replacePlaceholderInObjectValues from './replacePlaceholderInObjectValues';

/**
 * Builds a ElasticSearch query from the search state
 *
 * @param {object} epQuery The ElasticSearch Query
 * @param {object} search The search object.
 * @param {string} [search.searchTerm] The search term.
 * @param {number} [search.perPage] How many hits return perPage
 * @param {number} [search.offset] How many hits offset.
 *
 * @returns {object} ElasticSearch query object.
 */
const buildQuery = (epQuery, search) => {
	const query = replacePlaceholderInObjectValues(epQuery, {
		'%SEARCH_TERMS%': search.searchTerm,
		'%PER_PAGE%': search.perPage,
	});

	query.from = search.offset;

	if (!search.searchTerm) {
		delete query.query;
	}

	return query;
};

export default buildQuery;
