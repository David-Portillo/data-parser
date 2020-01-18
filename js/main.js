import { columns } from './utils/gridSpec.js';
import { gridTooltip } from './utils/gridTooltip.js';

let sampleData = [
	{ make: 'Toyota', model: 'Celica', price: 35000, date: '2020-10-20' },
	{ make: 'Ford', model: 'Mustang', price: 32000, date: '2020-20-20' },
	{ make: 'Porsche', model: 'Boxter', price: 72000, date: '25/07/1992' },
	{ make: 'Porsche', model: 'Boxter', price: 72000, date: '30/02/2020' },
	{ make: 'Porsche', model: 'Boxter', price: 72000, date: '12/12/2020' },
	{ make: 'Porsche', model: 'Boxter', price: 72000, date: '20/20/2020' },
];

let gridOptions = {
	defaultColDef        : {
		editable : true
	},
	columnDefs           : columns,
	rowData              : sampleData,
	components           : { gridTooltip },

	// grid methods

	onGridReady          : function(params) {
		params.api.sizeColumnsToFit();
	},
	onCellEditingStarted : function(event) {
		console.log('cellEditingStarted');
	},
	onCellEditingStopped : function(event) {
		console.log('cellEditingStopped');
		console.log(this.rowData);
	}
};

// Mount Ag-Grid to the DOM
document.addEventListener('DOMContentLoaded', function() {
	let gridDiv = document.querySelector('#data-grid');
	new agGrid.Grid(gridDiv, gridOptions);
});
