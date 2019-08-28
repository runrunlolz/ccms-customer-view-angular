/**
 * tagSelectCtrl.js
 * wangbo
 * 2019/9/4
 */

import {$Inject} from 'angular-utils';
import jEasy from 'jeasy';
@$Inject('$scope', '$ccTips')

export default class TagSelectCtrl {
	constructor() {
		this.init();
	}

	init() {
		this.searchValue = '';
		this.tagListResult =  jEasy.clone(this.tagList);
	}

	/**
	 * 搜索
	 */
	searchInput(value) {
		this.searchValue = value;
		this.tagListResult = [];
		const list = jEasy.clone(this.tagList);
		list.forEach((i, index) => {
			// 如果在父级中找到直接返回
			if (i.groupName.includes(value)) {
				return this.tagListResult.push(i);
			}
			// 父级中没找到则子集中也寻找
			if (i.tagList.length) {
				const tmp = [];
				i.tagList.forEach(tag => {
					// 子集中找到
					if (tag.tagName.includes(value)) {
						tmp.push(tag);
					}
				});
				this.tagListResult.push(i);
				this.tagListResult[index].tagList = tmp;
			}
		});
	}

	/**
	 * 高亮字段
	 * @param name
	 * @returns {*}
	 */
	getSearchTagName(name) {
		if ([null, undefined].includes(this.searchValue)) {
			return name;
		}
		const reg = new RegExp(this.searchValue, 'g');
		return name.replace(reg, `<span class="search-highlight">${this.searchValue}</span>`);
	}

	/**
	 * 选中
	 * @param tag
	 */
	selectedTag(tag) {
		this.onSelectedTag({tag: tag});
	}
}
