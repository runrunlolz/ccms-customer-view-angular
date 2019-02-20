/**
 * 新建或编辑自定义标签controller
 * LabelModalCtrl.js
 * @author wangbo
 * @since 2018/11/16
 */
import {Inject} from 'angular-es-utils';
import './_labelModal.less';
import service from '../../common/service';
import { REG_EXPRESS } from '../../constants/index';
import jEasy from 'jeasy';

@Inject('$scope', '$ccTips', '$ccValidator', '$ccModal', 'modalInstance', 'data')
export default class labelModalCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化;
	 */
	init() {
		// modal类型：编辑or新建
		this.modalType = this._data.openType;

		// 数值型只支持数字型且最多4位小数
		this.inputRegExpress = REG_EXPRESS.labelNumberRegExpress;

		// 默认标签类型名称
		this.tagValueTypeName = "请选择标签";
		// 默认标签值
		this.tagValueType = -1;

		// 多选型标签值存储器
		this.tagValueList = [];

		if (this.modalType === 'edit') {
			// 编辑时标签
			this.tagName = this._data.tagInfo && this._data.tagInfo.tagName || '';
			// 编辑时标签类型
			this.tagValueType = this._data.tagInfo && this._data.tagInfo.tagValueType || 0;
			// 转换标签类型名称
			this.changeTagTypeToName(this.tagValueType);
			// 编辑时标签值
			this.tagValue = this.formatData(this._data.tagInfo.tagValue, 'edit');

		}
		// todo 这块是调试用的
		// 标签列表
		this.defineTagNameList = [{
			tagName: '自定义数值型标签1',
			tagValueType: 2
		}, {
			tagName: '自定义日期型标签',
			tagValueType: 0
		}, {
			tagName: '自定义数值型标签',
			tagValueType: 2
		}, {
			tagName: '自定义字符型标签',
			tagValueType: 1
		}, {
			tagName: '自定义单选型标签',
			tagValueType: 3
		}, {
			tagName: '自定义多选型标签',
			tagValueType: 4
		}, {
			tagName: '自定义单选型标签1',
			tagValueType: 3
		}];

		// 标签值列表（单选类型）
		this.defineSingleTagValueList = [
			'标签值1',
			'标签值2',
			'标签值3',
			'标签值4',
			'标签值5',
			'标签值6'
		];
		// 标签值列表（多选类型）
		this.defineMultipleTagValueList = [
			{
				title: '标签值1',
				value: '1'
			},
			{
				title: '标签值2',
				value: '2'
			},
			{
				title: '标签值3',
				value: '3'
			}
		];
	}

	/**
	 * 切换标签
	 * @param model
	 * @param oldModel
	 * @param itemIndex
	 * @param item
	 */
	onChangeTagName(model, oldModel, itemIndex, item) {
		// 获取标签名称
		this.tagName = item && item.tagName;
		// 获取标签类型
		this.tagValueType = model === null ? -1 : model;
		// 获取标签值
		this.tagValue = item && item.tagValue;
		this.changeTagTypeToName(model);
	}

	/**
	 * 转换标签类型值为名称
	 * @param type
	 */
	changeTagTypeToName(type) {
		switch (type) {
			case 0:
				this.tagValueTypeName = '日期型';
				break;
			case 1:
				this.tagValueTypeName = '字符输入型';
				break;
			case 2:
				this.tagValueTypeName = '数值型';
				break;
			case 3:
				this.tagValueTypeName = '内容选择单选型';
				break;
			case 4:
				this.tagValueTypeName = '内容选择多选型';
				break;
			default:
				this.tagValueTypeName = '请选择标签';
				break;
		}
	}

	/**
	 * 删除标签
	 */
	deleteTag() {
		this._$ccModal.confirm('确定删除标签？').open().result
			.then(() => {
				service.deleteTag(this._data.uniId, this._data.tagInfo.tagId).then(() => {
					this._$ccTips.success('删除成功');
					this._modalInstance.ok();
				}).catch(err => {
					console.error(err);
				});
			});
	}

	/**
	 * 校验保存数据
	 */
	validator() {
		// 标签名称不能为空
		if (!this.tagName) {
			this._$ccTips.error('请选择标签');
			return false;
		}

		// 日期型不能为空
		if (this.tagValueType === 0 && !this.tagValue) {
			this._$ccTips.error('请选择时间');
			return false;
		}

		// 数值型不能为空且格式只支持4位小数
		if (this.tagValueType === 2 && !this.tagValue) {
			// 数值型进行小数点位数校验
			this._$ccValidator.validate(this.form).then(() => {}).catch(() => {});
			return false;
		}

		// 内容多选型不能为空
		if (this.tagValueType === 4 && !this.tagValueList.length) {
			this._$ccTips.error('请至少选择一个标签值');
			return false;
		}

		// 字符输入型或单选型不能为空
		if ((this.tagValueType === 1 || this.tagValueType === 3) && !this.tagValue) {
			this._$ccTips.error('请输入标签值');
			return false;
		}
		return true;
	}

	/**
	 * 日期型与内容多选型数据格式处理
	 * @param tagValue 标签值
	 * @param model 模式：save保存，edit编辑
	 * @returns {*}
	 */
	formatData(tagValue, model) {
		// 新增与保存时格式转换
		if (this.modalType === 'add' || model === 'save') {
			// 日期型
			if (this.tagValueType === 0) {
				return tagValue && jEasy.moment(tagValue).format('yyyy-MM-dd');
			}

			// 内容多选型
			if (this.tagValueType === 4) {
				return this.tagValueList.length && this.tagValueList.join(',');
			}
			return tagValue;
		}

		// 编辑时格式转换
		if (this.modalType === 'edit' && model === 'edit') {
			// 日期类型处理
			if (this.tagValueType === 0) {
				return new Date(tagValue);
			}
			// 内容多选型处理
			if (this.tagValueType === 4) {
				this.tagValueList = tagValue.split(',');
				return this.tagValueList;
			}
			return tagValue;
		}
	}

	/**
	 * 保存标签
	 */
	ok() {
		const saveType = this.modalType === 'add';
		// 新建保存参数
		const addParams = {
			tagName: this.tagName,
			tagType: this.tagValueType,
			tagValue: this.formatData(this.tagValue, 'save')
		};

		const saveParams = saveType ? addParams : {tagId: this._data.tagInfo.tagId, ...addParams};
		const saveMethod = saveType ? 'addTag' : 'updateTag';

		if (this.validator()) {
			service[saveMethod](this._data.uniId, saveParams).then(() => {
				this._$ccTips.success('保存成功');
				this._modalInstance.ok();
			}).catch(err => {
				this._$ccTips.error('保存失败');
				console.error(err);
			});
		}
	}

	/**
	 * 取消保存关闭modal
	 */
	cancel() {
		this._modalInstance.ok();
	}
}
