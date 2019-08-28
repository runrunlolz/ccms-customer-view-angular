const webpack = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const { version } = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VersionPlugin = require('generate-version-webpack-plugin');
const srcDir = path.join(__dirname, './src');
const buildOutputDir = path.join(__dirname, './dist/');
const webpackCommon = require('./webpack-common.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const production = () => ({
	mode: 'production',
	context: srcDir,
	entry: {
		app: './index.js'
	},
	output: {
		path: buildOutputDir,
		filename: 'ccms-customer-view.js',
		libraryTarget: "umd"
	},

	// 优化代码
	optimization: {
		minimizer: [
			// 压缩js
			new UglifyJsPlugin({
				uglifyOptions: {
					cache: true,
					parallel: true,
					sourceMap: true,
					warnings: false
				}
			}),

			// 压缩css
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {
					discardComments: {removeAll: true},
					minifyGradients: true
				},
				canPrint: true
			})
		]
	},
    externals: ['angular', 'angular-resource', 'angular-ui-router', 'ccms-components'],
	plugins: [
		new CleanPlugin([buildOutputDir]),

		// 将样式文件 抽取至独立文件内
		new MiniCssExtractPlugin({
			filename: 'ccms-customer-view.css',
			chunkFilename: '[id].css'
		}),

		// 配置环境变量
		new webpack.DefinePlugin({
			'process.env': {
				VERSION: JSON.stringify(version)
			}
		}),

		// 版本信息插件
		new VersionPlugin({
			// 指定版本信息数据的绝对路径, 必设项。 [默认值使用数据为插件自身的版本信息]
			dataPath: path.join(__dirname, './version.json'),

			// 配置version.json 中 的list.type 值文本对应关系 [当前展示的为默认值]
			type: {
				'1': {
					text: '新增',
					style: 'color: green'
				},
				'2': {
					text: '修复',
					style: 'color: red'
				},
				'3': {
					text: '优化',
					style: 'color: orange'
				}
			}
		})
	]
});

module.exports = () => {
	return merge(production(), webpackCommon);
};
