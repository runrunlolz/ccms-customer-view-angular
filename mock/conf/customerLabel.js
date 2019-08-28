/**
 * 客户标签mock数据
 * customerLabel.js
 * @author wangbo
 * @since 2018/11/15
 */

module.exports = {
    // todo 标签类型列表（暂时不用）
    '/data-manage-x/1.0/customerTag/tagTypes': [
        {
            'tagValueCode': 0,
            'tagValueName': '日期型'
        },
        // {
        // 	'tagValueCode': 1,
        // 	'tagValueName': '字符输入型'
        // },
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

    // 指定标签的标签详细信息
    '/data-manage-x/1.0/tagManage/tagInfo/:tagId': {
        "code": 200,
        "msg": null,
        "data": {
            "tagId": 100101,   // 标签id
            "tagName": "客户周期",   // 标签名称
            "optionalValues": ["方式34", "world", "434", "543245454", "432", "23", "苏打粉", "234", "flutter", "dart", "css", "234苏打粉说", "123.2323", "34.34", "6756.345", "1.56", "456.345", "234.345"],   // 标签的值
            "valueType": 2,  // 标签类型 0：日期型, 1：字符输入型, 2:字符选择型, 3:数值输入型, 4:数值选择型, 5:时间类型, 6:生日类型
            "valueNumberOption": 1,  // 可打标签值个数(0:单选，1：多选, null:没有单选多)
            "optionType": 0 // 如果数值型代表（"0":"整数","1":"小数"）, 如果日期型(0:年/月/日, 1:年/月, 2:月/日)
        }
    },

    // 可选标签列表,1表示自定义标签，0表示云标签，此处只用自定义标签所以直接写死
    '/data-manage-x/1.0/tagManage/1/groupInfo': {
        "code": 200,
        "msg": null,
        "data": [
            {
                "groupId": 1,              // 标签组1id
                "groupName": "group1",     // 标签组1名称
                "tenant": "sjyj",          // 租户名称
                "status": 0,               // 订阅状态(0:未订阅, 1:已订阅)
                "tagList": [
                    {
                        "tagId": 11,           //标签11id
                        "tagName": "tag11日期年月日型",     //标签1名称
                        "valueScope": 0,         //标签值作用域(0:租户级, 1:平台级, 2:店铺级)
                        "tagType": 0,           //标签值类型(0：日期型, 1：字符输入型, 2:字符选择型, 3:数值输入型, 4:数值选择型,5:生日类型)
                        "valueNumberOption": 0,  //可打标签值个数(0:单选，1：多选, null:没有单选多)
                        "optionType": 0, // 如果数值型代表（"0":"整数","1":"小数"）, 如果日期型(0:年/月/日, 1:年/月, 2:月/日)
                        "tagValue": [
                            {
                                "itemId": 1,             //标签值id
                                "itemVal": "2019-01-01"  //标签值内容
                            },
                            {
                                "itemId": 2,             //标签值id
                                "itemVal": "2019-02-01"  //标签值内容
                            }
                        ]
                    },
                    {
                        "tagId": 22,           //标签11id
                        "tagName": "tag33日期年月型",     //标签1名称
                        "valueScope": 0,         //标签值作用域(0:租户级, 1:平台级, 2:店铺级)
                        "tagType": 0,           //标签值类型(0：日期型, 1：字符输入型, 2:字符选择型, 3:数值输入型, 4:数值选择型,5:生日类型)
                        "valueNumberOption": 0,  //可打标签值个数(0:单选，1：多选, null:没有单选多)
                        "optionType": 1, // 如果数值型代表（"0":"整数","1":"小数"）, 如果日期型(0:年/月/日, 1:年/月, 2:月/日)
                        "tagValue": [
                            {
                                "itemId": 3,             //标签值id
                                "itemVal": "2019-11"  //标签值内容
                            },
                            {
                                "itemId": 4,             //标签值id
                                "itemVal": "2018-12"  //标签值内容
                            }
                        ]
                    },
                    {
                        "tagId": 33,           //标签11id
                        "tagName": "tag33字符单选型",     //标签1名称
                        "valueScope": 0,         //标签值作用域(0:租户级, 1:平台级, 2:店铺级)
                        "tagType": 2,           //标签值类型(0：日期型, 1：字符输入型, 2:字符选择型, 3:数值输入型, 4:数值选择型,5:生日类型)
                        "valueNumberOption": 0,  //可打标签值个数(0:单选，1：多选, null:没有单选多)
                        "optionType": 1, // 如果数值型代表（"0":"整数","1":"小数"）, 如果日期型(0:年/月/日, 1:年/月, 2:月/日)
                        "tagValue": [
                            {
                                "itemId": 5,             //标签值id
                                "itemVal": "hello"  //标签值内容
                            },
                            {
                                "itemId": 6,             //标签值id
                                "itemVal": "world"  //标签值内容
                            },
                            {
                                "itemId": 7,             //标签值id
                                "itemVal": "hello1"  //标签值内容
                            },
                            {
                                "itemId": 8,             //标签值id
                                "itemVal": "world1"  //标签值内容
                            }
                        ]
                    },
                    {
                        "tagId": 44,           //标签11id
                        "tagName": "tag44字符多选型",     //标签1名称
                        "valueScope": 0,         //标签值作用域(0:租户级, 1:平台级, 2:店铺级)
                        "tagType": 2,           //标签值类型(0：日期型, 1：字符输入型, 2:字符选择型, 3:数值输入型, 4:数值选择型,5:生日类型)
                        "valueNumberOption": 1,  //可打标签值个数(0:单选，1：多选, null:没有单选多)
                        "optionType": 1, // 如果数值型代表（"0":"整数","1":"小数"）, 如果日期型(0:年/月/日, 1:年/月, 2:月/日)
                        "tagValue": [
                            {
                                "itemId": 9,             //标签值id
                                "itemVal": "hello"  //标签值内容
                            },
                            {
                                "itemId": 10,             //标签值id
                                "itemVal": "world"  //标签值内容
                            },
                            {
                                "itemId": 11,             //标签值id
                                "itemVal": "hello1"  //标签值内容
                            },
                            {
                                "itemId": 12,             //标签值id
                                "itemVal": "world1"  //标签值内容
                            }
                        ]
                    },
                    {
                        "tagId": 55,           //标签11id
                        "tagName": "tag55数值单选整数型",     //标签1名称
                        "valueScope": 0,         //标签值作用域(0:租户级, 1:平台级, 2:店铺级)
                        "tagType": 4,           //标签值类型(0：日期型, 1：字符输入型, 2:字符选择型, 3:数值输入型, 4:数值选择型,5:生日类型)
                        "valueNumberOption": 0,  //可打标签值个数(0:单选，1：多选, null:没有单选多)
                        "optionType": 0, // 如果数值型代表（"0":"整数","1":"小数"）, 如果日期型(0:年/月/日, 1:年/月, 2:月/日)
                        "tagValue": [
                            {
                                "itemId": 13,             //标签值id
                                "itemVal": "12"  //标签值内容
                            },
                            {
                                "itemId": 14,             //标签值id
                                "itemVal": "23"  //标签值内容
                            },
                            {
                                "itemId": 15,             //标签值id
                                "itemVal": "34"  //标签值内容
                            },
                            {
                                "itemId": 16,             //标签值id
                                "itemVal": "54"  //标签值内容
                            }
                        ]
                    },
                    {
                        "tagId": 66,           //标签22id
                        "tagName": "tag66数值多选小数型",          //标签2名称
                        "valueScope": 0,          //标签值作用域(0:租户级, 1:平台级, 2:店铺级)
                        "tagType": 4,           //标签值类型(0：日期型, 1：字符输入型, 2:字符选择型, 3:数值输入型, 4:数值选择型, 5:时间类型, 6:生日类型)
                        "valueNumberOption": 1,  //可打标签值个数(0:单选，1：多选, null:没有单选多选)
                        "optionType": 1, // 如果数值型代表（"0":"整数","1":"小数"）, 如果日期型(0:年/月/日, 1:年/月, 2:月/日)
                        "tagValue": [
                            {
                                "itemId": 17,             //标签值id
                                "itemVal": "123.2323"           //标签值内容
                            },
                            {
                                "itemId": 18,             //标签值id
                                "itemVal": "322.2312"          //标签值内容
                            },
                            {
                                "itemId": 19,             //标签值id
                                "itemVal": "34.34"          //标签值内容
                            },
                            {
                                "itemId": 20,             //标签值id
                                "itemVal": "456.45"          //标签值内容
                            }
                        ]
                    }
                ]
            },
            {
                "groupId": 2,              //标签组2id
                "groupName": "group2",     //标签组2名称
                "tenant": "sjyj",          //租户名称
                "status": 0,                //订阅状态(0:未订阅, 1:已订阅)
                "tagList": [
                    {
                        "tagId": 77,           //标签33id
                        "tagName": "tag77日期年月日类型",     //标签33名称
                        "valueScope": 0,          //标签值作用域(0:租户级, 1:平台级, 2:店铺级)
                        "tagType": 0,           //标签值类型(0：日期型, 1：字符输入型, 2:字符选择型, 3:数值输入型, 4:数值选择型, 5:时间类型, 6:生日类型)
                        "valueNumberOption": 0,  //可打标签值个数(0:单选，1：多选)
                        "optionType": 0, // 如果数值型代表（"0":"整数","1":"小数"）, 如果日期型(0:年/月/日, 1:年/月, 2:月/日)
                        "tagValue": [
                            {
                                "itemId": 21,             //标签值id
                                "itemVal": "2019-01-01"           //标签值内容
                            },
                            {
                                "itemId": 22,             //标签值id
                                "itemVal": "2019-02-01"           //标签值内容
                            }
                        ]
                    }
                ]
            }
        ]
    },

    // 打标保存、更新
    '/data-manage-x/1.0/customerTag/:uniId/tag': {
        // 更新标签
        put: {},
        // 新建保存标签
        post: {
            tagId: '11',
            tagName: '标签值',
            tagType: '日期型'
        }
    },

    // 自定义标签删除
    '/data-manage-x/1.0/customerTag/:uniId/tag/:tagId': {
        delete: {},
    },

    // rfm标签详情
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

    // 客户已打标列表,根据tagType进行判断的，此处mock数据写死一份即可
    '/data-manage-x/1.0/customerTag/:uniId/tag/:tagType': {
        "code": 200,
        "data": [{
            "optionType": 0,
            "tagId": 244,
            "tagName": "wb日期年月日",
            "tagType": 1,
            "tagValue": ["2019-10-04"],
            "valueNumberOption": 1,
            "valueType": 0
        }, {
            "optionType": 0,
            "tagId": 245,
            "tagName": "wb字符单选",
            "tagType": 1,
            "tagValue": ["方式34"],
            "valueNumberOption": 0,
            "valueType": 2
        }, {
            "optionType": 0,
            "tagId": 246,
            "tagName": "wb字符多选",
            "tagType": 1,
            "tagValue": ["热", "234苏打粉说", "苏打粉", "舒服苏打粉"],
            "valueNumberOption": 1,
            "valueType": 2
        }, {
            "optionType": 0,
            "tagId": 248,
            "tagName": "wb数值单选",
            "tagType": 1,
            "tagValue": ["432"],
            "valueNumberOption": 0,
            "valueType": 4
        }, {
            "optionType": 0,
            "tagId": 249,
            "tagName": "wb数值多选",
            "tagType": 1,
            "tagValue": ["5432", "54", "434", "342", "543245454"],
            "valueNumberOption": 1,
            "valueType": 4
        }, {
            "optionType": 0,
            "tagId": 242,
            "tagName": "10",
            "tagType": 1,
            "tagValue": ["2019-09-11"],
            "valueNumberOption": 1,
            "valueType": 0
        }, {
            "optionType": 1,
            "tagId": 243,
            "tagName": "wb日期年月",
            "tagType": 1,
            "tagValue": ["2048-02"],
            "valueNumberOption": 1,
            "valueType": 0
        }, {
            "optionType": 0,
            "tagId": 247,
            "tagName": "11",
            "tagType": 1,
            "tagValue": ["22"],
            "valueNumberOption": 0,
            "valueType": 2
        }, {
            "optionType": 1,
            "tagId": 273,
            "tagName": "数值",
            "tagType": 1,
            "tagValue": ["1.1"],
            "valueNumberOption": 0,
            "valueType": 4
        }, {
            "optionType": 0,
            "tagId": 235,
            "tagName": "3",
            "tagType": 1,
            "tagValue": ["1"],
            "valueNumberOption": 0,
            "valueType": 2
        }, {
            "optionType": 0,
            "tagId": 255,
            "tagName": "93标签1",
            "tagType": 1,
            "tagValue": ["test1"],
            "valueNumberOption": 0,
            "valueType": 2
        }, {
            "optionType": 1,
            "tagId": 271,
            "tagName": "学校",
            "tagType": 1,
            "tagValue": ["学生"],
            "valueNumberOption": 1,
            "valueType": 2
        }],
        "msg": null
    },

    // rfm标签列表
    '/data-manage-x/1.0/customerTag/:uniId': {
        get: {
            "rfmList": [
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
    }
};
