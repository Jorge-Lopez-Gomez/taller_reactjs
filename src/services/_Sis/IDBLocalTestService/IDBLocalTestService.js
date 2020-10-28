import {iDB, IndexedDBRequest} from "../../../settings/IndexedDBRequest/IndexedDBRequest";

export const IDBLocalTestService = {
	GetResult: GetResult,
	InsertData: InsertData,
	UpdateData: UpdateData,
	GetRow: GetRow,
	DeleteData: DeleteData
};


function GetResult() {
	return new Promise(function (resolve, reject) {
		IndexedDBRequest.GetResult(iDB('acresco.test.db'), 'usuario', null, null, 'status', ['id_status'], ['status']).then(function (response) {
			resolve(response);
		}).catch(function (error) {
			reject(error);
		});
	});
}

function InsertData(formulario) {
	var campos = {
		'id_usuario': formulario.id_usuario || '',
		'usuario': formulario.usuario || '',
		'contrasena': formulario.contrasena || '',
		'nombre': formulario.nombre || '',
		'apellido_paterno': formulario.apellido_paterno || '',
		'apellido_materno': formulario.apellido_materno || '',
		'color': formulario.color || '',
		'id_status': formulario.id_status || '',
		'fecha': formulario.fecha || ''
	};
	return new Promise(function (resolve, reject) {
		try {
			for (let key in campos) {
				if (!FieldsJs.Field(campos[key])) {
					throw Object({
						status: 400,
						mensaje: key + ': Campo Requerido.'
					})
				}
			}
			IndexedDBRequest.InsertData(iDB('acresco.test.db'), 'usuario', campos).then(function (response) {
				resolve(response);
			}).catch(function (error) {
				reject(error);
			});
		} catch (error) {
			reject(error);
		}
		
	});
}

function UpdateData(formulario) {
	var campos = {
		'usuario': formulario.usuario || '',
		'contrasena': formulario.contrasena || '',
		'nombre': formulario.nombre || '',
		'apellido_paterno': formulario.apellido_paterno || '',
		'apellido_materno': formulario.apellido_materno || '',
		'color': formulario.color || '',
		'id_status': formulario.id_status || '',
		'fecha': formulario.fecha || ''
	};
	var where = {
		"id": formulario.id,
		"id_usuario": formulario.id_usuario
	};
	return new Promise(function (resolve, reject) {
		try {
			for (let key in campos) {
				if (!FieldsJs.Field(campos[key])) {
					throw Object({
						status: 400,
						mensaje: key + ': Campo Requerido.'
					})
				}
			}
			IndexedDBRequest.UpdateData(iDB('acresco.test.db'), 'usuario', campos, where).then(function (response) {
				resolve(response);
			}).catch(function (error) {
				reject(error);
			});
		} catch (error) {
			reject(error);
		}
	});
}

function GetRow(item) {
	var where = {
		"id": item.id,
		"id_usuario": item.id_usuario
	};
	return new Promise(function (resolve, reject) {
		IndexedDBRequest.GetRow(iDB('acresco.test.db'), 'usuario', null, where).then(function (response) {
			resolve(response);
		}).catch(function (error) {
			reject(error);
		});
	});
}

function DeleteData(item) {
	var where = {
		"id": item.id,
		"id_usuario": item.id_usuario
	};
	return new Promise(function (resolve, reject) {
		IndexedDBRequest.DeleteData(iDB('acresco.test.db'), 'usuario', where).then(function (response) {
			resolve(response);
		}).catch(function (error) {
			reject(error);
		});
	});
}
