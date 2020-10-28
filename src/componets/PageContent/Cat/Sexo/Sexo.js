import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ListaTabla from './Includes/ListaTabla';
import ModalSexo from './Includes/ModalSexo';

import {SexoService} from '../../../../services/_Cat/SexoService/SexoService';
import {FieldsJs} from "../../../../settings/General/General";
import {ReactLocalStorageService} from '../../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import VistaVacia from "../../../Include/VistaVacia/VistaVacia";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../../settings/IntegrationNotistack/IntegrationNotistack";
import {
	BotonActualizarLista,
	BotonExportarListaExcel,
	BotonExportarListaPDF,
	CabeceraTituloPdfExcelLista
} from "../../../Include/MiniComponents/GlobalComponent";


class Sexo extends Component {
	
	state = {};
	
	Usr = {};
	
	constructor() {
		super();
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		this.state = {
			listar_cat_sexo: []
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
		SexoService.Listar().then((response) => {
			this.setState({
				listar_cat_sexo: response.data
			});
		}).catch((error) => {
			this.setState({
				listar_cat_sexo: []
			});
			this.showSnackBars('error', error.mensaje);
		});
	};
	
	render() {
		
		return (
			<div className='Catalogos ContaineViewComponet'>
				
				<CabeceraTituloPdfExcelLista
					titulo={'Sexo'}
					botonLISTA={
						<Fragment>
							<BotonActualizarLista onClick={() => {
								this.Listar();
							}}/>
						</Fragment>
					}
				/>
				
				<div className={'form margin-30-B'}>
					
					{this.state.listar_cat_sexo.length > 0 ? (
						<ListaTabla
							lista={this.state.listar_cat_sexo}
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
				
				<ModalSexo
					tipo={'add'}
					item={{}}
					RefreshList={this.RefreshList}
					showSnackBars={this.showSnackBars}
				/>
			
			</div>
		);
	}
}

Sexo.propTypes = {
};

export default IntegrationNotistack(Sexo);
