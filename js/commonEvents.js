import {overseer} from './utils/overseer.js'
export const transmogrifyDropzone = ({event = null}) => {
	let dropzone = document.querySelector('#dropzone > div');
	dropzone.removeAttribute('class');
	dropzone.setAttribute('class', `dropzone-${event}`);
};

export const displayResetButton = ({filename}) => {
  transmogrifyDropzone({ event: 'standby' });
	document.getElementById('dropzone').style.display = 'none';
  document.getElementById('filename').textContent = filename
	document.getElementById('reset').style.display = 'block';
}

window.closeNotify = () => {
  document.querySelector('#notify > div').style.display = 'none';
};

window.onResetFile = (event) => {
  overseer.reset();
  overseer.properties();
  document.getElementById('fileupload').value = null;
	document.getElementById('dropzone').style.display = 'flex'
  document.getElementById('filename').textContent = '...'
  document.getElementById('reset').style.display = 'none';
}

window.onDragOver = (event) => {
	event.preventDefault();
	transmogrifyDropzone({event: 'ongoing'});
};

window.onDragLeave = (event) => {
	event.preventDefault();
	transmogrifyDropzone({event: 'standby'});
};


