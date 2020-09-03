import replacePlaceholderInObjectValues from './replacePlaceholderInObjectValues';

/**
 * Builds a ElasticSearch query from the search state
 *
 * @param epQuery
 * @param search
 
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
