import { replacePlaceholderInObjectValues } from '..';

const objectWithPlaceholders = {
	nested: {
		placeholder: '%PLACEHOLDER%',
		anotherNested: {
			placeholder: '%PLACEHOLDER%',
		},
	},
};
const expectedObject = {
	nested: {
		placeholder: 'replaced',
		anotherNested: {
			placeholder: 'replaced',
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
