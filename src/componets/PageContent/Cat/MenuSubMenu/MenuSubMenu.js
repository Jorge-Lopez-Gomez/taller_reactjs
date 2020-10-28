import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Typography from "@material-ui/core/Typography/index";

import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import EventNote from '@material-ui/icons/EventNote';
import Sync from '@material-ui/icons/Sync';
import ListaTabla from './Includes/ListaTabla';
import ModalMenu from './Includes/ModalMenu';
import ModalSubMenu from "./Includes/ModalSubMenu";

import {MenuSubMenuService} from '../../../../services/_Cat/MenuSubMenuService/MenuSubMenuService';
import {PopupService} from '../../../../settings/PoPup/PoPup';
import {FieldsJs} from "../../../../settings/General/General";
import {ReactLocalStorageService} from '../../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import Zoom from "@material-ui/core/Zoom/index";
import Fab from "@material-ui/core/Fab/index";
import Add from '@material-ui/icons/Add';
import VistaVacia from "../../../Include/VistaVacia/VistaVacia";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../../settings/IntegrationNotistack/IntegrationNotistack";
import {CONFIG} from "../../../../settings/Config/Config";


class MenuSubMenu extends Component {
	
	state = {
		modalmenu: {
			open: false,
			title: '',
			tipo: ''
		},
		modalsubmenu: {
			open: false,
			title: '',
			tipo: ''
		},
		listar_menu_sub_menu: []
	};
	
	Usr = {};
	
	constructor() {
		super();
		
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		
		this.handleChange = this.handleChange.bind(this);
		this.showSnackBars = this.showSnackBars.bind(this);
		
		this.Listar = this.Listar.bind(this);
		
		this.addMenu = this.addMenu.bind(this);
		this.editMenu = this.editMenu.bind(this);
		this.viewMenu = this.viewMenu.bind(this);
		this.saveMenu = this.saveMenu.bind(this);
		this.deleteMenu = this.deleteMenu.bind(this);
		
		this.addSubMenu = this.addSubMenu.bind(this);
		this.editSubMenu = this.editSubMenu.bind(this);
		this.viewSubMenu = this.viewSubMenu.bind(this);
		this.saveSubMenu = this.saveSubMenu.bind(this);
		this.deleteSubMenu = this.deleteSubMenu.bind(this);
		
		
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
		MenuSubMenuService.Listar().then((response) => {
			
			this.setState({listar_menu_sub_menu: response.data});
			
		}).catch((error) => {
			
			this.setState({listar_menu_sub_menu: []});
			
			this.showSnackBars('error', error.mensaje);
			
		});
	};
	
	/*
	* M E N U S
	* */
	
	saveMenu = () => {
		if (this.state.id_menu > 0) {
			MenuSubMenuService.ModificarMenu(this.state).then((response) => {
				this.closeModal();
				this.Listar();
				this.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.showSnackBars('error', error.mensaje);
			});
		} else {
			MenuSubMenuService.AgregarMenu(this.state).then((response) => {
				this.closeModal();
				this.Listar();
				this.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.showSnackBars('error', error.mensaje);
			});
		}
	};
	
	addMenu = () => {
		
		this.setState({
			id_menu: '',
			icono: '',
			menu: '',
			orden: '',
			activo: true
		});
		
		this.openModal('add', 1);
		
	};
	
	editMenu = (item) => {
		
		this.setState({
			id_menu: item.id_menu,
			icono: item.icono,
			menu: item.menu,
			orden: item.orden,
			activo: (item.activo === 1)
		});
		
		this.openModal('edit', 1);
		
	};
	
	viewMenu = (item) => {
		
		this.setState({
			id_menu: item.id_menu,
			icono: item.icono,
			menu: item.menu,
			orden: item.orden,
			activo: (item.activo === 1)
		});
		
		this.openModal('view', 1);
		
	};
	
	deleteMenu = (item) => {
		
		let msg = `¿Deseas eliminar el menu ${item.menu}?`;
		
		PopupService.Confirm(['Cancelar', 'Eliminar'], 'warning', CONFIG.titulo_alert_confirm, msg).then((r) => {
			
			if (r.button === 'Eliminar') {
				MenuSubMenuService.EliminarMenu(item.id_menu).then((response) => {
					
					this.showSnackBars('success', response.mensaje);
					
					this.Listar();
					
				}).catch((error) => {
					
					this.showSnackBars('error', error.mensaje);
					
				});
			}
			
		});
	};
	
