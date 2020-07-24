/**
 * ElasticPress related content component
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { post } from '../../api';
import { replacePlaceholderInObjectValues } from '../../utils';

const RelatedContent = ({ endpoint, query, hitMap, numItems, postId }) => {
  const [results, setResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const getResults = (search) => {
    let newQuery = replacePlaceholderInObjectValues(query, '%POST_ID%', postId);

    newQuery = replacePlaceholderInObjectValues(
      newQuery,
      '%NUM_ITEMS%',
      numItems
    );

    setLoading(true);

    post(newQuery, endpoint).then((response) => {
      let newResults = [];

      if (response.hits && response.hits.hits) {
        newResults = response.hits.hits.map(hitMap);
      }

      setResults(newResults);

      setLoading(false);
    });
  };

  useEffect(() => {
    getResults();
  }, [postId, query, endpoint, numItems]);

  return (
    <section className={'ep-related-content' + (loading ? ' loading' : '')}>
      {results ? (
        <ul>
          {results.map((result) => (
            <li key={result.post_id}>
              <a href={result.permalink}>{result.post_title}</a>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </section>
  );
};

export const query = {
  from: 0,
  size: '%NUM_ITEMS%',
  sort: [
    {
      post_date: {
        order: 'desc'
      }
    }
  ],
  query: {
    more_like_this: {
      like: {
        _id: '%POST_ID%'
      },
      fields: ['post_title', 'post_content', 'terms.post_tag.name'],
      min_term_freq: 1,
      max_query_terms: 12,
      min_doc_freq: 1
    }
  },
  post_filter: {
    bool: {
      must: [
        {
          terms: {
            'post_type.raw': ['post']
          }
        },
        {
          terms: {
            post_status: ['publish']
          }
        }
      ]
    }
  }
};

RelatedContent.defaultProps = {
  numItems: 5,
  query: query,
  hitMap: (hit) => {
    return hit._source;
  }
};

RelatedContent.propTypes = {
  endpoint: PropTypes.string.isRequired,
  query: PropTypes.object,
  hitMap: PropTypes.func,
  numResults: PropTypes.number,
  postId: PropTypes.number.isRequired
};

export default RelatedContent;
