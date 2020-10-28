import moment from 'moment';
import {date_parse, FieldsJs, ios_date} from '../General/General';
// import {CONFIG} from '../Config/Config';

export const DateFormat = {
	getTiempoTranscurrido: getTiempoTranscurrido,
	getHora: getHora,
	getFecha: getFecha,
	getFecha2: getFecha2,
	getFechaPlugin: getFechaPlugin,
	getHoraFecha: getHoraFecha,
	getFechaTextEspacio: getFechaTextEspacio,
	getFechaText: getFechaText,
	getFechaNum: getFechaNum,
	get24To12Hr: get24To12Hr,
	get12To24Hr: get12To24Hr,
	anioRestaSuma: anioRestaSuma,
	ConvertTimestamp: ConvertTimestamp,
	FechaActual: FechaActual,
	getFechaPluginFormat: getFechaPluginFormat,
	diaRestaSuma: diaRestaSuma,
	existetexto: existetexto,
	calcularEdad: calcularEdad,
	CalculoHoraResta: CalculoHoraResta,
	CalculoHoras: CalculoHoras,
	RestarHoras: RestarHoras,
	getFecha_Hora: getFecha_Hora,
	HorasTrabajo: HorasTrabajo,
	HorasTotal: HorasTotal,
	HorasTotalArray: HorasTotalArray,
	MostrarHora: MostrarHora,
	SumaSegundos: SumaSegundos,
	SumaMinutos: SumaMinutos,
	SumaHora: SumaHora,
	SumarDias: SumarDias,
	Hora30min: Hora30min,
	ValidarHora: ValidarHora,
	getDateToLocaleDateString: getDateToLocaleDateString,
	FechaHoraFormatText: FechaHoraFormatText,
	FechaHoraFormatString: FechaHoraFormatString,
	FechaFormatText: FechaFormatText,
	FechaFormatString: FechaFormatString,
	getFechaTextDiagonal: getFechaTextDiagonal,
	FormatText: FormatText,
	FormatSql: FormatSql,
};

function FormatText(fecha, all) {
	let f = undefined;
	let a = undefined;
	if (fecha) {
		a = ConvertTimestamp(fecha || '', all ? 'all' : 'fecha', false);
		f = getFechaText(a, '-', all);
	}
	return f;
}

function FormatSql(fecha, all) {
	// let f = undefined;
	let a = undefined;
	if (fecha) {
		// f = getFechaNum(fecha || '');
		// a = ConvertTimestamp(f, 'fecha', 'MySql');
		a = ConvertTimestamp(fecha, all ? 'all' : 'fecha', 'MySql');
	}
	return a;
}

function FechaHoraFormatText(fecha) {
	return getFechaText(fecha) + " " + get24To12Hr(fecha, 2, 2);
}

function FechaHoraFormatString(fecha) {
	return getHoraFecha(fecha) + " " + get24To12Hr(fecha, 2, 2);
}

function FechaFormatText(fecha) {
	return getFechaText(fecha);
}

function FechaFormatString(fecha) {
	return getHoraFecha(fecha);
}

function getTiempoTranscurrido(date_time) {
	moment.locale("es");
	return moment(date_time).fromNow();
}

function HorasTrabajo(h_inicio, h_fin) {
	var num = Number(CalculoHoras(h_inicio, h_fin));
	var res = "1";
	
	if (num > 8) {
		if (num - 8 === 1) {
			res = "(8 hrs, 1 hrs extra)";
		} else {
			res = "(8 hrs, " + Math.ceil(num - 8) + ' hrs extras)';
		}
	} else {
		if (num === 1) {
			res = "(1 hrs)";
		} else {
			res = '(' + Math.ceil(num) + ' hrs)';
		}
	}
	
	return res;
}

function HorasTotal(h_inicio, h_fin) {
	var num = Number(CalculoHoras(h_inicio, h_fin));
	var res = "1";
	
	if (num > 8) {
		if (num - 8 === 1) {
			res = 8 + 1;
		} else {
			res = 8 + (num - 8);
		}
	} else {
		if (num === 1) {
			res = 1;
		} else {
			if (num < 2) {
				res = num;
			} else {
				res = num;
			}
		}
	}
	
	return Number(res);
}

