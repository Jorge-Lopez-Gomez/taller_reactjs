import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const RecuperarService = {
	Recuperar: (form) => {
		let params = {
			correo_electronico: form.correo_electronico,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Enviar_Codigo_Recuperacion', params, {authentication: false}).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
