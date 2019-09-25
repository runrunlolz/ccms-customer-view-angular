/**
 * 新建或编辑自定义标签controller
 * LabelModalCtrl.js
 * @author wangbo
 * @since 2018/11/16
 */
import {Inject} from 'angular-es-utils';
import './_labelModal.less';
import service from '../../common/service';
// import { REG_EXPRESS } from '../../constants/index';
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
		// 默认loading
		this.showLoading = false;

		// 默认不显示可选标签列表
		this.showTagList = false;

		// modal类型：编辑or新建
		this.modalType = this._data.openType;

		// 所选标签是否已经使用
		this.isMarked = false;
		// todo一期不做 数值型只支持数字型且最多4位小数
		// this.inputRegExpress = REG_EXPRESS.labelNumberRegExpress;

		// 默认标签类型名称
		this.tagTypeName = "";

		// 选择标签时的搜索值
		this.searchValue = '';

		// 默认标签值类型
		this.tagType = -1;

		// 可选标签列表存储器
		this.defineTagList = this._data.canSelectedTagList;

		// 标签值存储器（供多选类型使用）
		this.selectedTagValuesList = [];

		// 编辑时只能改变标签值所以不需要获取该列表
		this.compareTagList();
		// 回显标签信息
		if (this.modalType === 'edit') {
			const data = this._data.tagInfo;
			// 标签ID
			this.tagId = data.tagId;
			// 编辑时标签名称
			this.selectedTagName = data.tagName;
			// 编辑时标签值类型
			this.tagType = data.valueType;
			// 标签值类型(单选、多选)
			this.valueNumberOption = data.valueNumberOption;
			// 标签值类型（整数、小数；年月日、年月）
			this.optionType = data.optionType;
			// 转换标签类型名称
			this.changeTagTypeToName(data.valueType);
			// 编辑时标签值(针对日期型、输入型)
			this.tagValue = this.formatData(data.tagValue, 'edit');
			// 字符选择与数值选择类型标签值编辑时处理
			if (data.valueType === 2 || data.valueType === 4) {
				this.getTagValueInfo(data.tagId, data.valueType, data.tagValue);
			}
		}
	}

	compareTagList() {
		// 已打标标签添加标志
		this._data.hasMarkedList.forEach(markedItem => {
			this.defineTagList.forEach(item => {
				item.tagList.forEach(i => {
					if (i.tagId === markedItem.tagId) {
						i.hasMarked = true;
						markedItem.hasMarked = true;
					}
				})
			})
		});
	}

	/**
	 * 获取指定标签详细信息
	 * 多选或单选类型回显时需要标签值列表
	 * @param tagId 标签ID
	 * @param tagType 标签值类型
	 * @param tagValue 标签值
	 */
	getTagValueInfo(tagId, tagType, tagValue) {
		this.showLoading = true;
		this.defineTagValue = [];

		service.getTagValueInfo(tagId).then(res => {
			this.showLoading = false;
			const data = res.data;
			// 可选标签列表中标签值是{itemId: '', itemVal: ''}数据格式，为了配合html模版中的使用此处也使用该数据格式
			data.optionalValues.forEach(item => {
				this.defineTagValue.push({itemId: '', itemVal: item});
			});
			// 单选类型
			if (this.valueNumberOption === 0) {
				// tagValue是一个只有一个标签值元素的数组
				data.optionalValues.forEach(i => {
					if (i === tagValue[0]) {
						this.radioValue = {itemId: '', itemVal: i};
					}
				})
			}
			// 多选类型
			if (this.valueNumberOption === 1) {
				this.selectedTagValuesList = [...tagValue];
			}
		}).catch(err => {
			this.showLoading = false;
			this._$ccTips.error(err.data.msg || '标签信息获取失败');
			console.error(err);
		})
	}

	/**
	 * 显示/隐藏可选标签列表
	 */
	toggleShowTagList() {
		this.showTagList = !this.showTagList;
	}

	/**
	 * 选择标签
	 * @param item
	 */
	selectedTag(item) {
		this.isMarked = false;
		// 标签ID
		this.tagId = item.tagId;
		// 选择后关闭标签列表
		this.showTagList = false;
		// 标签值存储器（供多选类型使用）每次选择时都清空
		this.selectedTagValuesList = [];
		// 日期标签值存储
		this.tagValue = '';
		// 单选标签值存储
		this.radioValue = '';
		// 多选标签值列表存储器
		this.defineTagValue = [];
		// 标签名称
		this.selectedTagName = item.tagName;
		// 标签类型（日期0、字符输入1、字符选择2、数值输入3、数值选择4、生日5）
		this.tagType = item.tagType;
		// 标签子类型(单选0、多选1)
		this.valueNumberOption = item.valueNumberOption;
		// 标签子类型(数值：整数0、小数1；日期：年月日0、年月1)
		this.optionType = item.optionType;
		// 转换标签类型显示为标签类型名称
		this.changeTagTypeToName(item.tagType);
		// 标签值列表存储
		this.defineTagValue = item.tagValue;
		this._data.hasMarkedList.forEach(i => {
			if (i.hasMarked && i.tagId === item.tagId) {
				this.isMarked = i.hasMarked;
				// 不同类型要进行不同处理
				if (item.tagType === 0) {
					// 年月日类型需要new Date转换 // 年月类型
					this.tagValue = item.optionType === 0 ? new Date(i.tagValue[0]) : i.tagValue[0];
				}
				if ((item.tagType === 2 || item.tagType ===4) && item.valueNumberOption === 0) {
					// 字符或数值单选类型
					this.radioValue = {
						itemId: '',
						itemVal: i.tagValue[0]
					};
				}
				if ((item.tagType === 2 || item.tagType ===4) && item.valueNumberOption === 1) {
					// 字符或数值多选类型
					this.selectedTagValuesList = [...i.tagValue];
				}
			}
		});
	}

	/**
	 * 单选选中标签值
	 * @param item
	 */
	selectedRadioTagValue(item) {
		this.radioValue = item;
	}

	/**
	 * 多选选中标签值
	 * @param $event
	 * @param item
	 */
	updateSelection($event, item) {
		const action = $event.target.checked ? 'add' : 'remove';
		// 选中则添加
		if (action === 'add' && this.selectedTagValuesList.indexOf(item) === -1) {
			return this.selectedTagValuesList.push(item);
		}
		// 取消则删除
		if (action === 'remove' && this.selectedTagValuesList.indexOf(item) !== -1) {
			this.selectedTagValuesList.forEach((tagItem, index) => {
				if (tagItem === item) {
					this.selectedTagValuesList.splice(index, 1);
				}
			});
		}
	}
	// 判断是否选中
	isSelected(value){
		return this.selectedTagValuesList.indexOf(value) >= 0;
	};

	/**
	 * 转换标签类型值为名称
	 * @param type
	 */
	changeTagTypeToName(type) {
		switch (type) {
			case 0:
				this.tagTypeName = '日期型';
				break;
			case 1:
				this.tagTypeName = '字符输入型';
				break;
			case 2:
				this.tagTypeName = '字符选择型';
				break;
			case 3:
				this.tagTypeName = '数值输入型';
				break;
			case 4:
				this.tagTypeName = '数值选择型';
				break;
			case 5:
				this.tagTypeName = '生日类型';
				break;
			default:
				this.tagTypeName = '请选择标签';
				break;
		}
	}

	/**
	 * 校验保存数据
	 */
	validator() {
		// 标签名称不能为空
		if (!this.selectedTagName) {
			this._$ccTips.error('请选择标签');
			return false;
		}

		// 日期型中年月日类型：标签值不能为空，年月类型默认必填不用校验
		if (this.tagType === 0 && this.optionType === 0 && !this.tagValue) {
			this._$ccTips.error('请选择时间');
			return false;
		}

		// todo 一期不做 数值输入型不能为空且格式只支持4位小数
		if (this.tagType === 3 && !this.radioValue) {
			// 数值型进行小数点位数校验
			this._$ccValidator.validate(this.form).then(() => {}).catch(() => {});
			return false;
		}

		// 数值与字符选择型不能为空
		if (this.tagType === 2 || this.tagType === 4) {
			// 单选型
			if (this.valueNumberOption === 0 && !this.radioValue) {
				this._$ccTips.error('请选择一个标签值');
				return false;
			}
			// 多选型
			if (this.valueNumberOption === 1 && !this.selectedTagValuesList.length) {
				this._$ccTips.error('请至少选择一个标签值');
				return false;
			}
		}

		// todo 一期先不做字符输入型:this.tagType === 1
		// if (this.tagType === 1 && !this.tagValue) {
		// 	this._$ccTips.error('请选择标签值');
		// 	return false;
		// }
		return true;
	}

	/**
	 * 日期型与多选型数据格式处理
	 * @param tagValue 标签值
	 * @param model 模式：save保存，edit编辑
	 * @returns {*}
	 */
	formatData(tagValue, model) {
		// 新增与保存时格式转换
		if (this.modalType === 'add' || model === 'save') {
			// 日期型: 限制日期类型
			if (this.tagType === 0) {
				// 年月日类型需要转换，年月类型无需转换
				return  this.optionType === 0 ? tagValue && [jEasy.moment(tagValue).format('yyyy-MM-dd')] : [tagValue];
			}

			// 单选类型
			if ((this.tagType === 2 || this.tagType === 4) && this.valueNumberOption === 0) {
				// 一个值也使用数组形式传递给后端
				return [this.radioValue.itemVal];
			}

			// 多选类型
			if ((this.tagType === 2 || this.tagType === 4) && this.valueNumberOption === 1) {
				return this.selectedTagValuesList;
			}

			return tagValue;
		}

		// 编辑时格式转换
		if (this.modalType === 'edit' && model === 'edit') {
			// 日期类型处理，年月日需要转换为date类型
			return this.tagType === 0 && this.optionType === 0 ? new Date(tagValue[0]) : tagValue[0];
		}
	}

	/**
	 * 保存标签
	 */
	ok() {
		const saveType = this.modalType === 'add' && !this.isMarked;
		// 新建保存参数
		const params = {
			tagId: this.tagId,
			uniId: this._data.uniId,
			tagValue: this.formatData(this.tagValue, 'save')
			// todo 暂时不需要传递给后端
			// tagType: this.tagType,
			// 0整数、1小数；0年月日、1年月
			// optionType: this.optionType,
			// 0单选、1多选
			// valueNumberOption: this.valueNumberOption,
		};

		// 日期型不需要valueNumberOption字段
		// addParams.tagType === 0 ? delete addParams.valueNumberOption : '';
		// 字符选择型不需要optionType字段
		// addParams.tagType === 2 ? delete addParams.optionType : '';

		// 保存方法
		const saveMethod = saveType ? 'addTag' : 'updateTag';

		if (this.validator()) {
			this.showLoading = true;
			service[saveMethod](this._data.uniId, params).then(() => {
				this._$ccTips.success('保存成功');
				this.showLoading = false;
				this._modalInstance.ok();
			}).catch(err => {
				this._$ccTips.error(err.data.msg || '保存失败');
				this.showLoading = false;
				console.error(err);
			});
		}
	}
}
