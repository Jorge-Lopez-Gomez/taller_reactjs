import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Typography from "@material-ui/core/Typography/index";
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import EventNote from '@material-ui/icons/EventNote';
import Sync from '@material-ui/icons/Sync';
import ListaTabla from './Includes/ListaTabla';
import ModalTipoUsuario from './Includes/ModalTipoUsuario';

import {TipoUsuarioService} from '../../../../services/_Cat/TipoUsuarioService/TipoUsuarioService';
import {PopupService} from '../../../../settings/PoPup/PoPup';
import {FieldsJs} from "../../../../settings/General/General";
import {ReactLocalStorageService} from '../../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import Zoom from '@material-ui/core/Zoom/index';
import Add from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab/index";
import VistaVacia from "../../../Include/VistaVacia/VistaVacia";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../../settings/IntegrationNotistack/IntegrationNotistack";
import {CONFIG} from "../../../../settings/Config/Config";


class TipoUsuario extends Component {
	
	state = {
		modal: {
			open: false,
			title: '',
			tipo: ''
		},
		id_cat_tipo_usuario: '',
		tipo_usuario: '',
		descripcion: '',
		activo: false,
		listar_cat_tipo_usuario: []
	};
	
	Usr = {};
	
	constructor() {
		super();
		
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		
		this.handleChange = this.handleChange.bind(this);
		this.showSnackBars = this.showSnackBars.bind(this);
		
		this.save = this.save.bind(this);
		this.delete = this.delete.bind(this);
		this.add = this.add.bind(this);
		this.edit = this.edit.bind(this);
		this.view = this.view.bind(this);
		
		this.Listar = this.Listar.bind(this);
		
		this.Listar();
	}
	
	handleChange(e) {
		const {value, name, checked, type} = e.target;
		this.setState({
			[name]: type === 'checkbox' ? checked : value
		});
	}
	
	showSnackBars(type, message) {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	Listar = () => {
		TipoUsuarioService.Listar().then((response) => {
			
			this.setState({listar_cat_tipo_usuario: response.data});
			
		}).catch((error) => {
			
			this.setState({listar_cat_tipo_usuario: []});
			
			this.showSnackBars('error', error.mensaje);
			
		});
	};
	
	delete = (item) => {
		
		let msg = `¿Deseas eliminar el tipo_usuario ${item.tipo_usuario}?`;
		
		PopupService.Confirm(['Cancelar', 'Eliminar'], 'warning', CONFIG.titulo_alert_confirm, msg).then((r) => {
			
			if (r.button === 'Eliminar') {
				TipoUsuarioService.Eliminar(item.id_cat_tipo_usuario).then((response) => {
					
					this.showSnackBars('success', response.mensaje);
					
					this.Listar();
					
				}).catch((error) => {
					
					this.showSnackBars('error', error.mensaje);
					
				});
			}
			
		});
	};
	
	save = () => {
		if (this.state.id_cat_tipo_usuario > 0) {
			TipoUsuarioService.Modificar(this.state).then((response) => {
				this.closeModal();
				this.Listar();
				this.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.showSnackBars('error', error.mensaje);
			});
		} else {
			TipoUsuarioService.Agregar(this.state).then((response) => {
				this.closeModal();
				this.Listar();
				this.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.showSnackBars('error', error.mensaje);
			});
		}
	};
	
	add = () => {
		
		this.setState({
			id_cat_tipo_usuario: '',
			tipo_usuario: '',
			descripcion: '',
			activo: true
		});
		
		this.openModal('add');
		
	};
	
	edit = (item) => {
		
		this.setState({
			id_cat_tipo_usuario: item.id_cat_tipo_usuario,
			tipo_usuario: item.tipo_usuario,
			descripcion: item.descripcion,
			activo: (item.activo === 1)
		});
		
		this.openModal('edit');
		
	};
	
	view = (item) => {
		
		this.setState({
			id_cat_tipo_usuario: item.id_cat_tipo_usuario,
			tipo_usuario: item.tipo_usuario,
			descripcion: item.descripcion,
			activo: (item.activo === 1)
		});
		
		this.openModal('view');
		
	};
	
	openModal = (tipo, form) => {
		let title = "";
		switch (tipo) {
			case 'add':
				title = "Agregar";
				break;
			case 'edit':
				title = "Editar";
				break;
			case 'view':
				title = "Detalle";
				break;
			default:
		}
		this.setState({
			modal: {
				open: true,
				title: title,
				tipo: tipo
			},
			form: form
		});
	};
	
	closeModal = () => {
		this.setState({
			modal: {
				open: false,
				title: '',
				tipo: ''
			}
		})
	};
	
	render() {
		
		return (
			<div className='Catalogos ContaineViewComponet'>
				
				<Fragment>
					
					<ModalTipoUsuario modal={this.state.modal} form={this.state} save={this.save}
					                  closeModal={this.closeModal} handleChange={this.handleChange}
					/>
				
				</Fragment>
				
				<div className={'row-flex margin-30-T margin-30-B'}>
					<div className={'w-100-300-px'}>
						<Typography variant={'h5'} className={'text-left'}>
							Tipos de usuario
						</Typography>
					</div>
					<div className={'w-300-px text-right'}>
						<Fab variant="extended" size="small" color="primary" aria-label="Add"
						     className={'margin-10-L'} onClick={this.Listar}>
							<Sync className={'margin-5-R px-14'}/>
							Actualizar
						</Fab>
					</div>
				</div>
				
				<div className={'form margin-30-B'}>
					
					<Typography variant={'h6'} className={'margin-30-T margin-30-B'}>
					
					</Typography>
					
					{this.state.listar_cat_tipo_usuario.length > 0 ? (
						<ListaTabla lista={this.state.listar_cat_tipo_usuario}
						            edit={this.edit}
						            view={this.view}
						            delete={this.delete}
						/>
					) : (
						<VistaVacia
							numero={0}
							mensaje={'No se encontraron datos.'}
						/>
					)}
				
				</div>
				
				<Zoom className={'btn-fixed-bottom-right cursor-pointer'} key={'inherit'} timeout={1500} in={true}
				      style={{transitionDelay: `${100}ms`}} unmountOnExit>
					<Fab color={'primary'} onClick={() => this.add()}>
						<Add/>
					</Fab>
				</Zoom>
			
			</div>
		);
	}
}

TipoUsuario.propTypes = {
};

export default IntegrationNotistack(TipoUsuario);
