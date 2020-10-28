import {reactLocalStorage} from 'reactjs-localstorage';
import {CONFIG} from '../Config/Config';

export const ReactLocalStorageService = {
	set: (key, value) => {
		try {
			var index = getPrefix(key);
			if (key) {
				var a = value && typeof value === 'object' && value.constructor === Array;
				var b = value && typeof value === 'object' && value.constructor === Object;
				if (a || b) {
					reactLocalStorage.setObject(index, value);
				} else {
					reactLocalStorage.set(index, value);
				}
				return true;
			} else {
				console.error('Required params key');
				return false;
			}
		} catch (e) {
			console.error(e);
			return false;
		}
		
		
	},
	get: (key) => {
		try {
			var index = getPrefix(key);
			if (key) {
				var value;
				var data = reactLocalStorage.get(index);
				if (isJson(data)) {
					value = JSON.parse(data);
				} else {
					value = data;
				}
				return value;
			} else {
				console.error('Required params key');
				return false;
			}
		} catch (e) {
			console.error(e);
			return false;
		}
	},
	remove: (key) => {
		var index = getPrefix(key);
		return reactLocalStorage.remove(index);
	},
	clean: () => {
		return reactLocalStorage.clear();
	},
};


const getPrefix = (key) => {
	return CONFIG.prefix + "." + key;
};

const isJson = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};
