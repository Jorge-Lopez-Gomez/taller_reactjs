import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button/index';
import Dialog from '@material-ui/core/Dialog/index';
import DialogActions from '@material-ui/core/DialogActions/index';
import DialogContent from '@material-ui/core/DialogContent/index';
import Slide from "@material-ui/core/Slide/index";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import CardContent from "@material-ui/core/CardContent";
import {ReactLocalStorageService} from "../../../../settings/ReactLocalStorageService/ReactLocalStorageService";
import DraggableModal from "../../../Include/DraggableModal/DraggableModal";
import {FileBase64} from "../../../../settings/FileBase64/FileBase64";
import {CONFIG} from "../../../../settings/Config/Config";
import {PerfilService} from "../../../../services/_Sis/PerfilService/PerfilService";

class ModalCambiarFotoDePerfil extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			modal: {
				open: false
			},
			form: {},
			
			base64: '',
			foto: '',
			formato: '',
		};
		this.getBase64 = this.getBase64.bind(this);
	}
	
	openModal = () => {
		let Usr = ReactLocalStorageService.get('Usr') || {};
		const {form} = this.props;
		this.setState({
			modal: {
				open: true
			},
			form: form,
			
			base64: '',
			foto: CONFIG.src + Usr.foto,
			formato: '',
		});
	};
	
	closeModal = () => {
		this.setState({
			modal: {
				open: false
			},
			form: {},
			
			base64: '',
			foto: '',
			formato: '',
		});
	};
	
	fileSelect = () => {
		document.getElementById('foto_perfil_cambiar_foto_perfil').click();
	};
	
	getBase64 = (e) => {
		let formatos = [
			"image/jpeg",
			"image/png"
		];
		FileBase64.Base64(e.target, formatos).then((response) => {
			this.setState({
				base64: response.base64,
				foto: response.archivo,
				formato: response.formato,
			});
		}).catch((error) => {
			this.props.showSnackBars('error', error.mensaje);
			this.setState({
				base64: '',
				foto: '',
				formato: '',
			});
		});
	};
	
	actuaizar_foto_de_perfil = () => {
		try {
			if (!this.state.base64) {
				throw Object({
					status: false,
					mensaje: "Selecciona una imagen para tu foto de perfil"
				});
			}
			PerfilService.PerfilUsuariosCambiarFoto(this.state).then((response) => {
				this.props.showSnackBars('success', response.mensaje);
				this.props.refresh();
				this.closeModal();
			}).catch((error) => {
				this.props.showSnackBars('error', error.mensaje);
			});
		} catch (e) {
			this.props.showSnackBars('error', e.mensaje);
		}
	};
	
	render() {
		
		const bg_foto_content = {
			backgroundColor: 'black',
			width: '450px',
			height: '450px',
		};
		
		const bg_foto = {
			backgroundImage: `url(${this.state.base64 || this.state.foto || CONFIG.foto_default})`,
			width: '450px',
			height: '450px',
		};
		
		return (
			<div>
				
				<div onClick={() => this.openModal()}>
					{this.props.component}
				</div>
				
				<Dialog open={this.state.modal.open} onClose={() => this.closeModal()} disableEscapeKeyDown
				        disableBackdropClick maxWidth={'sm'} fullWidth={true} scroll={'paper'}
				        transition={<Slide direction="up"/>} aria-labelledby="scroll-dialog-title"
				        PaperComponent={DraggableModal}
				>
					
					<DialogContent>
						
						<Grid container spacing={1} alignContent={"center"} alignItems={"center"}>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12} align={'center'}>
								
								<Tooltip TransitionComponent={Zoom} placement={"bottom"} title={'Click para seleccionar otra imagen'}>
									<Card className={'b-r-100 padding-0 margin-0'} style={bg_foto_content}>
										<CardContent className={'b-r-100 padding-0 margin-0 cursor-pointer'} style={bg_foto_content}
										             onClick={() => this.fileSelect()}>
											<div className={'b-r-100 bg-img-contain-x-center-y-center'} style={bg_foto}>
												<input type="file" id="foto_perfil_cambiar_foto_perfil"
												       onChange={(e) => this.getBase64(e)} className={'display-none'}/>
											</div>
										</CardContent>
									</Card>
								</Tooltip>
							
							</Grid>
						
						</Grid>
					
					</DialogContent>
					
					<DialogActions>
						<Grid spacing={0} container direction="row" justify="space-between" alignItems="center">
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6} align={'left'}>
								<Button onClick={() => this.closeModal()} color="primary">
									Cerrar
								</Button>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6} align={'right'}>
								<Button onClick={() => this.actuaizar_foto_de_perfil()} color="secondary">
									Actualizar foto de perfil
								</Button>
							</Grid>
						</Grid>
					</DialogActions>
				
				</Dialog>
			
			
			</div>
		);
	}
}


ModalCambiarFotoDePerfil.propTypes = {
	component: PropTypes.element.isRequired,
	refresh: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
};

export default ModalCambiarFotoDePerfil;