function HorasTotalArray(h_inicio, h_fin) {
	let hora = 0;
	let extra = 0;
	var total = HorasTotal(h_inicio, h_fin);
	
	if (total <= 8) {
		hora = total;
		extra = 0;
	} else {
		hora = 8;
		extra = total - 8;
	}
	
	return {
		hora: hora,
		extra: extra
	};
}

function getHora(hora) {
	var tiempo = hora.split(":");
	return tiempo[0] + ":" + tiempo[1];
}

function getFecha(fecha) {
	var n = fecha.split("-");
	var fecha_nueva = n[2] + "/" + n[1] + "/" + n[0];
	return fecha_nueva;
}

function getFecha2(fecha) {
	if (existetexto(fecha, "-") === true) {
		var temp = fecha.split("-");
		fecha = temp[2] + "/" + temp[1] + "/" + temp[0];
	}
	
	return fecha;
}

function getFecha_Hora(d_t, h_f) {
	if (existetexto(d_t, " ") === true) {
		var tfecha = d_t.split(" ");
		d_t = !h_f ? tfecha[0] : tfecha[1];
		return d_t;
	}
}

function getFechaPlugin(fecha) {
	var n = fecha.split("/");
	n[0] = n[0] < 10 ? "0" + n[0] : n[0];
	n[1] = n[1] < 10 ? "0" + n[1] : n[1];
	n[2] = n[2] < 10 ? "0" + n[2] : n[2];
	var fecha_nueva = n[2] + "-" + n[1] + "-" + n[0];
	return fecha_nueva;
}

function getHoraFecha(fecha) {
	if (fecha !== undefined) {
		if (existetexto(fecha, " ") === true) {
			var tfecha = fecha.split(" ");
			fecha = tfecha[0];
		}
		
		if (existetexto(fecha, "-") === true) {
			var temp = fecha.split("-");
			
			if (Number(temp[0]) > Number(temp[2])) {
				fecha = temp[0] + "/" + temp[1] + "/" + temp[2];
			} else if (Number(temp[0]) < Number(temp[2])) {
				fecha = temp[2] + "/" + temp[1] + "/" + temp[0];
			}
		}
		
		var dias_semana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
		var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		var fecha_actual = new Date(ios_date(fecha));
		return dias_semana[fecha_actual.getDay()] + " " + fecha_actual.getDate() + " de " + meses[fecha_actual.getMonth()] + " del " + fecha_actual.getFullYear();
	}
}

function getFechaTextEspacio(fecha) {
	if (fecha !== undefined) {
		if (existetexto(fecha, " ") === true) {
			var tfecha = fecha.split(" ");
			fecha = tfecha[0];
		}
		
		if (existetexto(fecha, "-") === true) {
			var temp = fecha.split("-");
			
			if (Number(temp[0]) > Number(temp[2])) {
				fecha = temp[0] + "/" + temp[1] + "/" + temp[2];
			} else if (Number(temp[0]) < Number(temp[2])) {
				fecha = temp[2] + "/" + temp[1] + "/" + temp[0];
			}
		}
		
		// var dias_semana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
		var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		var fecha_actual = new Date(ios_date(fecha));
		return fecha_actual.getDate() + " de " + meses[fecha_actual.getMonth()] + " " + fecha_actual.getFullYear();
	}
}

function getFechaText(fecha, sep, all) {
	if (fecha !== undefined) {
		let existe_espacio = false;
		if (existetexto(fecha, " ") === true) {
			var tfecha = fecha.split(" ");
			fecha = tfecha[0];
			existe_espacio = true;
		}
		
		if (existetexto(fecha, "-") === true) {
			var temp = fecha.split("-");
			
			if (Number(temp[0]) > Number(temp[2])) {
				fecha = temp[0] + "/" + temp[1] + "/" + temp[2];
			} else if (Number(temp[0]) < Number(temp[2])) {
				fecha = temp[2] + "/" + temp[1] + "/" + temp[0];
			}
		}
		
		var meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
		var fecha_actual = new Date(ios_date(fecha));
		var dia = Number(fecha_actual.getDate()) < 10 ? "0" + Number(fecha_actual.getDate()).toString() : fecha_actual.getDate().toString();
		
		let get_fecha;
		if (sep === '-' || sep === '/') {
			get_fecha = dia + sep + meses[fecha_actual.getMonth()] + sep + fecha_actual.getFullYear();
		} else {
			get_fecha = dia + "-" + meses[fecha_actual.getMonth()] + "-" + fecha_actual.getFullYear();
		}
		
		if (all) {
			if (existe_espacio) {
				get_fecha = get_fecha + " " + tfecha[1]
			}
		}
		
		return get_fecha
	}
}

