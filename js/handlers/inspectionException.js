/**
 * Abbreviations
 * 
 * ie_*: inspection exception
 * ie_ife: invalid file error
 * ie_fre: file reading error
 * 
 */

const exceptionMessages = {
	ie_ife : 'user attempted to upload a file with an invalid file extension.',
	ie_fre : 'something is wrong with the uploaded file.'
};

class InspectionException extends Error {
	// et: error type, nt: notify, msg: message, ev: event
	constructor({ et = '', nt = { msg: '...', ev: 'error' } }) {
		super(exceptionMessages[et]);
		this.name = 'InspectionException';
		this.notify = nt;
	}
}

export default InspectionException;
