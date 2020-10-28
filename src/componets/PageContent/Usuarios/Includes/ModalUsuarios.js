import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button/index';
import TextField from '@material-ui/core/TextField/index';
import Dialog from '@material-ui/core/Dialog/index';
import DialogActions from '@material-ui/core/DialogActions/index';
import DialogContent from '@material-ui/core/DialogContent/index';
import DialogTitle from '@material-ui/core/DialogTitle/index';
import Zoom from '@material-ui/core/Zoom';
import Add from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import {UsuariosService} from '../../../../services/_Sis/UsuariosService/UsuariosService';
import IconButton from "@material-ui/core/IconButton";
import EditOutlined from '@material-ui/icons/EditOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import Grid from "@material-ui/core/Grid";

import {CatService} from "../../../../services/_Cat/CatService/CatService";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import DraggableModal from "../../../Include/DraggableModal/DraggableModal";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../../settings/IntegrationNotistack/IntegrationNotistack";
import {FieldsJs} from "../../../../settings/General/General";
import {ReactLocalStorageService} from "../../../../settings/ReactLocalStorageService/ReactLocalStorageService";


class ModalUsuarios extends Component {
	
	state = {};
	
	Usr = ReactLocalStorageService.get('Usr') || {};
	
	constructor(props) {
		
		super(props);
		
		this.state = {
			open: false,
			scroll: 'paper',
			list_cat_tipo_usuario: [],
			id_usuario: props.id_usuario || 0,
			tipo: props.tipo,
			isjefe: ''
		};
		
		this.handleChange = this.handleChange.bind(this);
		
		this.listTipoUsuario = this.listTipoUsuario.bind(this);
		
		this.save = this.save.bind(this);
		this.add = this.add.bind(this);
		this.edit = this.edit.bind(this);
		this.view = this.view.bind(this);
		
		this.BOTON_ACCION = this.BOTON_ACCION.bind(this);
		
	}
	
