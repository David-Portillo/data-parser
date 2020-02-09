import { overseer } from './overseer.js'
import { showNotify } from './notification.js'
import { sampleData, gridOptions } from '../main.js'

const transmogrifyDropzone = ({ event = null}) => {
	let dropzone = document.querySelector('#dropzone > div')
	dropzone.removeAttribute('class')
	dropzone.setAttribute('class', `dropzone-${event}`)
}

export const inspectFileExtension = () => {
	overseer.properties();
	overseer.errorCount += 1;
}

window.onDragOver = (event) => {
	let params = { force : true };
	
	showNotify("attempting to upload a file");
	transmogrifyDropzone({ event: 'ongoing'})

	sampleData[0].make = 'new value';
	
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