import { overseer } from './overseer.js';
import { grid } from '../grid/grid.js';

// Constants section

export const constants = {
	acceptableExtensions : [ 'xlsx', 'csv' ]
};

// Notification section

export const showNotify = ({ message = '...', event = null }) => {
	let notify = document.querySelector('#notify > div');
	notify.parentElement.style.display = 'flex';
	notify.removeAttribute('class');
	notify.setAttribute('class', `notify-${event}`);
	notify.firstElementChild.textContent = message;
};

export const closeNotify = () => {
	document.querySelector('#notify').style.display = 'none';
};

window.closeNotify = () => {
	closeNotify();
};

// Dropzone section

export const transmogrifyDropzone = ({ event = null }) => {
	let dropzone = document.querySelector('#dropzone > div');
	dropzone.removeAttribute('class');
	dropzone.setAttribute('class', `dropzone-${event}`);
};

window.onDragOver = (event) => {
	event.preventDefault();
	transmogrifyDropzone({ event: 'ongoing' });
};

window.onDragLeave = (event) => {
	event.preventDefault();
	transmogrifyDropzone({ event: 'standby' });
};

// Resetting section

export const inspectionOutcome = {
	reset   : () => {
		overseer.reset();
		overseer.properties();
		grid.api.setRowData([]);
		transmogrifyDropzone({ event: 'standby' });
		closeNotify();
		document.getElementById('fileupload').value = null;
		document.getElementById('dropzone').style.display = 'flex';
		document.getElementById('filename').textContent = '...';
		document.getElementById('reset').style.display = 'none';
	},
	success : ({ filename }) => {
    overseer.fileCompliant = true;
		document.getElementById('dropzone').style.display = 'none';
		document.getElementById('filename').textContent = filename;
		document.getElementById('reset').style.display = 'block';
	},
	error   : () => {
    overseer.fileCompliant = false;
		transmogrifyDropzone({ event: 'standby' });
		document.getElementById('fileupload').value = null;
		document.getElementById('dropzone').style.display = 'flex';
		document.getElementById('filename').textContent = '...';
		document.getElementById('reset').style.display = 'none';
	}
};

window.onResetFile = (event) => {
	event.preventDefault();
	inspectionOutcome.reset();
};
