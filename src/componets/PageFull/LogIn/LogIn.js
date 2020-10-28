import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {AccountCircle, Security} from '@material-ui/icons';

import login_background from '../../../assets/img/fondo-00.jpg';
import LogoPageFull from '../../Include/MiniComponents/LogoPageFull';

import {LogInService} from '../../../services/_Full/LogInService/LogInService';
import {Link, Redirect} from "react-router-dom";

import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import {isEnter} from "../../../settings/General/General";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";

class LogIn extends Component {
	
	state = {};
	
	constructor() {
		super();
		
		const Usr = ReactLocalStorageService.get('Usr') || {};
		
		this.state = {
			username: Usr.username || '',
			password: '',
			toHomeDashboard: false
		};
		
		this.login = this.login.bind(this);
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
	
	login() {
		console.log("LOGIN::: ", this.state);
		LogInService.LogIn(this.state).then(response => {
			this.setState({
				toHomeDashboard: true
			});
		}).catch(error => {
			this.showSnackBars('error', error.mensaje);
		});
	}
	
	render() {
		
		const bg_login = {
			backgroundImage: `url(${login_background})`
		};
		
		console.log('this.state.toHomeDashboard', this.state.toHomeDashboard);
		
		if (this.state.toHomeDashboard === true) {
			return <Redirect to='/home'/>
		}
		
		return (
			<div className='LogIn bg-img-cover-x-center-y-center' style={bg_login}>
				<section className="CONTENIDO-FLEX">
					<section className="CONTENIDO-FLEX-CHILD">
						<section
							className="CONTENIDO-FLEX-CARD card-4 bg-white-transparent b-r-5 w-100-20-px max-w-400-px">
							
							<div className="padding-20">
								
								<LogoPageFull/>
								
								<div className="margin-20-B">
									<Grid container spacing={1} alignItems={"flex-end"}>
										<Grid item className={'w-30-px'}>
											<AccountCircle className={'w-100 text-gray'}/>
										</Grid>
										<Grid item className={'w-100-30-px'}>
											<TextField type={'text'} fullWidth name="username"
											           className={'bg-transparent'}
											           onChange={this.handleChange}
											           label="Correo o Usuario" autoComplete={'off'}
											           value={this.state.username}
											           onKeyPress={(e) => {
												           if (isEnter(e)) {
													           this.login();
												           }
											           }}
											/>
										</Grid>
									</Grid>
								</div>
								
								<div className="margin-10-B">
									<Grid container spacing={1} alignItems={"flex-end"}>
										<Grid item className={'w-30-px'}>
											<Security className={'w-100 text-gray'}/>
										</Grid>
										<Grid item className={'w-100-30-px'}>
											<TextField type={'password'} fullWidth name="password"
											           className={'bg-transparent'}
											           onChange={this.handleChange} label="Contraseña"
											           autoComplete={'off'}
											           value={this.state.password}
											           onKeyPress={(e) => {
												           if (isEnter(e)) {
													           this.login();
												           }
											           }}
											/>
										</Grid>
									</Grid>
								</div>
								
								<div className="padding-30">
									<Button variant="contained" color="primary" onClick={this.login}
									        className={'btn-default-primary text-transform-none'}>
										Iniciar sesión
									</Button>
								</div>
								
								{/*<div className={'w-100 margin-10-T margin-10-B'}>
									<Link to={'/recuperar'} className={'cursor-pointer'} style={{color: 'black'}}>
										¿Olvidaste tu contraseña?
									</Link>
								</div>
								
								<div className={'w-100 margin-10-T margin-10-B'}>
									<Link to={'/registro'} className={'cursor-pointer'} style={{color: 'black'}}>Completar registro</Link>
								</div>*/}
							
							</div>
						
						</section>
					</section>
				</section>
			</div>
		);
	}
}

LogIn.propTypes = {};

export default IntegrationNotistack(LogIn);
