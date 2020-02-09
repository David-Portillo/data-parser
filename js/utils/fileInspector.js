import { trackerIssue } from './overseer.js'
import { showNotify } from './notification.js'
import { sampleData, gridOptions } from '../main.js'

export const inspectFileExtension = () => {
    console.log("File extension inspector")
    console.log(trackerIssue)
    trackerIssue.errorCount += 1;
}

window.onDragOver = (event) => {
	sampleData[0].make = 'new value';
	// console.log(gridOptions.api);
	// console.log("opening notification for testing")
	showNotify("attempting to upload a file");
	var params = {
		force : true
	};
	gridOptions.api.refreshCells(params);
	// console.log(sampleData);
	inspectFileExtension()
	event.preventDefault();
};

window.onDrop = (event) => {
	console.log(event);
	
};