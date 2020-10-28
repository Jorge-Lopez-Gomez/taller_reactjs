import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const RegistroService = {
	VerificarRegistro: (form) => {
		let params = {
			username: form.username,
			password: form.password,
			codigo: form.codigo,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Registro_Verificar', params, {authentication: false}).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
