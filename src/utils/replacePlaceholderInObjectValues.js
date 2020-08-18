import mapValues from 'lodash.mapvalues';
import isObject from 'lodash.isobject';
import isArray from 'lodash.isarray';

/**
 * Recursively map values from an array/object.
 *
 * @param {object|Array} obj The object/array to iterate over.
 * @param {Function} iteree The function to apply to each value
 *
 * @returns {object|Array}
 */
const mapValuesDeep = (obj, iteree) => {
	if (isArray(obj)) {
		return obj.map((arrItem) => mapValuesDeep(arrItem, iteree));
	}

	if (isObject(obj)) {
		return mapValues(obj, (v) => mapValuesDeep(v, iteree));
	}

	return iteree(obj);
};

/**
 * Recursively replace placeholders in an object. Returns new object
 *
 * @param {object} obj The object to recursively replaced placeholders from.
 * @param {string} placeholder e.g. %SEARCH_TERMS_PLACEHOLDER%
 * @param {string} replacement Text to replace
 *
 * @returns {object}
 */
export default (obj, placeholder, replacement) => {
	const processReplacements = (value) => {
		if (typeof value === 'string') {
			return value.replace(placeholder, replacement);
		}

		return value;
	};

	return mapValuesDeep(obj, processReplacements);
};
