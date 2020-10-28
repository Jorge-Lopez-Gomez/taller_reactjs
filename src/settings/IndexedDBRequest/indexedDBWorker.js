const ACTIVE_DEBUG_REQUEST = true;

var db;

// *******************************************************************

var FieldsJs = {
	Field: function (campo) {
		return campo && (campo !== undefined && campo !== null && campo !== "" && campo !== "undefined" && campo !== "null");
	},
	Array: function (ObjOrArray) {
		return ObjOrArray && ((typeof ObjOrArray === "object") && (Object.keys(ObjOrArray || {}).length > 0));
	},
	isObject: function (obj) {
		return obj && typeof obj === 'object' && obj.constructor === Object;
	},
	isArray: function (arr) {
		return arr && typeof arr === 'object' && arr.constructor === Array;
	},
	clone: function (ObjOrArray) {
		if (ObjOrArray === null || typeof ObjOrArray !== 'object') {
			return (this.isArray(ObjOrArray) ? [] : {});
		}
		return Object.assign((this.isArray(ObjOrArray) ? [] : {}), ObjOrArray);
	},
};

// *******************************************************************

self.onmessage = function (event) {
	
	var data = event.data;
	var idb_db = FieldsJs.clone(data.idb_db);
	
	db = indexedDB.open(idb_db.namedb, idb_db.versiondb);
	
	var query = '';
	switch (data.type) {
		case 'GetResult':
			query = 'SELECT ' + campos_asterisco(data.tabla, data.campos, data.join_table, data.join_campos) + ' FROM ' + data.tabla + txt_tabla_join(data.join_table, data.join_on, data.tabla) + campos_where(data.where);
			break;
		case 'GetRow':
			query = 'SELECT ' + campos_asterisco(data.tabla, data.campos, data.join_table, data.join_campos) + ' FROM ' + data.tabla + campos_where(data.where);
			break;
		case 'InsertData':
			query = 'INSERT INTO ' + data.tabla + ' (' + campos_indices(data.campos) + ') VALUES (' + campos_values(data.campos) + ')';
			break;
		case 'UpdateData':
			query = 'UPDATE ' + data.tabla + ' SET ' + campos_set(data.campos) + campos_where(data.where);
			break;
		case 'DeleteData':
			query = 'DELETE FROM ' + data.tabla + campos_where(data.where);
			break;
		default:
			query = data.tabla + ':' + 'campos' + JSON.stringify(data.campos, null, 2) + 'where' + JSON.stringify(data.where, null, 2);
	}
	
	if (ACTIVE_DEBUG_REQUEST) {
		$cSuccess('(' + data.type + ') =>' + query);
	}
	
	
	create_tabla_ich_db(idb_db.tables, function (r) {
		
		// self.postMessage(r);
		
		switch (data.type) {
			case 'GetResult':
				GetResult(data.tabla, data.campos, data.where, data.join_table, data.join_on, data.join_campos);
				break;
			case 'GetRow':
				GetRow(data.tabla, data.campos, data.where, data.join_table, data.join_on, data.join_campos);
				break;
			case 'InsertData':
				InsertData(data.tabla, data.campos);
				break;
			case 'UpdateData':
				UpdateData(data.tabla, data.campos, data.where);
				break;
			case 'DeleteData':
				DeleteData(data.tabla, data.where);
				break;
		}
		
	}, function (e) {
		self.postMessage(e);
	});
	
};

// *******************************************************************

function create_tabla_ich_db(idb_db, successs, errors) {
	db.onupgradeneeded = function (e) {
		
		for (var i = 0; i < idb_db.length; i++) {
			idb_db[i].object_table = db.result.createObjectStore(idb_db[i].table.name, idb_db[i].table.optionalParameters);
			for (index in idb_db[i].createIndex) {
				idb_db[i].object_table.createIndex(index, index, idb_db[i].createIndex[index]);
			}
		}
		
	};
	db.onsuccess = function (r) {
		successs({
			status: 200,
			message: "Bien indexedDB iniciada con éxito...",
			// r: r
		});
	};
	db.onerror = function (e) {
		errors({
			status: 400,
			message: "Error al cargar indexedDB...",
			// e: e
		});
	}
}

// *******************************************************************