function getFechaNum(fecha) {
	if (fecha !== undefined) {
		if (existetexto(fecha, " ") === true) {
			var tfecha = fecha.split(" ");
			fecha = tfecha[0];
		}
		
		if (existetexto(fecha, "-") === true) {
			var temp = fecha.split("-");
			
			if (Number(temp[0]) > Number(temp[2])) {
				fecha = temp[0] + "/" + temp[1] + "/" + temp[2];
			} else if (Number(temp[0]) < Number(temp[2])) {
				fecha = temp[2] + "/" + temp[1] + "/" + temp[0];
			}
		}
		
		var meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
		var fecha_actual = new Date(ios_date(fecha));
		var dia = Number(fecha_actual.getDate()) < 10 ? "0" + Number(fecha_actual.getDate()).toString() : fecha_actual.getDate().toString();
		return dia + "-" + meses[fecha_actual.getMonth()] + "-" + fecha_actual.getFullYear();
	}
}

function get24To12Hr(time, tamanio, formato) {
	if (time === undefined || time === null || time === "") {
		return "Pendiente";
	}
	
	if (tamanio === undefined || tamanio === null || tamanio === "") {
		return "Sin tamaño";
	}
	
	if (existetexto(time, "-") === true && existetexto(time, ":") === true && existetexto(time, " ") === true) {
		var __time = time.split(" ");
		
		if (__time[1] !== undefined || __time[1] !== null || __time[1] !== "") {
			time = __time[1];
		}
	}
	
	var _time = time.split(":");
	
	if (_time[0] === undefined || _time[1] === undefined) {
		return "Formato Incorrecto";
	}
	
	var formatotextam = '';
	var formatotextpm = '';
	
	switch (formato) {
		case 1:
			formatotextam = 'a. m.';
			formatotextpm = 'p. m.';
			break;
		
		case 2:
			formatotextam = 'am';
			formatotextpm = 'pm';
			break;
		
		case 3:
			formatotextam = 'A. M.';
			formatotextpm = 'P.M.';
			break;
		
		default:
			formatotextam = 'AM';
			formatotextpm = 'PM';
			break;
	}
	
	var ampm = "";
	// var segundo;
	var i = 0;
	var hora = "";
	
	if (Number(_time[0]) >= 12) {
		ampm = formatotextpm;
	} else {
		ampm = formatotextam;
	}
	
	if (Number(_time[0]) > 12) {
		_time[0] = Number(_time[0]) - 12;
		_time[0] = _time[0] < 10 ? ("0" + _time[0]).toString() : _time[0].toString();
	}
	
	if (Number(_time[0]) === 0) {
		_time[0] = 12;
	}
	
	for (i = 0; i < tamanio; i++) {
		if (_time[i] !== undefined) {
			hora += (hora === "" ? '' : ':') + _time[i];
		}
	}
	
	return hora + ' ' + ampm;
}

