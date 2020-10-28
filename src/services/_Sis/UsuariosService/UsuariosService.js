import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const UsuariosService = {
	Listar: (filtro, paginacion) => {
		let params = {
			filtro: {
				usuario: filtro.usuario || null,
				correo_electronico: filtro.correo_electronico || null,
				id_cat_tipo_usuario: filtro.id_cat_tipo_usuario || null,
				activo: (Number(filtro.activo) === 1 || Number(filtro.activo) === 0) ? Number(filtro.activo) : null,
			},
			paginacion: {
				total: paginacion.total || null,
				page: paginacion.page || null,
				limit: paginacion.limit || null
			}
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuarios_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Agregar: (form) => {
		let params = {
			username: form.username,
			nombre: form.nombre,
			id_rocket_chat: form.id_rocket_chat,
			usuario_rocket_chat: form.usuario_rocket_chat,
			apellido_paterno: form.apellido_paterno,
			apellido_materno: form.apellido_materno,
			correo_electronico: form.username,
			id_cat_tipo_usuario: form.id_cat_tipo_usuario,
			activo: form.activo ? 1 : 0,
			sendmail: form.sendmail ? 1 : 0,
			isjefe: form.isjefe ? 1 : 0,
			isjefeplaza: form.isjefeplaza ? 1 : 0,
			id_plaza: form.id_plaza
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuarios_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Modificar: (form) => {
		let params = {
			id_usuario: form.id_usuario,
			id_rocket_chat: form.id_rocket_chat,
			usuario_rocket_chat: form.usuario_rocket_chat,
			username: form.username,
			nombre: form.nombre,
			apellido_paterno: form.apellido_paterno,
			apellido_materno: form.apellido_materno,
			correo_electronico: form.correo_electronico,
			id_cat_tipo_usuario: form.id_cat_tipo_usuario,
			activo: form.activo ? 1 : 0,
			sendmail: form.sendmail ? 1 : 0,
			isjefe: form.isjefe ? 1 : 0,
			isjefeplaza: form.isjefeplaza ? 1 : 0,
			id_plaza: form.id_plaza
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuarios_Modificar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	Eliminar: (id_usuario) => {
		let params = {
			id_usuario: id_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuarios_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	TipoUsuario: (id_cat_tipo_area) => {
		let params = {
			id_cat_tipo_usuario: id_cat_tipo_area
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuarios_Tipo', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
