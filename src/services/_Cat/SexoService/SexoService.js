import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const SexoService = {
	Listar: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Sexo_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Agregar: (form) => {
		let params = {
			sexo: form.sexo,
			abreviatura: form.abreviatura,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Sexo_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Modificar: (form) => {
		let params = {
			id_cat_sexo: form.id_cat_sexo,
			sexo: form.sexo,
			abreviatura: form.abreviatura,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Sexo_Modificar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Eliminar: (id_cat_sexo) => {
		let params = {
			id_cat_sexo: id_cat_sexo
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Sexo_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
