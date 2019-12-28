import { validator } from './utils/validator.js';
import { fieldSpecification } from './fieldSpec.js';

export const gridTooltip = function() {};

gridTooltip.prototype.init = function(params) {
	const { field = null } = params.colDef;
	const { value = null } = params.value;
	const { tag = null } = fieldSpecification[field];
	const { passed = null, message = null } = validator(fieldSpecification, field,value);

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
