import InspectionException from '../handlers/inspectionException.js';
import { notifyMessage as nm } from '../specs/messageSpec.js';
import { constants, inspectionOutcome, showNotify } from './common.js';
import { keyAdjutant } from './keyAdjutant.js';

const stringComparator = () => {};

const interpretFile = ({ data }) => {
	data = keyAdjutant(data).normalize('lower').remove([ '__empty', 'another' ]).val();
	console.log(data);
	return data;
};

window.depository = ({ input, uploadType = 'dropzone' }) => {
	event.preventDefault();

	let file = uploadType === 'browse' ? input.files[0] : input.dataTransfer.items[0].getAsFile();
	let fileExtension = file.name.split('.').pop();

	try {
		if (!constants.acceptableExtensions.includes(fileExtension))
			throw new InspectionException({ et: 'ie_ife', nt: { msg: nm.invalidFileExt, ev: 'error' } });

		let reader = new FileReader();
		let fileDetails = {};

		reader.readAsArrayBuffer(file);
		reader.onload = (e) => {
			const opts = { type: 'array', cellDates: true, raw: true };
			const rawData = new Uint8Array(e.target.result);
			const workbook = XLSX.read(rawData, opts);
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];

			fileDetails.name = `${file.name} - ${sheetName}`;
			fileDetails.data = XLSX.utils.sheet_to_json(worksheet);
		};

		reader.onloadend = (e) => {
			if (e.target.error) throw new InspectionException({ et: 'ie_fre', nt: { msg: nm.fileError, ev: 'error' } });

			console.log('loading file finished, continuing with the logic...');

			interpretFile({ data: fileDetails.data });

			// grid.api.updateRowData({add: [ {} ] });
			inspectionOutcome.success({ filename: fileDetails.name });

			showNotify({ message: nm.inspectionPassed, event: 'success' });
		};

		reader.onerror = (e) => {
			console.log('an error occurred');
			console.log(e);
		};
	} catch (error) {
		console.log(error.toString());
		showNotify({ message: error.notify.msg, event: error.notify.ev });
		inspectionOutcome.error();
		return 0;
	}
};
