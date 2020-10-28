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
	GrainOutlined,
	HdrStrongOutlined,
	HdrWeakOutlined,
	ImageAspectRatioOutlined,
	PinDropOutlined,
	StreetviewOutlined
} from "@material-ui/icons";
import {CatService} from "../../../../services/_Cat/CatService/CatService";
import {PerfilService} from "../../../../services/_Sis/PerfilService/PerfilService";


class ModalCambiarDomicilio extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			modal: {
				open: false
			},
			
			calle: '',
			numero_exterior: '',
			numero_interior: '',
			codigo_postal: '',
			colonia: '',
			id_cat_municipio: '',
			id_cat_estado: '',
			
			list_cat_estado: [],
			list_cat_municipio: [],
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
			
			calle: form.calle || '',
			numero_exterior: form.numero_exterior || '',
			numero_interior: form.numero_interior || '',
			codigo_postal: form.codigo_postal || '',
			colonia: form.colonia || '',
			id_cat_municipio: form.id_cat_municipio || '',
			id_cat_estado: form.id_cat_estado || '',
		});
		this.ListEstado();
		if (form.id_cat_estado > 0) {
			this.ListMunicipio({target: {value: form.id_cat_estado}});
		}
	};
	
	closeModal = () => {
		this.setState({
			modal: {
				open: false
			},
			
			calle: '',
			numero_exterior: '',
			numero_interior: '',
			codigo_postal: '',
			colonia: '',
			id_cat_municipio: '',
			id_cat_estado: '',
		});
	};
	
	ListEstado = () => {
		CatService.ListEstado().then((response) => {
			this.setState({
				list_cat_estado: response.data
			});
		});
	};
	
	ListMunicipio = (e) => {
		
		let id_cat_estado = e.target.value;
		
		CatService.ListMunicipio(id_cat_estado).then((response) => {
			this.setState({
				list_cat_municipio: response.data
			});
		});
	};
	
	actualizar = () => {
		PerfilService.PerfilUsuariosActualizarDomicilio(this.state).then(response => {
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
							
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<Grid container spacing={1} alignItems={"flex-end"}>
									<Grid item className={'w-30-px'}>
										<PinDropOutlined className={'w-100 text-gray'}/>
									</Grid>
									<Grid item className={'w-100-30-px'}>
										<TextField type={'text'} fullWidth name="calle"
										           onChange={this.handleChange}
										           label="Calle" autoComplete={'off'}
										           value={this.state.calle}
										           required
										/>
									</Grid>
								</Grid>
							</Grid>
							
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<Grid container spacing={1} alignItems={"flex-end"}>
									<Grid item className={'w-30-px'}>
										<StreetviewOutlined className={'w-100 text-gray'}/>
									</Grid>
									<Grid item className={'w-100-30-px'}>
										<TextField type={'text'} fullWidth name="numero_exterior"
										           onChange={this.handleChange}
										           label="Numero Exterior" autoComplete={'off'}
										           value={this.state.numero_exterior}
										           required
										/>
									</Grid>
								</Grid>
							</Grid>
							
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
							
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<Grid container spacing={1} alignItems={"flex-end"}>
									<Grid item className={'w-30-px'}>
										<ImageAspectRatioOutlined className={'w-100 text-gray'}/>
									</Grid>
									<Grid item className={'w-100-30-px'}>
										<TextField type={'text'} fullWidth name="codigo_postal"
										           onChange={this.handleChange}
										           label="Código Postal" autoComplete={'off'}
										           value={this.state.codigo_postal}
										           required
										/>
									</Grid>
								</Grid>
							</Grid>
							
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<Grid container spacing={1} alignItems={"flex-end"}>
									<Grid item className={'w-30-px'}>
										<GrainOutlined className={'w-100 text-gray'}/>
									</Grid>
									<Grid item className={'w-100-30-px'}>
										<TextField type={'text'} fullWidth name="colonia"
										           onChange={this.handleChange}
										           label="Colonia" autoComplete={'off'}
										           value={this.state.colonia}
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
												this.ListMunicipio(e, 2);
											}}
											SelectProps={{
												native: true,
												MenuProps: {},
											}}
											
											name="id_cat_estado"
											label="Estado"
											value={this.state.id_cat_estado}
											required
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
											
											name="id_cat_municipio"
											label="Municipio"
											value={this.state.id_cat_municipio}
											required
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
									Actualizar domicilio
								</Button>
							</Grid>
						</Grid>
					</DialogActions>
				
				</Dialog>
			
			</div>
		);
	}
}


ModalCambiarDomicilio.propTypes = {
	form: PropTypes.object.isRequired,
	component: PropTypes.element.isRequired,
	refresh: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
};

export default ModalCambiarDomicilio;
