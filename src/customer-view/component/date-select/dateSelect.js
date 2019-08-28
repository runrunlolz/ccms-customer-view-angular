/**
 * 日期选择组件
 * @author wangbo
 * @since 2019/08/28
 */
import angular from 'angular';
import template from './dateSelect.str.html';
import controller from './dateSelecteCtrl';
import './_dateSelect.less';

const dateSelectOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		// 日期
		'date': '=',
		// 是否禁用
		'disable': '<'
	}
};

export default angular.module('ccms.components.dateSelect', [])
	.component('wbDateSelect', dateSelectOption)
	.name;

