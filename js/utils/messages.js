import { fieldSpecification as fieldSpec } from './fieldSpec.js';

export const fieldMessage = (adjutant, value, rule, field) => {
	if (adjutant === 'advisable') {
		if (field === 'price') return `${fieldSpec[field].tag} can be empty, but providing this<br/>information would help us determine the tax`;
	} else if (adjutant === 'required') return `${fieldSpec[field].tag} cannot be empty`;
	 else if (adjutant === 'minLength') return `${fieldSpec[field].tag} must be at least ${rule} characters long.<br/>You've provided ${value.length} characters`;
	 else if (adjutant === 'maxLength') return `${fieldSpec[field].tag} cannot exceed ${rule} characters.<br/>You've provided ${value.length} characters`;
	return;
};
