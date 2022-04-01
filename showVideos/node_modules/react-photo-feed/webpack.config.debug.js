var path    = require('path');
var webpack = require('webpack');


module.exports = {
	devtool : 'eval',
	entry : [
		'./example/src/app.js'
	],
	output : {
		path : path.join(__dirname, 'debug'),
		filename : 'bundle.js',
		publicPath : '/'
	},
	module : {
		rules : [
			{
				test : /\.jsx?/,

				use : {
					loader : 'babel-loader',
					options : {
						presets : ['react', 'es2015', 'stage-0', "react-hmre"],

					},
				},
				exclude : /(node_modules|bower_components)/,
			}, {
				test : /\.css/,
				use : [
					{
						loader : 'style-loader'
					},
					{
						loader : 'css-loader',
						options : {
							modules : true,
							localIdentName : '[name]__[local]___[hash:base64:5]'
						}
					}
				]
			}
		]
	}
}