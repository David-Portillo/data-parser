import { trackerIssue } from './overseer.js'
import { showNotify } from './notification.js'
import { sampleData, gridOptions } from '../main.js'

export const inspectFileExtension = () => {
    trackerIssue.errorCount += 1;
}

window.onDragOver = (event) => {
	sampleData[0].make = 'new value';
	showNotify("attempting to upload a file");
	var params = {
		force : true
	};
	gridOptions.api.refreshCells(params);
	inspectFileExtension()
	event.preventDefault();
};

window.onDrop = (event) => {
	console.log(event);
};