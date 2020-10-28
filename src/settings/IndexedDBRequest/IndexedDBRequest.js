import {IDBClass} from "./indexedDBClass";
import {$cInfo, $cSuccess} from "../../settings/General/General";

const ACTIVE_WORKER_REQUEST = false;
const ACTIVE_DEBUG_REQUEST = true;

export const i_DB = {
	'acresco.test.db': {
		namedb: 'acresco.test.db',
		versiondb: 1,
		tables: [
			{
				table: {
					name: 'usuario',
					optionalParameters: {
						keyPath: 'id',
						autoIncrement: true
					}
				},
				createIndex: {
					'id_usuario': {unique: true},
					'usuario': {unique: false},
					'contrasena': {unique: false},
					'nombre': {unique: false},
					'apellido_paterno': {unique: false},
					'apellido_materno': {unique: false},
					'color': {unique: false},
					'id_status': {unique: false},
					'fecha': {unique: false}
				}
			}, {
				table: {
					name: 'status',
					optionalParameters: {
						keyPath: 'id_status',
						autoIncrement: true
					}
				},
				campos: {
					"status": {unique: true},
					"active": {unique: false}
				}
			}
		]
	},
	'acresco.production.db': {
		namedb: 'acresco.production.db',
		versiondb: 1,
		tables: [
			{
				table: {
					name: 'usuario',
					optionalParameters: {
						keyPath: 'id',
						autoIncrement: true
					}
				},
				createIndex: {
					'id_usuario': {unique: true},
					'username': {unique: false},
					'token': {unique: false},
					'nombre': {unique: false},
					'apellido_paterno': {unique: false},
					'apellido_materno': {unique: false},
					'id_cat_sexo': {unique: false},
					'foto': {unique: false}
				}
			}, {
				table: {
					name: 'ficha_tecnica',
					optionalParameters: {
						keyPath: 'id',
						autoIncrement: true
					}
				},
				createIndex: {
					'id_cliente': {unique: true},
					'id_ficha_tecnica': {unique: false},
					'state': {unique: false}
				}
			}
		]
	}
};

export const iDB = (key) => {
	let db = {};
	for (let index in i_DB) {
		if (index === key) {
			db = i_DB[index];
		}
	}
	return db;
};

