import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const ComentarioService = {
	Listar: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Comentario_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Agregar: (form) => {
		let params = {
			id_comentario: form.id_comentario,
			id_ruta: form.id_ruta,
			comentario: form.comentario,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Comentario_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Modificar: (form) => {
		let params = {
			id_comentario: form.id_comentario,
			id_ruta: form.id_ruta,
			comentario: form.comentario,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Comentario_Modificar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Eliminar: (id_comentario) => {let params = {
			id_comentario: id_comentario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Comentario_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