function get12To24Hr(time) {
	time = time.toUpperCase();
	var pmCheck = time.includes("PM");
	// var pm = ['P', 'p', 'PM', 'pM', 'pm', 'Pm'];
	// var am = ['A', 'a', 'AM', 'aM', 'am', 'Am'];
	var AMPM = time.match(/\s?([AaPp][Mm]?)$/);
	
	if (AMPM === null) {
		var h = time.split(":");
		var Hrs = hrsmmss(h[0]) + ":" + hrsmmss(h[1]) + ":" + hrsmmss(h[2] === undefined || h[2] === null || h[2] === "" ? "00" : h[2]);
		return Hrs;
	} else {
		
		var _h;
		var _t;
		
		if (time.includes("PM")) {
			_h = time.replace("PM", '').trim();
			
			_t = _h.split(":");
			
			time = _t[0] + ":" + _t[1] + ":" + (_t[2] === undefined || _t[2] === null || _t[2] === "" ? '00' : _t[2]) + "PM";
		} else if (time.includes("AM")) {
			_h = time.replace("AM", '').trim();
			
			_t = _h.split(":");
			
			time = _t[0] + ":" + _t[1] + ":" + (_t[2] === undefined || _t[2] === null || _t[2] === "" ? '00' : _t[2]) + "AM";
		} else {
			_h = time.trim();
			
			_t = _h.split(":");
			
			time = _t[0] + ":" + _t[1] + ":" + (_t[2] === undefined || _t[2] === null || _t[2] === "" ? '00' : _t[2]);
		}
		
		var hrs = parseInt(time.split(":")[0]);
		var newtime = '';
		
		if (hrs === 12 && pmCheck === false) {
			if (time.includes("AM")) {
				newtime = '00:' + hrsmmss(time.split(":")[1]) + ':' + hrsmmss(time.split(":")[2].replace("AM", ''));
			} else {
				newtime = '00:' + hrsmmss(time.split(":")[1]) + ':' + hrsmmss(time.split(":")[2]);
			}
		} else if (hrs === 12 && pmCheck === true) {
			if (time.includes("PM")) {
				newtime = '12:' + hrsmmss(time.split(":")[1]) + ':' + hrsmmss(time.split(":")[2].replace("PM", ''));
			} else {
				newtime = '12:' + hrsmmss(time.split(":")[1]) + ':' + hrsmmss(time.split(":")[2]);
			}
		} else if (!pmCheck) {
			if (time.includes("AM")) {
				newtime = hrsmmss(hrs) + ':' + hrsmmss(time.split(":")[1]) + ':' + hrsmmss(time.split(":")[2].replace("AM", ''));
			} else {
				newtime = hrsmmss(hrs) + ':' + hrsmmss(time.split(":")[1]) + ':' + hrsmmss(time.split(":")[2]);
			}
		} else if (pmCheck) {
			if (time.includes("PM")) {
				newtime = hrsmmss(hrs + 12) + ':' + hrsmmss(time.split(":")[1]) + ':' + hrsmmss(time.split(":")[2].replace("PM", ''));
			} else {
				newtime = hrsmmss(hrs + 12) + ':' + hrsmmss(time.split(":")[1]) + ':' + hrsmmss(time.split(":")[2]);
			}
		}
	}
	
	return newtime.trim();
}

function hrsmmss(num) {
	if (Number(num) < 10) {
		return "0" + Number(num);
	} else {
		return num;
	}
}

/**
 * @return {string}
 */
function ConvertTimestamp(fecha, tipo, order) {
	var _fecha, _f, _FH, n, __NF, NEWDATE;
	
	if (FieldsJs.Field(tipo) === false) {
		tipo = "all";
	}
	
	if (FieldsJs.Field(order) === false) {
		order = "MySql";
	}
	
	if (FieldsJs.Field(fecha) === true) {
		fecha = fecha.toString();
		
		if (existetexto(fecha, "GMT")) {
			_fecha = moment(fecha);
		} else {
			_FH = [];
			
			if (existetexto(fecha, ":") && existetexto(fecha, " ")) {
				_FH = fecha.split(" ");
			} else {
				_FH[0] = fecha;
				_FH[1] = "00:00:00";
			}
			
			if (existetexto(_FH[0], "/")) {
				n = _FH[0].split("/");
			} else {
				n = _FH[0].split("-");
			}
			
			if (Number(n[0]) > Number(n[2])) {
				__NF = n[0] + "/" + n[1] + "/" + n[2];
			} else {
				__NF = n[2] + "/" + n[1] + "/" + n[0];
			}
			
			NEWDATE = __NF + " " + _FH[1];
			_fecha = moment(NEWDATE);
		}
	} else {
		_fecha = moment();
	}
	
	if (order === "MySql") {
		_f = getFechaPluginFormat(getDateToLocaleDateString(_fecha), "MySql");
	} else {
		_f = getFechaPluginFormat(getDateToLocaleDateString(_fecha), "");
	}
	
	let __fecha = '';
	
	switch (tipo) {
		case "all":
			__fecha = _f + " " + ValidarHora(moment(_fecha).format("HH:mm:ss"));
			break;
		
		case "fecha":
			__fecha = _f;
			break;
		
		case "hora":
			__fecha = ValidarHora(moment(_fecha).format("HH:mm:ss"));
			break;
		default:
	}
	return __fecha;
}

