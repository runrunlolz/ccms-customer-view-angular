const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcDir = path.join(__dirname, './src');
module.exports = {
	resolve: {
		extensions: ['*', '.js', '.json', '.less', '.html'],
		modules: ['node_modules', 'src']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.less/,
				include: srcDir,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							url: true, // 启用/禁用 url() 处理
							sourceMap: false // 启用/禁用 Sourcemaps
						}
					},
					{
						loader: 'resolve-url-loader'
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: false // 启用/禁用 Sourcemaps
						}
					}
				]
		}, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: true,
                    collapseWhitespace: true
                }
            }],
            exclude: /(node_modules|bower_components)/
		}, {
            test: /\.json$/,
			use: [{
				loader: 'json-loader'
			}]
        }, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			use: [{
				loader: 'file-loader?name=[path][name]-[hash:5].[ext]'
			}]
		}]
	}
};
