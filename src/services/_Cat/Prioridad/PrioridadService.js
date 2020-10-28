import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const PrioridadService = {
	Listar: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Prioridad_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Agregar: (form) => {
		let params = {
			prioridad: form.prioridad,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Prioridad_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Modificar: (form) => {
		let params = {
			id_cat_prioridad: form.id_cat_prioridad,
			prioridad: form.prioridad,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Prioridad_Modificar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Eliminar: (id_cat_prioridad) => {
		let params = {
			id_cat_prioridad: id_cat_prioridad
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat/_Prioridad_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