function GetResult(tabla, campos, where, join_table, join_on, join_campos) {
	
	var tablas = [];
	tablas.push(tabla);
	if (FieldsJs.Field(join_table)) {
		tablas.push(join_table);
	}
	var elements = [];
	var mensaje = '';
	
	var transaction = db.result.transaction(tablas, "readwrite");
	
	
	transaction.objectStore(tabla).openCursor().onsuccess = function (e1) {
		
		var cursorTable = e1.target.result;
		
		if (cursorTable) {
			
			var itemDataTable = cursorTable.value;
			
			var validacion = in_where(itemDataTable, where);
			
			if (validacion) {
				
				if (FieldsJs.Field(join_table)) {
					
					transaction.objectStore(join_table).openCursor().onsuccess = function (e2) {
						
						var cursorJoin = e2.target.result;
						
						if (cursorJoin) {
							
							var itemDataJoin = cursorJoin.value;
							
							var if_on = in_on(itemDataTable, itemDataJoin, join_on);
							
							if (if_on) {
								
								if (FieldsJs.Array(join_campos)) {
									for (let i = 0; i < join_campos.length; i++) {
										itemDataTable[join_campos[i]] = itemDataJoin[join_campos[i]];
									}
								}
								
							}
							
							cursorJoin.continue();
							
						}
						
					};
					
				}
				
				itemDataTable = in_select(itemDataTable, campos);
				
				elements.push(itemDataTable);
				
			}
			
			cursorTable.continue();
		}
	};
	
	transaction.oncomplete = function () {
		if (elements.length > 0) {
			mensaje = 'Datos encontrados.';
		} else {
			mensaje = 'No se encontraron datos.';
		}
		self.postMessage({
			status: 200,
			data: elements,
			message: mensaje
		});
	};
	
}

function GetRow(tabla, campos, where, join_table, join_on, join_campos) {
	
	var tablas = [];
	tablas.push(tabla);
	if (FieldsJs.Field(join_table)) {
		tablas.push(join_table);
	}
	var elements = [];
	var mensaje = '';
	
	var transaction = db.result.transaction(tablas, "readwrite");
	
	
	transaction.objectStore(tabla).openCursor().onsuccess = function (e1) {
		
		var cursorTable = e1.target.result;
		
		if (cursorTable) {
			
			var itemDataTable = cursorTable.value;
			
			var validacion = in_where(itemDataTable, where);
			
			if (validacion) {
				
				if (FieldsJs.Field(join_table)) {
					
					transaction.objectStore(join_table).openCursor().onsuccess = function (e2) {
						
						var cursorJoin = e2.target.result;
						
						if (cursorJoin) {
							
							var itemDataJoin = cursorJoin.value;
							
							var if_on = in_on(itemDataTable, itemDataJoin, join_on);
							
							if (if_on) {
								
								if (FieldsJs.Array(join_campos)) {
									for (let i = 0; i < join_campos.length; i++) {
										itemDataTable[join_campos[i]] = itemDataJoin[join_campos[i]];
									}
								}
								
							}
							
							cursorJoin.continue();
							
						}
						
					};
					
				}
				
				itemDataTable = in_select(itemDataTable, campos);
				
				elements.push(itemDataTable);
				
			}
			
			cursorTable.continue();
		}
	};
	
	
	transaction.oncomplete = function () {
		var info = {};
		var otro = [];
		if (elements.length > 0) {
			mensaje = 'Datos encontrados.';
			info = elements[elements.length - 1];
			if (elements.length > 1) {
				otro = elements.slice(0, elements.length - 1);
			}
		} else {
			mensaje = 'No se encontraron datos.';
		}
		self.postMessage({
			status: 200,
			data: info,
			otro: otro,
			message: mensaje
		});
	};
	
}

function InsertData(tabla, campos) {
	
	var transaction = db.result.transaction([tabla], "readwrite");
	var object = transaction.objectStore(tabla);
	var request = object.put(campos);
	
	request.onerror = function (e) {
		self.postMessage({
			status: 200,
			message: "Error al agregar el registro",
			error: {
				name: request.error.name,
				message: request.error.message
			},
		});
		
	};
	transaction.oncomplete = function (r) {
		self.postMessage({
			status: 200,
			message: "Registro guardado con éxito",
			insertId: request.result
		});
		
	};
	
}

function UpdateData(tabla, campos, where) {
	
	var transaction = db.result.transaction([tabla], "readwrite");
	var object = transaction.objectStore(tabla);
	var elements = [];
	var affected_rows = 0;
	
	object.openCursor().onsuccess = function (event) {
		
		var cursor = event.target.result;
		
		if (cursor) {
			
			var updateData = cursor.value;
			
			var validacion = in_where(updateData, where);
			
			if (validacion) {
				
				updateData = in_set(updateData, campos);
				
				elements.push(updateData);
				
				cursor.update(updateData);
				
				affected_rows++;
			}
			
			cursor.continue();
		}
	};
	
	transaction.oncomplete = function () {
		self.postMessage({
			status: 200,
			data: elements,
			affected_rows: affected_rows,
			message: "Datos encontrados"
		});
	};
	
}