export const WebWorkers = {
	Field: function (campo) {
		return campo && (campo !== undefined && campo !== null && campo !== "" && campo !== "undefined" && campo !== "null");
	},
	Array: function (ObjOrArray) {
		return ObjOrArray && ((typeof ObjOrArray === "object") && (Object.keys(ObjOrArray || {}).length > 0));
	},
	List: [],
	GetFilename: function (url) {
		if (url) {
			var m = url.toString().match(/.*\/(.+?)\./);
			if (m && m.length > 1) {
				return m[1];
			} else {
				return url.split('.')[0];
			}
		}
		return "";
	},
	GetNameWorker: function (url) {
		return this.GetFilename(url);
	},
	Exe: function (url, data, successs, errors) {
		if (!this.Array(data)) {
			data = {};
		}
		
		if (!url) {
			errors({
				status: 400,
				mensaje: "Es necesario la url del worker"
			});
		}
		
		if (ACTIVE_WORKER_REQUEST) {
			
			if (!this.Array(this.List)) {
				this.List = [];
			}
			
			var workername = this.GetNameWorker(url);
			
			if (this.Field(workername)) {
				if (typeof Worker !== "undefined") {
					this.List[workername] = typeof this.List[workername] == "undefined" ? new Worker(url) : this.List[workername];
					this.List[workername].postMessage(data);
					
					this.List[workername].onmessage = function (event) {
						successs(event.data);
					};
				} else {
					errors({
						status: 400,
						mensaje: "Your browser does not support Web Workers..."
					});
				}
			} else {
				errors({
					status: 400,
					mensaje: "No se detecto el nombre del archivo"
				});
			}
			
		} else {
			
			if (typeof Worker !== "undefined") {
				IDBClass.init(data).then((r) => successs(r));
			} else {
				errors({
					status: 400,
					mensaje: "Your browser does not support Web Workers..."
				});
			}
			
		}
		
	},
	Unique: function (url, data, successs, settings, errors) {
		if (!this.Array(data)) {
			data = {};
		}
		
		if (!url) {
			errors({
				status: 400,
				mensaje: "Es necesario la url del worker"
			});
		}
		
		if (!this.Array(this.List)) {
			this.List = [];
		}
		
		var workername = this.GetNameWorker(url);
		
		if (this.Field(workername)) {
			if (typeof Worker !== "undefined") {
				if (typeof this.List[workername] == "undefined") {
					this.List[workername] = new Worker(url);
					this.List[workername].postMessage(data);
					
					this.List[workername].onmessage = function (event) {
						successs(event.data);
						
						if (typeof settings == 'function') {
							settings({
								status: 200,
								workername: workername,
								mensaje: 'Web Worker nombre...'
							});
						}
					};
				} else {
					errors({
						status: 400,
						mensaje: "Web Workers ya esta definido..."
					});
				}
			} else {
				errors({
					status: 400,
					mensaje: "Your browser does not support Web Workers..."
				});
			}
		} else {
			errors({
				status: 400,
				mensaje: "No se detecto el nombre del archivo"
			});
		}
	},
	postUnique: function (data, workername, time) {
		data.time = time;
		
		if (!this.Array(data)) {
			data = {};
		}
		
		if (!this.Array(this.List)) {
			this.List = [];
		}
		
		if (typeof Worker !== "undefined") {
			if (typeof this.List[workername] != "undefined") {
				if (this.Field(time)) {
					if (time > 0) {
						setTimeout(function () {
							this.List[workername].postMessage(data);
						}, time);
					} else {
						this.List[workername].postMessage(data);
					}
				} else {
					this.List[workername].postMessage(data);
				}
			}
		}
	},
	Stop: function (url, successs, errors) {
		var workername = this.GetNameWorker(url);
		
		if (this.Field(workername)) {
			if (this.Field(this.List[workername])) {
				this.List[workername].terminate();
				this.List[workername] = undefined;
				successs({
					status: 200,
					mensaje: "Worker detenido..."
				});
			} else {
				errors({
					status: 400,
					mensaje: "No esta definido el worker " + workername
				});
			}
		} else {
			errors({
				status: 400,
				mensaje: "No se detecto el nombre del archivo"
			});
		}
	}
};

