var path              = require('path');
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	devtool: 'cheap-module-source-map',
	cache: false,

	entry : {
		app : ["./example/src/app.js"],
		vendors : ['react', 'react-dom', 'jquery', 'flux', 'events']
	},
	output : {
		path : path.join(__dirname, 'static'),
		filename : '[name].min.js',
		publicPath : '/static/'
	},
	module : {
		rules : [
			{
				test : /\.js$/,
				exclude : /(node_modules|bower_components)/,
				use : {
					loader : 'babel-loader',
					options : {
						presets : ['react', 'es2015', 'stage-0'],

					},
				},
				// include: path.join(__dirname, 'src')
			}, {
				test : /\.css$/,
				use : ExtractTextPlugin.extract({
					fallback : "style-loader",
					use : "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
				})
			}
		]
	},
	plugins : [
		new webpack.DefinePlugin({
			'process.env' : {
				NODE_ENV : JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false, // Suppress uglification warnings
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true
			},
			output: {
				comments: false,
			},
			exclude: [/\.min\.js$/gi] // skip pre-minified libs
		}),
		new webpack.optimize.CommonsChunkPlugin({name : 'vendors', fileName : 'vendors.min.js', minChunks : Infinity}),
		new ExtractTextPlugin("styles.css"),
	]
};