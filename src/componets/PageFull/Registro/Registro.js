import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {ArrowBack, CardMembershipOutlined, EmailOutlined, VpnKeyOutlined} from '@material-ui/icons';

import registroverificar_background from '../../../assets/img/fondo-00.jpg';
import {Link, Redirect} from "react-router-dom";


import {RegistroService} from '../../../services/_Full/RegistroService/RegistroService';
import Typography from "@material-ui/core/Typography";
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";
import LogoPageFull from "../../Include/MiniComponents/LogoPageFull";


class Registro extends Component {
	
	state = {
		username: '',
		password: '',
		codigo: '',
		toDatosPersonalesRegistro: false
	};
	
	constructor() {
		super();
		
		this.state = {
			username: '',
			password: '',
			codigo: '',
			toDatosPersonalesRegistro: false
		};
		
		this.registroverificar = this.registroverificar.bind(this);
		this.handleChange = this.handleChange.bind(this);
	};
	
	showSnackBars(type, message) {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	handleChange(e) {
		const {value, name, checked, type} = e.target;
		this.setState({
			[name]: type === 'checkbox' ? checked : value
		});
	}
	
	registroverificar() {
		
		try {
			if (!this.state.username) {
				throw Object({
					status: 400,
					mensaje: "Campo correo electrónico es requerido"
				});
			}
			if (!this.state.password) {
				throw Object({
					status: 400,
					mensaje: "Campo contraseña es requerido"
				});
			}
			if (!this.state.codigo) {
				throw Object({
					status: 400,
					mensaje: "Campo código de invitación es requerido"
				});
			}
			RegistroService.VerificarRegistro(this.state).then(response => {
				let UsrTemp = {
					codigo: this.state.codigo || '',
					username: this.state.username || '',
					id_usuario: response.data.id_usuario || '',
					id_user: response.data.id_user || '',
					nombre: response.data.nombre || '',
					apellido_paterno: response.data.apellido_paterno || '',
					apellido_materno: response.data.apellido_materno || '',
					fecha_nacimiento: response.data.fecha_nacimiento || '',
					id_cat_sexo: response.data.id_cat_sexo || '',
					celular: response.data.celular || '',
					telefono: response.data.telefono || '',
					correo_electronico: this.state.correo_electronico || '',
					foto: response.data.foto,
					id_cat_estado_nacimiento: response.data.id_cat_estado_nacimiento,
					id_cat_municipio_nacimiento: response.data.id_cat_municipio_nacimiento,
					curp: response.data.curp,
					rfc: response.data.rfc
				};
				ReactLocalStorageService.set('UsrTemp', UsrTemp);
				this.showSnackBars('success', response.mensaje);
				setTimeout(() => {
					this.setState({
						toDatosPersonalesRegistro: true
					});
				}, 2000);
			}).catch(error => {
				this.showSnackBars('error', error.mensaje);
			});
			
		} catch (e) {
			this.showSnackBars('error', e.mensaje);
		}
		
	}
	
	render() {
		
		const bg_registroverificar = {
			backgroundImage: `url(${registroverificar_background})`
		};
		
		if (this.state.toDatosPersonalesRegistro === true) {
			return <Redirect to='/registrodatospersonales'/>
		}
		
		return (
			<div className='Registro bg-img-cover-x-center-y-center' style={bg_registroverificar}>
				<div className="row-flex h-100-vh bg-blue-registroverificar">
					<div className="w-100 v-center" align={'center'}>
						
						<div
							className="bg-white-transparent b-r-5 margin-10-L margin-10-R w-100-20-px max-w-400-px h-auto card-1 b-r-5">
							
							<div className="padding-20">
								
								<div className={'row-flex'}>
									<div className={'w-50-px'}>
										<Link to={'/login'} className={'cursor-pointer'}>
											<ArrowBack className={'px-40'}/>
										</Link>
									</div>
									<div className={'w-100-100-px'}>
										<LogoPageFull/>
									</div>
									<div className={'w-50-px'}>
									</div>
								</div>
								
								<div className={'w-100 margin-20-B'}>
									<Typography variant="h6" gutterBottom>
										Ingresa los datos que se te envío por correo electrónico
									</Typography>
								</div>
								
								<Grid container spacing={1}>
									
									<Grid item className={'text-left'} xs={12} sm={12} md={12} lg={12} xl={12}>
										<Grid container spacing={1} alignItems={"flex-end"}>
											<Grid item className={'w-30-px'}>
												<EmailOutlined className={'w-100 text-gray'}/>
											</Grid>
											<Grid item className={'w-100-30-px'}>
												<TextField type={'text'} fullWidth name="username"
												           onChange={this.handleChange}
												           label="Correo electrónico" autoComplete={'off'}
												           value={this.state.username}
												/>
											</Grid>
										</Grid>
									</Grid>
									
									<Grid item className={'text-left'} xs={12} sm={12} md={12} lg={12} xl={12}>
										<Grid container spacing={1} alignItems={"flex-end"}>
											<Grid item className={'w-30-px'}>
												<VpnKeyOutlined className={'w-100 text-gray'}/>
											</Grid>
											<Grid item className={'w-100-30-px'}>
												<TextField type={'password'} fullWidth name="password"
												           onChange={this.handleChange}
												           label="Contraseña" autoComplete={'off'}
												           value={this.state.password}
												/>
											</Grid>
										</Grid>
									</Grid>
									
									<Grid item className={'text-left'} xs={12} sm={12} md={12} lg={12} xl={12}>
										<Grid container spacing={1} alignItems={"flex-end"}>
											<Grid item className={'w-30-px'}>
												<CardMembershipOutlined className={'w-100 text-gray'}/>
											</Grid>
											<Grid item className={'w-100-30-px'}>
												<TextField type={'text'} fullWidth name="codigo"
												           onChange={this.handleChange}
												           label="Código de invitación" autoComplete={'off'}
												           value={this.state.codigo}
												/>
											</Grid>
										</Grid>
									</Grid>
								
								</Grid>
								
								<div className="padding-10 padding-30-T">
									<Button variant="contained" color="primary" onClick={this.registroverificar}
									        className={'btn-default-primary text-transform-none'}>
										Continuar con el registro
									</Button>
								</div>
							
							</div>
						
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Registro.propTypes = {
};

export default IntegrationNotistack(Registro);
