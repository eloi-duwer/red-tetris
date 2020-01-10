var path = require('path')

module.exports = {
	entry: './src/client/index.js',

	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},

	devServer: {
		historyApiFallback: true
	},

	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			},
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			loader: 'style-loader!css-loader'
		}]
	}
};
