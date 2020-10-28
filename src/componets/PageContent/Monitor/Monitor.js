import React, {Component, Fragment} from 'react';
import ModalComentario from '../Comentario/Includes/ModalComentario';

import {MonitorService} from '../../../services/_Sis/MonitorService/MonitorService';
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import VistaVacia from "../../Include/VistaVacia/VistaVacia";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";
import {BotonActualizarLista, CabeceraTituloPdfExcelLista} from "../../Include/MiniComponents/GlobalComponent";
import Monitor from "./Includes/Monitor";
import {$cSuccess, FieldsJs, $cInfo, $cError, hideSpinner, showSpinner} from '../../../settings/General/General';


class Orientacion extends Component {
	
	state = {};
	
	Usr = {};
	
	constructor() {
		super();
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		this.state = {
			listar_monitor: []
		};
		this.Listar();
	}
	
	showSnackBars = (type, message) => {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	RefreshList = () => {
		this.Listar();
	};
	
	componentDidMount() {
		$cSuccess("componentDidMount");
	}
	
	componentWillUnmount() {
		$cInfo("componentWillUnmount");
	}
	
	Listar = () => {
		MonitorService.Listar().then((response) => {
			this.setState({
				listar_monitor: response.data
			});
		}).catch((error) => {
			this.setState({
				listar_monitor: []
			});
			this.showSnackBars('error', error.mensaje);
		});
	};
	
	render() {
		
		return (
			<div className='Catalogos ContaineViewComponet'>
				
				<CabeceraTituloPdfExcelLista
					titulo={'Control de Unidades'}
					botonLISTA={
						<Fragment>
							<BotonActualizarLista onClick={() => {
								this.Listar();
							}}/>
						</Fragment>
					}
				/>
				
				<div className={'form margin-30-B'}>
					
					{this.state.listar_monitor.length > 0 ? (
						<Monitor
							lista={this.state.listar_monitor}
							RefreshList={this.RefreshList}
							showSnackBars={this.showSnackBars}
						/>
						/*<ListaTabla
							lista={this.state.listar_monitor}
							RefreshList={this.RefreshList}
							showSnackBars={this.showSnackBars}
						/>*/
					) : (
						<VistaVacia
							numero={0}
							mensaje={'No se encontraron datos.'}
						/>
					)}
				
				</div>
				{FieldsJs.inArray([1, 2, 3], this.Usr.id_cat_tipo_usuario) ? (
					<ModalComentario
						tipo={'add'}
						item={{}}
						RefreshList={this.RefreshList}
						showSnackBars={this.showSnackBars}
					/>
				) : null}
			
			</div>
		);
	}
}

Orientacion.propTypes = {};

export default IntegrationNotistack(Orientacion);
