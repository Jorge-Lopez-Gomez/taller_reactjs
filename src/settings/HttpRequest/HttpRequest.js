import {CONFIG} from '../Config/Config';
import {$cSuccess, FieldsJs, FirstError, hideSpinner, showSpinner} from '../General/General';
import {ReactLocalStorageService} from '../ReactLocalStorageService/ReactLocalStorageService';
import axios from 'axios/index';

const imprimir = (strung, obj, type) => {
	let dato = [];
	if (type) {
		dato = [
			"%c%s%c%s\n",
			"color: white; background: gray; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
			" " + strung,
			"color: #30568C; background: #FAFAFA; font-size: 12px;font-weight: bold;",
			obj
		];
		window.console.log(
			dato[0],
			dato[1],
			dato[2],
			dato[3],
			JSON.stringify(dato[4], null, 2)
		);
	} else {
		dato = [
			"%c%s%c\n",
			"color: white; background: gray; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
			" " + strung,
			"color: #30568C; background: #FAFAFA; font-size: 12px;font-weight: bold;",
			obj
		];
		window.console.log(
			dato[0],
			dato[1],
			dato[2],
			dato[3],
			dato[4]
		);
	}
};

export const ErrorMessageServerRequest = {
	
	GetMessage: (response, $PROMISSESUCCESS, $PROMISSEERROR) => {
		var msgerrorserver = "";
		
		if (FieldsJs.Field(response.error) === true) {
			if (!FieldsJs.Array(response.error)) {
				var errorserver = response.error.split("::");
				msgerrorserver += (errorserver[1] ? errorserver[1] : response.error) + " ";
			}
		}
		
		if (FieldsJs.Field(response.file) === true) {
			var fileserver = response.file.split("/");
			msgerrorserver += fileserver[fileserver.length - 1] + " ";
		}
		
		if (FieldsJs.Field(response.line) === true) {
			msgerrorserver += response.line;
		}
		
		if (msgerrorserver) {
			
			let msg = "ADVERTENCIA: " + msgerrorserver;
			
			$PROMISSEERROR({
				success: false,
				codigo_api: 400,
				mensaje: FieldsJs.FirstMayus(msg),
				response: response
			});
			
		} else {
			
			if (response.success === true) {
				
				let msg = FirstError(response);
				
				response.mensaje = FieldsJs.FirstMayus(msg);
				
				$PROMISSESUCCESS(response);
				
			} else {
				
				let msg = FirstError(response);
				
				$PROMISSEERROR({
					success: false,
					codigo_api: 400,
					mensaje: FieldsJs.FirstMayus(msg),
					response: response
				});
				
			}
		}
	}
};


export const HttpRequest = {
	post: (ws, params, setting, time) => {
		
		let Cfg = ReactLocalStorageService.get('Cfg') || {};
		
		if (!(time > 0)) {
			time = 500;
		}
		
		if (!FieldsJs.Array(setting)) {
			setting = {};
		}
		
		setting.authentication = (setting.authentication === true || setting.authentication === undefined || setting.authentication === null);
		setting.spinner = (setting.spinner === true || setting.spinner === undefined || setting.spinner === null);
		
		let data = {};
		
		if (setting.authentication) {
			let Usr = ReactLocalStorageService.get('Usr') || {};
			data = {
				token: Usr.token || '',
				credenciales: {
					id_project: CONFIG.id_project || '',
					id_usuario: Usr.id_usuario || '',
					username: Usr.username || ''
				},
				data: {}
			};
		} else {
			data = {
				credenciales: {
					id_project: CONFIG.id_project || '',
				},
				data: {}
			};
		}
		
		if (FieldsJs.Array(params)) {
			for (let i in params) {
				data.data[i] = params[i];
			}
		}
		
		if (CONFIG.debug) {
			console.log("W E B S E R V I C E   &   D A T A [POST]:\n\n" + CONFIG.api + ws + "\n" + JSON.stringify(data, null, 2) + '\n');
		}
		
		if (setting.spinner) {
			showSpinner('spinner');
		}
		
		return new Promise((resolve, reject) => {
			axios.post(CONFIG.api + ws, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				timeout: Cfg.timeout || undefined,
			}).then(response => {
				
				if (setting.spinner) {
					hideSpinner('spinner', time);
				}
				
				let respuesta = FieldsJs.Copy(response.data);
				
				if (CONFIG.debug) {
					imprimir("R E S P O N S E [POST::" + ws + "]:\n", response.data, false);
				}
				
				ErrorMessageServerRequest.GetMessage(respuesta, function (result) {
					resolve(result);
				}, function (error) {
					reject(error);
				});
				
			}).catch(function (error) {
				
				if (setting.spinner) {
					hideSpinner('spinner', time);
				}
				
				let errors = {};
				
				if (!error) {
					errors = {
						success: false,
						codigo_api: 400,
						mensaje: "Error al procesar los datos",
						error: error
					}
				} else {
					errors = {
						success: false,
						codigo_api: 400,
						mensaje: "Error al procesar los datos",
						error: error
					}
				}
				
				if (CONFIG.debug) {
					window.console.error(errors);
				}
				
				reject(errors);
				
			});
		});
	},
	get: (ws, params, setting, time) => {
		
		if (!(time > 0)) {
			time = 500;
		}
		
		if (!FieldsJs.Array(setting)) {
			setting = {};
		}
		
		setting.spinner = !(setting.spinner === false || setting.spinner === undefined || setting.spinner === null);
		
		let temp = [];
		
		if (FieldsJs.Array(params)) {
			for (let i in params) {
				temp.push(i + '=' + params[i]);
			}
		}
		
		let data = temp.join('&');
		
		let urls = '';
		
		if (FieldsJs.Field(data)) {
			urls = CONFIG.api + ws + '?' + data;
		} else {
			urls = CONFIG.api + ws;
		}
		
		if (CONFIG.debug) {
			$cSuccess(urls);
		}
		
		if (setting.spinner) {
			showSpinner('spinner');
		}
		
		return new Promise((resolve, reject) => {
			axios.get(urls).then(response => {
				
				if (setting.spinner) {
					hideSpinner('spinner', time);
				}
				
				let respuesta = response.data;
				
				if (CONFIG.debug) {
					window.console.log("R E S P O N S E [GET::" + urls + "]:\n", FieldsJs.Copy(respuesta));
				}
				
				ErrorMessageServerRequest.GetMessage(respuesta, function (result) {
					resolve(result);
				}, function (error) {
					reject(error);
				});
				
			}).catch(function (error) {
				
				if (setting.spinner) {
					hideSpinner('spinner', time);
				}
				
				let errors = {};
				
				if (!error) {
					errors = {
						success: false,
						codigo_api: 400,
						mensaje: "Error al procesar los datos",
						error: error
					}
				} else {
					errors = {
						success: false,
						codigo_api: 400,
						mensaje: "Error al procesar los datos",
						error: error
					}
				}
				
				if (CONFIG.debug) {
					window.console.error(errors);
				}
				
				reject(errors);
				
			});
		});
	}
};


