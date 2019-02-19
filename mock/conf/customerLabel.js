/**
 * 客户标签mock数据
 * customerLabel.js
 * @author wangbo
 * @since 2018/11/15
 */

module.exports = {
	// 标签类型列表 todo
	'/data-manage-x/1.0/customerTag/tagTypes': [
		{
			'tagValueCode': 0,
			'tagValueName': '日期型'
		},
		{
			'tagValueCode': 1,
			'tagValueName': '字符输入型'
		},
		{
			'tagValueCode': 2,
			'tagValueName': '数值型'
		},
		{
			'tagValueCode': 3,
			'tagValueName': '内容选择单选型'
		},
		{
			'tagValueCode': 4,
			'tagValueName': '内容选择多选型'
		}
	],

	'/data-manage-x/1.0/customerTag/:uniId': {
		get: {
			'tagList': [
				{
					'tagId': '1',
					'tagName': '云标签1',
					'tagValue': '我是云标签1',
					'tagType': 'system',
					'tagValueType': 0
				},
				{
					'tagId': '2',
					'tagName': '云标签2',
					'tagValue': '我是云标签2',
					'tagType': 'system',
					'tagValueType': 0
				},
				{
					'tagId': '3',
					'tagName': '自定义日期型标签',
					'tagValue': '2019-02-02',
					'tagType': 'define',
					'tagValueType': 0
				},
				{
					'tagId': '4',
					'tagName': '自定义数值型标签',
					'tagValue': '33',
					'tagType': 'define',
					'tagValueType': 2
				},
				{
					'tagId': '5',
					'tagName': '自定义字符型标签',
					'tagValue': 'hello',
					'tagType': 'define',
					'tagValueType': 1
				},
				{
					'tagId': '6',
					'tagName': '自定义单选型标签',
					'tagValue': '标签值1',
					'tagType': 'define',
					'tagValueType': 3
				},
				{
					'tagId': '7',
					'tagName': '自定义多选型标签',
					'tagValue': '1,2',
					'tagType': 'define',
					'tagValueType': 4
				},
				{
					'tagId': '8',
					'tagName': '自定义数值型标签1',
					'tagValue': '3434',
					'tagType': 'define',
					'tagValueType': 2
				},
				{
					'tagId': '9',
					'tagName': '自定义单选型标签1',
					'tagValue': '标签值3',
					'tagType': 'define',
					'tagValueType': 3
				},
				{
					'tagId': '10',
					'tagName': '自定义多选型标签1',
					'tagValue': '2,3',
					'tagType': 'define',
					'tagValueType': 4
				}
			],
			'rfmList': [
				{
					'platCode': 'TAOBAO',
					'allPayment': 'tabao.222',
					'allCountBuy': '345',
					'allAvgPayment': '234234.11',
					'yearPayment': '45435.34',
					'yearCountBuy': null,
					'shopList': [{
						shopId: 'TAOBAO|23424234',
						shopName: '淘宝店铺1'
					}, {
						shopId: 'TAOBAO|345345345353',
						shopName: '淘宝店铺2'
					}],
					'yearAvgPayment': '3534.21',
					'firstCreated': '2018-11-21 11:22:12',
					'lastCreated': '2018-03-11 22:11:43',
					'lastPayment': '423.33'
				},
				{
					'platCode': 'JOS',
					'allPayment': 'jos.222',
					'allCountBuy': '345',
					'allAvgPayment': '234234.11',
					'yearPayment': '45435.34',
					'yearCountBuy': '123',
					'shopList': [{
						shopName: '京东店铺1',
						shopId: 'JOS|180567'
					}, {
						shopName: '京东店铺2',
						shopId: 'JOS|466645'
					}],
					'yearAvgPayment': '3534.21',
					'firstCreated': '2018-11-21 11:22:12',
					'lastCreated': '2018-03-11 22:11:43',
					'lastPayment': '423.33'
				},
				{
					'platCode': 'MGJ',
					'allPayment': null,
					'allCountBuy': '345',
					'allAvgPayment': '234234.11',
					'yearPayment': '45435.34',
					'yearCountBuy': '123',
					'shopList': [{
						shopName: '蘑菇街店铺1',
						shopId: 'MGJ|3143677'
					}, {
						shopName: '蘑菇街店铺2',
						shopId: 'MGJ|36476564'
					}],
					'yearAvgPayment': '3534.21',
					'firstCreated': '2018-11-21 11:22:12',
					'lastCreated': '2018-03-11 22:11:43',
					'lastPayment': '423.33'
				},
				{
					'platCode': 'DD',
					'allPayment': 'dangdang.222',
					'allCountBuy': '345',
					'allAvgPayment': '234234.11',
					'yearPayment': '45435.34',
					'yearCountBuy': '123',
					'shopList': [{
						shopName: '当当店铺1',
						shopId: 'DD|3177'
					}, {
						shopName: '当当店铺2',
						shopId: 'DD|3564'
					}],
					'yearAvgPayment': null,
					'firstCreated': '2018-11-21 11:22:12',
					'lastCreated': '2018-03-11 22:11:43',
					'lastPayment': '423.33'
				},
				{
					'platCode': 'YOUZAN',
					'allPayment': 'youzan.222',
					'allCountBuy': '345',
					'allAvgPayment': '234234.11',
					'yearPayment': '45435.34',
					'yearCountBuy': '123',
					'shopList': [{
						shopId: 'YOUZNA|6125309956',
						shopName: '有赞店铺1'
					}, {
						shopId: 'YOUZAN|345345345353',
						shopName: '有赞店铺2'
					}],
					'yearAvgPayment': '3534.21',
					'firstCreated': '2018-11-21 11:22:12',
					'lastCreated': '2018-03-11 22:11:43',
					'lastPayment': '423.33'
				},
				{
					'platCode': 'SUNING',
					'allPayment': 'suning.222',
					'allCountBuy': null,
					'allAvgPayment': '234234.11',
					'yearPayment': '45435.34',
					'yearCountBuy': '123',
					'shopList': [{
						shopId: 'SUNING|6125309956',
						shopName: '苏宁店铺1'
					}, {
						shopId: 'SUNING|345345345353',
						shopName: '苏宁店铺2'
					}],
					'yearAvgPayment': '3534.21',
					'firstCreated': '2018-11-21 11:22:12',
					'lastCreated': '2018-03-11 22:11:43',
					'lastPayment': '423.33'
				},
				{
					'platCode': 'OFFLINE',
					'allPayment': 'offline.222',
					'allCountBuy': '345',
					'allAvgPayment': '234234.11',
					'yearPayment': '45435.34',
					'yearCountBuy': '123',
					'shopList': [{
						shopName: '线下店铺1',
						shopId: 'OFFLINE|2354646'
					}, {
						shopName: '线下店铺2',
						shopId: 'YHD|012231211'
					}, {
						shopId: 'OFFLINE|5467576786',
						shopName: '线下店铺3'
					}, {
						shopId: 'OFFLINE|42342342',
						shopName: '线下店铺4'
					}],
					'yearAvgPayment': '3534.21',
					'firstCreated': '2018-11-21 11:22:12',
					'lastCreated': '2018-03-11 22:11:43',
					'lastPayment': '423.33'
				}
			]
		}
	},

	'/data-manage-x/1.0/customerTag/:uniId/soloPlatRfm': {
		'allPayment': '替换数据.222',
		'allCountBuy': '345',
		'allAvgPayment': '234234.11',
		'yearPayment': '45435.34',
		'yearCountBuy': '123',
		'yearAvgPayment': '3534.21',
		'firstCreated': '2018-11-21 11:22:12',
		'lastCreated': '2018-03-11 22:11:43',
		'lastPayment': '423.33'
	},

	'/data-manage-x/1.0/customerTag/:uniId/defineTag': {
		delete: {},
		put: {},
		post: {
			tagId: '11',
			tagName: '标签值',
			tagType: '日期型'
		}
	}
};