	showSnackBars(type, message) {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	handleChange(e) {
		const {value, name, checked, type} = e.target;
		this.setState({
			[name]: type === 'checkbox' ? checked : value
		});
	}
	
	openModal = () => {
		this.setState({open: true, scroll: 'paper'});
	};
	
	modalClose = () => {
		this.setState({open: false});
	};
	
	listTipoUsuario = () => {
		CatService.ListTipoUsuario().then((response) => {
			this.setState({list_cat_tipo_usuario: response.data});
		})
	};
	
	save = () => {
		if (this.state.id_usuario > 0) {
			UsuariosService.Modificar(this.state).then((response) => {
				this.modalClose();
				this.props.$BroadcastModalUsuarios({
					accion: 'list',
					status: true
				});
				this.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.showSnackBars('error', error.mensaje);
			});
		} else {
			UsuariosService.Agregar(this.state).then((response) => {
				this.modalClose();
				this.props.$BroadcastModalUsuarios({
					accion: 'list',
					status: true
				});
				this.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.showSnackBars('error', error.mensaje);
			});
		}
	};
	
	add = () => {
		
		console.log(this.props);
		
		this.listTipoUsuario();
		
		this.setState({
			id_usuario: '',
			username: '',
			nombre: '',
			apellido_paterno: '',
			apellido_materno: '',
			correo_electronico: '',
			id_cat_tipo_usuario: '',
			activo: true,
			sendmail: true,
		});
		
		this.openModal();
		
	};
	
	edit = () => {
		
		const {id_usuario, item} = this.props;
		
		console.log(this.props);
		
		this.listTipoUsuario();
		
		this.setState({
			id_usuario: id_usuario,
			username: item.username,
			nombre: item.nombre,
			apellido_paterno: item.apellido_paterno,
			apellido_materno: item.apellido_materno,
			correo_electronico: item.correo_electronico,
			id_cat_tipo_usuario: item.id_cat_tipo_usuario || '',
			activo: (item.activo === 1),
			sendmail: (item.sendmail === 1),
		});
		
		this.openModal('paper');
		
	};
	
	view = () => {
		
		const {id_usuario, item} = this.props;
		
		console.log(this.props);
		
		this.listTipoUsuario();
		
		this.setState({
			id_usuario: id_usuario,
			username: item.username,
			nombre: item.nombre,
			apellido_paterno: item.apellido_paterno,
			apellido_materno: item.apellido_materno,
			correo_electronico: item.correo_electronico,
			id_cat_tipo_usuario: item.id_cat_tipo_usuario || '',
			activo: (item.activo === 1),
			sendmail: (item.sendmail === 1),
		});
		
		this.openModal('paper');
		
	};
	
	BOTON_ACCION = () => {
		var BTN_ACTION = '';
		
		if (this.state.id_usuario > 0) {
			if (this.state.tipo === 'edit') {
				BTN_ACTION = (
					<Tooltip TransitionComponent={Zoom} placement={"top"} title="Editar">
						<IconButton aria-label="Editar" onClick={() => this.edit()}>
							<EditOutlined/>
						</IconButton>
					</Tooltip>
				);
			} else if (this.state.tipo === 'view') {
				BTN_ACTION = (
					<Tooltip TransitionComponent={Zoom} placement={"top"} title="Detalles">
						<IconButton aria-label="Detalles" onClick={() => this.view()}>
							<SearchOutlined/>
						</IconButton>
					</Tooltip>
				);
			}
		} else {
			BTN_ACTION = (
				<Zoom className={'btn-fixed-bottom-right cursor-pointer'} key={'inherit'} timeout={1500} in={true}
				      style={{transitionDelay: `${100}ms`}} unmountOnExit>
					<Fab color={'primary'} onClick={() => this.add()}>
						<Add/>
					</Fab>
				</Zoom>
			);
		}
		return BTN_ACTION;
	};
	
	is_root = () => {
		return FieldsJs.inArray([1], this.Usr.id_cat_tipo_usuario);
	};
	
	is_admin = () => {
		return FieldsJs.inArray([2], this.Usr.id_cat_tipo_usuario);
	};
	
	render() {
		
		const classes = {};
		
		const BTN_ACTION = this.BOTON_ACCION();
		
		return (
			<div>
				
				{BTN_ACTION}
				
				<Dialog disableBackdropClick disableEscapeKeyDown maxWidth={'sm'} open={this.state.open}
				        fullWidth={true} scroll={this.state.scroll} onClose={this.modalClose}
				        aria-labelledby="scroll-dialog-title"
				        PaperComponent={DraggableModal}
				>
					
					<DialogTitle>{this.state.tipo === 'edit' ? 'Actualizar' : (this.state.tipo === 'view' ? 'Detalle' : 'Agregar')} Usuario</DialogTitle>
					
					<Divider/>
					
					<DialogContent className={'padding-20'}>
						
						<Grid container spacing={2}>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<TextField
									className={'margin-0'}
									autoFocus
									fullWidth
									onChange={this.handleChange}
									disabled={this.state.tipo === 'view' || this.state.id_usuario > 0}
									type="text"
									margin="dense"
									
									helperText="Especifica el correo electrónico, sera el nombre del usuario con el que se identificara en el sistema"
									name="username"
									label="Usuario"
									defaultValue={this.state.username}
								/>
							
							</Grid>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<TextField
									className={'margin-0'}
									fullWidth
									onChange={this.handleChange}
									disabled={this.state.tipo === 'view'}
									type="text"
									margin="dense"
									
									helperText="Requerido"
									name="nombre"
									label="Nombre(s)"
									defaultValue={this.state.nombre}
								/>
							
							</Grid>
							
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								
								<TextField
									className={'margin-0'}
									fullWidth
									onChange={this.handleChange}
									disabled={this.state.tipo === 'view'}
									type="text"
									margin="dense"
									
									helperText="Requerido"
									name="apellido_paterno"
									label="Apellido Paterno"
									defaultValue={this.state.apellido_paterno}
								/>
							
							</Grid>
							
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								
								<TextField
									className={'margin-0'}
									fullWidth
									onChange={this.handleChange}
									disabled={this.state.tipo === 'view'}
									type="text"
									margin="dense"
									
									helperText="Requerido"
									name="apellido_materno"
									label="Apellido Materno"
									defaultValue={this.state.apellido_materno}
								/>
							
							</Grid>
							
							{this.state.id_usuario > 0 ? (
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									
									<TextField
										className={'margin-0'}
										fullWidth
										onChange={this.handleChange}
										disabled={this.state.tipo === 'view'}
										type="text"
										margin="dense"
										
										helperText="Requerido"
										name="correo_electronico"
										label="Correo electrónico"
										defaultValue={this.state.correo_electronico}
									/>
								
								</Grid>
							) : ''}
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<TextField
									className={'margin-0'}
									select
									fullWidth
									margin="dense"
									onChange={this.handleChange}
									disabled={this.state.tipo === 'view'}
									SelectProps={{
										native: true,
										MenuProps: {
											className: classes.menu,
										},
									}}
									
									helperText="Requerido"
									name="id_cat_tipo_usuario"
									label="Tipo de usuario"
									value={this.state.id_cat_tipo_usuario}
								>
									<option key={0} value={''}>&nbsp;</option>
									{this.state.list_cat_tipo_usuario.map(option => (
										<option key={option.id_cat_tipo_usuario} value={option.id_cat_tipo_usuario}>
											{option.tipo_usuario}
										</option>
									))}
								</TextField>
							
							</Grid>
							
							{this.is_root() || this.is_admin() ? (<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<FormGroup row className={'margin-3-L'}>
									<FormControlLabel
										control={
											<Checkbox type="checkbox" name='isjefe' checked={this.state.isjefe}
											          onChange={this.handleChange} value="sendmail" color="primary"
											          disabled={this.state.tipo === 'view'}/>
										}
										label={'Es jefe de area'}
									/>
								</FormGroup>
							
							</Grid>):null}
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<FormGroup row className={'margin-3-L'}>
									<FormControlLabel
										control={
											<Checkbox type="checkbox" name='sendmail' checked={this.state.sendmail}
											          onChange={this.handleChange} value="sendmail" color="primary"
											          disabled={this.state.tipo === 'view'}/>
										}
										label={'Recibir correos electrónicos'}
									/>
								</FormGroup>
							
							</Grid>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<FormGroup row className={'margin-3-L'}>
									<FormControlLabel
										control={
											<Checkbox type="checkbox" name='activo' checked={this.state.activo}
											          onChange={this.handleChange} value="activo" color="primary"
											          disabled={this.state.tipo === 'view'}/>
										}
										label={'Activo'}
									/>
								</FormGroup>
							
							</Grid>
						
						</Grid>
					
					</DialogContent>
					
					<Divider/>
					
					<DialogActions>
						
						<Button onClick={() => this.modalClose()} color="primary">
							{this.state.tipo === 'view' ? 'Cerrar' : 'Cancelar'}
						</Button>
						
						{this.state.tipo !== 'view' ? (
							<Button onClick={() => this.save()} color="primary">
								{this.state.id_usuario > 0 ? 'Actualizar' : 'Agregar'}
							</Button>
						) : ''}
					
					</DialogActions>
				
				</Dialog>
			
			</div>
		);
	}
}

ModalUsuarios.propTypes = {
	tipo: PropTypes.string.isRequired,
	$BroadcastModalUsuarios: PropTypes.func.isRequired,
};

export default IntegrationNotistack(ModalUsuarios);
