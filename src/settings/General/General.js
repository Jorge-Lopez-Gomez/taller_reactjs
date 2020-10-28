// https://webbjocke.com/javascript-check-data-types/

import {ReactLocalStorageService} from "../ReactLocalStorageService/ReactLocalStorageService";
import {DateFormat} from "../DateFormat/DateFormat";
import {CONFIG} from "../Config/Config";

export const GetTipoMenu = () => {
	let Cfg = ReactLocalStorageService.get('Cfg') || {};
	return 'Menu-' + (Cfg.tipo_menu > 0 ? Cfg.tipo_menu : (CONFIG.menu || '1'));
};

export function ValidarTipoExpiracionDeToken() {
	
	let Usr = ReactLocalStorageService.get('Usr') || {};
	
	let user_token_time = Usr.user_token_time || {};
	
	if (user_token_time.time_token_click > 0) {
		
		$cSuccess('Token FrontEnd...');
		
		// console.log(Usr);
		
		let actual = DateFormat.ConvertTimestamp();
		
		Usr.token_expire = DateFormat.SumaMinutos(actual, user_token_time.time_token_click);
		// Usr.token_expire = DateFormat.SumaSegundos(Usr.token_expire, 1);
		
		ReactLocalStorageService.set('Usr', Usr);
		
	} else {
		$cInfo('Token BackEnd...');
	}
	
}

