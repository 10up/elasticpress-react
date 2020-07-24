/**
 * Post request to AJAX endpoint
 *
 * @param {*} data Data to post
 * @param {*} endpoint AJAX endpoint
 * @returns {Promise}
 */
export const post = async (data, endpoint) => {
	const options = {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	const response = await fetch(endpoint, options);

	return response.json();
};
