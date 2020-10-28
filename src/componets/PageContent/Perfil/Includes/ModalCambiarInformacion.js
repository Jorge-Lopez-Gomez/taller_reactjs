import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button/index';
import Dialog from '@material-ui/core/Dialog/index';
import DialogActions from '@material-ui/core/DialogActions/index';
import DialogContent from '@material-ui/core/DialogContent/index';
import Slide from "@material-ui/core/Slide/index";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DraggableModal from "../../../Include/DraggableModal/DraggableModal";
import {FieldsJs} from "../../../../settings/General/General";
import {
	CalendarTodayOutlined,
	DeviceHubOutlined,
	HdrStrongOutlined,
	HdrWeakOutlined,
	TurnedInNotOutlined
} from "@material-ui/icons";
import {KeyboardDatePicker} from "@material-ui/pickers";
import moment from "moment";
import {CatService} from "../../../../services/_Cat/CatService/CatService";
import {PerfilService} from "../../../../services/_Sis/PerfilService/PerfilService";


class ModalCambiarInformacion extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			modal: {
				open: false
			},
			
			nombre: '',
			apellido_paterno: '',
			apellido_materno: '',
			id_cat_sexo: '',
			fecha_nacimiento: null,
			id_cat_estado_nacimiento: null,
			id_cat_municipio_nacimiento: null,
			
			list_cat_sexo: [],
			list_cat_estado_nacimiento: [],
			list_cat_municipio_nacimiento: [],
		};
	}
	
	handleChange = (e, variable, campo, date, input) => {
		FieldsJs.HandleChange(e, variable, campo, date, input, (r) => this.setState({
			[r.name]: r.value
		}));
	};
	
	changeValue = (arr_name__key, var_name, var_value) => {
		FieldsJs.ChangeValue(arr_name__key, var_name, var_value, (r) => this.setState({
			[r.name]: r.value
		}), this.state);
	};
	
	openModal = () => {
		const {form} = this.props;
		this.setState({
			modal: {
				open: true
			},
			
			nombre: form.nombre || '',
			apellido_paterno: form.apellido_paterno || '',
			apellido_materno: form.apellido_materno || '',
			id_cat_sexo: form.id_cat_sexo || '',
			fecha_nacimiento: moment(form.fecha_nacimiento),
			id_cat_estado_nacimiento: form.id_cat_estado_nacimiento || '',
			id_cat_municipio_nacimiento: form.id_cat_municipio_nacimiento || '',
		});
		this.ListSexo();
		this.ListEstado();
		if (form.id_cat_estado_nacimiento > 0) {
			this.ListMunicipio({target: {value: form.id_cat_estado_nacimiento}});
		}
	};
	
	closeModal = () => {
		this.setState({
			modal: {
				open: false
			},
			
			nombre: '',
			apellido_paterno: '',
			apellido_materno: '',
			id_cat_sexo: '',
			fecha_nacimiento: null,
			id_cat_estado_nacimiento: '',
			id_cat_municipio_nacimiento: '',
		});
	};
	
	
	ListSexo = () => {
		CatService.ListSexo().then((response) => {
			this.setState({
				list_cat_sexo: response.data
			});
		});
	};
	
	ListEstado = () => {
		CatService.ListEstado().then((response) => {
			this.setState({
				list_cat_estado_nacimiento: response.data
			});
		});
	};
	
	ListMunicipio = (e) => {
		
		let id_cat_estado = e.target.value;
		
		CatService.ListMunicipio(id_cat_estado).then((response) => {
			this.setState({
				list_cat_municipio_nacimiento: response.data
			});
		});
	};
	
	actualizar = () => {
		PerfilService.PerfilUsuariosActualizarInformacion(this.state).then(response => {
			this.props.showSnackBars('success', response.mensaje);
			this.props.refresh();
			this.closeModal();
		}).catch(error => {
			this.props.showSnackBars('error', error.mensaje);
		})
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
					
					<DialogContent>
						
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
											<option value={''}>&nbsp;</option>
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
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<Grid container spacing={1} alignItems={"flex-end"}>
									<Grid item className={'w-30-px'}>
										<CalendarTodayOutlined className={'w-100 text-gray'}/>
									</Grid>
									<Grid item className={'w-100-30-px'}>
										<KeyboardDatePicker
											fullWidth
											clearable
											format={'dd/MM/yyyy'}
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
											required
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
												this.ListMunicipio(e);
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
											{this.state.list_cat_estado_nacimiento.map(option => (
												<option key={option.id_cat_estado}
												        value={option.id_cat_estado}>
													{option.estado}
												</option>
											))}
										</TextField>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
						
						</Grid>
					
					</DialogContent>
					
					<DialogActions>
						<Grid container spacing={2}>
							<Grid item xs={6} align={'left'}>
								<Button onClick={() => this.closeModal()} color="primary">
									Cerrar
								</Button>
							</Grid>
							<Grid item xs={6} align={'right'}>
								<Button onClick={() => this.actualizar()} color="secondary">
									Actualizar información
								</Button>
							</Grid>
						</Grid>
					</DialogActions>
				
				</Dialog>
			
			
			</div>
		);
	}
}


ModalCambiarInformacion.propTypes = {
	form: PropTypes.object.isRequired,
	component: PropTypes.element.isRequired,
	refresh: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
};

export default ModalCambiarInformacion;
