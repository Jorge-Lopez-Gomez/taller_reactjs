import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ListaTabla from './Includes/ListaTabla';
import ModalRuta from './Includes/ModalRuta';

import {RutaService} from '../../../services/_Sis/RutaService/RutaService';
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


class Ruta extends Component {
	
	state = {};
	
	Usr = {};
	
	constructor() {
		super();
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		this.state = {
			listar_zona: []
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
		RutaService.Listar().then((response) => {
			this.setState({
				listar_zona: response.data
			});
		}).catch((error) => {
			this.setState({
				listar_zona: []
			});
			this.showSnackBars('error', error.mensaje);
		});
	};
	
	render() {
		
		return (
			<div className='Catalogos ContaineViewComponet'>
				
				<CabeceraTituloPdfExcelLista
					titulo={'Ruta'}
					botonLISTA={
						<Fragment>
							<BotonActualizarLista onClick={() => {
								this.Listar();
							}}/>
						</Fragment>
					}
				/>
				
				<div className={'form margin-30-B'}>
					
					{this.state.listar_zona.length > 0 ? (
						<ListaTabla
							lista={this.state.listar_zona}
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
				
				<ModalRuta
					tipo={'add'}
					item={{}}
					RefreshList={this.RefreshList}
					showSnackBars={this.showSnackBars}
				/>
			
			</div>
		);
	}
}

Ruta.propTypes = {
};

export default IntegrationNotistack(Ruta);
