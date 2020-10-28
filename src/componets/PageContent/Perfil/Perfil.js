import React, {Component, Fragment} from 'react';

import './Perfil.css';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import IconButton from "@material-ui/core/IconButton";

import {CONFIG} from "../../../settings/Config/Config";
import {CadenaDomicilio, FieldsJs} from "../../../settings/General/General";
import {PerfilService} from '../../../services/_Sis/PerfilService/PerfilService';
import {ReactLocalStorageService} from "../../../settings/ReactLocalStorageService/ReactLocalStorageService";
import {FileBase64} from "../../../settings/FileBase64/FileBase64";

import ModalCambiarContrasena from './Includes/ModalCambiarContrasena';
import ModalCambiarFotoDePerfil from "./Includes/ModalCambiarFotoDePerfil";
import ModalCambiarInformacion from "./Includes/ModalCambiarInformacion";

import {CancelOutlined, EditOutlined, NotificationsOutlined, PhotoCameraOutlined, RefreshOutlined, SaveOutlined, SaveRounded, VpnKeyOutlined} from "@material-ui/icons";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";
import {DateFormat} from "../../../settings/DateFormat/DateFormat";
import ModalCambiarCorreosTelefonos from "./Includes/ModalCambiarCorreosTelefonos";
import ModalCambiarDomicilio from "./Includes/ModalCambiarDomicilio";
import Slider from '@material-ui/core/Slider';
import logo_svg from "../../../assets/img/logo.png";


const marks = [
	{
		value: 1,
		label: '1s',
	},
	{
		value: 2,
		label: '2s',
	},
	{
		value: 3,
		label: '3s',
	},
	{
		value: 4,
		label: '4s',
	},
	{
		value: 5,
		label: '5s',
	},
	{
		value: 6,
		label: '6s',
	},
	{
		value: 7,
		label: '7s',
	},
	{
		value: 8,
		label: '8s',
	},
	{
		value: 9,
		label: '9s',
	},
	{
		value: 10,
		label: '10s',
	},
];

