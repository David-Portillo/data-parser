import { validator } from '../utils/validator.js';
import { fieldSpecification as fieldSpec } from '../specs/fieldSpec.js';

export class gridTooltip {
	constructor() {}
	init(params) {

		const { field = null } = params.colDef;
		const { value = null } = params.value;
		const { tag = null } = fieldSpec[field];
		const { passed = null, message = null } = validator(fieldSpec, field, value);

		let eGui = (this.eGui = document.createElement('div'));
		let valueToDisplay = value ? value : '- Missing -';
		
		if (passed && (message === null || message.length === 0)) eGui.classList.add('none');
		else {
			eGui.classList.add('grid-tooltip');
			eGui.innerHTML = `
			<div class="tooltip-info">
					<p>${tag}:</p>
					<p>${valueToDisplay}</p>
				</div>
				<div class="tooltip-message">
					<p>Note</p>
					<p>${message}</p>
			</div>`;
		}
	}
	getGui() {
		return this.eGui;
	}
}
