import { fieldMessage } from './messages.js';

const parseRule = (rule) => {
	if (rule === 'true') return true;
	if (rule === 'false') return false;
	if (!isNaN(rule)) {
		try {
			if (`'${rule}'`.includes('.')) return parseFloat(rule);
			return parseInt(rule);
		} catch (error) {
			console.log(`unable to parse ${rule} error: ${error}`);
		}
	}
	return rule;
};

const parseValue = (value) => {
	if (value === undefined || value === null) return '';
	return value.toString();
};

const adjutant = {
	advisable : (rule, value, field) => {
		if (parseValue(value).length === 0)
			return { passed: false, message: fieldMessage('advisable', null, rule, field), advisable: true };
		return { passed: true, message: '' };
	},
	required  : (rule, value, field) => {
		if (parseRule(rule) && parseValue(value).length === 0)
			return { passed: false, message: fieldMessage('required', null, rule, field) };
		return { passed: true, message: '' };
	},
	minLength : (rule, value, field) => {
		if (parseValue(value).length < rule)
			return { passed: false, message: fieldMessage('minLength', parseValue(value), rule, field) };
		return { passed: true, message: '' };
	},
	maxLength : (rule, value, field) => {
		if (parseValue(value).length > rule)
			return { passed: false, message: fieldMessage('maxLength', parseValue(value), rule, field) };
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
