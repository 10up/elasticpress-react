/**
 * ElasticPress autosuggest field
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { post } from '../../api';
import { replacePlaceholderInObjectValues } from '../../utils';
import styles from './styles.module.css';
import AutosuggestFieldItem from './AutosuggestFieldItem';
import useRoveFocus from '../../hooks/useRoveFocus';

const AutosuggestField = ({
  value,
  placeholder,
  name,
  endpoint,
  query,
  hitMap,
  minSearchCharacters,
  numResults
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const [results, setResults] = useState(false);
  const [focus, setFocus] = useRoveFocus(numResults);
  const inputRef = useRef(null);

  const onChange = (event) => {
    setSearchValue(event.target.value);

    if (event.target.value.length >= minSearchCharacters) {
      getResults(event.target.value);
    } else {
      setResults(false);
    }
  };

  const getResults = (search) => {
    let newQuery = replacePlaceholderInObjectValues(
      query,
      '%SEARCH_TERMS_PLACEHOLDER%',
      search
    );

    newQuery = replacePlaceholderInObjectValues(
      newQuery,
      '%NUM_RESULTS%',
      numResults
    );

    post(newQuery, endpoint).then((response) => {
      let newResults = [];

      if (response.hits && response.hits.hits) {
        newResults = response.hits.hits.map(hitMap);
      }

      setResults(newResults);
    });
  };

  useEffect(() => {
    if (focus === -1) {
      // Move element into view when it is focused
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <div className={styles.container + ' ep-autosuggest-container'}>
      <input
        onChange={onChange}
        type='search'
        placeholder={placeholder}
        value={searchValue}
        name={name}
        ref={inputRef}
        autoComplete='off'
      />
      {results && results.length ? (
        <div className={styles.dropdownContainer + ' ep-autosuggest'}>
          <ul
            className={styles.dropdownList + ' autosuggest-list'}
            role='listbox'
          >
            {results.map((result, index) => {
              return (
                <AutosuggestFieldItem
                  key={result.ID}
                  setFocus={setFocus}
                  index={index}
                  focus={focus === index}
                  result={result}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const query = {
  from: 0,
  size: '%NUM_RESULTS%',
  sort: [
    {
      _score: {
        order: 'desc'
      }
    }
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
                      query: '%SEARCH_TERMS_PLACEHOLDER%',
                      type: 'phrase',
                      fields: [
                        'post_title^8',
                        'post_excerpt^1',
                        'post_content^1',
                        'terms.ep_custom_result.name^9999'
                      ],
                      boost: 4
                    }
                  },
                  {
                    multi_match: {
                      query: '%SEARCH_TERMS_PLACEHOLDER%',
                      fields: [
                        'post_title^8',
                        'post_excerpt^1',
                        'post_content^1',
                        'terms.ep_custom_result.name^9999'
                      ],
                      type: 'phrase',
                      slop: 5
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      functions: [
        {
          exp: {
            post_date_gmt: {
              scale: '14d',
              decay: 0.25,
              offset: '7d'
            }
          }
        }
      ],
      score_mode: 'avg',
      boost_mode: 'sum'
    }
  },
  post_filter: {
    bool: {
      must: [
        {
          terms: {
            'post_type.raw': ['post', 'page']
          }
        },
        {
          term: {
            post_status: 'publish'
          }
        }
      ]
    }
  }
};

AutosuggestField.defaultProps = {
  name: 's',
  placeholder: 'Search...',
  value: '',
  minSearchCharacters: 3,
  numResults: 10,
  query: query,
  hitMap: (hit) => {
    return hit._source;
  }
};

AutosuggestField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
  query: PropTypes.object,
  hitMap: PropTypes.func,
  minSearchCharacters: PropTypes.number,
  numResults: PropTypes.number
};

export default AutosuggestField;
