import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {ArrowBack, EmailOutlined} from '@material-ui/icons';

import login_background from '../../../assets/img/fondo-00.jpg';

import {RecuperarService} from '../../../services/_Full/RecuperarService/RecuperarService';
import {Link, Redirect} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";
import LogoPageFull from "../../Include/MiniComponents/LogoPageFull";


class Recuperar extends Component {
	
	state = {
		correo_electronico: '',
		toVerificacion: false
	};
	
	constructor() {
		super();
		
		this.enviarcodigo = this.enviarcodigo.bind(this);
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
	
	enviarcodigo() {
		
		try {
			if (!this.state.correo_electronico) {
				throw Object({
					status: 400,
					mensaje: "El campo correo electrónico es requerido"
				});
			}
			RecuperarService.Recuperar(this.state).then(response => {
				localStorage.correo_electronico = this.state.correo_electronico;
				this.showSnackBars('success', response.mensaje);
				setTimeout(() => {
					this.setState({
						toVerificacion: true
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
		
		const bg_login = {
			backgroundImage: `url(${login_background})`
		};
		
		console.log('this.state.toVerificacion', this.state.toVerificacion);
		
		if (this.state.toVerificacion === true) {
			return <Redirect to='/verificar'/>
		}
		
		return (
			<div className='Recuperar bg-img-cover-x-center-y-center' style={bg_login}>
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
										Ingresa tu correo electrónico, se te enviara un código de verificación
									</Typography>
								</div>
								
								<div className="margin-20-B">
									<Grid container spacing={1} alignItems={"flex-end"}>
										<Grid item className={'w-30-px'}>
											<EmailOutlined className={'w-100 text-gray'}/>
										</Grid>
										<Grid item className={'w-100-30-px'}>
											<TextField type={'email'} fullWidth name="correo_electronico"
											           onChange={this.handleChange}
											           label="Correo electronico" autoComplete={'off'}/>
										</Grid>
									</Grid>
								</div>
								
								<div className="padding-10">
									<Button variant="contained" color="primary" onClick={this.enviarcodigo}
									        className={'btn-default-primary text-transform-none'}>
										Enviar
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

Recuperar.propTypes = {
};

export default IntegrationNotistack(Recuperar);
