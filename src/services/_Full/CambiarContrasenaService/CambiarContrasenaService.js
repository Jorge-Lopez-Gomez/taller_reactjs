import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const CambiarContrasenaService = {
	CambiarContrasena: (form) => {
		let params = {
			correo_electronico: form.correo_electronico,
			password: form.password,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cambiar_Password', params, {authentication: false}).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
