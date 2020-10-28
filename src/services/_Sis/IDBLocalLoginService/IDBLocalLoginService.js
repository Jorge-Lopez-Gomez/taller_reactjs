import {iDB, IndexedDBRequest} from "../../../settings/IndexedDBRequest/IndexedDBRequest";
import {FieldsJs} from '../../../settings/General/General';

export const IDBLocalLoginService = {
	Iniciar: Iniciar,
	VerificarUsuario: VerificarUsuario,
	SaveUser: SaveUser,
	UpdateUser: UpdateUser
};

function Iniciar(Usr) {
	
	var id_usuario = Usr.id_usuario;
	
	return new Promise(function (resolve, reject) {
		VerificarUsuario(id_usuario).then(function (info) {
			if (info.data.id_usuario > 0) {
				UpdateUser(id_usuario, Usr).then(function (r) {
					resolve(r);
				}).catch(function (e) {
					reject(e);
				});
			} else {
				SaveUser(id_usuario, Usr).then(function (r) {
					resolve(r);
				}).catch(function (e) {
					reject(e);
				});
			}
		}).catch(function (error) {
			reject(error);
		})
	})
}

function VerificarUsuario(id_usuario) {
	return new Promise(function (resolve, reject) {
		IndexedDBRequest.GetRow(iDB('acresco.production.db'), 'usuario', ['id', 'id_usuario'], {id_usuario: id_usuario}).then(function (response) {
			resolve(response);
		}).catch(function (error) {
			reject(error);
		});
	});
}

function SaveUser(id_usuario, Usr) {
	var campos = {
		
		'id_usuario': id_usuario || '',
		'username': Usr.username || '',
		'token': Usr.token || '',
		
		'nombre': Usr.nombre || '',
		'apellido_paterno': Usr.apellido_paterno || '',
		'apellido_materno': Usr.apellido_materno || '',
		
		'id_cat_sexo': Usr.id_cat_sexo || '',
		'foto': Usr.foto || ''
		
	};
	return new Promise(function (resolve, reject) {
		try {
			if (!FieldsJs.Field(id_usuario)) {
				throw Object({
					status: 400,
					mensaje: 'id_usuario: Campo Requerido.'
				})
			}
			if (!FieldsJs.Field(campos['username'])) {
				throw Object({
					status: 400,
					mensaje: 'username: Campo Requerido.'
				})
			}
			/*for (let key in campos) {
				if (!FieldsJs.inArray(['id_usuario', 'username', 'token', 'nombre', 'id_cat_sexo'], key)) {
					if (!FieldsJs.Field(campos[key])) {
						throw Object({
							status: 400,
							mensaje: key + ': Campo Requerido.'
						})
					}
				}
			}*/
			IndexedDBRequest.InsertData(iDB('acresco.production.db'), 'usuario', campos).then(function (response) {
				resolve(response);
			}).catch(function (error) {
				reject(error);
			});
		} catch (error) {
			reject(error);
		}
	});
}

function UpdateUser(id_usuario, Usr) {
	var campos = {
		
		'username': Usr.username || '',
		'token': Usr.token || '',
		
		'nombre': Usr.nombre || '',
		'apellido_paterno': Usr.apellido_paterno || '',
		'apellido_materno': Usr.apellido_materno || '',
		
		'id_cat_sexo': Usr.id_cat_sexo || '',
		'foto': Usr.foto || ''
		
	};
	var where = {
		id_usuario: id_usuario
	};
	return new Promise(function (resolve, reject) {
		try {
			if (!FieldsJs.Field(id_usuario)) {
				throw Object({
					status: 400,
					mensaje: 'id_usuario: Campo Requerido.'
				})
			}
			if (!FieldsJs.Field(campos['username'])) {
				throw Object({
					status: 400,
					mensaje: 'username: Campo Requerido.'
				})
			}
			/*for (let key in campos) {
				if (!FieldsJs.inArray(['id_usuario', 'username', 'token', 'nombre', 'id_cat_sexo'], key)) {
					if (!FieldsJs.Field(campos[key])) {
						throw Object({
							status: 400,
							mensaje: key + ': Campo Requerido.'
						})
					}
				}
			}*/
			IndexedDBRequest.UpdateData(iDB('acresco.production.db'), 'usuario', campos, where).then(function (response) {
				resolve(response);
			}).catch(function (error) {
				reject(error);
			});
		} catch (error) {
			reject(error);
		}
	});
}
