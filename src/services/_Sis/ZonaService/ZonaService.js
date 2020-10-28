import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const ZonaService = {
	Listar: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Zona_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Agregar: (form) => {
		let params = {
			id_zona: form.id_zona,
			id_orientacion: form.id_orientacion,
			zona: form.zona,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Zona_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Modificar: (form) => {
		let params = {
			id_zona: form.id_zona,
			id_orientacion: form.id_orientacion,
			zona: form.zona,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Zona_Modificar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Eliminar: (id_zona) => {let params = {
			id_zona: id_zona
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Zona_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
