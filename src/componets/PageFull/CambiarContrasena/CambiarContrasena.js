import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {ArrowBack, SecurityOutlined, SecurityTwoTone} from '@material-ui/icons';

import login_background from '../../../assets/img/fondo-00.jpg';

import {CambiarContrasenaService} from '../../../services/_Full/CambiarContrasenaService/CambiarContrasenaService';
import {Link, Redirect} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";
import LogoPageFull from "../../Include/MiniComponents/LogoPageFull";


class CambiarContrasena extends Component {
	
	state = {
		correo_electronico: '',
		password: '',
		password_confirmation: '',
		toLogIn: false,
	};
	
	constructor() {
		super();
		
		this.state = {
			correo_electronico: localStorage.correo_electronico,
			password: '',
			password_confirmation: '',
			toLogIn: false,
		};
		
		this.cambiarcontrasena = this.cambiarcontrasena.bind(this);
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
	
	cambiarcontrasena() {
		
		try {
			if (!this.state.correo_electronico) {
				throw Object({
					status: 400,
					mensaje: "No se detecto el correo electrónico"
				});
			}
			if (!this.state.password) {
				throw Object({
					status: 400,
					mensaje: "Campo contraseña es requerido"
				});
			}
			if (!this.state.password_confirmation) {
				throw Object({
					status: 400,
					mensaje: "Campo conformación contraseña es requerido"
				});
			}
			if (this.state.password !== this.state.password_confirmation) {
				throw Object({
					status: 400,
					mensaje: "Las contraseñas no coinciden"
				});
			}
			CambiarContrasenaService.CambiarContrasena(this.state).then(response => {
				this.showSnackBars('success', response.mensaje);
				setTimeout(() => {
					this.setState({
						toLogIn: true
					});
				}, 2000);
			}).catch(error => {
				this.showSnackBars('error', error.mensaje);
			});
		} catch (e) {
			this.showSnackBars("error", e.mensaje);
		}
		
	}
	
	render() {
		
		const bg_login = {
			backgroundImage: `url(${login_background})`
		};
		
		console.log('this.state.toLogIn', this.state.toLogIn);
		
		if (this.state.toLogIn === true) {
			return <Redirect to='/login'/>
		}
		
		return (
			<div className='CambiarContrasena bg-img-cover-x-center-y-center' style={bg_login}>
				<div className="row-flex h-100-vh bg-blue-login">
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
										Ingresa la nueva contraseña
									</Typography>
								</div>
								
								<Grid container spacing={1}>
									
									<Grid item className={'text-left'} xs={12} sm={12} md={12} lg={12} xl={12}>
										<Grid container spacing={1} alignItems={"flex-end"}>
											<Grid item className={'w-30-px'}>
												<SecurityOutlined className={'w-100 text-gray'}/>
											</Grid>
											<Grid item className={'w-100-30-px'}>
												<TextField type={'password'} fullWidth name="password"
												           onChange={this.handleChange}
												           label="Contraseña" autoComplete={'off'}/>
											</Grid>
										</Grid>
									</Grid>
									
									<Grid item className={'text-left'} xs={12} sm={12} md={12} lg={12} xl={12}>
										<Grid container spacing={1} alignItems={"flex-end"}>
											<Grid item className={'w-30-px'}>
												<SecurityTwoTone className={'w-100 text-gray'}/>
											</Grid>
											<Grid item className={'w-100-30-px'}>
												<TextField type={'password'} fullWidth name="password_confirmation"
												           onChange={this.handleChange}
												           label="Confirmar contraseña" autoComplete={'off'}/>
											</Grid>
										</Grid>
									</Grid>
								
								</Grid>
								
								<div className="padding-10 padding-30-T">
									<Button variant="contained" color="primary" onClick={this.cambiarcontrasena}
									        className={'btn-default-primary text-transform-none'}>
										Cambiar contraseña
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

CambiarContrasena.propTypes = {
};

export default IntegrationNotistack(CambiarContrasena);
