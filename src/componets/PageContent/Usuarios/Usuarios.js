import React, {Component, Fragment} from 'react';

import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import EventNote from '@material-ui/icons/EventNote';
import Sync from '@material-ui/icons/Sync';
import ListaTabla from './Includes/ListaTabla';
import ModalUsuarios from './Includes/ModalUsuarios';

import {UsuariosService} from '../../../services/_Sis/UsuariosService/UsuariosService';
import {PopupService} from '../../../settings/PoPup/PoPup';
import {FieldsJs} from "../../../settings/General/General";
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import VistaVacia from "../../Include/VistaVacia/VistaVacia";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";
import {CONFIG} from "../../../settings/Config/Config";
import FiltrosUsuarios from "./Includes/FiltrosUsuarios";
import Paginacion from "../../Include/Paginacion/Paginacion";


class Usuarios extends Component {
	
	Usr = {};
	
	state = {};
	
	constructor() {
		super();
		
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		
		
		this.state = {
			listar_usuarios: [],
			
			filtro: {
				usuario: '',
				correo_electronico: '',
				id_cat_tipo_usuario: '',
				activo: 1
			},
			paginacion: {
				total: null,
				page: 1,
				limit: this.DefaultNumPag(),
				rangos: this.DefaultRangos()
			},
		};
		
		
		this.Listar = this.Listar.bind(this);
		this.$BroadcastModalUsuarios = this.$BroadcastModalUsuarios.bind(this);
		
		this.Listar();
		
	}
	
	showSnackBars = (type, message) => {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	RefreshList = () => {
		this.Listar();
	};
	
	
	HandleFiltro = (filtro) => {
		this.setState({
			filtro: filtro
		});
	};
	
	DefaultNumPag = () => {
		let Cfg = ReactLocalStorageService.get('Cfg') || {};
		return Cfg.paginacion_numero_registro ? Number(Cfg.paginacion_numero_registro) : 10;
	};
	
	DefaultRangos = () => {
		let Cfg = ReactLocalStorageService.get('Cfg') || {};
		let rangos = [5, 10, 15, 20];
		if (FieldsJs.Array(Cfg.paginacion_rangos)) {
			rangos = Cfg.paginacion_rangos;
		}
		return rangos;
	};
	
	$BroadcastModalUsuarios = (data) => {
		console.warn('$BroadcastModalUsuarios::', data);
		switch (data.accion) {
			case 'delete':
				if (data.status === true) {
					this.Eliminar(data.item);
				}
				break;
			case 'list':
				if (data.status === true) {
					this.Listar();
				}
				break;
			default:
				if (data.status === true) {
					this.Listar();
				}
		}
	};
	
	
	AplicarPaginacion = (data) => {
		let paginacion = this.state.paginacion;
		this.setState({
			paginacion: {
				total: paginacion.total || null,
				page: data.page || paginacion.page || null,
				limit: data.limit || paginacion.limit || this.DefaultNumPag(),
				rangos: this.DefaultRangos()
			}
		});
		setTimeout(() => this.Listar());
	};
	
	AplicarFiltros = () => {
		let paginacion = this.state.paginacion;
		this.setState({
			paginacion: {
				total: paginacion.total || null,
				page: 1,
				limit: paginacion.limit || this.DefaultNumPag(),
				rangos: this.DefaultRangos()
			}
		});
		setTimeout(() => this.Listar());
	};
	
	
	Listar = () => {
		UsuariosService.Listar(this.state.filtro, this.state.paginacion).then((response) => {
			
			this.setState({
				listar_usuarios: response.data,
				
				paginacion: {
					total: response.paginacion.total,
					page: response.paginacion.page,
					limit: response.paginacion.limit,
					rangos: this.DefaultRangos()
				}
			});
			
		}).catch((error) => {
			
			this.setState({listar_usuarios: []});
			
			this.showSnackBars('error', error.mensaje);
			
		});
	};
	
	Eliminar = (item) => {
		
		let msg = `¿Deseas eliminar el usuario ${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}?`;
		
		PopupService.Confirm(['Cancelar', 'Eliminar'], 'warning', CONFIG.titulo_alert_confirm, msg).then((r) => {
			
			if (r.button === 'Eliminar') {
				UsuariosService.Eliminar(item.id_usuario).then((response) => {
					
					this.showSnackBars('success', response.mensaje);
					
					this.Listar();
					
				}).catch((error) => {
					
					this.showSnackBars('error', error.mensaje);
					
				});
			}
			
		});
	};
	
	render() {
		
		return (
			<div className='Catalogos ContaineViewComponet'>
				
				<div className={'row-flex margin-30-T margin-30-B'}>
					<div className={'w-100-300-px'}>
						<Typography variant={'h5'} className={'text-left'}>
							Usuarios
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
				
				<FiltrosUsuarios
					AplicarFiltros={this.AplicarFiltros}
					HandleFiltro={this.HandleFiltro}
					showSnackBars={this.showSnackBars}
				/>
				
				<div className={'form margin-30-B'}>
					
					<Typography variant={'h6'} className={'margin-30-T margin-30-B'}>
					
					</Typography>
					
					{this.state.listar_usuarios.length > 0 ? (
						<Fragment>
							<ListaTabla lista={this.state.listar_usuarios}
							            $BroadcastModalUsuarios={this.$BroadcastModalUsuarios}/>
							<Paginacion
								total={this.state.paginacion.total}
								page={this.state.paginacion.page}
								limit={this.state.paginacion.limit}
								rangos={this.state.paginacion.rangos}
								onClick={(data) => this.AplicarPaginacion(data)}
							/>
						</Fragment>
					) : (
						<VistaVacia
							numero={0}
							mensaje={'No se encontraron datos.'}
						/>
					)}
				
				</div>
				
				{FieldsJs.inArray([1, 2], this.Usr.id_cat_tipo_usuario) ? (
					<ModalUsuarios id_usuario={null} tipo={'add'}
					               $BroadcastModalUsuarios={this.$BroadcastModalUsuarios}/>
				) : ''}
			
			</div>
		);
	}
}

Usuarios.propTypes = {};

export default IntegrationNotistack(Usuarios);
