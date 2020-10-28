import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button/index';
import Dialog from '@material-ui/core/Dialog/index';
import DialogActions from '@material-ui/core/DialogActions/index';
import DialogContent from '@material-ui/core/DialogContent/index';
import Slide from "@material-ui/core/Slide/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {PerfilService} from '../../../../services/_Sis/PerfilService/PerfilService';
import {ReactLocalStorageService} from "../../../../settings/ReactLocalStorageService/ReactLocalStorageService";
import DraggableModal from "../../../Include/DraggableModal/DraggableModal";


class ModalCambiarContrasena extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			modal: {
				open: false
			},
			form: {},
			correo_electronico: '',
			password: '',
			password_confirm: '',
			codigo: '',
			vista: 1
		};
	}
	
	openModal = () => {
		let Usr = ReactLocalStorageService.get('Usr') || {};
		const {form} = this.props;
		this.setState({
			modal: {
				open: true
			},
			form: form,
			correo_electronico: Usr.correo_electronico || '',
			password: '',
			password_confirm: '',
			codigo: '',
		});
	};
	
	closeModal = () => {
		this.setState({
			modal: {
				open: false
			},
			form: {},
			correo_electronico: '',
			password: '',
			password_confirm: '',
			codigo: '',
		});
	};
	
	enviar_codigo = () => {
		try {
			if (!this.state.correo_electronico) {
				throw Object({
					status: false,
					mensaje: "Ingresa el correo electrónico"
				});
			}
			PerfilService.PerfilUsuariosSolicitarCambiarContrasena().then((response) => {
				this.setState({
					vista: 2
				});
				this.props.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.props.showSnackBars('error', error.mensaje);
			});
		} catch (e) {
			this.props.showSnackBars('error', e.mensaje);
		}
	};
	
	cambiar_contrasena = () => {
		try {
			if (!this.state.password) {
				throw Object({
					status: false,
					mensaje: "Ingresa la nueva contraseña"
				});
			}
			if (!this.state.password_confirm) {
				throw Object({
					status: false,
					mensaje: "Confirma la contraseña"
				});
			}
			if (!(this.state.password === this.state.password_confirm)) {
				throw Object({
					status: false,
					mensaje: "No coinciden las contraseñas, verifica nuevamente"
				});
			}
			if (!this.state.codigo) {
				throw Object({
					status: false,
					mensaje: "Ingresa el código que se te envío por correo electrónico"
				});
			}
			PerfilService.PerfilUsuariosCambiarContrasena(this.state).then((response) => {
				this.closeModal();
				this.setState({
					vista: 1
				});
				this.props.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.props.showSnackBars('error', error.mensaje);
			});
		} catch (e) {
			this.props.showSnackBars('error', e.mensaje);
		}
	};
	
	render() {
		
		return (
			<div>
				
				<div onClick={() => this.openModal()}>
					{this.props.component}
				</div>
				
				<Dialog open={this.state.modal.open} onClose={() => this.closeModal()} disableEscapeKeyDown
				        disableBackdropClick maxWidth={'sm'} fullWidth={true} scroll={'paper'}
				        transition={<Slide direction="up"/>} aria-labelledby="scroll-dialog-title"
				        PaperComponent={DraggableModal}
				>
					
					{/*<DialogTitle>*/}
					{/*	Cambiar contraseña*/}
					{/*</DialogTitle>*/}
					
					<DialogContent>
						
						<Grid container spacing={1} alignContent={"center"} alignItems={"center"}>
							
							{this.state.vista === 1 ? (
								<Fragment>
									
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}
									      className={'padding-30'}>
										
										<Typography
											component="span"
											variant="body2"
											style={{
												display: 'inline',
											}}
											color="textPrimary"
											className={'px-20'}
										>
											Correo electrónico al para el envío del código de confirmación
										</Typography>
									
									</Grid>
									
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}>
										
										<TextField
											type="text"
											margin="none"
											inputProps={{
												style: {
													width: "300px",
													fontSize: "25px"
												},
												className: "text-center padding-0 margin-0",
												placeholder: "ejemplo@correo.com"
											}}
											onChange={(e) => {
												this.setState({
													correo_electronico: e.target.value
												});
											}}
											value={this.state.correo_electronico}
											disabled
										/>
									
									</Grid>
								
								</Fragment>
							) : (
								<Fragment>
									
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}
									      className={'padding-30'}>
										
										<Typography
											component="span"
											variant="body2"
											style={{
												display: 'inline',
											}}
											color="textPrimary"
											className={'px-25'}
										>
											Configurar una nueva contraseña
										</Typography>
									
									</Grid>
									
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}>
										
										<Typography
											component="span"
											variant="body2"
											style={{
												display: 'inline',
											}}
											color="textPrimary"
											className={'px-12'}
										>
											Contraseña
										</Typography>
									
									</Grid>
									
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}>
										
										<TextField
											type="password"
											margin="none"
											inputProps={{
												style: {
													width: "300px",
													fontSize: "25px"
												},
												className: "text-center padding-0 margin-0",
												placeholder: ""
											}}
											onChange={(e) => {
												this.setState({
													password: e.target.value
												});
											}}
											value={this.state.password}
										/>
									
									</Grid>
									
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}>
										
										<Typography
											component="span"
											variant="body2"
											style={{
												display: 'inline',
											}}
											color="textPrimary"
											className={'px-12'}
										>
											Repetir contraseña
										</Typography>
									
									</Grid>
									
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}>
										
										<TextField
											type="password"
											margin="none"
											inputProps={{
												style: {
													width: "300px",
													fontSize: "25px"
												},
												className: "text-center padding-0 margin-0",
												placeholder: ""
											}}
											onChange={(e) => {
												this.setState({
													password_confirm: e.target.value
												});
											}}
											value={this.state.password_confirm}
										/>
									
									</Grid>
									
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}>
										
										<Typography
											component="span"
											variant="body2"
											style={{
												display: 'inline',
											}}
											color="textPrimary"
											className={'px-12'}
										>
											Código de confirmación
										</Typography>
									
									</Grid>
									
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}>
										
										<TextField
											type="text"
											margin="none"
											inputProps={{
												style: {
													width: "300px",
													fontSize: "25px"
												},
												className: "text-center padding-0 margin-0",
												placeholder: ""
											}}
											onChange={(e) => {
												this.setState({
													codigo: e.target.value
												});
											}}
											value={this.state.codigo}
										/>
									
									</Grid>
								
								</Fragment>
							)}
						
						
						</Grid>
					
					</DialogContent>
					
					<DialogActions>
						<Grid spacing={0} container direction="row" justify="space-between" alignItems="center">
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6} align={'left'}>
								<Button onClick={() => this.closeModal()} color="primary">
									Cerrar
								</Button>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6} align={'right'}>
								{this.state.vista === 1 ? (
									<Button onClick={() => this.enviar_codigo()} color="secondary">
										Enviar código de confirmación
									</Button>
								) : (
									<Button onClick={() => this.cambiar_contrasena()} color="secondary">
										Cambiar contraseña
									</Button>
								)}
							</Grid>
						</Grid>
					</DialogActions>
				
				</Dialog>
			
			
			</div>
		);
	}
}


ModalCambiarContrasena.propTypes = {
	component: PropTypes.element.isRequired,
	refresh: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
};

export default ModalCambiarContrasena;
