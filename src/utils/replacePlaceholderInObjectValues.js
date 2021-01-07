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
 * @param {object} replacements Object with a list of replacements { %PLACEHOLDER%: 'replacement' }
 *
 * @returns {object}
 */
export default (obj, replacements) => {
	const placeholders = Object.keys(replacements);

	const processReplacements = (value) => {
		if (typeof value === 'string' && placeholders.includes(value)) {
			return value.replace(value, replacements[value]);
		}

		return value;
	};

	return mapValuesDeep(obj, processReplacements);
};
