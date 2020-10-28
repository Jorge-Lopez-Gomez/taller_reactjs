import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ListaTabla from './Includes/ListaTabla';
import ModalComentario from './Includes/ModalComentario';

import {ComentarioService} from '../../../services/_Sis/ComentarioService/ComentarioService';
import {FieldsJs} from "../../../settings/General/General";
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import VistaVacia from "../../Include/VistaVacia/VistaVacia";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";
import {
	BotonActualizarLista,
	BotonExportarListaExcel,
	BotonExportarListaPDF,
	CabeceraTituloPdfExcelLista
} from "../../Include/MiniComponents/GlobalComponent";


class Orientacion extends Component {
	
	state = {};
	
	Usr = {};
	
	constructor() {
		super();
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		this.state = {
			listar_orientacion: []
		};
		this.Listar();
	}
	
	showSnackBars = (type, message) => {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	RefreshList = () => {
		this.Listar();
	};
	
	Listar = () => {
		ComentarioService.Listar().then((response) => {
			this.setState({
				listar_orientacion: response.data
			});
		}).catch((error) => {
			this.setState({
				listar_orientacion: []
			});
			this.showSnackBars('error', error.mensaje);
		});
	};
	
	render() {
		
		return (
			<div className='Catalogos ContaineViewComponet'>
				
				<CabeceraTituloPdfExcelLista
					titulo={'Comentarios'}
					botonLISTA={
						<Fragment>
							<BotonActualizarLista onClick={() => {
								this.Listar();
							}}/>
						</Fragment>
					}
				/>
				
				<div className={'form margin-30-B'}>
					
					{this.state.listar_orientacion.length > 0 ? (
						<ListaTabla
							lista={this.state.listar_orientacion}
							RefreshList={this.RefreshList}
							showSnackBars={this.showSnackBars}
						/>
					) : (
						<VistaVacia
							numero={0}
							mensaje={'No se encontraron datos.'}
						/>
					)}
				
				</div>
				
				<ModalComentario
					tipo={'add'}
					item={{}}
					RefreshList={this.RefreshList}
					showSnackBars={this.showSnackBars}
				/>
			
			</div>
		);
	}
}

Orientacion.propTypes = {
};

export default IntegrationNotistack(Orientacion);
