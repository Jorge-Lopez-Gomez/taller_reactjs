import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import registroverificar_background from '../../../assets/img/fondo-00.jpg';
import logo_svg from '../../../assets/img/logo.png';
import {Link, Redirect} from "react-router-dom";


import {RegistroDatosPersonalesService} from '../../../services/_Full/RegistroDatosPersonalesService/RegistroDatosPersonalesService';
import Typography from "@material-ui/core/Typography";

import {KeyboardDatePicker} from '@material-ui/pickers';
import {CatService} from '../../../services/_Cat/CatService/CatService';

import {CONFIG} from "../../../settings/Config/Config";
import {FileBase64} from "../../../settings/FileBase64/FileBase64";
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import {EnteroSolo} from '../../../settings/General/General';

import image_mas from '../../../assets/img/icons/mas.svg';

import {
	AlternateEmailOutlined,
	ArrowBack,
	CalendarTodayOutlined,
	DeviceHubOutlined,
	GrainOutlined,
	HdrStrongOutlined,
	HdrWeakOutlined,
	HowToVoteOutlined,
	ImageAspectRatioOutlined,
	PhoneIphoneOutlined,
	PhoneOutlined,
	PinDropOutlined,
	StreetviewOutlined,
	TurnedInNotOutlined
} from '@material-ui/icons';
import moment from "moment";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";


class RegistroDatosPersonales extends Component {
	
	state = {
		toLogIn: false
	};
	
	constructor() {
		super();
		
		const UsrTemp = ReactLocalStorageService.get('UsrTemp') || {};
		
		this.state = {
			toLogIn: false,
			id_usuario: UsrTemp.id_usuario || '',
			username: UsrTemp.username || '',
			codigo: UsrTemp.codigo || '',
			
			nombre: UsrTemp.nombre || '',
			apellido_paterno: UsrTemp.apellido_paterno || '',
			apellido_materno: UsrTemp.apellido_materno || '',
			id_cat_sexo: UsrTemp.id_cat_sexo || '',
			celular: UsrTemp.celular || '',
			telefono: UsrTemp.telefono || '',
			correo_electronico: UsrTemp.username || '',
			
			formato: "",
			foto: "",
			
			id_cat_estado_nacimiento: "",
			id_cat_municipio_nacimiento: "",
			fecha_nacimiento: null,
			curp: "",
			rfc: "",
			
			calle: "",
			numero_exterior: "",
			numero_interior: "",
			codigo_postal: "",
			colonia: "",
			id_cat_municipio: "",
			id_cat_estado: "",
			
			
			list_cat_sexo: [],
			list_cat_estado: [],
			list_cat_municipio: [],
			list_cat_municipio_nacimiento: [],
		};
		
		this.registroverificar = this.registroverificar.bind(this);
		this.handleChange = this.handleChange.bind(this);
		
		this.ListSexo = this.ListSexo.bind(this);
		this.ListEstado = this.ListEstado.bind(this);
		this.ListMunicipio = this.ListMunicipio.bind(this);
		
		this.fileSelect = this.fileSelect.bind(this);
		this.getBase64 = this.getBase64.bind(this);
		
		this.ListSexo();
		this.ListEstado();
	};
	
