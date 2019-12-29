import { validator } from './validator.js';
import { fieldSpecification as fieldSpec } from './fieldSpec.js';

export const gridTooltip = function() {};

gridTooltip.prototype.init = function(params) {
	const { field = null } = params.colDef;
	const { value = null } = params.value;
	const { tag = null } = fieldSpec[field];
	const { passed = null, message = null } = validator(fieldSpec, field,value);

	let eGui = (this.eGui = document.createElement('div'));
	let valueToDisplay = value ? value : '- Missing -';

	if(passed && (message === null || message.length === 0)) eGui.classList.add('none');
	else {
		eGui.classList.add('grid-tooltip');
		eGui.innerHTML =
			`<div class="tooltip-info">
					<p>${tag}:</p>
					<p>${valueToDisplay}</p>
				</div>
				<div class="tooltip-message">
					<p>Note</p>
					<p>${message}</p>
			</div>`
	}
};

gridTooltip.prototype.getGui = function() {
	return this.eGui;
};