function getDateToLocaleDateString(fecha) {
	if (fecha) {
		return moment(fecha).format('DD/MM/YYYY');
	} else {
		return moment().format('DD/MM/YYYY');
	}
}

// function pad(n) {
// 	return n < 10 ? "0" + n : n;
// }

function ValidarHora(hora) {
	if (!hora) {
		return hora;
	}
	
	var _h = hora.split(":");
	
	if (!_h[2]) {
		_h[2] = "00";
	}
	
	_h[0] = Number(_h[0]) < 10 ? "0" + Number(_h[0]).toString() : _h[0];
	_h[1] = Number(_h[1]) < 10 ? "0" + Number(_h[1]).toString() : _h[1];
	_h[2] = Number(_h[2]) < 10 ? "0" + Number(_h[2]).toString() : _h[2];
	return _h[0] + ":" + _h[1] + ":" + _h[2];
}

function FechaActual() {
	var _fecha = new Date();
	
	return _fecha;
}

/**
 * @ngdoc method
 * @name getFechaText
 * @methodOf Service.Formato_fecha_hora
 * @description
 * Función para obtener la fecha con guiones.
 * @param {Date} fecha Fecha asignada.
 * @returns {String} Fecha con /.
 **/
function getFechaTextDiagonal(fecha, sep) {
	
	if (fecha !== undefined) {
		if (existetexto(fecha, " ") === true) {
			var tfecha = fecha.split(" ");
			fecha = tfecha[0];
		}
		if (existetexto(fecha, "-") === true) {
			var temp = fecha.split("-");
			if (Number(temp[0]) > Number(temp[2])) {
				fecha = temp[0] + "/" + temp[1] + "/" + temp[2];
			} else if (Number(temp[0]) < Number(temp[2])) {
				fecha = temp[2] + "/" + temp[1] + "/" + temp[0];
			}
		}
		var meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
		var fecha_actual = new Date(ios_date(fecha));
		var dia = Number(fecha_actual.getDate()) < 10 ? "0" + (Number(fecha_actual.getDate())).toString() : (fecha_actual.getDate()).toString();
		if (sep === '-' || sep === '/') {
			var texto = meses[fecha_actual.getMonth()].toLocaleLowerCase();
			var nuevo_valor = texto.charAt(0).toUpperCase() + texto.slice(1);
			return dia + sep + meses[fecha_actual.getMonth()] + sep + fecha_actual.getFullYear();
		} else {
			var texto = meses[fecha_actual.getMonth()].toLocaleLowerCase();
			var nuevo_valor = texto.charAt(0).toUpperCase() + texto.slice(1);
			return dia + "/" + nuevo_valor + "/" + fecha_actual.getFullYear();
		}
	}
}

function getFechaPluginFormat(fecha, order) {
	if (existetexto(fecha, "/")) {
		var n = fecha.split("/");
	} else {
		var n = fecha.split("-");
	}
	
	n[0] = Number(n[0]) < 10 ? "0" + Number(n[0]) : Number(n[0]);
	n[1] = Number(n[1]) < 10 ? "0" + Number(n[1]) : Number(n[1]);
	n[2] = Number(n[2]) < 10 ? "0" + Number(n[2]) : Number(n[2]);
	
	if (order === "MySql") {
		if (Number(n[0]) > Number(n[2])) {
			var fecha_nueva = n[0] + "-" + n[1] + "-" + n[2];
		} else {
			var fecha_nueva = n[2] + "-" + n[1] + "-" + n[0];
		}
	} else {
		if (Number(n[0]) > Number(n[2])) {
			var fecha_nueva = n[2] + "-" + n[1] + "-" + n[0];
		} else {
			var fecha_nueva = n[0] + "-" + n[1] + "-" + n[2];
		}
	}
	
	return fecha_nueva;
}

function existetexto(cadena, texto) {
	if (cadena.indexOf(texto) > -1) {
		return true;
	} else {
		return false;
	}
}

function calcularEdad(fecha) {
	var nacimiento = moment(ios_date(fecha));
	var hoy = moment();
	var anios = hoy.diff(nacimiento, "years");
	return anios;
}

