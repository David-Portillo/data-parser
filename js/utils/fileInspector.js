import {overseer} from './overseer.js';
import {showNotify, transmogrifyDropzone, displayResetButton, handleFileInspectorError} from './common.js'
import {notifyMessage} from '../specs/messageSpec.js';
import {sampleData, gridOptions} from '../main.js';

const setAppData = ({ filename, data }) => {
	displayResetButton({ filename })
}

window.inspectFile = ({input, uploadType = 'dropzone'}) => {
	event.preventDefault();
	transmogrifyDropzone({event: 'standby'});

	const acceptableExtensions = [ 'xlsx', 'csv' ];

	let file = uploadType === 'browse' ? input.files[0] : input.dataTransfer.items[0].getAsFile();
	let fileExtension = file.name.split('.').pop();

	if (!acceptableExtensions.includes(fileExtension)) {
		overseer.fileCompliant = false;
		showNotify({message: notifyMessage.invalidFileExt, event: 'error'});
		handleFileInspectorError()
		return 0;
	}

	let reader = new FileReader();

	reader.readAsArrayBuffer(file);
	reader.onload = (e) => {
		const opts = {
			type: 'array',
			cellDates: true,
		}
		let rawData = new Uint8Array(e.target.result);
		let workbook = XLSX.read(rawData, opts);
		let first_sheet_name = workbook.SheetNames[0];
		let worksheet = workbook.Sheets[first_sheet_name];
		let jsonWS = XLSX.utils.sheet_to_json(worksheet, { blankRows: false });

		console.log(workbook)
		console.log(first_sheet_name);
		console.log(worksheet);
		console.log(jsonWS);

		setAppData({filename: file.name})
	
	};

	reader.onloadend = (e) => {
		if (e.target.error) {
			overseer.fileCompliant = false;
			showNotify({message: notifyMessage.fileError, event: 'error'});
			handleFileInspectorError();
			console.log(e.target.error);
			return 0;
		}

		overseer.fileCompliant = true;
		overseer.properties();
	};

	reader.onerror = (e) => {
		console.log("an error occurred")
		console.log(e)
	}
};
