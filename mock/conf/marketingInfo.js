/**
 * 营销信息mock数据
 * marketingInfo.js
 * @author wangbo
 * @since 2018/11/12
 */
module.exports = {
	'/data-manage-x/1.0/marketing/detail': {
		pageNum: 1,
		pageSize: 10,
		totals: 65,
		marketingCount: 100,
		list: [
			{
				marketingTime: '2018-01-30 00:11:11',
				marketingType: 'SY_DATA_MANAGE',
				marketingTypeName: '营销场景1',
				communicationMode: '短信',
				communicationContent: '短信：短信内容特别长，too long too long too long',
				activityName: '活动名称'
			},
			{
				marketingTime: '2018-01-30 00:11:11',
				marketingType: 'SY_DATA_MANAGE',
				marketingTypeName: '营销场景2',
				communicationMode: '短信',
				communicationContent: '短信：短信内容',
				activityName: '活动名称'
			},
			{
				marketingTime: '2018-01-30 00:11:11',
				marketingType: 'SY_DATA_MANAGE',
				marketingTypeName: '营销场景3',
				communicationMode: '短信',
				communicationContent: '短信：短信内容',
				activityName: '活动名称'
			}],
		lastMarketingTime: '2018-11-11 10:20:11'
	}
};
