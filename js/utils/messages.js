import { fieldSpecification as fieldSpec } from './fieldSpec.js';

export const fieldMessage = (adjutant, value, rule, field) => {
	if (adjutant === 'advisable->price') 			return `${fieldSpec[field].tag} can be empty, but providing this<br/>information would help us determine the tax`;
	else if (adjutant === 'required') 				return `${fieldSpec[field].tag} field cannot be empty`;
	else if (adjutant === 'minLength') 				return `${fieldSpec[field].tag} field must be at least ${rule} characters long.<br/>You've provided ${value.length} characters`;
	else if (adjutant === 'maxLength') 				return `${fieldSpec[field].tag} field cannot exceed ${rule} characters.<br/>You've provided ${value.length} characters`;
	else if (adjutant === 'numbersOnly') 			return `${fieldSpec[field].tag} field can only be numbers`
	else if (adjutant === 'numbersOnly->minValue') 	return `${fieldSpec[field].tag} field must be at least ${rule}`
	else if (adjutant === 'numbersOnly->maxValue') 	return `${fieldSpec[field].tag} field cannot be more than ${rule}`
	else if (adjutant === 'dateField->month') 		return `${fieldSpec[field].tag} field contains an invalid month.<br/>Format: ${rule}`
	else if (adjutant === 'dateField->year') 		return `${fieldSpec[field].tag} field contains an invalid year.<br/>Format: ${rule}`
	else if (adjutant === 'dateField->day') 		return `${fieldSpec[field].tag} field contains an invalid day.<br/>Format: ${rule}`
	else if (adjutant === 'dateField->format')		return `${fieldSpec[field].tag} field contains an invalid format.<br/>Format: ${rule}`
	else if (adjutant === 'dateField->unknown') 	return `${fieldSpec[field].tag} field contains an invalid date.<br/>Format: ${rule}`
	return;
};
