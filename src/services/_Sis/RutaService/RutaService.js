import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const RutaService = {
	Listar: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Ruta_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Agregar: (form) => {
		let params = {
			id_ruta: form.id_ruta,
			id_zona: form.id_zona,
			ruta: form.ruta,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Ruta_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Modificar: (form) => {
		let params = {
			id_ruta: form.id_ruta,
			id_zona: form.id_zona,
			ruta: form.ruta,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Ruta_Modificar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Eliminar: (id_ruta) => {let params = {
			id_ruta: id_ruta
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Ruta_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