function DeleteData(tabla, where) {
	
	var transaction = db.result.transaction([tabla], "readwrite");
	var object = transaction.objectStore(tabla);
	var elements = [];
	var affected_rows = 0;
	var mensaje = '';
	
	object.openCursor().onsuccess = function (event) {
		
		var cursor = event.target.result;
		
		if (cursor) {
			
			var updateData = cursor.value;
			
			var validacion = in_where(updateData, where);
			
			if (validacion) {
				
				elements.push(updateData);
				
				object.delete(cursor.primaryKey);
				
				affected_rows++;
			}
			
			cursor.continue();
		}
	};
	
	transaction.oncomplete = function () {
		if (elements.length > 0) {
			mensaje = "Registros eliminados con éxito";
		} else {
			mensaje = "No se encontraron datos para eliminar";
		}
		self.postMessage({
			status: 200,
			data: elements,
			affected_rows: affected_rows,
			message: mensaje
		});
	};
	
}

// *******************************************************************

function nStr(value) {
	var val;
	if (typeof value === "string" && value !== "") {
		if (!isNaN(value)) {
			val = Number(value);
		} else {
			val = value;
		}
	} else {
		val = value;
	}
	return val;
}

function in_on(itemDataTable, itemDataJoin, join_on) {
	var validacion = true;
	var aprobado = [];
	for (var i = 0; i < join_on.length; i++) {
		if (nStr(itemDataTable[join_on[i]]) === nStr(itemDataJoin[join_on[i]])) {
			aprobado.push(true);
		} else {
			aprobado.push(false);
		}
	}
	for (var j = 0; j < aprobado.length; j++) {
		if (aprobado[j] === false) {
			validacion = false;
		}
	}
	return validacion;
}

function in_where(item, where) {
	var updateData = item;
	var validacion = true;
	var aprobado = [];
	for (key in where) {
		if (nStr(updateData[key]) === nStr(where[key])) {
			aprobado.push(true);
		} else {
			aprobado.push(false);
		}
	}
	for (var j = 0; j < aprobado.length; j++) {
		if (aprobado[j] === false) {
			validacion = false;
		}
	}
	return validacion;
}

function in_set(item, set_value) {
	for (key in set_value) {
		item[key] = set_value[key];
	}
	return item;
}

function in_select(item, select_value) {
	var select = {};
	if (FieldsJs.Array(select_value)) {
		for (var i = 0; i < select_value.length; i++) {
			select[select_value[i]] = item[select_value[i]] || '';
		}
	} else {
		select = item;
	}
	return select;
}

// *******************************************************************

function campos_asterisco(tabla, campos, join_table, join_campos) {
	var select_campos = '';
	var c = [];
	if (FieldsJs.Array(join_campos)) {
		c = FieldsJs.clone(join_campos);
		for (var i = 0; i < c.length; i++) {
			c[i] = join_table + '.' + c[i];
		}
		select_campos = ', ' + c.join(', ');
	}
	return (FieldsJs.Array(campos) ? campos.join(', ') : tabla + '.*') + select_campos;
}

function campos_set(campos) {
	var w = [];
	if (FieldsJs.Array(campos)) {
		for (x in campos) {
			w.push(x + ' = "' + campos[x] + '"');
		}
	}
	return w.join(', ');
}

function campos_where(where) {
	var t = '';
	var w = [];
	if (FieldsJs.Array(where)) {
		t = ' WHERE ';
		for (x in where) {
			w.push(x + ' = "' + where[x] + '"');
		}
	}
	return t + w.join(' AND ');
}

function txt_tabla_join(join_tablas, join_on, tabla) {
	var j = '';
	if (FieldsJs.Field(join_tablas) && FieldsJs.Field(join_on)) {
		j = ' LEFT JOIN ' + join_tablas + ' ON ' + join_tablas + '.' + join_on + ' = ' + tabla + '.' + join_on;
	}
	return j;
}

function campos_indices(campos) {
	var w = [];
	if (FieldsJs.Array(campos)) {
		for (x in campos) {
			w.push(x);
		}
	}
	return w.join(', ');
}

function campos_values(campos) {
	var w = [];
	if (FieldsJs.Array(campos)) {
		for (x in campos) {
			w.push('"' + campos[x] + '"');
		}
	}
	return w.join(', ');
}

function $cSuccess(string, color, background) {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#098500');
	var _background = (background ? background : '#e4ffed');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
}

// *******************************************************************

// https://dev.opera.com/articles/introduction-to-indexeddb/