	showSnackBars(type, message) {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	
	handleChange(e, variable, campo, date, input) {
		
		if ((date && input) || input) {
			
			this.setState({
				[input]: date
			});
			
		} else {
			
			const {value, name, checked, type} = e.target;
			
			if (variable && campo) {
				
				let key = Number(name.split('__')[1]);
				
				let arr_temp = this.state[variable];
				
				for (let i = 0; i < arr_temp.length; i++) {
					
					if (key === i) {
						arr_temp[i][campo] = type === 'checkbox' ? checked : value;
					}
				}
				
				this.setState({
					[variable]: arr_temp
				});
				
			} else {
				
				this.setState({
					[name]: type === 'checkbox' ? checked : value
				});
				
			}
			
		}
		
	}
	
	ListSexo() {
		CatService.ListSexo().then((response) => {
			this.setState({
				list_cat_sexo: response.data
			});
		});
	}
	
	ListEstado() {
		CatService.ListEstado().then((response) => {
			this.setState({
				list_cat_estado: response.data
			});
		});
	}
	
	ListMunicipio(e, tipo) {
		
		let id_cat_estado = e.target.value;
		
		let variable = '';
		
		if (tipo === 1) {
			variable = 'list_cat_municipio_nacimiento';
		} else {
			variable = 'list_cat_municipio';
		}
		
		CatService.ListMunicipio(id_cat_estado).then((response) => {
			this.setState({
				[variable]: response.data
			});
		});
	}
	
	fileSelect = () => {
		document.getElementById('foto_perfil').click();
	};
	
	getBase64 = (e) => {
		let formatos = [
			"image/jpeg",
			"image/png"
		];
		FileBase64.Base64(e.target, formatos).then((response) => {
			this.setState({
				base64: response.base64,
				foto: response.archivo,
				formato: response.formato,
			});
		}).catch((error) => {
			this.showSnackBars('error', error.mensaje);
		});
	};
	
	registroverificar() {
		
		try {
			if (!this.state.username) {
				throw Object({
					status: 400,
					mensaje: "Campo correo electrónico es requerido"
				});
			}
			if (!this.state.codigo) {
				throw Object({
					status: 400,
					mensaje: "Campo código de invitación es requerido"
				});
			}
			if (!this.state.nombre) {
				throw Object({
					status: 400,
					mensaje: "Campo nombre es requerido"
				});
			}
			if (!this.state.apellido_paterno) {
				throw Object({
					status: 400,
					mensaje: "Campo apellido paterno es requerido"
				});
			}
			if (!this.state.apellido_materno) {
				throw Object({
					status: 400,
					mensaje: "Campo apellido materno es requerido"
				});
			}
			if (!this.state.id_cat_sexo) {
				throw Object({
					status: 400,
					mensaje: "Campo sexo es requerido"
				});
			}
			if (!this.state.celular) {
				throw Object({
					status: 400,
					mensaje: "Campo celular es requerido"
				});
			}
			if (!this.state.correo_electronico) {
				throw Object({
					status: 400,
					mensaje: "Campo correo electrónico es requerido"
				});
			}
			
			RegistroDatosPersonalesService.RegistroGuardar(this.state).then(response => {
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
			this.showSnackBars('error', e.mensaje);
		}
		
	}
	
	render() {
		
		const bg_registroverificar = {
			backgroundImage: `url(${registroverificar_background})`
		};
		
		const bg_logo = {
			backgroundImage: `url(${logo_svg})`
		};
		
		const bg_foto = {
			backgroundImage: `url(${this.state.base64 || CONFIG.foto_default})`
		};
		
		const bg_mas = {
			backgroundImage: `url(${image_mas})`,
			position: 'relative',
			top: 'calc(100% - 35px)',
			right: '5px',
			float: 'right',
		};
		
		if (this.state.toLogIn === true) {
			return <Redirect to='/login'/>
		}
		
		return (
			<div className='RegistroDatosPersonales bg-img-cover-x-center-y-center' style={bg_registroverificar}>
				
				<section className="CONTENIDO-FLEX">
					<section className="CONTENIDO-FLEX-CHILD">
						<section className="CONTENIDO-FLEX-CARD card-4">
							
							<article className={'padding-20'}>
								
								<div className={'bg-svg-contain-x-right-y-top bg-size-datos-personales'}
								     style={bg_logo}>
									
									<article className={'bg-size-datos-personales-transparent'}>
										
										<div className={'row-flex'}>
											<div className={'w-50-px'}>
												<div className={'w-100'}>
													<Link to={'/login'} className={'cursor-pointer'}>
														<ArrowBack className={'px-40'}/>
													</Link>
												</div>
											</div>
											<div className={'w-100-100-px'}>
												<div className={'w-100 padding-10-B padding-0-T'} align={'center'}>
													<div className={'w-150-px h-150-px card-1 b-r-100 cursor-pointer'}
													     onClick={() => this.fileSelect()}>
														<div
															className={'w-150-px h-150-px b-r-100 bg-img-contain-x-center-y-center'}
															style={bg_foto}>
															<input type="file" id="foto_perfil"
															       onChange={(e) => this.getBase64(e)}
															       className={'display-none'}/>
															<div
																className={'w-35-px h-35-px b-r-100 bg-img-contain-x-center-y-center'}
																style={bg_mas}>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className={'w-50-px'}>
											</div>
										</div>
										
										<Grid container spacing={2}>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<TurnedInNotOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="nombre"
														           onChange={this.handleChange}
														           label="Nombre" autoComplete={'off'}
														           value={this.state.nombre}
														           required
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<TurnedInNotOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="apellido_paterno"
														           onChange={this.handleChange}
														           label="Apellido Paterno" autoComplete={'off'}
														           value={this.state.apellido_paterno}
														           required
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<TurnedInNotOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="apellido_materno"
														           onChange={this.handleChange}
														           label="Apellido Materno" autoComplete={'off'}
														           value={this.state.apellido_materno}
														           required
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<DeviceHubOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField
															select
															fullWidth
															onChange={this.handleChange}
															SelectProps={{
																native: true,
																MenuProps: {},
															}}
															
															name="id_cat_sexo"
															label="Empresa"
															value={this.state.id_cat_sexo}
															required
														>
															<option key={0} value={''}>&nbsp;</option>
															{this.state.list_cat_sexo.map(option => (
																<option key={option.id_cat_sexo}
																        value={option.id_cat_sexo}>
																	{option.sexo}
																</option>
															))}
														</TextField>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<PhoneIphoneOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="celular"
														           onChange={this.handleChange}
														           label="Celular" autoComplete={'off'}
														           value={this.state.celular}
														           inputProps={{maxLength: 10}}
														           onKeyPress={EnteroSolo}
														           required
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<PhoneOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="telefono"
														           onChange={this.handleChange}
														           label="Teléfono" autoComplete={'off'}
														           value={this.state.telefono}
														           inputProps={{maxLength: 10}}
														           onKeyPress={EnteroSolo}
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<AlternateEmailOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="correo_electronico"
														           onChange={this.handleChange}
														           label="Correo electrónico" autoComplete={'off'}
														           value={this.state.correo_electronico}
														           required
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<HdrWeakOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField
															select
															fullWidth
															onChange={(e) => {
																this.handleChange(e);
																this.ListMunicipio(e, 1);
															}}
															SelectProps={{
																native: true,
																MenuProps: {},
															}}
															
															name="id_cat_estado_nacimiento"
															label="Estado de nacimiento"
															value={this.state.id_cat_estado_nacimiento}
														>
															<option key={0} value={''}>&nbsp;</option>
															{this.state.list_cat_estado.map(option => (
																<option key={option.id_cat_estado}
																        value={option.id_cat_estado}>
																	{option.estado}
																</option>
															))}
														</TextField>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<HdrStrongOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField
															select
															fullWidth
															onChange={this.handleChange}
															SelectProps={{
																native: true,
																MenuProps: {},
															}}
															
															name="id_cat_municipio_nacimiento"
															label="Municipio de nacimientos"
															value={this.state.id_cat_municipio_nacimiento}
														>
															<option key={0} value={''}>&nbsp;</option>
															{this.state.list_cat_municipio_nacimiento.map(option => (
																<option key={option.id_cat_municipio}
																        value={option.id_cat_municipio}>
																	{option.municipio}
																</option>
															))}
														</TextField>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<CalendarTodayOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<KeyboardDatePicker format={'dd/MM/yyyy'} fullWidth clearable
														                    inputProps={{readOnly: true}}
														                    KeyboardButtonProps={{
															                    'aria-label': 'change date',
														                    }}
														                    label="Fecha nacimiento"
														                    value={this.state.fecha_nacimiento}
														                    onChange={(date) => {
															                    this.handleChange(null, null, null, date, 'fecha_nacimiento');
														                    }}
														                    clearLabel={'Limpiar'}
														                    okLabel={'Aceptar'}
														                    cancelLabel={'Cancelar'}
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<HowToVoteOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="curp"
														           onChange={this.handleChange}
														           label="CURP" autoComplete={'off'}
														           value={this.state.curp}
														           inputProps={{maxLength: 18}}
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<HowToVoteOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="rfc"
														           onChange={this.handleChange}
														           label="RFC" autoComplete={'off'}
														           value={this.state.rfc}
														           className={'uppercase'}
														           inputProps={{maxLength: 13}}
														/>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
										
										<div className={'w-100 margin-10-T margin-10-B'}>
											<Typography variant="h5" gutterBottom>
												Datos de domicilio
											</Typography>
										</div>
										
										<Grid container spacing={2}>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<PinDropOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="calle"
														           onChange={this.handleChange}
														           label="Calle" autoComplete={'off'}
														           value={this.state.calle}
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<StreetviewOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="numero_exterior"
														           onChange={this.handleChange}
														           label="Numero Exterior" autoComplete={'off'}
														           value={this.state.numero_exterior}
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<StreetviewOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="numero_interior"
														           onChange={this.handleChange}
														           label="Numero Interior" autoComplete={'off'}
														           value={this.state.numero_interior}
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<ImageAspectRatioOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="codigo_postal"
														           onChange={this.handleChange}
														           label="Código Postal" autoComplete={'off'}
														           value={this.state.codigo_postal}
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<GrainOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField type={'text'} fullWidth name="colonia"
														           onChange={this.handleChange}
														           label="Colonia" autoComplete={'off'}
														           value={this.state.colonia}
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<HdrWeakOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField
															select
															fullWidth
															onChange={(e) => {
																this.handleChange(e);
																this.ListMunicipio(e, 2);
															}}
															SelectProps={{
																native: true,
																MenuProps: {},
															}}
															
															name="id_cat_estado"
															label="Estado"
															value={this.state.id_cat_estado}
														>
															<option key={0} value={''}>&nbsp;</option>
															{this.state.list_cat_estado.map(option => (
																<option key={option.id_cat_estado}
																        value={option.id_cat_estado}>
																	{option.estado}
																</option>
															))}
														</TextField>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
												<Grid container spacing={1} alignItems={"flex-end"}>
													<Grid item className={'w-30-px'}>
														<HdrStrongOutlined className={'w-100 text-gray'}/>
													</Grid>
													<Grid item className={'w-100-30-px'}>
														<TextField
															select
															fullWidth
															onChange={this.handleChange}
															SelectProps={{
																native: true,
																MenuProps: {},
															}}
															
															name="id_cat_municipio"
															label="Municipio"
															value={this.state.id_cat_municipio}
														>
															<option key={0} value={''}>&nbsp;</option>
															{this.state.list_cat_municipio.map(option => (
																<option key={option.id_cat_municipio}
																        value={option.id_cat_municipio}>
																	{option.municipio}
																</option>
															))}
														</TextField>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
										
										<div className="padding-10 padding-30-T">
											<Button variant="contained" color="primary"
											        onClick={this.registroverificar}
											        className={'btn-default-primary text-transform-none'}>
												Guardar datos personales
											</Button>
										</div>
									
									</article>
								
								</div>
							
							</article>
						
						</section>
					</section>
				</section>
			
			</div>
		);
	}
}

RegistroDatosPersonales.propTypes = {
};

export default IntegrationNotistack(RegistroDatosPersonales);