	/*
	* S U B M E N U S
	* */
	
	saveSubMenu = () => {
		if (this.state.id_sub_menu > 0) {
			MenuSubMenuService.ModificarSubMenu(this.state).then((response) => {
				this.closeModal();
				this.Listar();
				this.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.showSnackBars('error', error.mensaje);
			});
		} else {
			MenuSubMenuService.AgregarSubMenu(this.state).then((response) => {
				this.closeModal();
				this.Listar();
				this.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.showSnackBars('error', error.mensaje);
			});
		}
	};
	
	addSubMenu = (id_menu) => {
		
		this.setState({
			id_sub_menu: '',
			id_menu: id_menu,
			icono: '',
			sub_menu: '',
			ruta: '',
			orden: '',
			activo: true
		});
		
		this.openModal('add', 2);
		
	};
	
	editSubMenu = (item) => {
		
		this.setState({
			id_sub_menu: item.id_sub_menu,
			id_menu: item.id_menu,
			icono: item.icono,
			sub_menu: item.sub_menu,
			ruta: item.ruta,
			orden: item.orden,
			activo: (item.activo === 1)
		});
		
		this.openModal('edit', 2);
		
	};
	
	viewSubMenu = (item) => {
		
		this.setState({
			id_sub_menu: item.id_sub_menu,
			id_menu: item.id_menu,
			icono: item.icono,
			sub_menu: item.sub_menu,
			ruta: item.ruta,
			orden: item.orden,
			activo: (item.activo === 1)
		});
		
		this.openModal('view', 2);
		
	};
	
	deleteSubMenu = (item) => {
		
		let msg = `¿Deseas eliminar el sub menu ${item.sub_menu}?`;
		
		PopupService.Confirm(['Cancelar', 'Eliminar'], 'warning', CONFIG.titulo_alert_confirm, msg).then((r) => {
			
			if (r.button === 'Eliminar') {
				MenuSubMenuService.EliminarSubMenu(item.id_sub_menu).then((response) => {
					
					this.showSnackBars('success', response.mensaje);
					
					this.Listar();
					
				}).catch((error) => {
					
					this.showSnackBars('error', error.mensaje);
					
				});
			}
			
		});
	};
	
	/*
	* M O D A L S
	* */
	
	openModal = (tipo, modal) => {
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
		if (modal === 1) {
			this.setState({
				modalmenu: {
					open: true,
					title: title,
					tipo: tipo
				},
				form: {}
			});
		} else {
			this.setState({
				modalsubmenu: {
					open: true,
					title: title,
					tipo: tipo
				},
				form: {}
			});
		}
		
	};
	
	closeModal = () => {
		this.setState({
			modalmenu: {
				open: false,
				title: '',
				tipo: ''
			},
			modalsubmenu: {
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
					
					<ModalMenu modal={this.state.modalmenu} form={this.state} save={this.saveMenu}
					           closeModal={this.closeModal} handleChange={this.handleChange}
					/>
					
					<ModalSubMenu modal={this.state.modalsubmenu} form={this.state} save={this.saveSubMenu}
					              closeModal={this.closeModal} handleChange={this.handleChange}
					/>
				
				</Fragment>
				
				<div className={'row-flex margin-30-T margin-30-B'}>
					<div className={'w-100-300-px'}>
						<Typography variant={'h5'} className={'text-left'}>
							Menus
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
					
					{this.state.listar_menu_sub_menu.length > 0 ? (
						<ListaTabla lista={this.state.listar_menu_sub_menu}
						            editMenu={this.editMenu}
						            viewMenu={this.viewMenu}
						            deleteMenu={this.deleteMenu}
						
						            addSubMenu={this.addSubMenu}
						            editSubMenu={this.editSubMenu}
						            viewSubMenu={this.viewSubMenu}
						            deleteSubMenu={this.deleteSubMenu}
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
					<Fab color={'primary'} onClick={() => this.addMenu()}>
						<Add/>
					</Fab>
				</Zoom>
			
			
			</div>
		);
	}
}

MenuSubMenu.propTypes = {
};

export default IntegrationNotistack(MenuSubMenu);
