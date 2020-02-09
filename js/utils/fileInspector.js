import { trackerIssue } from './overseer.js'
import { showNotify } from './notification.js'
import { sampleData, gridOptions } from '../main.js'

const transmogrifyDropzone = ({ event = null}) => {
	let dropzone = document.querySelector('#dropzone > div')
	dropzone.removeAttribute('class')
	dropzone.setAttribute('class', `dropzone-${event}`)
}

export const inspectFileExtension = () => {
    trackerIssue.errorCount += 1;
}

window.onDragOver = (event) => {
	transmogrifyDropzone({ event: 'ongoing'})
	showNotify("attempting to upload a file");

	console.log(dropzone)
	sampleData[0].make = 'new value';
	
	let params = { force : true };
	gridOptions.api.refreshCells(params);
	inspectFileExtension()
	event.preventDefault();
};

window.onDragLeave = (event) => {
	transmogrifyDropzone({ event: 'standby'})
}

window.onDrop = (event) => {
	console.log(event);
};