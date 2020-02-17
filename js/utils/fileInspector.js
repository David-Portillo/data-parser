import {overseer} from './overseer.js';
import {showNotify, inspection, constants} from './common.js'
import {notifyMessage} from '../specs/messageSpec.js';
import {sampleData, gridOptions} from '../main.js';

window.inspectFile = ({input, uploadType = 'dropzone'}) => {
	event.preventDefault();

	let file = uploadType === 'browse' ? input.files[0] : input.dataTransfer.items[0].getAsFile();
	let fileExtension = file.name.split('.').pop();

	try {

		if (!constants.acceptableExtensions.includes(fileExtension)) 
			throw new Error(notifyMessage.invalidFileExt)

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

		};

		reader.onloadend = (e) => {
			if (e.target.error) 
				throw new Error(notifyMessage.fileError)
				
			console.log('continue with logic...')
			overseer.fileCompliant = true;
			overseer.properties();
			inspection.success({filename: file.name})
			showNotify({message: notifyMessage.inspectionPassed, event: 'success'})

		};

		reader.onerror = (e) => {
			console.log("an error occurred")
			console.log(e)
		}

	} catch (error) {
		console.log(error.name)
		console.log(error.message)
		console.log(error.stack)
		console.log(error.toString())

		overseer.fileCompliant = false;
    overseer.properties();
		showNotify({message: error.message, event: 'error'});
		inspection.error()
		return 0;
	}
};
