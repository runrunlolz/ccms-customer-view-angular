/**
 * 标签选择器组件
 * tagSelect.js
 * wangbo
 * 2019/9/4
 */
import angular from 'angular';
import template from './tagSelect.str.html';
import controller from './tagSelectCtrl';
import './_tagSelect.less';

const tagSelectOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		// 标签列表
		'tagList': '<',
		// 选中标签
		'onSelectedTag': '&'
	}
};

export default angular.module('ccms.components.tagSelect', [])
	.component('wbTagSelect', tagSelectOption)
	.name;

