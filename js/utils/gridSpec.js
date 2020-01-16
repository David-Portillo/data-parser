import { validator } from './validator.js';
import { fieldSpecification as fieldSpec } from './fieldSpec.js';

const fieldBackdrop = {
	valid   : { 'background-color': 'transparent', color: 'white' },
	invalid : { 'background-color': 'lightcoral' },
	advise  : { 'background-color': 'papayawhip', color: 'black' }
};

const getBackdrop = (validated, advisable) => {
	if (advisable) return fieldBackdrop.advise;
	else if (!validated) return fieldBackdrop.invalid;
	return fieldBackdrop.valid;
};
export const columns = [
	{
		headerName         : fieldSpec['make'].tag,
		field              : 'make',
		cellStyle          : function(params) {
			const { passed = null, advisable = null } = validator(fieldSpec, params.colDef.field, params.value);
			return getBackdrop(passed, advisable);
		},
		tooltipComponent   : 'gridTooltip',
		tooltipValueGetter : function(params) {
			return { value: params.value };
		}
	},
	{
		headerName         : fieldSpec['model'].tag,
		field              : 'model',
		cellStyle          : function(params) {
			const { passed = null, advisable = null } = validator(fieldSpec, params.colDef.field, params.value);
			return getBackdrop(passed, advisable);
		},
		tooltipComponent   : 'gridTooltip',
		tooltipValueGetter : function(params) {
			return { value: params.value };
		}
	},
	{
		headerName         : fieldSpec['price'].tag,
		field              : 'price',
		cellStyle          : function(params) {
			const { passed = null, advisable = null } = validator(fieldSpec, params.colDef.field, params.value);
			return getBackdrop(passed, advisable);
		},
		tooltipComponent   : 'gridTooltip',
		tooltipValueGetter : function(params) {
			return { value: params.value };
		}
	},
	{
		headerName         : fieldSpec['date'].tag,
		field              : 'date',
		cellStyle          : function(params) {
			const { passed = null, advisable = null } = validator(fieldSpec, params.colDef.field, params.value);
			return getBackdrop(passed, advisable);
		},
		tooltipComponent   : 'gridTooltip',
		tooltipValueGetter : function(params) {
			return { value: params.value };
		}
	}

];
