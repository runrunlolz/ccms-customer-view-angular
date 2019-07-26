/**
 * 会员卡信息controller
 * CustomerCardCtrl.js
 * @author wangbo
 * @since 2018/11/10
 */


import {Inject} from 'angular-es-utils';
import customerCardService from '../common/service';
import { componentResource } from '../common/resource';
import jeasy from 'jeasy';

@Inject('$timeout', '$interval', '$gridManager')
export default class customerCardCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		// 等级记录和积分选中，默认选中等级变更记录
		this.selectedGrade = true;

		// 获取表格数据
		this.getGridData();

		// 默认会员配置（普通用户不显示会员卡以及变更列表）
		this.isMember = true;

		// 获取会员卡信息
		this.getCustomerCardInfo();

		// 默认显示第一张卡片
		this.isShowIndex = 0;
	}

	/**
	 * 获取表格数据
	 */
	getGridData() {
		let gradeColumnsData = [
			{
				key: 'changeTime',
				text: '变更时间',
				align: 'left'
			},
			{
				key: 'gradeNameBeforeChange',
				text: '变更前等级',
				align: 'right'
			},
			{
				key: 'gradeNameAfterChange',
				text: '变更后等级',
				align: 'right'

			},
			{
				key: 'changeType',
				text: '变更类型',
				align: 'left'
			},
			{
				key: 'changeSource',
				text: '变更来源',
				align: 'left'
			},
			{
				key: 'gradePeriod',
				text: '等级有效期',
				align: 'left'
			}
		];
		let pointColumnsData = [
			{
				key: 'changeTime',
				text: '变更时间',
				align: 'left'
			},
			{
				key: 'changeValue',
				text: '<span class="change-value">积分变更</span>',
				align: 'right',
				template: '<span class="change-value">{{row.changeValue}}</span>'
			},
			{
				key: 'actionType',
				text: '行为类型',
				align: 'left'
			},
			{
				key: 'source',
				text: '变更来源',
				align: 'left'
			}
		];

		this.customerPointOptions = {
			gridManagerName: 'customerPointInfo',
			firstLoading: false,
			ajax_data: (setting, params) => {
				return componentResource.pointChangeRecord.get(params).$promise;
			},
			columnData: pointColumnsData
		};

		// 会员积分表格是否渲染完成
		this.customerPointRender = false;
		this.customerPointCallback = () => {
			this.customerPointRender = true;
		};

		this.customerGradeOptions = {
			gridManagerName: 'customerGradeInfo',
			firstLoading: false,
			ajax_data: (setting, params) => {
				return componentResource.gradeChangeRecord.get(params).$promise;
			},
			columnData: gradeColumnsData,
		};

		// 会员等级表格是否渲染完成
		this.customerGradeRender = false;
		this.customerGradeCallback = () => {
			this.customerGradeRender = true;
		};
	}
	/**
	 * 获取会员卡信息
	 */
	getCustomerCardInfo() {
		this.showLoading = true;
		customerCardService.getCustomerCardInfo(this.uniId).then(res => {
			this.customerCardInfo = res;

			if (!this.customerCardInfo.length) {
				this.showLoading = false;
				return;
			}
			// 只有一张会员卡且等级为0则不是会员
			if (this.customerCardInfo.length === 1 && this.customerCardInfo[0].grade === '0') {
				this.showLoading = false;
				this.isMember = false;
				return;
			}
			this.cardPlanId = this.customerCardInfo[0].cardPlanId;
			this.viewChangeRecord(this.customerPointOptions.gridManagerName);
			this.showLoading = false;
		}).catch(err => {
			this.showLoading = false;
			console.error(err.message);
		});
	}

	/**
	 * 转换时间格式
	 */
	formatDate(date) {
		return jeasy.moment(date).format('yyyy/MM/dd');
	}

	/**
	 * 切换会员卡信息
	 */
	changeCard(type, index) {
		if (type === 'left') {
			this.cardFromLeft = true;
			this.isShowIndex = index - 1;
			if (index === 0) {
				this.isShowIndex = this.customerCardInfo.length - 1;
			}
		}
		if (type === 'right') {
			this.cardFromLeft = false;
			this.isShowIndex = index + 1;
			if (index === this.customerCardInfo.length - 1) {
				this.isShowIndex = 0;
			}
		}
		this.cardPlanId = this.customerCardInfo[this.isShowIndex].cardPlanId;

		// 切换会员卡重新加载变更记录
		this.viewChangeRecord(this.selectedGrade ? 'grade' : 'point');
	}

	/**
	 * 事件：变更记录查看
	 * @param gridManagerName
	 */
	viewChangeRecord(gridManagerName) {
		this.selectedGrade = gridManagerName === this.customerGradeOptions.gridManagerName;
		const params = {uniId: this.uniId, cardPlanId: this.cardPlanId};

		this.itv && this._$interval.cancel(this.itv);
		// 会员积分
		if (!this.selectedGrade) {
			this.itv = this._$interval(() => {
				if (!this.customerPointRender) {
					return;
				}

				this._$gridManager.setQuery(gridManagerName, params);
				this._$interval.cancel(this.itv);
			}, 100);
			return;
		}

		// 会员等级
		this.itv = this._$interval(() => {
			if (!this.customerGradeRender) {
				return;
			}

			this._$gridManager.setQuery(gridManagerName, params);
			this._$interval.cancel(this.itv);
		}, 100);
	}
}