export const FieldsJs = {
	timeout: null,
	TimePromise: function (time, resolve, reject) {
		if (!(Number(time) > 0)) {
			time = 700;
		}
		if (this.timeout) {
			clearTimeout(this.timeout);
			if (typeof reject === "function") {
				reject(false);
			}
		}
		this.timeout = setTimeout(function () {
			if (typeof resolve === "function") {
				resolve(true);
			}
		}, time);
	},
	HandleChange: (e, variable, campo, date, input, resolve) => {
		
		if ((date && input) || input) {
			
			resolve({
				name: input,
				value: date
			});
			
		} else {
			
			const {value, name, checked, type} = e.target;
			
			if (variable && campo) {
				
				console.log(value, name, checked, type);
				
				let key = Number(name.split('__')[1]);
				
				console.log(key);
				
				let arr_temp = this.state[variable];
				
				for (let i = 0; i < arr_temp.length; i++) {
					
					if (key === i) {
						arr_temp[i][campo] = type === 'checkbox' ? checked : value;
					}
				}
				
				resolve({
					name: variable,
					value: arr_temp
				});
				
			} else {
				
				resolve({
					name: name,
					value: type === 'checkbox' ? checked : value
				});
				
			}
			
		}
	},
	ChangeValue: (obj_or_arr_name__key, var_name, var_value, resolve, state) => {
		
		console.log(obj_or_arr_name__key, var_name, var_value, state);
		
		if (obj_or_arr_name__key !== null) {
			if (str_search(obj_or_arr_name__key, '#')) {
				let arr_name = obj_or_arr_name__key.split('#')[0];
				let key = Number(obj_or_arr_name__key.split('#')[1]);
				let arr_value = state[arr_name];
				for (let i = 0; i < arr_value.length; i++) {
					if (key === i) {
						arr_value[i][var_name] = var_value;
					}
				}
				resolve({
					name: arr_name,
					value: arr_value
				});
			} else {
				let obj_name = obj_or_arr_name__key;
				let obj_value = state[obj_name];
				obj_value[var_name] = var_value;
				resolve({
					name: obj_name,
					value: obj_value
				});
			}
			
		} else {
			resolve({
				name: var_name,
				value: var_value
			});
		}
		
	},
	Copy: function (ObjOrArray) {
		if (this.isArray(ObjOrArray)) {
			let oa = JSON.stringify(ObjOrArray);
			return JSON.parse(oa);
			// return [...ObjOrArray];
		} else if (this.isObject(ObjOrArray)) {
			let oa = JSON.stringify(ObjOrArray);
			return JSON.parse(oa);
			// return {...ObjOrArray};
		} else {
			return ObjOrArray;
		}
	},
	Field: function (campo) {
		return campo && (campo !== undefined && campo !== null && campo !== "" && campo !== "undefined" && campo !== "null");
	},
	Array: function (ObjOrArray) {
		return ObjOrArray && ((typeof ObjOrArray === "object") && (Object.keys(ObjOrArray || {}).length > 0));
	},
	FirstMayus: function (string, el_resto_minuscula) {
		if (typeof string === "string") {
			string = string.trim();
			if (string) {
				if (el_resto_minuscula === true) {
					return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
				} else {
					return string.charAt(0).toUpperCase() + string.slice(1);
				}
			} else {
				return string;
			}
		} else {
			return string;
		}
	},
	isBoolean: function (variable_string_name) {
		return (typeof variable_string_name === "boolean") && (variable_string_name === true || variable_string_name === false);
	},
	isObject: function (obj) {
		return obj && typeof obj === 'object' && obj.constructor === Object;
	},
	isArray: function (arr) {
		return arr && typeof arr === 'object' && arr.constructor === Array;
	},
	isString: function (variable_string_name) {
		return (typeof variable_string_name === "string");
	},
	isNumber: function (value) {
		var isn = false;
		var num0 = Number(value);
		if (typeof num0 === "number" && !isNaN(num0)) {
			isn = true;
		}
		return isn;
	},
	isDefined: function (variable_string_name) {
		return (typeof (window[variable_string_name]) != "undefined");
	},
	isFunction: function (funtion_string_name) {
		return (typeof (window[funtion_string_name]) != "function");
	},
	inArray: function (ObjOrArray, val) {
		try {
			if (Array.isArray(ObjOrArray) === false) {
				throw Object({
					status: false,
					mensaje: "Primer parámetro, solo admite arreglos..."
				});
			}
			if (ObjOrArray.length <= 0) {
				throw Object({
					status: false,
					mensaje: "Primer parámetro, el arreglo esta vació..."
				});
			}
			if (this.Field(val) === false) {
				throw Object({
					status: false,
					mensaje: "El segundo parámetro requiere un valor..."
				});
			}
			if (typeof val !== "number" && typeof val !== "string") {
				throw Object({
					status: false,
					mensaje: "El segundo parámetro solo admite numérico o cadena: " + val + " No es un valor válido"
				});
			}
			if (ObjOrArray.indexOf(this.getNumOrStr(val)) >= 0) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			console.log(e.mensaje);
			return e.status;
		}
	},
	AppendHtml: function (id, html) {
		var nodo = document.createElement("DIV");
		nodo.innerHTML = html;
		var content = document.getElementById(id);
		if (content) {
			content.appendChild(nodo);
		}
	},
	getNum: function (value) {
		var num0 = Number(value);
		var num1 = 0;
		if (typeof num0 === "number" && !isNaN(num0)) {
			num1 = num0;
		}
		return num1;
	},
	getNumOrStr: function (value) {
		if (this.Field(value)) {
			var numero = Number(value);
			if (typeof numero === "number" && !isNaN(numero)) {
				value = numero;
			}
		}
		return value;
	},
	GetScroll: function (id, results) {
		var elemento = document.getElementById(id);
		
		if (elemento) {
			
			var offsetHeight = elemento.offsetHeight;
			var offsetWidth = elemento.offsetWidth;
			
			var clientHeight = elemento.clientHeight;
			var clientWidth = elemento.clientWidth;
			
			var scrollHeight = elemento.scrollHeight;
			var scrollWidth = elemento.scrollWidth;
			
			var scrollTop = elemento.scrollTop;
			var scrollBottom = elemento.scrollTop + elemento.offsetHeight;
			
			var top = scrollTop;
			var bottom = scrollHeight - scrollBottom;
			
			var s = {
				offsetHeight: offsetHeight,
				offsetWidth: offsetWidth,
				
				clientHeight: clientHeight,
				clientWidth: clientWidth,
				
				scrollHeight: scrollHeight,
				scrollWidth: scrollWidth,
				
				scrollTop: scrollTop,
				scrollBottom: scrollBottom,
				
				top: top,
				bottom: bottom
			};
			
			if (typeof results === "function") {
				results(s);
			} else {
				return s;
			}
		}
	},
	scrollIntoViewStart: function (elementid) {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			elemento.scrollIntoView({
				block: "start",
				behavior: "auto"
			});
		} else {
			console.warn("No se identifica el id...");
		}
	},
	scrollIntoViewEnd: function (elementid) {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			elemento.scrollIntoView({
				block: "end",
				behavior: "auto"
			});
		} else {
			console.warn("No se identifica el id...");
		}
	},
	scrollTop: function (elementid, top) {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			elemento.scrollTop = top;
		} else {
			console.warn("No se identifica el id...");
		}
	},
	scrollStart: function (elementid) {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			elemento.scrollTop = 0;
		} else {
			console.warn("No se identifica el id...");
		}
	},
	scrollEnd: function (elementid) {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			this.GetScroll(elementid, (r) => {
				elemento.scrollTop = r.scrollHeight;
			});
		} else {
			console.warn("No se identifica el id...");
		}
	},
	isLetterRegex: function (cadena) {
		var regex = /^[a-zA-Z]+$/;
		var status = regex.test(cadena);
		return status;
	},
	isNumberRegex: function (cadena) {
		var regex = /^[0-9]+$/;
		var status = regex.test(cadena);
		return status;
	},
	isComaPuntoRegex: function (cadena) {
		var regex = /^[.,]+$/;
		var status = regex.test(cadena);
		return status;
	},
	isLetterNumberRegex: function (cadena) {
		var regex = /^[a-zA-Z0-9]+$/;
		var status = regex.test(cadena);
		return status;
	},
	onClickClass: function (className) {
		return new Promise((resolve) => {
			document.body.addEventListener('click', function (evt) {
				if (evt.target.className === className) {
					resolve(true);
				}
			}, false);
		});
	},
	Currency: function (n, c1, d1, t1) {
		let c = isNaN(c1 = Math.abs(c1)) ? 2 : c1;
		let d = d1 === undefined ? "." : d1;
		let t = t1 === undefined ? "," : t1;
		let s = n < 0 ? "-" : "";
		let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
		let j;
		j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	},
};

