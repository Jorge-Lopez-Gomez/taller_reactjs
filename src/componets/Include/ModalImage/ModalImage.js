import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button/index';
import Dialog from '@material-ui/core/Dialog/index';
import DialogActions from '@material-ui/core/DialogActions/index';
import DialogContent from '@material-ui/core/DialogContent/index';
import DialogTitle from '@material-ui/core/DialogTitle/index';
import {FileAction} from "../../../settings/FileAction/FileAction";
import {CONFIG} from "../../../settings/Config/Config";
import {PopupService} from '../../../settings/PoPup/PoPup';
import DraggableModal from "../DraggableModal/DraggableModal";
import {Icono} from "../Icono/Icono";

class ModalImage extends Component {
	
	state = {};
	
	constructor(props) {
		
		super(props);
		
		this.state = {
			open: false,
			scroll: 'paper',
			
			desing: props.desing,
			tipo: props.tipo,
			
			base64: props.item.base64,
			base64Tipo: props.item.base64Tipo,
			archivo: props.item.archivo,
			formato: props.item.formato
		};
		
		this.boton_ver = this.boton_ver.bind(this);
		
	}
	
	openModal = () => {
		this.setState({open: true, scroll: 'paper'});
	};
	
	closeModal = () => {
		this.setState({open: false});
	};
	
	fileView = () => {
		let item = {};
		if (this.state.tipo !== 'add') {
			item = this.props.item;
		} else {
			item = {
				archivo: this.state.archivo,
				formato: this.state.formato
			};
		}
		if (item.formato === 'xml' || item.formato === 'pdf' || item.formato === 'docx' || item.formato === 'xlsx' || item.formato === 'csv' || item.formato === 'text' || item.formato === 'txt' || item.formato === 'rar' || item.formato === 'zip') {
			FileAction.Open(item.archivo, item.formato);
		} else {
			alert('Abrir modal...');
		}
	};
	
	view = () => {
		
		const {item, tipo, desing} = this.props;
		
		this.setState({
			desing: desing,
			tipo: tipo,
			
			base64Tipo: item.base64Tipo,
			base64: item.base64,
			archivo: item.archivo,
			formato: item.formato
		});
		switch (item.formato) {
			case 'xml':
			case 'pdf':
				this.fileView();
				break;
			case 'png':
				this.openModal('paper');
				break;
			case 'jpeg':
				this.openModal('paper');
				break;
			case 'svg':
				this.openModal('paper');
				break;
			case 'docx':
				if ((item.archivo || '').split('.').length >= 2) {
					// alert('Descargar archivo de WORD');
					this.fileView();
				} else {
					PopupService.Confirm(['Cancelar', 'Aceptar'], 'warning', CONFIG.titulo_alert_confirm, '¿No es posible ver el archivo con este formato, porque no se ha guardado en el servidor?').then((r) => {
					});
				}
				break;
			case 'xlsx':
				if ((item.archivo || '').split('.').length >= 2) {
					// alert('Descargar archivo de EXCEL');
					this.fileView();
				} else {
					PopupService.Confirm(['Cancelar', 'Aceptar'], 'warning', CONFIG.titulo_alert_confirm, '¿No es posible ver el archivo con este formato, porque no se ha guardado en el servidor?').then((r) => {
					});
				}
				break;
			case 'csv':
				if ((item.archivo || '').split('.').length >= 2) {
					// alert('Descargar archivo de CSV');
					this.fileView();
				} else {
					PopupService.Confirm(['Cancelar', 'Aceptar'], 'warning', CONFIG.titulo_alert_confirm, '¿No es posible ver el archivo con este formato, porque no se ha guardado en el servidor?').then((r) => {
					});
				}
				break;
			case 'text':
			case 'txt':
				if ((item.archivo || '').split('.').length >= 2) {
					// alert('Descargar archivo de TEXTO');
					this.fileView();
				} else {
					PopupService.Confirm(['Cancelar', 'Aceptar'], 'warning', CONFIG.titulo_alert_confirm, '¿No es posible ver el archivo con este formato, porque no se ha guardado en el servidor?').then((r) => {
					});
				}
				break;
			case 'rar':
			case 'zip':
				if ((item.archivo || '').split('.').length >= 2) {
					// alert('Descargar archivo de WORD');
					this.fileView();
				} else {
					PopupService.Confirm(['Cancelar', 'Aceptar'], 'warning', CONFIG.titulo_alert_confirm, '¿No es posible ver el archivo con este formato, porque no se ha guardado en el servidor?').then((r) => {
					});
				}
				break;
			default:
				alert('Descargar archivo formato desconocido');
		}
	};
	
	boton_ver = () => {
		let BTN = '';
		switch (this.state.desing) {
			case 1:
				BTN = (
					<Button size="small" color="primary" onClick={() => this.view()} className={'cursor-pointer'}>
						Ver
					</Button>
				);
				break;
			case 2:
				BTN = (
					<Button size="small" color="primary" onClick={() => this.view()} className={'cursor-pointer'}>
						Ver
					</Button>
				);
				break;
			case 3:
				BTN = (
					<Button size="small" color="primary" onClick={() => this.view()} className={'cursor-pointer'}
					        style={{minWidth: "40px", padding: "0px", margin: "0px"}}>
						Ver
					</Button>
				);
				break;
			default:
				BTN = (
					<span onClick={() => this.view()} style={{cursor: 'pointer'}}>
						{Icono.get(this.props.item.formato, '25px', '25px')}
					</span>
				);
			
		}
		return BTN;
	};
	
	render() {
		
		const BTN_ACTION = this.boton_ver();
		const url_archivo = CONFIG.src + this.state.archivo;
		return (
			<span>
				
				{this.props.component ? (
					<Fragment>
						<span onClick={() => this.view()} style={{cursor: 'pointer'}}>
							{this.props.component}
						</span>
					</Fragment>
				) : BTN_ACTION}
				
				<Dialog disableBackdropClick disableEscapeKeyDown maxWidth={'lg'} open={this.state.open}
				        fullWidth={true} scroll={this.state.scroll} onClose={this.closeModal}
				        aria-labelledby="scroll-dialog-title"
				        PaperComponent={DraggableModal}
				>
					
					<DialogTitle>Imagen</DialogTitle>
					
					<DialogContent>
					
						<img
							src={this.state.base64 || (this.state.base64Tipo ? this.state.base64Tipo + ',' + this.state.archivo : url_archivo)}
							alt="" width={'100%'} height={'auto'}/>
					
					</DialogContent>
					
					<DialogActions>
						
						<Button onClick={this.closeModal} color="primary">
							Cerrar
						</Button>
					
					</DialogActions>
				
				</Dialog>
			
			</span>
		);
	}
}

ModalImage.propTypes = {
	tipo: PropTypes.oneOf([
		"add",
		"view",
		"edit",
	]),
	desing: PropTypes.oneOf([
		'',
		undefined,
		null,
		1,
		2,
		3,
	]),
	item: PropTypes.object.isRequired,
	component: PropTypes.element,
};

export default ModalImage;
