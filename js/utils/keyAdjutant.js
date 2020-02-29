import { overseer } from './overseer.js';
import { aliases } from '../specs/fieldSpec.js';

function KeyAdjutant() {
	let _dataSet = [];

	Object.defineProperty(this, 'initSet', {
		enumerable   : false,
		configurable : false,
		writable     : false,
		value        : function(dataSet = []) {
			_dataSet = dataSet;
			return this;
		}
	});

	Object.defineProperty(this, 'keyNormalizer', {
		enumerable   : false,
		configurable : false,
		writable     : false,
		value        : function(keyCase = 'lower') {
			let normalizedDataSet = [];

			_dataSet.forEach((o) => {
				normalizedDataSet.push(
					Object.keys(o).reduce((acc, k) => {
						return {
							...acc,
							[keyCase === 'upper'
								? k.toLocaleUpperCase(overseer.locale)
								: k.toLocaleLowerCase(overseer.locale)]: o[k]
						};
					}, {})
				);
			});
			_dataSet = normalizedDataSet;
			return this;
		}
	});

	Object.defineProperty(this, 'keyRemover', {
		enumerable   : false,
		configurable : false,
		writable     : false,
		value        : function(strip = []) {
			_dataSet.map((r) => {
				Object.keys(r).map((k) => {
					if (strip.includes(k)) return delete r[k];
				});
			});
			return this;
		}
	});

	Object.defineProperty(this, 'keyLocator', {
		enumerable   : false,
		configurable : false,
		writable     : false,
		value        : function({ efk = [], sfa = aliases() }) {
			console.log('system field and aliases: ', sfa);
			console.log('external field headers: ', efk);
			return {};
		}
	});

	Object.defineProperty(this, 'val', {
		enumerable   : false,
		configurable : false,
		writable     : false,
		value        : function() {
			return _dataSet;
		}
	});

	Object.preventExtensions(this);
}

export const keyAdjutant = new KeyAdjutant();
