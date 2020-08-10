import { useContext } from 'react';
import { ElasticPressContext } from './ElasticPressProvider';

/**
 * A simple hook to return the ElasticPressProvider state
 *
 * @returns {object}
 */
const useElasticPress = () => {
	return useContext(ElasticPressContext);
};

export default useElasticPress;
