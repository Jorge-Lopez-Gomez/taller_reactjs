import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const MenuSubMenuService = {
	Listar: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Menus_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	AgregarMenu: (form) => {
		let params = {
			id_menu: undefined,
			icono: form.icono,
			menu: form.menu,
			orden: form.orden,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Menus_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ModificarMenu: (form) => {
		let params = {
			id_menu: form.id_menu,
			icono: form.icono,
			menu: form.menu,
			orden: form.orden,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Menus_Modificar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	EliminarMenu: (id_menu) => {
		let params = {
			id_menu: id_menu
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Menus_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	StatusMenu: (id_menu, activo) => {
		let params = {
			id_menu: id_menu,
			activo: activo,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Menus_Status', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	AgregarSubMenu: (form) => {
		let params = {
			id_sub_menu: undefined,
			id_menu: form.id_menu,
			icono: form.icono,
			sub_menu: form.sub_menu,
			ruta: form.ruta,
			orden: form.orden,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Sub_Menus_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ModificarSubMenu: (form) => {
		let params = {
			id_sub_menu: form.id_sub_menu,
			id_menu: form.id_menu,
			icono: form.icono,
			sub_menu: form.sub_menu,
			ruta: form.ruta,
			orden: form.orden,
			activo: form.activo ? 1 : 0
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Sub_Menus_Modificar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	EliminarSubMenu: (id_sub_menu) => {
		let params = {
			id_sub_menu: id_sub_menu
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Sub_Menus_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	StatusSubMenu: (id_sub_menu, activo) => {
		let params = {
			id_menu: id_sub_menu,
			activo: activo,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Sub_Menus_Status', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
