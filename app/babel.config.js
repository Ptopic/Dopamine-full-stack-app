module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				require.resolve('babel-plugin-module-resolver'),
				{
					root: '.',
					extensions: [
						'.ios.js',
						'.android.js',
						'.js',
						'.ts',
						'.tsx',
						'.json',
						'.jsx',
					],
					alias: {
						'@Assets': './assets',
						'@Components': './components',
						'@Constants': './constants',
						'@Redux': './redux',
						'@Screens': './screens',
						'@Utils': './utils',
					},
				},
			],
		],
	};
};