function CalculoHoraResta(inicio, fin) {
	var _HIN, __HIN;
	
	var _HFI, __HFI;
	
	if (FieldsJs.Field(inicio) === true) {
		if (existetexto(inicio, ":") === true) {
			_HIN = inicio.split(":");
			
			switch (_HIN.length) {
				case 1:
					__HIN = inicio + ":00:00";
					break;
				
				case 2:
					__HIN = inicio + ":00";
					break;
				
				case 3:
					__HIN = inicio;
					break;
			}
		} else {
			return;
		}
	} else {
		return;
	}
	
	if (FieldsJs.Field(fin) === true) {
		if (existetexto(fin, ":") === true) {
			_HFI = fin.split(":");
			
			switch (_HFI.length) {
				case 1:
					__HFI = fin + ":00:00";
					break;
				
				case 2:
					__HFI = fin + ":00";
					break;
				
				case 3:
					__HFI = fin;
					break;
			}
		} else {
			return;
		}
	} else {
		return;
	}
	
	var __F = ConvertTimestamp("", "fecha", "");
	
	var _FI = __F + " " + __HIN;
	
	if (_HIN[0] > _HFI[0]) {
		var _FF = SumarDias(__F + " " + __HFI, 1);
	} else {
		var _FF = __F + " " + __HFI;
	}
	
	var _resta = RestarHoras(_FI, _FF);
	
	return _resta;
}

function CalcularMismoDia(hora_inicio, hora_fin) {
	var _FNOW = ConvertTimestamp("", "fecha", "MySql");
	
	var _FHHI = _FNOW + " " + ValidarHora(hora_inicio);
	
	var _FHHF = _FNOW + " " + ValidarHora(hora_fin);
	
	if (ParseDate(_FHHI, 1) <= ParseDate(_FHHF, 1)) {
		return "si";
	} else if (ParseDate(_FHHI, 1) > ParseDate(_FHHF, 1)) {
		return "no";
	}
}

function ParseDate(fecha, i) {
	if (i === 1) {
		var datetoparse = fecha;
	} else {
		var datetoparse = ConvertTimestamp(fecha, "all", "MySql");
	}
	
	return date_parse(datetoparse);
}

function CalculoHoras(inicio, fin) {
	if (FieldsJs.Field(inicio) === false) {
		return "Esperando hora inicio";
	}
	
	if (FieldsJs.Field(fin) === false) {
		return "Esperando hora fin";
	}
	
	var H = CalculoHoraResta(inicio, fin);
	
	if (FieldsJs.Field(H) === true) {
		var _HE = H.split(":");
		
		var T = Number(_HE[1]) === 0 ? Number(_HE[0]) : Number(_HE[0]) + _HE[1] / 60;
		return T;
	} else {
		return "Calculo invalido";
	}
}

function RestarHoras(inicio, fin) {
	var fecha1 = moment(inicio, "YYYY-MM-DD HH:mm:ss");
	var fecha2 = moment(fin, "YYYY-MM-DD HH:mm:ss");
	var difSeg = fecha2.diff(fecha1, 's');
	var segundos = difSeg % 60;
	var difMin = Math.floor(difSeg / 60);
	var minutos = difMin % 60;
	var difHs = Math.floor(difMin / 60);
	var horas = difHs % 24;
	var difDi = Math.floor(difHs / 24);
	var dias = difDi % 7;
	var difSe = Math.floor(difDi / 7);
	var semanas = difSe % 4;
	var difmes = Math.floor(difSe / 4);
	var mes = difmes % 12;
	var anio = Math.floor(difmes / 12);
	var txt_anios = anio > 0 ? anio + (anio > 1 ? " años " : " año ") : "";
	var txt_meses = mes > 0 ? mes + (mes > 1 ? " meses " : " mes ") : "";
	var txt_semanas = semanas > 0 ? semanas + (semanas > 1 ? " semanas " : " semana ") : "";
	var txt_dias = dias > 0 ? dias + (dias > 1 ? " dias " : " dia ") : "";
	horas = horas >= 10 ? horas : "0" + horas;
	minutos = minutos >= 10 ? minutos : "0" + minutos;
	segundos = segundos >= 10 ? segundos : "0" + segundos;
	return txt_anios + txt_meses + txt_semanas + txt_dias + horas + ":" + minutos + ":" + segundos;
}

function SumarDias(fecha, dias) {
	var F = new Date(ios_date(fecha));
	F.setDate(F.getDate() + dias);
	var daysum = new Date(ios_date(F));
	var fechaall = ConvertTimestamp(daysum, "all", "");
	return fechaall;
}

