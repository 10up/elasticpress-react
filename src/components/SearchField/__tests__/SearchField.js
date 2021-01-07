import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { ElasticPressProvider } from '../../Provider';
import { useSearch } from '../../../hooks';
import SearchField from '../SearchField';

jest.mock('../../../hooks');

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

describe('SearchField', () => {
	let refine;
	beforeEach(() => {
		refine = jest.fn();
		jest.useFakeTimers();
		useSearch.mockReturnValue({
			refine,
			search: {
				searchTerm: '',
			},
		});
	});

	it('works', () => {
		const { container } = render(<SearchField />, { wrapper: ElasticPressProviderWrapper });

		expect(container).toMatchSnapshot();
	});

	it('it calls refine if a initialValue is provided', () => {
		act(() => {
			render(<SearchField initialValue="test" />, {
				wrapper: ElasticPressProviderWrapper,
			});
		});

		jest.runAllTimers();

		expect(refine).toHaveBeenCalledWith('test', { minSearchCharacters: 3 });

		expect(refine).toHaveBeenCalledTimes(1);
	});

	it('it calls refine whenever searched value changes', () => {
		render(<SearchField name="search" />, {
			wrapper: ElasticPressProviderWrapper,
		});

		const searchField = screen.getByRole('searchbox');

		// since we're mocking useSearch we loose the controlled form input,
		// so we need to trigger one event with the full searched string
		// rather using userEvent.type
		fireEvent.change(searchField, { target: { value: 'test' } });

		jest.runAllTimers();

		expect(refine).toHaveBeenLastCalledWith('test', { minSearchCharacters: 3 });

		fireEvent.change(searchField, { target: { value: 'test test' } });
		jest.runAllTimers();

		expect(refine).toHaveBeenLastCalledWith('test test', { minSearchCharacters: 3 });
	});
});
