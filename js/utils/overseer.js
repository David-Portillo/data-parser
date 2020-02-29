function Overseer({ locale = [] }) {
	let _errorCount = 0;
	let _fileCompliant = false;
	let _parsingCompleted = false;
	let _locale = locale;

	Object.defineProperty(this, 'errorCount', {
		enumerable   : true,
		configurable : false,
		get          : function() {
			console.log(`Retrieving errorCount value, fetched: ${_errorCount}`);
			return _errorCount;
		},
		set          : function(newValue) {
			console.log(`Updating errorCount value to ${newValue}`);
			_errorCount = newValue;
		}
	});

	Object.defineProperty(this, 'fileCompliant', {
		enumerable   : true,
		configurable : false,
		get          : function() {
			console.log(`Retrieving fileCompliant value, fetched: ${_fileCompliant}`);
			return _fileCompliant;
		},
		set          : function(newValue) {
			console.log(`Updating fileCompliant value to ${newValue}`);
			_fileCompliant = newValue;
		}
	});

	Object.defineProperty(this, 'parsingCompleted', {
		enumerable   : true,
		configurable : false,
		get          : function() {
			console.log(`Retrieving parsingCompleted value, fetched: ${_parsingCompleted}`);
			return _parsingCompleted;
		},
		set          : function(newValue) {
			console.log(`Updating parsingCompleted value to ${newValue}`);
			_parsingCompleted = newValue;
		}
	});

	Object.defineProperty(this, 'navDialect', {
		enumerable   : true,
		configurable : false,
		get          : function() {
			console.log(`Retrieving navigator languages, fetched: ${_locale}`);
			return _locale;
		}
	});

	Object.defineProperty(this, 'reset', {
		writable     : false,
		enumerable   : false,
		configurable : false,
		value        : function() {
			console.log('resetting overseer...');
			_errorCount = 0;
			_fileCompliant = false;
			_parsingCompleted = false;
		}
	});

	Object.defineProperty(this, 'properties', {
		writable     : false,
		enumerable   : false,
		configurable : false,
		value        : function() {
			console.table({ _errorCount, _fileCompliant, _parsingCompleted });
		}
	});

	Object.preventExtensions(this);
}

const locale = navigator.languages ? navigator.languages : navigator.language;
export let overseer = new Overseer({ locale });
