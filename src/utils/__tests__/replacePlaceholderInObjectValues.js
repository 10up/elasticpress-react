import { replacePlaceholderInObjectValues } from '..';

const objectWithPlaceholders = {
	nested: {
		placeholder: '%PLACEHOLDER%',
		anotherNested: {
			placeholder: '%PLACEHOLDER%',
			nested: '%PLACEHOLDER%',
			a: {
				b: {
					c: {
						d: '%PLACEHOLDER%',
					},
				},
			},
			c: [{ a: '%PLACEHOLDER%' }],
		},
	},
};
const expectedObject = {
	nested: {
		placeholder: 'replaced',
		anotherNested: {
			placeholder: 'replaced',
			nested: 'replaced',
			a: {
				b: {
					c: {
						d: 'replaced',
					},
				},
			},
			c: [{ a: 'replaced' }],
		},
	},
};
describe('replacePlaceholderInObjectValues', () => {
	it('replaces placeholders in object successfuly', () => {
		expect(
			replacePlaceholderInObjectValues(objectWithPlaceholders, '%PLACEHOLDER%', 'replaced'),
		).toMatchObject(expectedObject);
	});
});
