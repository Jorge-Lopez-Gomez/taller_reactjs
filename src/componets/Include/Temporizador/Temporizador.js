import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {DateFormat} from "../../../settings/DateFormat/DateFormat";
import {$cError, $cInfo, hideSpinner, ios_date, showSpinner} from "../../../settings/General/General";
import moment from "moment";
import {ReactLocalStorageService} from "../../../settings/ReactLocalStorageService/ReactLocalStorageService";
import {PopupService} from "../../../settings/PoPup/PoPup";
import $State from "../../../settings/$State/$State";
import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";
import {CONFIG} from "../../../settings/Config/Config";

class Temporizador extends Component {
	
	state = {
		temporizador: '...',
		popup: false,
	};
	
	timer;
	timeout;
	
	constructor() {
		super();
		let Usr = ReactLocalStorageService.get('Usr') || {};
		let time = this.start(Usr.token_expire);
		this.state = {
			temporizador: time,
			popup: false,
		};
		this.timeout = setTimeout(() => this.init(), 3000);
	}
	
	componentDidMount() {
		console.log("componentDidMount");
	}
	
	componentWillUnmount() {
		console.log("componentWillUnmount");
		clearInterval(this.timer);
		clearTimeout(this.timeout);
	}
	
	showSnackBars(type, message) {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	init = () => {
		this.timer = setInterval(() => {
			let Usr = ReactLocalStorageService.get('Usr') || {};
			let time = this.start(Usr.token_expire);
			this.startPuPup(Usr.token_expire);
			this.setState({
				temporizador: time
			});
		}, 1000);
	};
	
	startPuPup = (fecha_expire_token) => {
		
		var ACTUAL = this.ConvertTimestamp();
		var FINAL = this.ConvertTimestamp(fecha_expire_token);
		
		let times = this.restarHoras(ACTUAL, FINAL)
		
		let seg = 0;
		
		seg += (times.semanas * 7 * 24 * 60 * 60);
		seg += (times.dias * 24 * 60 * 60);
		seg += (times.horas * 60 * 60);
		seg += (times.minutos * 60);
		seg += (times.segundos);
		
		// console.log(times, seg);
		
		let segundo_confirmar_token_expirado = CONFIG.segundo_confirmar_token_expirado || 30;
		
		let bloquear_popup = false;
		
		if (seg <= segundo_confirmar_token_expirado) {
			
			if (seg <= 0) {
				let Usr = ReactLocalStorageService.get('Usr') || {};
				Usr.menu = null;
				Usr.token = null;
				Usr.token_expire = null;
				ReactLocalStorageService.set('Usr', Usr);
				ReactLocalStorageService.remove('UsrTemp');
				$cError('Redirección al login, expiro el token...');
				clearInterval(this.timer);
				showSpinner('spinner');
				bloquear_popup = true;
				setTimeout(() => {
					hideSpinner('spinner', 1000);
					$State.go(this.props, 'login', {});
				}, 2000);
			}
			
			if (bloquear_popup === false) {
				if (this.state.popup === false) {
					
					let botones = [null, null];
					this.setState({popup: true});
					PopupService.Confirm(botones, 'warning', CONFIG.titulo_alert_confirm, 'Tu inicio de sesión esta por finalizar, realiza un click para expandir el tiempo de sesión.', true, true, (segundo_confirmar_token_expirado * 1000)).then((r) => {
						this.setState({popup: false});
						$cInfo('Ocultar popup...');
						$cInfo(r);
					});
					
				}
			}
			
		}
		
	};
	
	start = (fecha_expire_token) => {
		let time;
		
		var INICIAL = this.ConvertTimestamp();
		var ACTUAL = this.ConvertTimestamp();
		var FINAL = this.ConvertTimestamp(fecha_expire_token);
		
		if (Date.parse(ios_date(ACTUAL)) < Date.parse(ios_date(INICIAL))) {
			time = "Iniciando";
		} else if (Date.parse(ios_date(ACTUAL)) >= Date.parse(ios_date(INICIAL)) && Date.parse(ios_date(ACTUAL)) <= Date.parse(ios_date(FINAL))) {
			time = this.restarHoras(ACTUAL, FINAL).tiempo_restante;
		} else if (Date.parse(ios_date(ACTUAL)) > Date.parse(ios_date(FINAL))) {
			time = "Sesión finalizado";
		} else {
			time = ". . .";
		}
		// console.log(time);
		return time;
	};
	
	ConvertTimestamp = (fecha) => {
		return DateFormat.getFechaPluginFormat(DateFormat.getDateToLocaleDateString(fecha), "MySql") + " " + moment(fecha).format("HH:mm:ss");
	};
	
	restarHoras = (inicio, fin) => {
		var fecha1 = moment(inicio, "YYYY-MM-DD HH:mm:ss");
		var fecha2 = moment(fin, "YYYY-MM-DD HH:mm:ss");
		var difSeg = fecha2.diff(fecha1, 's'); // Diff in seconds
		var segundos = difSeg % 60;
		var difMin = Math.floor(difSeg / 60);
		var minutos = difMin % 60;
		var difHs = Math.floor(difMin / 60);
		var horas = difHs % 24;
		var difDi = Math.floor(difHs / 24);
		var dias = difDi % 7;
		var difSe = Math.floor(difDi / 7);
		var semanas = difSe;
		
		
		// console.log(semanas);
		// console.log(dias);
		// console.log(horas);
		// console.log(minutos);
		// console.log(segundos);
		
		if (isNaN(semanas) || semanas < 0)
			semanas = 0;
		if (isNaN(dias) || dias < 0)
			dias = 0;
		if (isNaN(horas) || horas < 0)
			horas = 0;
		if (isNaN(minutos) || minutos < 0)
			minutos = 0;
		if (isNaN(segundos) || segundos < 0)
			segundos = 0;
		
		var txt_semanas = (semanas > 0 ? semanas + (semanas > 1 ? " semanas " : " semana ") : "");
		var txt_dias = (dias > 0 ? dias + (dias > 1 ? " dias " : " dia ") : "");
		horas = (horas >= 0 && horas < 10) ? "0" + horas : horas;
		minutos = (minutos >= 0 && minutos < 10) ? "0" + minutos : minutos;
		segundos = (segundos >= 0 && segundos < 10) ? "0" + segundos : segundos;
		
		return {
			tiempo_restante: txt_semanas + txt_dias + horas + ":" + minutos + ":" + segundos,
			semanas: Number(semanas),
			dias: Number(dias),
			horas: Number(horas),
			minutos: Number(minutos),
			segundos: Number(segundos),
		};
	};
	
	render() {
		
		return (
			<Fragment>
				<p>{this.state.temporizador}</p>
			</Fragment>
		);
	}
}

Temporizador.propTypes = {
};

export default IntegrationNotistack(Temporizador);