export const IndexedDBRequest = {
	$list: function (p, s) {
		for (let key in i_DB) {
			if (p) {
				if (s) {
					$cSuccess("iDB('" + key + "')");
					for (let j = 0; j < i_DB[key].tables.length; j++) {
						$cInfo(i_DB[key].tables[j].table.name);
					}
				} else {
					$cSuccess("iDB('" + key + "')");
				}
			} else {
				if (s) {
					$cSuccess(key);
					for (let j = 0; j < i_DB[key].tables.length; j++) {
						$cInfo(i_DB[key].tables[j].table.name);
					}
				} else {
					$cSuccess(key);
				}
			}
		}
	},
	Field: function (campo) {
		return campo && (campo !== undefined && campo !== null && campo !== "" && campo !== "undefined" && campo !== "null");
	},
	Array: function (ObjOrArray) {
		return ObjOrArray && ((typeof ObjOrArray === "object") && (Object.keys(ObjOrArray || {}).length > 0));
	},
	GetResult: function (idb_db, table, campos, where, join_table, join_on, join_campos) {
		var data = {
			idb_db: idb_db,
			type: 'GetResult',
			tabla: table,
			campos: campos || [],
			join_table: join_table || '',
			join_on: this.Array(join_on) ? join_on : [],
			join_campos: this.Array(join_campos) ? join_campos : [],
			where: where || {}
		};
		return new Promise(function (resolve, reject) {
			WebWorkers.Exe("indexedDBWorker.js", data, function (r) {
				if (ACTIVE_DEBUG_REQUEST) {
					$cInfo("GetResult" + JSON.stringify(r, null, 2));
				}
				if (typeof resolve === "function") {
					resolve(r);
				}
			}, function (e) {
				if (ACTIVE_DEBUG_REQUEST) {
					window.console.error("GetResult", e);
				}
				if (typeof reject === "function") {
					reject(e);
				}
			});
		});
	},
	InsertData: function (idb_db, table, campos) {
		var data = {
			idb_db: idb_db,
			type: 'InsertData',
			tabla: table,
			campos: campos || {}
		};
		return new Promise(function (resolve, reject) {
			WebWorkers.Exe("indexedDBWorker.js", data, function (r) {
				if (ACTIVE_DEBUG_REQUEST) {
					$cInfo("InsertData" + JSON.stringify(r, null, 2));
				}
				if (typeof resolve === "function") {
					resolve(r);
				}
			}, function (e) {
				if (ACTIVE_DEBUG_REQUEST) {
					window.console.error("InsertData", e);
				}
				if (typeof reject === "function") {
					reject(e);
				}
			});
		});
	},
	UpdateData: function (idb_db, table, campos, where) {
		var data = {
			idb_db: idb_db,
			type: 'UpdateData',
			tabla: table,
			campos: campos || {},
			where: where || {}
		};
		return new Promise(function (resolve, reject) {
			WebWorkers.Exe("indexedDBWorker.js", data, function (r) {
				if (ACTIVE_DEBUG_REQUEST) {
					$cInfo("UpdateData" + JSON.stringify(r, null, 2));
				}
				if (typeof resolve === "function") {
					resolve(r);
				}
			}, function (e) {
				if (ACTIVE_DEBUG_REQUEST) {
					window.console.error("UpdateData", e);
				}
				if (typeof reject === "function") {
					reject(e);
				}
			});
		});
	},
	GetRow: function (idb_db, table, campos, where) {
		var data = {
			idb_db: idb_db,
			type: 'GetRow',
			tabla: table,
			campos: campos || {},
			where: where || {}
		};
		return new Promise(function (resolve, reject) {
			WebWorkers.Exe("indexedDBWorker.js", data, function (r) {
				if (ACTIVE_DEBUG_REQUEST) {
					$cInfo("GetRow" + JSON.stringify(r, null, 2));
				}
				if (typeof resolve === "function") {
					resolve(r);
				}
			}, function (e) {
				if (ACTIVE_DEBUG_REQUEST) {
					window.console.error("GetRow", e);
				}
				if (typeof reject === "function") {
					reject(e);
				}
			});
		});
	},
	GetSingle: function (idb_db, table, campos, where) {
		var data = {
			idb_db: idb_db,
			type: 'GetSingle',
			tabla: table,
			campos: campos || {},
			where: where || {}
		};
		return new Promise(function (resolve, reject) {
			WebWorkers.Exe("indexedDBWorker.js", data, function (r) {
				if (ACTIVE_DEBUG_REQUEST) {
					$cInfo("GetSingle" + JSON.stringify(r, null, 2));
				}
				if (typeof resolve === "function") {
					resolve(r);
				}
			}, function (e) {
				if (ACTIVE_DEBUG_REQUEST) {
					window.console.error("GetSingle", e);
				}
				if (typeof reject === "function") {
					reject(e);
				}
			});
		});
	},
	DeleteData: function (idb_db, table, where) {
		var data = {
			idb_db: idb_db,
			type: 'DeleteData',
			tabla: table,
			where: where || {}
		};
		return new Promise(function (resolve, reject) {
			WebWorkers.Exe("indexedDBWorker.js", data, function (r) {
				if (ACTIVE_DEBUG_REQUEST) {
					$cInfo("DeleteData" + JSON.stringify(r, null, 2));
				}
				if (typeof resolve === "function") {
					resolve(r);
				}
			}, function (e) {
				if (ACTIVE_DEBUG_REQUEST) {
					window.console.error("DeleteData", e);
				}
				if (typeof reject === "function") {
					reject(e);
				}
			});
		});
	}
};
