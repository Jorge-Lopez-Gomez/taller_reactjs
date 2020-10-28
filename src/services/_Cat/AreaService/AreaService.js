import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const AreaService = {
	Listar: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Area_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Agregar: (form) => {
		let params = {
			tipo_usuario: form.tipo_usuario,
			descripcion: form.descripcion,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Area_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Modificar: (form) => {
		let params = {
			id_cat_tipo_usuario: form.id_cat_tipo_usuario,
			tipo_usuario: form.tipo_usuario,
			descripcion: form.descripcion,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Area_Modificar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Eliminar: (id_cat_tipo_usuario) => {
		let params = {
			id_cat_tipo_usuario: id_cat_tipo_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Area_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
