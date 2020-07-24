/**
 * Recursively replace placeholders in an object. Returns new object
 *
 * @param {*} obj Object to recurse
 * @param {String} placeholder e.g. %SEARCH_TERMS_PLACEHOLDER%
 * @param {String} replacement Text to replace
 * @return {*}
 */
export const replacePlaceholderInObjectValues = (
  oldObj,
  placeholder,
  replacement
) => {
  const obj = JSON.parse(JSON.stringify(oldObj));

  const isPlainObject = (something) => {
    return Object.prototype.toString.call(something) === '[object Object]';
  };

  const recurseArray = (arr) => {
    return arr.map((value) => {
      if (Array.isArray(value)) {
        return recurseArray(value);
      } else if (isPlainObject(value)) {
        return recurseObject(value);
      } else if (typeof value === 'string' || value instanceof String) {
        return value.replace(placeholder, replacement);
      }
    });
  };

  const recurseObject = (newObj) => {
    Object.keys(newObj).forEach((key) => {
      if (typeof newObj[key] === 'string' || newObj[key] instanceof String) {
        newObj[key] = newObj[key].replace(placeholder, replacement);
      } else if (Array.isArray(newObj[key])) {
        newObj[key] = recurseArray(newObj[key]);
      } else if (isPlainObject(newObj[key])) {
        newObj[key] = recurseObject(newObj[key]);
      }
    });

    return newObj;
  };

  return recurseObject(obj);
};
