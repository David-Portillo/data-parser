import InspectionException from '../handlers/inspectionException.js';
import { aliases } from '../specs/fieldSpec.js';
import { notifyMessage as nm } from '../specs/messageSpec.js';
import { constants, inspectionOutcome, showNotify } from './common.js';
import { overseer } from './overseer.js';

const keyLocator = ({ efk = [], sfk = aliases() }) => {
	console.log('system field and aliases: ', sfk);
	console.log('external field headers: ', efk);
	console.log('navigator languages: ', overseer.navDialect)

	return {};
};

const interpretFile = ({ data }) => {
	const efk = Object.keys(data[0]);
	const outcome = keyLocator({ efk });
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
			let jsonWS = XLSX.utils.sheet_to_json(worksheet, { blankRows: false });

			fileDetails.name = `${file.name} - ${sheetName}`;

			interpretFile({ data: jsonWS });

			//grid.api.updateRowData({ add: jsonWS });
		};

		reader.onloadend = (e) => {
			if (e.target.error) throw new InspectionException({ et: 'ie_fre', nt: { msg: nm.fileError, ev: 'error' } });

			console.log('continue with logic...');
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