class Perfil extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		
		this.state = {
			id_cat_time_token: '',
			usuario: {},
			usuario_direccion: {},
			domicilio: '',
			
			cat_time_token: [],
			
			base64Tipo: '',
			base64: '',
			portada: '',
			formato: '',
			
			tiempo_toast: 1,
			
			tipo_menu: 1,
			
			player_id: '',
		};
		
		this.refresh();
	}
	
	showSnackBars = (type, message) => {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	handleChange = (e) => {
		const {value, name, checked, type} = e.target;
		this.setState({
			[name]: type === 'checkbox' ? checked : value
		});
	};
	
	PerfilUsuarioDato = () => {
		
		PerfilService.PerfilUsuarioDato().then((response) => {
			
			let data = response.data || {};
			
			let Usr = ReactLocalStorageService.get('Usr') || {};
			
			let usuario = data.usuario || {};
			
			if (FieldsJs.Array(usuario)) {
				Usr.foto = usuario.foto || Usr.foto || CONFIG.foto_default;
				Usr.portada = usuario.portada || Usr.portada || CONFIG.portada_default;
				Usr.nombre = usuario.nombre || Usr.nombre;
				Usr.apellido_paterno = usuario.apellido_paterno || Usr.apellido_paterno;
				Usr.apellido_materno = usuario.apellido_materno || Usr.apellido_materno;
				Usr.celular = usuario.celular || Usr.celular;
				Usr.telefono = usuario.telefono || Usr.telefono;
				Usr.correo_electronico = usuario.correo_electronico || Usr.correo_electronico;
				Usr.fecha_nacimiento = usuario.fecha_nacimiento || Usr.fecha_nacimiento;
				Usr.id_cat_sexo = usuario.id_cat_sexo || Usr.id_cat_sexo;
				Usr.nombre_completo = usuario.nombre_completo || Usr.nombre_completo;
				Usr.player_id = usuario.player_id || Usr.player_id;
				ReactLocalStorageService.set('Usr', Usr);
			}
			
			let tiempo_toast = (data.configuracion || {}).tiempo_toast || 1;
			
			let tipo_menu = (data.configuracion || {}).tipo_menu || 1;
			
			this.setState({
				id_cat_time_token: ((data.cat_auth || {}).user_token_time || {}).id_cat_time_token || '',
				
				usuario: data.usuario,
				usuario_direccion: data.usuario_direccion,
				domicilio: data.domicilio,
				
				cat_time_token: (data.cat_auth || {}).cat_time_token || [],
				
				tiempo_toast: tiempo_toast,
				
				tipo_menu: tipo_menu,
			});
			
			let Cfg = ReactLocalStorageService.get('Cfg') || {};
			
			Cfg.tiempo_toast = tiempo_toast;
			
			Cfg.tipo_menu = tipo_menu;
			
			ReactLocalStorageService.set('Cfg', Cfg);
			
		}).catch((error) => {
			
			this.showSnackBars('error', error.mensaje);
			
		});
	};
	
	PerfilUsuariosCambiarTiempoExpiraToken = (item) => {
		PerfilService.PerfilUsuariosCambiarTiempoExpiraToken(item).then((response) => {
			
			this.showSnackBars('success', response.mensaje);
			
			this.refresh();
			
		}).catch((error) => {
			
			this.showSnackBars('error', error.mensaje);
			
		});
	};
	
	PerfilUsuariosCambiarTiempoToast = (item) => {
		PerfilService.PerfilUsuariosCambiarTiempoToast(item).then((response) => {
			
			this.showSnackBars('success', response.mensaje);
			
			this.refresh();
			
		}).catch((error) => {
			
			this.showSnackBars('error', error.mensaje);
			
		});
	};
	
	PerfilUsuariosCambiarTipoMenu = (item) => {
		PerfilService.PerfilUsuariosCambiarTipoMenu(item).then((response) => {
			
			this.showSnackBars('success', response.mensaje);
			
			this.refresh();
			
		}).catch((error) => {
			
			this.showSnackBars('error', error.mensaje);
			
		});
	};
	
	refresh = () => {
		this.PerfilUsuarioDato();
	};
	
	
	fileSelect = () => {
		document.getElementById('foto_perfil_cambiar_foto_portada').click();
	};
	
	getBase64 = (e) => {
		let formatos = [
			"image/jpeg",
			"image/png"
		];
		FileBase64.Base64(e.target, formatos).then((response) => {
			this.setState({
				base64Tipo: response.base64Tipo,
				base64: response.base64,
				portada: response.archivo,
				formato: response.formato,
			});
		}).catch((error) => {
			this.showSnackBars('error', error.mensaje);
			this.setState({
				base64Tipo: '',
				base64: '',
				portada: '',
				formato: '',
			});
		});
	};
	
	limpiar_foto_de_portada = () => {
		this.setState({
			base64Tipo: '',
			base64: '',
			portada: '',
			formato: '',
		});
		document.getElementById("foto_perfil_cambiar_foto_portada").value = '';
	};
	
	actuaizar_foto_de_portada = () => {
		try {
			if (!this.state.base64) {
				throw Object({
					status: false,
					mensaje: "Selecciona una imagen para tu foto de perfil"
				});
			}
			PerfilService.PerfilUsuariosCambiarPortada(this.state).then((response) => {
				this.showSnackBars('success', response.mensaje);
				this.refresh();
				this.limpiar_foto_de_portada();
			}).catch((error) => {
				this.showSnackBars('error', error.mensaje);
			});
		} catch (e) {
			this.showSnackBars('error', e.mensaje);
		}
	};
	
	PlayerIdGuardar = () => {
		PerfilService.PerfilUsuariosPlayerIdGuardar().then((response) => {
			this.showSnackBars('success', response.mensaje);
			this.refresh();
		}).catch((error) => {
			this.showSnackBars('warning', error.mensaje);
		});
	};
	
	PlayerIdPrueba = () => {
		PerfilService.PerfilUsuariosPlayerIdPrueba().then((response) => {
			this.showSnackBars('success', response.mensaje);
			this.refresh();
		}).catch((error) => {
			this.showSnackBars('warning', error.mensaje);
		});
	};
	
	render() {
		
		let Usr = ReactLocalStorageService.get('Usr') || {};
		
		let portada = '';
		
		if (this.state.usuario.portada) {
			portada = CONFIG.src + this.state.usuario.portada;
		} else {
			portada = Usr.portada ? CONFIG.src + Usr.portada : CONFIG.portada_default;
		}
		
		let foto = '';
		
		if (this.state.usuario.foto) {
			foto = CONFIG.src + this.state.usuario.foto;
		} else {
			foto = Usr.foto ? CONFIG.src + Usr.foto : CONFIG.foto_default;
		}
		
		const bg_portdad = {
			backgroundColor: `black`,
			backgroundImage: `url(${this.state.base64Tipo ? this.state.base64 : portada})`
		};
		
		const bg_foto = {
			backgroundColor: `black`,
			backgroundImage: `url(${foto})`
		};
		
		const bg_logo_svg = {
			backgroundImage: `url(${logo_svg})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundAttachment: 'fixed',
			backgroundSize: '300px auto',
			opacity: '1',
		};
		
		const gradient = 'linear-gradient(to bottom, rgba(214, 214, 214, 0.97) 0%, rgba(232, 232, 232, 0.97) 20px, rgba(249, 249, 249, 0.97) 40px,rgba(255, 255, 255, 0.97) 50px, rgba(255, 255, 255, 0.97) 100%)';
		
		return (
			<div className='Perfil ContaineViewComponet' style={bg_logo_svg}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
						
						
						<Grid container spacing={3}>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<Card style={bg_portdad} className={'bg-img-cover-x-center-y-center'}>
									
									<CardContent className={'h-100-84-px'} style={{
										padding: '15px',
										background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)'
									}}>
										
										<div style={{height: 0, width: '100%'}} align={'right'}>
											<input type="file" id="foto_perfil_cambiar_foto_portada"
											       onChange={(e) => this.getBase64(e)} className={'display-none'}/>
											<Grid
												container
												direction="row"
												justify="flex-end"
												alignItems="center"
											>
												{!this.state.base64Tipo ? (
													<Grid item>
														<IconButton aria-label="Cambiar portada"
														            onClick={() => this.fileSelect()}>
															<PhotoCameraOutlined style={{color: 'white'}}/>
														</IconButton>
													</Grid>
												) : null}
												{!!this.state.base64Tipo ? (
													<Fragment>
														<Grid item>
															<IconButton aria-label="Cancelar portada"
															            onClick={() => this.limpiar_foto_de_portada()}>
																<CancelOutlined style={{color: 'white'}}/>
															</IconButton>
														</Grid>
														<Grid item>
															<IconButton aria-label="Actualizar portada"
															            onClick={() => this.actuaizar_foto_de_portada()}>
																<SaveOutlined style={{color: 'white'}}/>
															</IconButton>
														</Grid>
													</Fragment>
												) : null}
											</Grid>
										</div>
										
										<div className={'w-100 padding-20-B padding-20-T'} align={'center'}>
											<div className={'w-200-px h-200-px b-r-100 card-1'}>
												<div style={bg_foto}
												     className={'w-200-px h-200-px b-r-100 bg-img-contain-x-center-y-center'}/>
											</div>
										</div>
										
										<div align={'center'}>
											
											<Typography variant={'h6'} className={'text-center text-white px-18'}
											            style={{textShadow: 'black 1px 1px 2px, black 0px 0px 1em, black 0px 0px 0.2em'}}>
												{this.state.usuario.nombre_completo || 'Cargando....'}
											</Typography>
											
											<Typography variant={'h6'} className={'text-center text-white px-16'}
											            style={{textShadow: 'black 1px 1px 2px, black 0px 0px 1em, black 0px 0px 0.2em'}}>
												{this.state.usuario.username || 'Cargando....'}
											</Typography>
										
										</div>
									
									</CardContent>
									
									<CardActions style={{background: "rgba(0, 0, 0, 0.35)"}}>
										
										<Grid container spacing={2}>
											<Grid item xs={6} align={'left'}>
												<ModalCambiarContrasena
													component={(
														<Button style={{
															color: "white",
															lineHeight: '24px',
															fontSize: '10px'
														}}>
															<VpnKeyOutlined style={{
																color: 'white',
																marginRight: '10px',
																fontSize: '16px'
															}}/> Cambiar contraseña
														</Button>
													)}
													refresh={this.refresh}
													showSnackBars={this.showSnackBars}
												/>
											</Grid>
											<Grid item xs={6} align={'right'}>
												<ModalCambiarFotoDePerfil
													component={(
														<Button style={{
															color: "white",
															lineHeight: '24px',
															fontSize: '10px'
														}}>
															<PhotoCameraOutlined style={{
																color: 'white',
																marginRight: '10px',
																fontSize: '16px'
															}}/> Cambiar foto de perfil
														</Button>
													)}
													refresh={this.refresh}
													showSnackBars={this.showSnackBars}
												/>
											</Grid>
										</Grid>
									
									</CardActions>
								
								</Card>
							
							</Grid>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<Card style={{background: gradient}}>
									<CardHeader
										style={{height: '30px'}}
										action={
											<ModalCambiarInformacion
												form={this.state.usuario}
												component={(
													<IconButton aria-label="settings">
														<EditOutlined/>
													</IconButton>
												)}
												refresh={this.refresh}
												showSnackBars={this.showSnackBars}
											/>
										}
										title={
											<Fragment>
												<Typography variant={'h2'} className={'text-left text-black px-16'}>
													Información personal
												</Typography>
											</Fragment>
										}
									/>
									<CardContent className={'h-100-84-px'} style={{padding: '0px 15px 15px 15px'}}>
										
										<Typography variant={'h6'} className={'text-left text-black px-14'}>
											Nombre(s): {this.state.usuario.nombre}<br/>
											Apellido paterno: {this.state.usuario.apellido_paterno} <br/>
											Apellido materno: {this.state.usuario.apellido_materno} <br/>
											Sexo: {this.state.usuario.sexo} <br/>
											Fecha de nacimiento: {this.state.usuario.fecha_nacimiento} <br/>
											Edad: {DateFormat.calcularEdad(this.state.usuario.fecha_nacimiento)} años
										</Typography>
									
									</CardContent>
								</Card>
							
							</Grid>
						
						</Grid>
					
					</Grid>
					<Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
						
						<Grid container spacing={3}>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<Card style={{background: gradient}} className={'h-100'}>
									
									<CardHeader
										style={{height: '30px'}}
										action={
											<Fragment/>
										}
										title={
											<Fragment>
												<Typography variant={'h2'} className={'text-left text-black px-16'}>
													Tiempo para expirar el token
												</Typography>
											</Fragment>
										}
									/>
									
									<CardContent className={'h-100-84-px'} style={{padding: '0px 15px 15px 15px'}}>
										
										<RadioGroup
											row
											aria-label="position"
											name="id_cat_time_token"
											value={this.state.id_cat_time_token}
											onChange={(e) => {
												this.handleChange(e);
												this.PerfilUsuariosCambiarTiempoExpiraToken({id_cat_time_token: e.target.value});
											}}>
											
											{this.state.cat_time_token && this.state.cat_time_token.map((value, index) => (
												<FormControlLabel
													key={index}
													labelPlacement="end"
													control={<Radio color="primary"/>}
													value={value.id_cat_time_token}
													label={(value.time_token_click || value.time_token) + " " + value.time_token_label}
												/>
											))}
										
										</RadioGroup>
									
									</CardContent>
								
								</Card>
							
							</Grid>
							
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<Card style={{background: gradient}} className={'h-100'}>
											
											<CardHeader
												style={{height: '30px'}}
												action={
													<ModalCambiarDomicilio
														form={this.state.usuario_direccion}
														component={(
															<IconButton aria-label="settings">
																<EditOutlined/>
															</IconButton>
														)}
														refresh={this.refresh}
														showSnackBars={this.showSnackBars}
													/>
												}
												title={
													<Fragment>
														<Typography variant={'h2'} className={'text-left text-black px-16'}>
															Domicilio
														</Typography>
													</Fragment>
												}
											/>
											
											<CardContent className={'h-100-84-px'} style={{padding: '0px 15px 15px 15px'}}>
												
												<Typography variant={'h6'} className={'text-left text-black px-14'}>
													{CadenaDomicilio(this.state.usuario_direccion || {})}
												</Typography>
											
											</CardContent>
										
										</Card>
									</Grid>
									
								</Grid>
							</Grid>
							
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								
								<Card style={{background: gradient}} className={'h-100'}>
									
									<CardHeader
										style={{height: '30px'}}
										action={
											<ModalCambiarCorreosTelefonos
												form={this.state.usuario}
												component={(
													<IconButton aria-label="settings">
														<EditOutlined/>
													</IconButton>
												)}
												refresh={this.refresh}
												showSnackBars={this.showSnackBars}
											/>
										}
										title={
											<Fragment>
												<Typography variant={'h2'} className={'text-left text-black px-16'}>
													Correos y teléfonos
												</Typography>
											</Fragment>
										}
									/>
									
									<CardContent className={'h-100-84-px'} style={{padding: '0px 15px 15px 15px'}}>
										
										<Typography variant={'h6'} className={'text-left text-black px-14'}>
											Teléfono: {this.state.usuario.telefono}<br/>
											Celular: {this.state.usuario.celular}<br/>
											Correo electrónico
											personal: {this.state.usuario.correo_electronico_personal || 'No registrado'}<br/>
											Correo electrónico empresa: {this.state.usuario.correo_electronico}
										</Typography>
									
									</CardContent>
								
								</Card>
							
							</Grid>
							
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
								
								<Card style={{background: gradient}} className={'h-100'}>
									
									<CardHeader
										style={{height: '30px'}}
										action={
											<Fragment/>
										}
										title={
											<Fragment>
												<Typography variant={'h2'} className={'text-left text-black px-16'}>
													Tiempo para mostrar las notificaciones
												</Typography>
											</Fragment>
										}
									/>
									
									<CardContent className={'h-100-84-px'} style={{padding: '30px 20px 20px 20px'}}>
										
										<Slider
											defaultValue={this.state.tiempo_toast}
											value={this.state.tiempo_toast}
											getAriaValueText={(value) => {
												return `${value} seg.`;
											}}
											aria-labelledby="discrete-slider-always"
											step={1}
											marks={marks}
											min={1}
											max={10}
											valueLabelDisplay="on"
											onChange={(event, value) => {
												this.setState({tiempo_toast: value});
											}}
											onChangeCommitted={(event, value) => {
												this.PerfilUsuariosCambiarTiempoToast({tiempo_toast: value});
											}}
										/>
									
									</CardContent>
								
								</Card>
							
							</Grid>
							
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								
								<Card style={{background: gradient}} className={'h-100'}>
									
									<CardHeader
										style={{height: '30px'}}
										action={
											<Fragment/>
										}
										title={
											<Fragment>
												<Typography variant={'h2'} className={'text-left text-black px-16'}>
													Tipo de menu
												</Typography>
											</Fragment>
										}
									/>
									
									<CardContent className={'h-100-84-px'} style={{padding: '0px 20px 20px 20px'}}>
										
										<RadioGroup
											row
											aria-label="position"
											name="id_cat_time_token"
											value={this.state.tipo_menu}
											onChange={(e) => {
												this.handleChange(e);
												this.PerfilUsuariosCambiarTipoMenu({tipo_menu: e.target.value});
											}}>
											
											<FormControlLabel
												labelPlacement="end"
												control={<Radio color="primary"/>}
												value={1}
												label={'Diseño 1'}
											/>
											
											
											<FormControlLabel
												labelPlacement="end"
												control={<Radio color="primary"/>}
												value={2}
												label={'Diseño 2'}
											/>
										
										</RadioGroup>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

Perfil.propTypes = {};

export default IntegrationNotistack(Perfil);
