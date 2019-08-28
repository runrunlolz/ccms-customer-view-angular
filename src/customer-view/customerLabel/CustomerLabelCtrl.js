/**
 * 会员标签controller
 * CustomerLabelCtrl.js
 * @author wangbo
 * @since 2018/11/15
 */

import { Inject } from 'angular-es-utils';
import service from '../common/service';
import labelModalTpl from './labelModal/labelModal.str.html';
import labelModalCtrl from './labelModal/LabelModalCtrl';
import { PLAT_MAP } from '../constants/index';

@Inject('$scope', '$ccModal', '$ccTips', '$q', '$window', '$document')
export default class customerCardCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		// 初始化云标签列表
		this.cloudTag = [];
		// 初始化自定义标签列表
		this.defineTag = [];
		// 初始化rfm标签列表
		this.rfmList = [];
		// 默认选中rfm标签的第一组的第一个
		this.selected = 0;
		this.parentSelected = 0;

		// 自定义标签多余两行时默认不显示多余的标签
		this.showMoreTag = false;
		// 获取RFM列表
		this.getRFMTags();
		// 获取打标标签列表
		this.getTagList();
	}

	/**
	 * 获取标签信息
	 */
	getRFMTags() {
		this.showLoading = true;
		service.getRFMTagsInfo(this.uniId).then(res => {
			// 筛选自定义标签和云标签
			// res.tagList.length && res.tagList.forEach(item => {
			// 	item.tagType === 'system' ? this.cloudTag.push(item) : this.defineTag.push(item);
			// });
			this.showLoading = false;
			this.rfmList = res.rfmList;
			this.rfmList.forEach(item => {
				item.shopList.unshift({shopName: '不限', shopId: ''});
			});
		}).catch(err => {
			this.showLoading = false;
			this._$ccTips.error(err.data.msg || '获取RFM标签列表失败');
			console.error(err);
		});
	}

	/**
	 * 获取自定义标签列表与云标签列表
	 */
	getTagList() {
		// tagType 0为自定义标签，1为云标签
		this.showLoading = true;
		service.getDefineTagsInfo(this.uniId, 1).then(res => {
			this.showLoading = false;
			this.defineTag = res.data;
		}).catch(err => {
			this.showLoading = false;
			this._$ccTips.error(err.data.msg || '获取自定义标签列表失败');
			console.error(err);
		});

		service.getCloudTagsInfo(this.uniId, 0).then(res => {
			this.showLoading = false;
			this.cloudTag = res.data;
		}).catch(err => {
			this.showLoading = false;
			this._$ccTips.error(err.data.msg || '获取云标签列表失败');
			console.error(err);
		});
	}



	/**
	 * 判断自定义标签列表所占高度
	 * @returns {boolean}
	 */
	tagHeight() {
		return this._$document[0].querySelector('.define-tag-area') && this._$document[0].querySelector('.define-tag-area').offsetHeight;
	}

	/**
	 * 根据platCode获取为平台名称和平台图标
	 */
	getPlat(platCode) {
		return PLAT_MAP[platCode] || {};
	}

	/**
	 * 打开新建或编辑自定义标签modal
	 * @param openType：add新增标签, edit编辑标签
	 * @param tagInfo
	 */
	openDefineTagModal(openType, tagInfo) {
		this._$ccModal.modal({
			scope: this._$scope,
			title: openType === 'add' ? '打标签' : '编辑自定义标签',
			fullscreen: false,
			hasFooter: true,
			locals: {
				data: {
					uniId: this.uniId,
					tagInfo: tagInfo,
					openType: openType
				}
			},
			style: {
				'min-height': '200px',
				'max-height': '400px',
				'min-width': '540px',
				'max-width': '540px',
			},
            __body: labelModalTpl,
			controller: labelModalCtrl,
			controllerAs: 'vm'
		}).open().result.then(() => {
			// 刷新打标标签列表
			this.getTagList();
		});
	}

	/**
	 * 显示与隐藏更多自定义标签
	 */
	toggleShowTag() {
		this.showMoreTag = !this.showMoreTag;
	}

	/**
	 * 删除标签
	 */
	deleteTag(tagId) {
		this._$ccModal.confirm('确定删除该标签吗？').open().result
			.then(() => {
				service.deleteTag(this.uniId, tagId).then(() => {
					this._$ccTips.success('删除成功');
					// 删除当前页面显示的该节点
					this.defineTag.forEach((item, index) => {
						item.tagId === tagId && this.defineTag.splice(index, 1);
					});
				}).catch(err => {
					this._$ccTips.error(err.data.msg || '删除失败');
					console.error(err);
				});
			});
	}

	/**
	 * 切换店铺
	 * @param platCode
	 * @param shopId
	 * @param index
	 * @param parentIndex
	 */
	changeShop(platCode, shopId, index, parentIndex) {
		this.selected = index;
		this.parentSelected = parentIndex;
		service.getSoloPlatRfmInfo(this.uniId, platCode, shopId).then(res => {
			this.rfmList[parentIndex].allPayment = res.allPayment;
			this.rfmList[parentIndex].allCountBuy = res.allCountBuy;
			this.rfmList[parentIndex].allAvgPayment = res.allAvgPayment;
			this.rfmList[parentIndex].yearPayment = res.yearPayment;
			this.rfmList[parentIndex].yearCountBuy = res.yearCountBuy;
			this.rfmList[parentIndex].yearAvgPayment = res.yearAvgPayment;
			this.rfmList[parentIndex].firstCreated = res.firstCreated;
			this.rfmList[parentIndex].lastCreated = res.lastCreated;
			this.rfmList[parentIndex].lastPayment = res.lastPayment;
		}).catch(err => {
			this._$ccTips.error(err.data.msg || '获取RFM数据失败失败');
			console.error(err);
		});
	}
}
