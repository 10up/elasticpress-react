import React from 'react';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { ElasticPressProvider } from '..';
import { initialState } from '../reducer';
import { SET_SEARCH_TERMS } from '../actions';
import { useElasticPress } from '../../../hooks';

const AppTest = () => {
	return <p>I am a very simple test app</p>;
};

const node = 'http://elasticpress.test/__elasticsearch';
const indexName = 'test';

// eslint-disable-next-line react/prop-types
const ElasticPressProviderWrapper = ({ children }) => {
	return (
		<ElasticPressProvider node={node} indexName={indexName}>
			{children}
		</ElasticPressProvider>
	);
};

describe('ElasticPressProvider', () => {
	it('works', () => {
		const { container } = render(<AppTest />, { wrapper: ElasticPressProviderWrapper });

		expect(container).toMatchSnapshot();
	});

	it('initial state is equal to default state', () => {
		const { result } = renderHook(() => useElasticPress(), {
			wrapper: ElasticPressProviderWrapper,
		});

		expect(result.current.state).toMatchObject({ ...initialState, node, indexName });
	});

	it('only triggers a re-render if state changes', () => {
		const { result } = renderHook(() => useElasticPress(), {
			wrapper: ElasticPressProviderWrapper,
		});

		const originalState = result.current;

		// dispatching an action that does not change state should maintain object reference
		act(() => {
			result.current.dispatch({ type: 'dummy-action' });
		});

		expect(originalState === result.current).toBeTruthy();

		act(() => {
			result.current.dispatch({ type: 'dummy-action2' });
		});

		expect(originalState === result.current).toBeTruthy();

		// let's make sure dispatching an action that does change state triggers a re-render
		act(() => {
			result.current.dispatch({ type: SET_SEARCH_TERMS, payload: null });
		});

		expect(originalState === result.current).not.toBeTruthy();
		expect(originalState).toMatchObject(result.current);
	});
});
