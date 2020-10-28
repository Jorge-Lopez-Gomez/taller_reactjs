import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const RolesPermisosService = {
	Listar: (id_cat_tipo_usuario) => {
		let params = {
			id_cat_tipo_usuario: id_cat_tipo_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Roles_Permisos/_Menus_Sub_Menu_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PermisoMenu: (id_menu, id_acceso_menu, acceso_menu, id_cat_tipo_usuario) => {
		let params = {
			id_menu: id_menu,
			id_acceso_menu: id_acceso_menu,
			id_cat_tipo_usuario: id_cat_tipo_usuario,
			acceso_menu: acceso_menu ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Roles_Permisos/_Menus_Acceso_Menu', params, null, 1500).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PermisoSubMenu: (id_sub_menu, id_acceso_sub_menu, acceso_sub_menu, id_cat_tipo_usuario) => {
		let params = {
			id_sub_menu: id_sub_menu,
			id_acceso_sub_menu: id_acceso_sub_menu,
			id_cat_tipo_usuario: id_cat_tipo_usuario,
			acceso_sub_menu: acceso_sub_menu ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Roles_Permisos/_Menus_Acceso_Sub_Menu', params, null, 1500).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
};
