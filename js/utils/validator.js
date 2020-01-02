import { fieldMessage } from './messages.js';

const parser = ({ value, isObject = false, type = 'rule' }) => {
	if (type === 'value') {
		if (value === undefined || value === null) return '';
		return value.toString();
	} else if (type === 'rule') {
		if (!isObject) {
			if (value === 'true') return true;
			if (value === 'false') return false;
			if (!isNaN(value)) {
				try {
					if (`'${value}'`.includes('.')) return parseFloat(value);
					return parseInt(value);
				} catch (error) {
					console.log(`unable to parse ${value} error: ${error}`);
				}
			}
		} else if (isObject) {
			try {
				return JSON.parse(value);
			} catch (error) {
				console.log(`unable to parse object value ${value} error: ${error}`);
			}
		}
	}
};

const adjutant = {
	advisable   : (rule, value, field) => {
		if (parser({ value, type: 'value' }).length === 0)
			return { passed: false, message: fieldMessage('advisable', null, rule, field), advisable: true };
		return { passed: true, message: '' };
	},
	required    : (rule, value, field) => {
		if (parser({ value: rule }) && parser({ value, type: 'value' }).length === 0)
			return { passed: false, message: fieldMessage('required', null, rule, field) };
		return { passed: true, message: '' };
	},
	minLength   : (rule, value, field) => {
		if (parser({ value, type: 'value' }).length < parser({ value: rule }))
			return { passed: false, message: fieldMessage('minLength', parser({ value, type: 'value' }), rule, field) };
		return { passed: true, message: '' };
	},
	maxLength   : (rule, value, field) => {
		if (parser({ value, type: 'value' }).length > parser({ value: rule }))
			return { passed: false, message: fieldMessage('maxLength', parser({ value, type: 'value' }), rule, field) };
		return { passed: true, message: '' };
	},
	numbersOnly : (rule, value, field) => {
		const { minValue = null, maxValue = null } = parser({ value: rule, isObject: true });

		if (isNaN(parser({ value, type: 'value' })))
			return { passed: false, message: fieldMessage('numbersOnly', parser(value), rule, field) };
		if (minValue && parser({ value, type: 'value' }) < parser({ value: minValue }))
			return {
				passed: false,
				message: fieldMessage('numbersOnly->minValue', parser({ value, type: 'value' }), minValue, field)
			};
		if (maxValue && parser({ value, type: 'value' }) > parser({ value: maxValue }))
			return {
				passed: false,
				message: fieldMessage('numbersOnly->maxValue', parser({ value, type: 'value' }), maxValue, field)
			};
		return { passed: true, message: '' };
	}
};

export const validator = (fieldSpecification, field, value) => {
	let validation = {};
	for (const ruling of fieldSpecification[field].rules) {
		const [ designation, rule = null ] = ruling.split('|');
		if (designation in adjutant) {
			validation = adjutant[designation](rule, value, field);
			if (!validation.passed) return validation;
		}
	}
	return validation;
};
