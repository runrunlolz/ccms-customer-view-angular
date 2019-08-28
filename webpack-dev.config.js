const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const { version } = require('./package.json');

const CleanPlugin = require('clean-webpack-plugin');
const VersionPlugin = require('generate-version-webpack-plugin');
const srcDir = path.join(__dirname, './src');
const buildOutputDir = path.join(__dirname, '/');
const webpackCommon = require('./webpack-common.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const development = {
	mode: 'development',
	devtool: 'cheap-eval-source-map',
	context: srcDir,
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', './index.js'],

	output: {
		path: buildOutputDir,
		filename: 'index.js',
		publicPath: '/'
	},

	plugins: [
		new CleanPlugin([buildOutputDir]),

		// 将样式文件 抽取至独立文件内
		new MiniCssExtractPlugin({
			filename: 'ccms-customer-view.css',
			chunkFilename: '[id].css'
		}),

        new webpack.DefinePlugin({
            __DEVELOPMENT__: true
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
		}),
		new webpack.HotModuleReplacementPlugin()
	],
};

module.exports = merge(development, webpackCommon);