function diaRestaSuma(fecha, dias, tipo) {
	fecha = new Date(ios_date(fecha));
	let day = fecha.getDate();
	let month = fecha.getMonth() + 1;
	let year = fecha.getFullYear();
	let tiempo = fecha.getTime();
	let milisegundos = parseInt(Number(dias) * 24 * 60 * 60 * 1000);
	let total = fecha.setTime(tiempo + milisegundos);
	day = fecha.getDate();
	month = fecha.getMonth() + 1;
	year = fecha.getFullYear();
	year = year < 10 ? "0" + year : year;
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	
	if (tipo === "fecha") {
		var _F = year + "-" + month + "-" + day;
	} else {
		var _F = year + "-" + month + "-" + day + " " + moment(fecha).format("HH:mm:ss");
	}
	
	return _F;
}

function anioRestaSuma(fecha, anio) {
	var _nf = new Date();
	
	var _F = Number(_nf.getFullYear()) + Number(anio) + "-" + (Number(_nf.getMonth()) + 1) + "-" + _nf.getDate() + " 00:00:00";
	
	return _F;
}

function MostrarHora(date) {
	if (FieldsJs.Field(date) === true) {
		var f = new Date(ios_date(date));
	} else {
		var f = new Date();
	}
	
	return f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
}

function SumaSegundos(_fecha, _segundos) {
	if (FieldsJs.Field(_segundos) === false) {
		return;
	}
	
	if (FieldsJs.Field(_fecha) === true) {
		var fecha = new Date(ios_date(_fecha));
	} else {
		var fecha = new Date();
	}
	
	var seconds = fecha.getSeconds() + _segundos;
	
	var minutes = fecha.getMinutes();
	var hour = fecha.getHours();
	fecha.setHours(hour, minutes, seconds);
	return ConvertTimestamp(fecha, "all", "MySql");
}

function SumaMinutos(_fecha, _minutos) {
	if (Number(_minutos) === 0) {
		return _fecha;
	}
	
	if (FieldsJs.Field(_minutos) === false) {
		return;
	}
	
	if (FieldsJs.Field(_fecha) === true) {
		var fecha = new Date(ios_date(_fecha));
	} else {
		var fecha = new Date();
	}
	
	var seconds = fecha.getSeconds();
	
	var minutes = fecha.getMinutes() + _minutos;
	
	var hour = fecha.getHours();
	fecha.setHours(hour, minutes, seconds);
	return ConvertTimestamp(fecha, "all", "MySql");
}

function SumaHora(_fecha, _hora) {
	var fecha;
	if (isNaN(Number(_hora))) {
		_hora = 0;
	}
	
	if (FieldsJs.Field(_fecha) === true) {
		fecha = new Date(ios_date(_fecha));
	} else {
		fecha = new Date();
	}
	
	var seconds = fecha.getSeconds();
	var minutes = fecha.getMinutes();
	
	var hour = fecha.getHours() + _hora;
	
	fecha.setHours(hour, minutes, seconds);
	return ConvertTimestamp(fecha, "all", "MySql");
}

function Hora30min(hora) {
	if (FieldsJs.Field(hora) === false) {
		return;
	}
	
	hora = hora.toString();
	
	var _h = hora.split(":");
	
	if (Number(_h[1]) < 30) {
		_h[0] = Number(_h[0]) < 10 ? "0" + Number(_h[0]).toString() : _h[0];
		return _h[0] + ":30";/**/
	} else if (Number(_h[1]) >= 30) {
		var hrs = Number(_h[0]) + 1;
		hrs = hrs < 10 ? "0" + Number(hrs).toString() : hrs;
		
		if (Number(hrs) >= 24) {
			return "00:00";
		} else {
			return hrs + ":00";
		}
	} else {
		_h[0] = Number(_h[0]) < 10 ? "0" + Number(_h[0]).toString() : _h[0];
		_h[1] = Number(_h[1]) < 10 ? "0" + Number(_h[1]).toString() : _h[1];
		_h[2] = Number(_h[2]) < 10 ? "0" + Number(_h[2]).toString() : _h[2];
		return _h[0] + ":" + _h[1] + ":" + _h[2];
	}
}
