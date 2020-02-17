function Overseer() {
	let _errorCount = 0;
	let _fileCompliant = false;
	let _parsingCompleted = false;
	let _data = []

	Object.defineProperty(this, 'errorCount', {
		enumerable: true,
		configurable: false,
		get: function() {
			console.log(`Retrieving errorCount value, yield ${_errorCount}`);
			return _errorCount;
		},
		set: function(newValue) {
			console.log(`Updating errorCount value to ${newValue}`)
			_errorCount = newValue;
		},
	});

	Object.defineProperty(this, 'fileCompliant', {
		enumerable: true,
		configurable: false,
		get: function() {
			console.log(`Retrieving fileCompliant value, yield ${_fileCompliant}`);
			return _fileCompliant;
		},
		set: function(newValue) {
			console.log(`Updating fileCompliant value to ${newValue}`)
			_fileCompliant = newValue;
		},
	});

	Object.defineProperty(this, 'parsingCompleted', {
		enumerable: true,
		configurable: false,
		get: function() {
			console.log(`Retrieving parsingCompleted value, yield ${_parsingCompleted}`);
			return _parsingCompleted;
		},
		set: function(newValue) {
			console.log(`Updating parsingCompleted value to ${newValue}`)
			_parsingCompleted = newValue;
		},
	});

	Object.defineProperty(this, 'data', {
		enumerable: false,
		configurable: false,
		get: function() {
			console.log(`Retrieving data value, yield ${_data}`);
			return _data;
		},
		set: function(newValue) {
			console.log(`Updating data value to ${newValue}`);
			_data = newValue;
		}
	})

	Object.defineProperty(this, 'reset', {
		value: function(){
			console.log('resetting overseer...');
			_errorCount = 0;
		 	_fileCompliant = false;
		 	_parsingCompleted = false;
		 	_data = []
		},
		writable: false,
		enumerable: false,
		configurable: false
	})

	Object.defineProperty(this, 'properties', {
		value: function() { 
			console.table({_errorCount, _fileCompliant, _parsingCompleted })
			console.table(_data)
		},
		writable: false,
		enumerable: false,
		configurable: false
	})

	Object.preventExtensions(this);
}

export let overseer = new Overseer();
