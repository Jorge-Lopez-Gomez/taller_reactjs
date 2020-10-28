import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';

export const CatService = {
	Cfg: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/config').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListPeriodoPago: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/periodo_pago').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListEstado: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/estado').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListMunicipio: (id_estado) => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/municipio/' + id_estado).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListSexo: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/sexo').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListTipoSangre: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/tipo_sangre').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListTipoUsuario: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/tipo_usuario').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListGiroCliente: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/giro_cliente').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListUsuarioEjecutivo: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/usuario_ejecutivo').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListUsuarioPromotor: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/usuario_promotor').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	ListClienteInternaPlazaDireccion: () => {
		return new Promise((resolve, reject) => {
			HttpRequest.get('cat/cliente_interna_plaza_direccion').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	},
};
