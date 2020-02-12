import { overseer } from './overseer.js'
import { showNotify } from './notification.js'
import { sampleData, gridOptions } from '../main.js'

const transmogrifyDropzone = ({ event = null }) => {
	let dropzone = document.querySelector('#dropzone > div')
	dropzone.removeAttribute('class')
	dropzone.setAttribute('class', `dropzone-${event}`)
}

window.onDragOver = (event) => {
	event.preventDefault();
	transmogrifyDropzone({ event: 'ongoing'})
};

window.onDragLeave = (event) => {
	event.preventDefault();
	transmogrifyDropzone({ event: 'standby'})
}

window.inspectFile = ({input, uploadType = 'dropzone'}) => {
	event.preventDefault();

	const acceptableExtensions = ['xlsx', 'csv'];

	let file = uploadType === 'browse' ? input.files[0] : input.dataTransfer.items[0].getAsFile();
	let fileExtension = file.name.split('.').pop();

	if(!acceptableExtensions.includes(fileExtension)) {
		overseer.fileCompliant = false;
		showNotify(`Invalid file! Please provide ${ acceptableExtensions } files`)
		transmogrifyDropzone({ event: 'standby'})
		return 0;
	}

	let reader = new FileReader();
	
	reader.readAsArrayBuffer(file);

	overseer.fileCompliant = true;
	overseer.properties();

	reader.onload = (e) => {
		console.log('[reader]: reading file onload event...')
		let rawData = new Uint8Array(e.target.result);
		let workbook = XLSX.read(rawData, { type: 'array' });
			let first_sheet_name = workbook.SheetNames[0];
			let worksheet = workbook.Sheets[first_sheet_name];
			let jsonWS = XLSX.utils.sheet_to_json(worksheet);

			console.log(e.target.result);
			console.log(first_sheet_name);
			console.log(worksheet)
			console.log(jsonWS)
	}

	reader.onloadend = (e) => {
		console.log('[reader]: reading done...')
		if(e.target.error) {
			overseer.fileCompliant = false;
			showNotify('[reader]: An error occurred when reading file')
			console.log(e.target.error)
		}
	}
	
}