import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import {IDBLocalLoginService} from "../../_Sis/IDBLocalLoginService/IDBLocalLoginService";
import {ValidarTipoExpiracionDeToken} from "../../../settings/General/General";


export const LogInService = {
	LogIn: (form, player_id) => {
		let params = {
			username: form.username,
			password: form.password,
			player_id: player_id || null
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Iniciar_Session', params, {authentication: false}).then((response) => {
				let Usr = {
					token: response.data.token || '',
					token_expire: response.data.token_expire || '',
					username: response.data.username || '',
					id_usuario: response.data.id_usuario || '',
					nombre: response.data.nombre || '',
					apellido_paterno: response.data.apellido_paterno || '',
					apellido_materno: response.data.apellido_materno || '',
					fecha_nacimiento: response.data.fecha_nacimiento || '',
					id_cat_sexo: response.data.id_cat_sexo || '',
					celular: response.data.celular || '',
					telefono: response.data.telefono || '',
					correo_electronico: response.data.correo_electronico || '',
					foto: response.data.foto || '',
					portada: response.data.portada || '',
					id_cat_tipo_usuario: response.data.id_cat_tipo_usuario || '',
					tipo_usuario: response.data.tipo_usuario || '',
					activo: response.data.activo || '',
					nombre_completo: response.data.nombre_completo || '',
					menu: response.data.menu || '',
					user_token_time: response.data.user_token_time || {},
					player_id: response.data.player_id || {},
				};
				ReactLocalStorageService.set('Usr', Usr);
				IDBLocalLoginService.Iniciar(Usr);
				ValidarTipoExpiracionDeToken();
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
