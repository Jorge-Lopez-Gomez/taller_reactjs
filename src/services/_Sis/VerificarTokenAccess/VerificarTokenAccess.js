import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import {FieldsJs, ValidarTipoExpiracionDeToken} from '../../../settings/General/General';

export const VerificarTokenAccess = {
	Active: (form) => {
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Verificar_Token_Access', {}).then((response) => {
				let Cfg = {};
				if (FieldsJs.Array(response.data.Cfg)) {
					Cfg = response.data.Cfg
				}
				ReactLocalStorageService.set('Cfg', Cfg);
				let Usr = ReactLocalStorageService.get('Usr');
				Usr.token_expire = response.data.Usr.token_expire;
				if (FieldsJs.Array(response.data.Usr.user_token_time)) {
					Usr.user_token_time = response.data.Usr.user_token_time;
				}
				ReactLocalStorageService.set('Usr', Usr);
				ValidarTipoExpiracionDeToken();
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
