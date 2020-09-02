import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { ElasticPressProvider } from '../../components/Provider';
import useSearch from '../useSearch';
import * as api from '../../api';

const node = 'http://elasticpress.test/__elasticsearch';
const indexName = 'test';

// eslint-disable-next-line react/prop-types
const ElasticPressProviderWrapper = ({ children, loadInitialData }) => {
	return (
		<ElasticPressProvider node={node} indexName={indexName} loadInitialData={loadInitialData}>
			{children}
		</ElasticPressProvider>
	);
};

describe('useSearch', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		jest.spyOn(api, 'post').mockResolvedValue({});
	});

	it('refine updates state', async () => {
		const { result } = renderHook(() => useSearch(), {
			wrapper: ElasticPressProviderWrapper,
			initialProps: {
				loadInitialData: false,
			},
		});

		await act(async () => {
			result.current.refine('test');
		});

		expect(api.post).toHaveBeenCalledTimes(1);
		expect(result.current.searchTerms).toEqual('test');
	});

	it('refine does not load new results if bellow minSearchCharacters', async () => {
		const { result } = renderHook(() => useSearch(), {
			wrapper: ElasticPressProviderWrapper,
			initialProps: {
				loadInitialData: false,
			},
		});

		await act(async () => {
			result.current.refine('test', { minSearchCharacters: 10 });
		});

		expect(api.post).toHaveBeenCalledTimes(0);
		expect(result.current.searchTerms).toEqual('test');
	});

	it('refine loads initial if loadInitialData is true and search term is empty', async () => {
		const { result } = renderHook(() => useSearch(), {
			wrapper: ElasticPressProviderWrapper,
			initialProps: {
				loadInitialData: true,
			},
		});

		// initial data should trigger a call to api post
		expect(api.post).toHaveBeenCalledTimes(1);

		await act(async () => {
			result.current.refine('test', { minSearchCharacters: 3 });
		});

		expect(api.post).toHaveBeenCalledTimes(2);
		expect(result.current.searchTerms).toEqual('test');

		await act(async () => {
			result.current.refine('', { minSearchCharacters: 3 });
		});

		// should trigger another call to api.post because loadInitialData is true
		// and a empty search term should load the initial set of data
		expect(api.post).toHaveBeenCalledTimes(3);
		expect(result.current.searchTerms).toBeNull();
	});
});
