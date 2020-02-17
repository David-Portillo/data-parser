import {overseer} from './overseer.js'

export const constants = {
  acceptableExtensions: [ 'xlsx', 'csv' ]
}

export const transmogrifyDropzone = ({event = null}) => {
	let dropzone = document.querySelector('#dropzone > div');
	dropzone.removeAttribute('class');
	dropzone.setAttribute('class', `dropzone-${event}`);
};

export const showNotify = ({message = 'No message is set', event = null}) => {
  document.querySelector('#notify > div').style.display = 'block';
  document.querySelector('#notify > div > p').textContent = message;
}

export const displayResetButton = ({filename}) => {
  transmogrifyDropzone({ event: 'standby' });
	document.getElementById('dropzone').style.display = 'none';
  document.getElementById('filename').textContent = filename
	document.getElementById('reset').style.display = 'block';
}

export const resetAppStatus = () => {
  overseer.reset();
  overseer.properties();
  document.getElementById('fileupload').value = null;
	document.getElementById('dropzone').style.display = 'flex'
  document.getElementById('filename').textContent = '...'
  document.getElementById('reset').style.display = 'none';
}

window.closeNotify = () => {
  document.querySelector('#notify > div').style.display = 'none';
};

window.onResetFile = (event) => {
  event.preventDefault();
  resetAppStatus();
}

window.onDragOver = (event) => {
	event.preventDefault();
	transmogrifyDropzone({event: 'ongoing'});
};

window.onDragLeave = (event) => {
	event.preventDefault();
	transmogrifyDropzone({event: 'standby'});
};


