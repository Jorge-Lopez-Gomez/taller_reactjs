import {HttpRequest} from '../../../settings/HttpRequest/HttpRequest';
import {DateFormat} from '../../../settings/DateFormat/DateFormat';


export const RegistroDatosPersonalesService = {
	RegistroGuardar: (form) => {
		
		let fecha_nacimiento = DateFormat.FormatSql(form.fecha_nacimiento);
		
		let params = {
			id_usuario: form.id_usuario,
			
			username: form.username,
			codigo: form.codigo,
			
			nombre: form.nombre,
			apellido_paterno: form.apellido_paterno,
			apellido_materno: form.apellido_materno,
			id_cat_sexo: form.id_cat_sexo,
			celular: form.celular,
			telefono: form.telefono,
			correo_electronico: form.correo_electronico,
			
			formato: form.formato,
			foto: form.foto,
			
			
			id_cat_estado_nacimiento: form.id_cat_estado_nacimiento,
			id_cat_municipio_nacimiento: form.id_cat_municipio_nacimiento,
			fecha_nacimiento: fecha_nacimiento,
			curp: form.curp,
			rfc: form.rfc,
			
			calle: form.calle,
			numero_exterior: form.numero_exterior,
			numero_interior: form.numero_interior,
			codigo_postal: form.codigo_postal,
			colonia: form.colonia,
			id_cat_municipio: form.id_cat_municipio,
			id_cat_estado: form.id_cat_estado,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Registro_Guardar', params, {authentication: false}).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
