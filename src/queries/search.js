export default {
	from: 0,
	size: '%PER_PAGE%',
	sort: [
		{
			_score: {
				order: 'desc',
			},
		},
	],
	query: {
		function_score: {
			query: {
				bool: {
					should: [
						{
							bool: {
								should: [
									{
										multi_match: {
											query: '%SEARCH_TERMS%',
											type: 'phrase',
											fields: [
												'post_title^8',
												'post_excerpt^1',
												'post_content^1',
												'terms.ep_custom_result.name^9999',
											],
											boost: 4,
										},
									},
									{
										multi_match: {
											query: '%SEARCH_TERMS%',
											fields: [
												'post_title^8',
												'post_excerpt^1',
												'post_content^1',
												'terms.ep_custom_result.name^9999',
											],
											type: 'phrase',
											slop: 5,
										},
									},
								],
							},
						},
					],
				},
			},
			functions: [
				{
					exp: {
						post_date_gmt: {
							scale: '14d',
							decay: 0.25,
							offset: '7d',
						},
					},
				},
			],
			score_mode: 'avg',
			boost_mode: 'sum',
		},
	},
	post_filter: {
		bool: {
			must: [
				{
					terms: {
						'post_type.raw': ['post', 'page'],
					},
				},
				{
					term: {
						post_status: 'publish',
					},
				},
			],
		},
	},
};
