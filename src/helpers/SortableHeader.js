export default class SortableHeader {
	constructor(obj) {
		this.propertyName = '';
		this.label = '';
		this.descending = false;
		this.isSorted = false;
		this.hideMobile = false;
		this.hideTablet = false;
		this.hideDesktop = false;

		if(typeof obj === 'string') {
			this.label = obj;
			this.propertyName = obj;
		}
		else if(typeof obj === 'object') {
			if(!obj['propertyName'] || typeof obj['propertyName'] !== 'string') {
				throw "propertyName is missing in SortableTable column object"
			}
			for (var prop in obj) {
				this[prop] = obj[prop];
			}
			if(!obj.label) this.label = obj.propertyName;
		}
	}

	getSortProp() {
		return this.descending ?
			'-' + this.propertyName
			: this.propertyName;
	}

	resetSort() {
		this.isSorted = false;
		this.descending = false;
	}
}