export const FirstError = (response) => {
	var Array_Log_Error = [];
	
	if (FieldsJs.Array(response.errors)) {
		Array_Log_Error = FieldsJs.Copy(response.errors);
	}
	var msger = "";
	
	if (FieldsJs.Field(response.mensaje)) {
		msger = response.mensaje;
	} else if (FieldsJs.Field(response.message)) {
		msger = response.message;
	}
	
	if (FieldsJs.Array(Array_Log_Error)) {
		var band = true;
		for (let ix in Array_Log_Error) {
			let Item_Error = Array_Log_Error[ix];
			if (FieldsJs.Array(Item_Error) === true) {
				for (let b = 0; b < Item_Error.length; b++) {
					let itemE = Item_Error[b];
					if (band === true) {
						if (FieldsJs.isArray(itemE)) {
							for (let c = 0; c < itemE.length; c++) {
								let itemZ = itemE[c];
								if (FieldsJs.isString(itemZ)) {
									msger = itemZ;
									band = false;
								} else if (FieldsJs.isObject(itemZ)) {
									for (let i in itemZ) {
										let itemY = itemZ[i];
										msger = itemY;
										band = false;
									}
								} else if (FieldsJs.isArray(itemZ)) {
									msger = itemZ[0];
									band = false;
								}
							}
						} else if (FieldsJs.isObject(itemE)) {
							for (let i in itemE) {
								let itemZ = itemE[i];
								msger = itemZ;
								band = false;
							}
						} else if (FieldsJs.isString(itemE)) {
							msger = itemE;
							band = false;
						}
					}
				}
			} else {
				if (FieldsJs.isString(Item_Error)) {
					msger = Item_Error;
				}
			}
		}
	} else {
		if (FieldsJs.isString(Array_Log_Error)) {
			msger = Array_Log_Error;
		}
	}
	
	return FieldsJs.FirstMayus(msger || 'Error al procesar los datos.');
};

export const showSpinner = (id) => {
	document.getElementById(id || "spinner").style.display = 'flex';
};

export const hideSpinner = (id, time) => {
	if (!time) {
		time = 1000;
	}
	setTimeout(() => {
		document.getElementById(id || "spinner").style.display = 'none';
	}, time);
	
};

export function $cLog(string, color, background) {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#616365');
	var _background = (background ? background : '#AFB1B3');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
}

