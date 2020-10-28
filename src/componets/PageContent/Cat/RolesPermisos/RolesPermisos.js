import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Typography from "@material-ui/core/Typography/index";
import Fab from '@material-ui/core/Fab/index';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import EventNote from '@material-ui/icons/EventNote';
import Sync from '@material-ui/icons/Sync';
import TextField from '@material-ui/core/TextField/index';
import ListaTabla from './Includes/ListaTabla';

import {RolesPermisosService} from '../../../../services/_Cat/RolesPermisosService/RolesPermisosService';
import {FieldsJs} from "../../../../settings/General/General";
import {ReactLocalStorageService} from '../../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import Grid from "@material-ui/core/Grid/index";
import FormGroup from "@material-ui/core/FormGroup/index";
import VistaVacia from "../../../Include/VistaVacia/VistaVacia";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../../settings/IntegrationNotistack/IntegrationNotistack";


class RolesPermisos extends Component {
	
	state = {};
	
	Usr = {};
	
	constructor() {
		super();
		
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		
		this.state = {
			id_cat_tipo_usuario: 2,
			lista_menu_sub_menu: [],
			lista_cat_tipo_usuario: []
		};
		
		this.updatePermisoMenu = this.updatePermisoMenu.bind(this);
		this.updatePermisoSubMenu = this.updatePermisoSubMenu.bind(this);
		this.showSnackBars = this.showSnackBars.bind(this);
		
		this.Listar = this.Listar.bind(this);
		this.FiltroListar = this.FiltroListar.bind(this);
		
		this.Listar();
		
	}
	
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
	
	updatePermisoMenu(e, item) {
		
		const {checked} = e.target;
		
		RolesPermisosService.PermisoMenu(item.id_menu, item.id_acceso_menu, checked, this.state.id_cat_tipo_usuario).then((response) => {
			this.Listar();
		}).catch((error) => {
			this.Listar();
		});
		
	}
	
	updatePermisoSubMenu(e, item) {
		
		const {checked} = e.target;
		
		RolesPermisosService.PermisoSubMenu(item.id_sub_menu, item.id_acceso_sub_menu, checked, this.state.id_cat_tipo_usuario).then((response) => {
			this.Listar();
		}).catch((error) => {
			this.Listar();
		});
		
	}
	
	showSnackBars(type, message) {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	Listar = (id_cat_tipo_usuario) => {
		RolesPermisosService.Listar(id_cat_tipo_usuario || this.state.id_cat_tipo_usuario).then((response) => {
			
			let menu_sub_menu = response.data.menu_sub_menu;
			let cat_tipo_usuario = response.data.cat_tipo_usuario;
			
			this.setState({
				lista_menu_sub_menu: menu_sub_menu,
				lista_cat_tipo_usuario: cat_tipo_usuario
			});
			
		}).catch((error) => {
			
			this.setState({
				lista_menu_sub_menu: [],
				lista_cat_tipo_usuario: []
			});
			
			this.showSnackBars('error', error.mensaje);
			
		});
	};
	
	FiltroListar = (e) => {
		
		const {value} = e.target;
		
		this.Listar(value);
		
	};
	
	render() {
		
		return (
			<div className='Catalogos ContaineViewComponet'>
				
				<div className={'margin-30-T margin-30-B'}>
					<Grid container spacing={2}>
						
						<Grid item xs={12} sm={6} md={4} lg={4} xl={6}>
							<Typography variant={'h5'} className={'text-left'}>
								Roles y permisos
							</Typography>
						</Grid>
						
						<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
							
							<FormGroup row className={'margin-3-L'}>
								
								<TextField
									className={'margin-0'}
									select
									fullWidth
									margin="dense"
									onChange={(e) => {
										this.handleChange(e);
										this.FiltroListar(e);
									}}
									disabled={this.state.tipo === 'view'}
									SelectProps={{
										native: true,
										MenuProps: {
											className: '',
										},
									}}
									
									helperText=""
									name="id_cat_tipo_usuario"
									label="Tipo de usuario"
									value={this.state.id_cat_tipo_usuario}
								>
									{this.state.lista_cat_tipo_usuario.map(option => (
										<option key={option.id_cat_tipo_usuario} value={option.id_cat_tipo_usuario}>
											{option.tipo_usuario}
										</option>
									))}
								</TextField>
							
							</FormGroup>
						
						</Grid>
						
						<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
							
							<FormGroup row className={'margin-3-L'}>
								<Fab variant="extended" size="small" color="primary" aria-label="Add"
								     className={'margin-10-L'} onClick={() => this.Listar()}>
									<Sync className={'margin-5-R px-14'}/>
									Actualizar
								</Fab>
							
							</FormGroup>
						
						</Grid>
					
					</Grid>
				</div>
				
				<div className={'form margin-30-B'}>
					
					{this.state.lista_menu_sub_menu.length > 0 ? (
						<ListaTabla lista={this.state.lista_menu_sub_menu}
						            updatePermisoMenu={this.updatePermisoMenu}
						            updatePermisoSubMenu={this.updatePermisoSubMenu}
						/>
					) : (
						<VistaVacia
							numero={0}
							mensaje={'No se encontraron datos.'}
						/>
					)}
				
				</div>
			
			</div>
		);
	}
}

RolesPermisos.propTypes = {
};

export default IntegrationNotistack(RolesPermisos);
