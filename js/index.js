import { grid } from './grid/grid.js';

// mount Ag-Grid to the DOM

document.addEventListener('DOMContentLoaded', function() {
	let gridDiv = document.querySelector('#data-grid');
	new agGrid.Grid(gridDiv, grid);
});
