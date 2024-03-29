/**
 * @author  chao.gao
 * @date on 2018.11.09
 */
import genResource from 'angular-es-utils/rs-generator';

export const setEnvName = envName => {
    Object.assign(componentResource, setComponentResource(`${envName}/data-manage-x/1.0/`));
};

export const componentResource = {};
const setComponentResource = api_prefix => {
    return {

        // 会员基本信息
        customerView: genResource(`${api_prefix}customer/:uniId`),

        // 获取会员加密信息
        customerDecryptMessage: genResource(`${api_prefix}customer/decrypt/:uniId/:field`),

        // 常用收货地址
        receiveAddress: genResource(`${api_prefix}customer/:uniId/receiver/address`),

        // 常用收货地址获取明文信息
        receiveAddressDecryptMessage: genResource(`${api_prefix}customer/receiver/decrypt/:uniId/:uuId/:field?pageNum=:pageNum&pageSize=:pageSize`),

        // 会员卡信息
        customerCard: genResource(`${api_prefix}customerCard/card/:uniId`),

        // 会员卡积分变更记录
        pointChangeRecord: genResource(`${api_prefix}customerCard/pointChangeRecord/:uniId`),

        // 会员卡等级变更记录
        gradeChangeRecord: genResource(`${api_prefix}customerCard/gradeChangeRecord/:uniId`),

        // 营销信息
        marketingInfo: genResource(`${api_prefix}marketing/detail`),

        // 权益信息
        preferentialInfo: genResource(`${api_prefix}preferential/detail`),

        // 订单信息
        orderInfo: genResource(`${api_prefix}order/detail`),

        // 互动信息
        interactiveInfo: genResource(`${api_prefix}customer/interactive`),

        // 评价信息
        evaluationInfo: genResource(`${api_prefix}order/rate`),

		// 获取标签类型列表
		getTagTypeList: genResource(`${api_prefix}customerTag/tagTypes`),

		// 获取标签详细信息,1表示类型为自定义标签
		getTagValueInfo: genResource(`${api_prefix}tagManage/tagInfo/1/:tagId`),

		// 自定义标签列表
		TagInfoList: genResource(`${api_prefix}tagManage/1/groupInfo`),

        // 自定义标签修改、保存
        TagInfo: genResource(`${api_prefix}customerTag/:uniId/tag`),

        // 自定义标签删除
        deleteTag: genResource(`${api_prefix}customerTag/:uniId/tag/:tagId`),

        // 获取打标标签信息
        getTagsInfo: genResource(`${api_prefix}customerTag/:uniId/tag/:tagType`),

        // 获取RFM标签列表信息
        getRFMTagsInfo: genResource(`${api_prefix}customerTag/:uniId`),

        // 单个RMF消费信息
        getSoloPlatRfmInfo: genResource(`${api_prefix}customerTag/:uniId/soloPlatRfm`),

        // 获取指定平台店铺列表
        getPlatShopsInfo: genResource(`${api_prefix}customer/shops`),

	    // 获取地址信息
        getLocationAreas: genResource(`${api_prefix}unificationAreas`),

	    // 获取平台列表
        getPlatformList: genResource(`${api_prefix}customer/platform`)
    }
};
