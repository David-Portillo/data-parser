import { fieldMessage } from './messages.js';

const parseRule = ({ rule, isObject = false }) => {
	if (!isObject) {
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
	} else if (isObject) {
		try {
			return JSON.parse(rule);
		} catch (error) {
			console.log(`unable to parse object rule ${rule} error: ${error}`);
		}
	}
};

const parseValue = (value) => {
	if (value === undefined || value === null) return '';
	else return value;
};

const adjutant = {
	advisable   : (r, v, field) => {
		const value = parseValue(v);
		const rule = parseValue(r);
		if (value.length === 0)
			return { passed: false, message: fieldMessage('advisable', null, rule, field), advisable: true };
		return { passed: true, message: '' };
	},
	required    : (r, v, field) => {
		const value = parseValue(v);
		const rule = parseRule({ rule: r });

		if (rule && value.length === 0) return { passed: false, message: fieldMessage('required', null, rule, field) };
		return { passed: true, message: '' };
	},
	minLength   : (r, v, field) => {
		const value = parseValue(v);
		const rule = parseRule({ rule: r });

		if (value.length < rule) return { passed: false, message: fieldMessage('minLength', value, rule, field) };
		return { passed: true, message: '' };
	},
	maxLength   : (r, v, field) => {
		const value = parseValue(v);
		const rule = parseRule({ rule: r });

		if (value > rule) return { passed: false, message: fieldMessage('maxLength', value, rule, field) };
		return { passed: true, message: '' };
	},
	numbersOnly : (r, v, field) => {
		const value = parseValue(v);
		const { minValue = null, maxValue = null } = parseRule({ rule: r || '{}', isObject: true });

		if (isNaN(value)) return { passed: false, message: fieldMessage('numbersOnly', value, r, field) };
		if (minValue && value < parseRule({ rule: minValue }))
			return {
				passed  : false,
				message : fieldMessage('numbersOnly->minValue', value, minValue, field)
			};
		if (maxValue && value > parseRule({ rule: maxValue }))
			return {
				passed  : false,
				message : fieldMessage('numbersOnly->maxValue', value, maxValue, field)
			};
		return { passed: true, message: '' };
	},
	dateField   : (r, v, field) => {
		const value = parseValue(v);
		const { format = moment.HTML5_FMT.DATE, identifier = '-' } = parseRule({ rule: r || '{}', isObject: true });

		if (value.length > 0) {
			if (value.split(identifier).length !== 3)
				return { passed: false, message: fieldMessage('dateField->format', value, format, field) };

			if (!moment(value, format, true).isValid()) {
				const invalidAt = moment(value, format, true).invalidAt();

				if (invalidAt === 0) return { passed: false, message: fieldMessage('dateField->year', value, format, field) };
				if (invalidAt === 1) return { passed: false, message: fieldMessage('dateField->month', value, format, field) };
				if (invalidAt === 2) return { passed: false, message: fieldMessage('dateField->day', value, format, field) };

				return { passed: false, message: fieldMessage('dateField->unknown', value, format, field) };
			}
		}

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