import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const VerificarService = {
	Verificar: (form) => {
		let params = {
			correo_electronico: form.correo_electronico,
			codigo: form.codigo,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Verificar_Codigo_Recuperacion', params, {authentication: false}).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
