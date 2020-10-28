import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const PerfilService = {
	PerfilUsuarioDato: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosSolicitarCambiarContrasena: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Solicitar_Cambiar_Contrasena', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosCambiarContrasena: (item) => {
		let params = {
			codigo_verificacion_password: item.codigo,
			password: item.password,
			password_confirm: item.password_confirm,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Cambiar_Contrasena', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosCambiarFoto: (item) => {
		let params = {
			foto: item.foto,
			formato: item.formato,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Cambiar_Foto', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosCambiarPortada: (item) => {
		let params = {
			portada: item.portada,
			formato: item.formato,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Cambiar_Portada', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosActualizarInformacion: (item) => {
		let params = {
			nombre: item.nombre,
			apellido_paterno: item.apellido_paterno,
			apellido_materno: item.apellido_materno,
			id_cat_sexo: item.id_cat_sexo,
			fecha_nacimiento: item.fecha_nacimiento,
			id_cat_estado_nacimiento: item.id_cat_estado_nacimiento,
			id_cat_municipio_nacimiento: item.id_cat_municipio_nacimiento,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Actualizar_Informacion', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosActualizarCorreosTelefonos: (item) => {
		let params = {
			celular: item.celular,
			telefono: item.telefono,
			correo_electronico: item.correo_electronico,
			correo_electronico_personal: item.correo_electronico_personal,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Actualizar_Correos_Telefonos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosActualizarDomicilio: (item) => {
		let params = {
			calle: item.calle,
			numero_exterior: item.numero_exterior,
			numero_interior: item.numero_interior,
			codigo_postal: item.codigo_postal,
			colonia: item.colonia,
			id_cat_municipio: item.id_cat_municipio,
			id_cat_estado: item.id_cat_estado,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Actualizar_Domicilio', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosCambiarTiempoExpiraToken: (item) => {
		let params = {
			id_cat_time_token: item.id_cat_time_token,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Configuracion_Cambiar_Tiempo_Expira_Token', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosCambiarTiempoToast: (item) => {
		let params = {
			tiempo_toast: item.tiempo_toast,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Configuracion_Cambiar_Tiempo_Toast', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosCambiarTipoMenu: (item) => {
		let params = {
			tipo_menu: item.tipo_menu,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Configuracion_Cambiar_Tipo_Menu', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosPlayerIdGuardar: (player_id) => {
		let params = {
			player_id: player_id || '',
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Player_Id_Guardar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	PerfilUsuariosPlayerIdPrueba: () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Perfil_Usuarios_Player_Id_Prueba', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
};
