module.exports = {
	setupFilesAfterEnv: ['./setupTests.js'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)sx?$',
	moduleFileExtensions: ['js', 'jsx'],
	moduleNameMapper: {
		'\\.css$': require.resolve('./test/style-mock.js'),
	},
	testPathIgnorePatterns: ['/node_modules/', '/mocks/'],
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/dist/**',
		'!**/jest.config.{js,ts}',
	],
};
