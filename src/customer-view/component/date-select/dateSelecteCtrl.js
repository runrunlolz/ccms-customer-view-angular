/**
 * 日期选择组件Ctrl
 * @author wangbo
 * @since 2019/08/28
 */

export default class DateSelectCtrl{

	constructor() {
		// 年份列表初始化
		const MIN_YEAR = 1900;
		const MAX_YEAR = new Date().getFullYear() + 30;
		this.years = (function () {
			const result = [];
			for (let i = MIN_YEAR; i <= MAX_YEAR; i += 1) {
				result.unshift({title: i, value: i});
			}
			return result;
		}());
		// 月份列表初始化
		this.months = (function () {
			const result = [];
			for (let i = 1; i <= 12; i += 1) {
				result.push({title: i + '月', value: i});
			}
			return result;
		}());

		// 默认显示当年当月
		const backYear = this.date && +this.date.split('-')[0];
		const backMonth = this.date && +this.date.split('-')[1];
		this.nowYear = backYear || new Date().getFullYear();
		this.nowMonth = backMonth ||new Date().getMonth() + 1;
		this.date = this.nowYear + '-' + this.addZero(this.nowMonth);
	}

	/**
	 * 切换月份
	 * @param month
	 */
	changeMonth(month) {
        this.date = this.nowYear + '-' + this.addZero(month);
	}

	/**
	 * 切换年份
	 * @param year
	 */
	changeYear(year) {
		this.date = year + '-' + this.addZero(this.nowMonth);
	}

	/**
	 * 10月以下补0
	 */
	addZero(month) {
		return month < 10 ? '0' + month : month;
	}
}
