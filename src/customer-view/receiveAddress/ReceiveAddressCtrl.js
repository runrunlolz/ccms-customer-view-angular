/**
 * 常用收货地址controller
 * ReceiveAddressCtrl.js
 * @author wangbo
 * @since 2018/11/10
 */

import { Inject } from 'angular-es-utils';
import { componentResource } from '../common/resource';
import service from '../common/service';

@Inject('$timeout', '$gridManager')
export default class ReceiveAddressCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		this.showName = true;
		this.showMobile = true;
		// 列表列
		let receiveAddressData = [
			{
				text: '收货人姓名',
				key: 'fullName',
				align: 'left',
				width: '100px',
				template: '<span ng-mouseover="vm.showNameEye = true" ng-mouseleave="vm.showNameEye = false">{{row.fullName}} <icon-eye ng-if="index === vm.selectedIndex && vm.showNameEye && !row.hideNameEye" ng-click="vm.getDecrypt(\'fullName\', row, \'show\')"></icon-eye>' +
					'<icon-miwen ng-if="index === vm.selectedIndex && vm.showNameEye && row.hideNameEye" ng-click="vm.getDecrypt(\'fullName\', row, \'hide\')"></icon-miwen></span>'
			},
			{
				text: '收货人手机',
				align: 'left',
				key: 'mobile',
				width: '100px',
				template: '<span ng-mouseover="vm.showMobileEye = true" ng-mouseleave="vm.showMobileEye = false">{{row.mobile}} <icon-eye ng-show="index === vm.selectedIndex && vm.showMobileEye && !row.hideMobileEye" ng-click="vm.getDecrypt(\'mobile\', row, \'show\')"></icon-eye>' +
					'<icon-miwen ng-if="index === vm.selectedIndex && vm.showMobileEye && row.hideMobileEye" ng-click="vm.getDecrypt(\'mobile\', row, \'hide\')"></icon-miwen></span>'
			},
			{
				text: '省份',
				key: 'stateName',
				align: 'left',
				width: '100px',
			},
			{
				text: '城市',
				align: 'left',
				key: 'cityName',
				width: '100px',
			},
			{
				text: '区县',
				align: 'left',
				key: 'districtName',
				width: '100px',
			},
			{
				text: '街道',
				align: 'left',
				key: 'townName',
				width: '100px',
				template: '<span cc-tooltip="row.townName">{{row.townName}}</span>'
			},
			{
				text: '详细地址',
				key: 'address',
				align: 'left',
				template: '<span cc-tooltip="row.address">{{row.address}}</span>'
			},
			{
				text: '<span class="trade-count">收货订单数</span>',
				key: 'tradeCount',
				align: 'right',
				width: '100px',
				template: '<span class="trade-count">{{row.tradeCount}}</span>'
			}
		];
		this.receiveAddressOptions = {
			query: {uniId: this.uniId},
			gridManagerName: 'receiveAddressInfo',
			ajax_data: (setting, params) => {
				return componentResource.receiveAddress.get(params).$promise;
			},
			cellHover: (row, rowIndex, colIndex) => {
				this._$timeout(() => {
					this.selectedIndex = rowIndex;
				});
			},
			columnData: receiveAddressData
		};

		// 查看明文或密文
		this.getDecrypt = (field, row, type) => {
			if (field === 'mobile') {
				row.hideMobileEye = !row.hideMobileEye;
			} else {
				row.hideNameEye = !row.hideNameEye;
			}
			if (type === 'show') {
				// 获取分页信息
				const pageData = this._$gridManager.get('receiveAddressInfo').pageData;
				// 获取明文数据
				service.getReceiveAddressDecryptMessage(this.uniId, row.uuId, field, pageData.pageNum, pageData.pageSize).then(res => {
					row[field] = res.data;
					field === 'mobile' ? this.showMobile = false : this.showName = false;
				}).catch(err => {
					field === 'mobile' ? row.hideMobileEye = false : row.hideNameEye = false;
					console.error(err);
				});
			}
			if (type === 'hide') {
				const name = row[field].substring(0,1) + '*';
				const mobile = row[field].substring(0,3) + '****' + row[field].substring(7,11);
				row[field] = field === 'mobile' ? mobile : name;
			}
		};
	}
}
