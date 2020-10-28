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
import {EnteroSolo, FieldsJs} from "../../../../settings/General/General";
import {AlternateEmailOutlined, PhoneIphoneOutlined, PhoneOutlined} from "@material-ui/icons";
import {PerfilService} from "../../../../services/_Sis/PerfilService/PerfilService";


class ModalCambiarCorreosTelefonos extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			modal: {
				open: false
			},
			
			celular: '',
			telefono: '',
			correo_electronico: '',
			correo_electronico_personal: '',
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
			
			celular: form.celular || '',
			telefono: form.telefono || '',
			correo_electronico: form.correo_electronico || '',
			correo_electronico_personal: form.correo_electronico_personal || '',
		});
	};
	
	closeModal = () => {
		this.setState({
			modal: {
				open: false
			},
			
			celular: '',
			telefono: '',
			correo_electronico: '',
			correo_electronico_personal: '',
		});
	};
	
	
	actualizar = () => {
		PerfilService.PerfilUsuariosActualizarCorreosTelefonos(this.state).then(response => {
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
							
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
							
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
							
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<Grid container spacing={1} alignItems={"flex-end"}>
									<Grid item className={'w-30-px'}>
										<AlternateEmailOutlined className={'w-100 text-gray'}/>
									</Grid>
									<Grid item className={'w-100-30-px'}>
										<TextField type={'text'} fullWidth name="correo_electronico_personal"
										           onChange={this.handleChange}
										           label="Correo electrónico personal" autoComplete={'off'}
										           value={this.state.correo_electronico_personal}
										/>
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
									Actualizar correos y teléfonos
								</Button>
							</Grid>
						</Grid>
					</DialogActions>
				
				</Dialog>
			
			
			</div>
		);
	}
}


ModalCambiarCorreosTelefonos.propTypes = {
	form: PropTypes.object.isRequired,
	component: PropTypes.element.isRequired,
	refresh: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
};

export default ModalCambiarCorreosTelefonos;