export function $cInfo(string, color, background) {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#0025a1');
	var _background = (background ? background : '#E6F2FF');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
}

export function $cWarn(string, color, background) {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#a18600');
	var _background = (background ? background : '#FCFFC8');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
}

export function $cError(string, color, background) {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#aa3700');
	var _background = (background ? background : '#ffe1dd');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
}

export function $cSuccess(string, color, background) {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#098500');
	var _background = (background ? background : '#e4ffed');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
}

export function date_parse(e) {
	return e ? Date.parse(ios_date(e)) : e
}

export function ios_date(r) {
	var s, t, e;
	return r ? !0 === str_search(r, "GMT") ? r : (!0 === str_search(r, " ") ? (s = r.split(" ")[0], t = r.split(" ")[1]) : s = r, e = (!0 === str_search(s, "-") ? str_replace("-", "/", s) : s).split("/"), Number(e[0]) < Number(e[2]) ? e[2] + "/" + e[1] + "/" + e[0] + (t ? " " + t : "") : e[0] + "/" + e[1] + "/" + e[2] + (t ? " " + t : "")) : r;
}

export function str_replace(search, replace, subject, option) {
	if (option === true) {
		return subject.split(search).join(replace);
	} else {
		for (; -1 !== subject.toString().indexOf(search);) subject = subject.toString().replace(search, replace);
		return subject;
	}
}

export function str_search(subject, search) {
	return -1 < subject.toString().indexOf(search);
}


export function FloatSolo(e) {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key).toLowerCase();
	let letras = "0123456789.";
	let especiales = [8, 9, 37, 38, 40, 39, 46, 160];
	let tecla_especial = false;
	for (var i in especiales) {
		if (key === especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(tecla) === -1 && !tecla_especial) {
		e.preventDefault();
	}
}

export function EnteroSolo(e) {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key).toLowerCase();
	let letras = "0123456789";
	let especiales = [8, 9, 37, 38, 40, 39, 46, 160];
	let tecla_especial = false;
	for (var i in especiales) {
		if (key === especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(tecla) === -1 && !tecla_especial) {
		e.preventDefault();
	}
}

export function AlfanumericoSolo(e) {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key).toLowerCase();
	let letras = "0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
	let especiales = [8, 9, 37, 38, 40, 39, 46, 160];
	let tecla_especial = false;
	for (var i in especiales) {
		if (key === especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(tecla) === -1 && !tecla_especial) {
		e.preventDefault();
	}
}

export function MinMax(e, min, max) {
	let value = e.target.value;
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key).toLowerCase();
	let num;
	if (!isNaN(Number(value))) {
		num = Number(value);
	}
	if (Number(tecla) >= 0) {
		num = value.toString() + tecla.toString();
		num = Number(num);
	}
	console.log(value, tecla, min, max, num);
	if (!(num >= min && num <= max)) {
		e.preventDefault();
	}
}

/**
 * @return {boolean}
 */
export function isEnter(e) {
	let key = e.keyCode || e.which;
	return key === 13;
}

/**
 * @return {string}
 */
export function CadenaDomicilio(datos) {
	if (typeof datos !== "object") {
		return 'No se ha configurado un domicilio';
	}
	var direccion = "";
	
	if (FieldsJs.Field(datos.calle) === true) {
		direccion = direccion + datos.calle + " ";
	}
	
	if (FieldsJs.Field(datos.numero_exterior) === true) {
		direccion = direccion + "no. ext. " + datos.numero_exterior + ", ";
	}
	
	if (FieldsJs.Field(datos.numero_interior) === true) {
		direccion = direccion + "no. int. " + datos.numero_interior + " ";
	}
	
	if (FieldsJs.Field(datos.colonia) === true) {
		direccion = direccion + datos.colonia + " ";
	}
	
	if (FieldsJs.Field(datos.codigo_postal) === true) {
		direccion = direccion + "C.P. " + datos.codigo_postal + ", ";
	}
	
	if (FieldsJs.Field(datos.municipio) === true) {
		direccion = direccion + datos.municipio + ", ";
	}
	
	if (FieldsJs.Field(datos.estado) === true) {
		direccion = direccion + datos.estado + ".";
	}
	
	return direccion;
}
