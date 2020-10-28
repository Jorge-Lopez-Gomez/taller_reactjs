/*

npm i -g npm-check-updates
ncu -u
npm install

*/

const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;

let a, s;
let pusher_app_key = '5c5a8cb3628ccf0ce916';

console.log("HOSTNAME::: ",hostname);

switch (hostname) {
	case 'localhost':
	case '127.0.0.1':
		/*a = 'http://localhost/api_gascom_monitor/public/api/';
		s = 'http://localhost/api_gascom_monitor/public/';*/
		a = 'http://apitallerreactjs.ykts.com.mx/public/api/';
		s = 'http://apitallerreactjs.ykts.com.mx/public/';
		break;
	case 'taller-reactjs.ykts.com.mx':
		a = 'http://apitallerreactjs.ykts.com.mx/public/api/';
		s = 'http://apitallerreactjs.ykts.com.mx/public/';
		break;
	default:
		a = protocol + '//api' + hostname + '/public/api/';
		s = protocol + '//api' + hostname + '/public/';
}

const api = a;
const src = s;

const basename = hostname === 'localhost' ? (Number(port) === 3000 || Number(port) === 3001 || Number(port) === 3002 || Number(port) === 3003 ? '' : '/gascom_monitor/build/') : '/';

export const CONFIG = {
	prefix: 'taller_reactjs',
	id_project: 2,
	api: api,
	src: src,
	basename: basename,
	foto_default: src + 'file/perfil/default-perfil.svg',
	portada_default: src + 'file/portada/default-portada.svg',
	menu: 1,
	debug: true,
	segundo_confirmar_token_expirado: 30,
	tipo_menu_contextual: 2,
	titulo_alert_confirm: 'Taller - Reactjs',
};
