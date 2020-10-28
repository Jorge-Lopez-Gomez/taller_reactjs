import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/index';
import Dialog from '@material-ui/core/Dialog/index';
import DialogActions from '@material-ui/core/DialogActions/index';
import DialogContent from '@material-ui/core/DialogContent/index';
import DialogTitle from '@material-ui/core/DialogTitle/index';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";

import Divider from "@material-ui/core/Divider";
import DraggableModal from "../../../Include/DraggableModal/DraggableModal";
import {FieldsJs} from "../../../../settings/General/General";
import Slide from "@material-ui/core/Slide";
import {ComentarioService} from "../../../../services/_Sis/ComentarioService/ComentarioService";
import {
	BotonAccionAbrirModal,
	BotonAccionFooterModal,
	TituloHeaderModal
} from "../../../Include/MiniComponents/GlobalComponent";
import {OrientacionService} from "../../../../services/_Sis/OrientacionService/OrientacionService";
import {RutaService} from "../../../../services/_Sis/RutaService/RutaService";

class ModalMonitor extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		
		this.state = {
			modal: {
				open: false
			},
			
			tipo: props.tipo,
			
			id_comentario: (props.item || {}).id_comentario,
			id_ruta: '',
			comentario: '',
			activo: true,
			
			listar_ruta: []
		};
	}
	
	handleChange = (e, variable, campo, date, input) => {
		FieldsJs.HandleChange(e, variable, campo, date, input, (r) => this.setState({
			[r.name]: r.value
		}));
	};
	
	changeValue = (arr_name__key, var_name, var_value) => {
		FieldsJs.ChangeValue(arr_name__key, var_name, var_value, (r) => this.setState({
			[r.name]: r.value
		}), this.state);
	};
	
	closeModal = () => {
		this.setState({
			modal: {
				open: false
			}
		});
	};
	
	close = () => {
		this.closeModal();
	};
	
	openModal = () => {
		const props = this.props;
		this.setState({
			modal: {
				open: true
			}
		});
		console.log(this.state, props);
	};
	
	open = () => {
		this.ListarRuta();
		this.init().then(r => {
			setTimeout(() => this.openModal());
		}).catch(e => {
			console.log(e);
		});
	};
	
	RefreshInit = () => {
		this.init();
	};
	
	init = () => {
		return new Promise((resolve) => {
			resolve(true);
		});
	};
	
	save = () => {
		if (this.state.id_comentario > 0) {
			ComentarioService.Modificar(this.state).then((response) => {
				this.close();
				this.props.RefreshList();
				this.props.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.props.showSnackBars('error', error.mensaje);
			});
		} else {
			ComentarioService.Agregar(this.state).then((response) => {
				this.close();
				this.props.RefreshList(response.data);
				this.props.showSnackBars('success', response.mensaje);
			}).catch((error) => {
				this.props.showSnackBars('error', error.mensaje);
			});
		}
	};
	
	add = () => {
		console.log(this.props);
		this.setState({
			id_comentario: '',
			id_ruta: '',
			comentario: '',
			activo: true,
		});
		this.open();
	};
	
	edit = () => {
		const {item} = this.props;
		console.log(this.props);
		this.setState({
			id_comentario: item.id_comentario || '',
			id_ruta: item.id_ruta || '',
			comentario: item.comentario || '',
			activo: (item.activo === 1),
		});
		this.open();
	};
	
	view = () => {
		const {item} = this.props;
		console.log(this.props);
		this.setState({
			id_comentario: item.id_comentario || '',
			id_ruta: item.id_ruta || '',
			comentario: item.comentario || '',
			activo: (item.activo === 1),
		});
		this.open();
	};
	
	ListarRuta = () => {
		RutaService.Listar().then((response) => {
			this.setState({
				listar_ruta: response.data
			});
		}).catch((error) => {
			this.setState({
				listar_ruta: []
			});
		});
	}
	
	render() {
		
		let funcion;
		
		switch (this.state.tipo) {
			case 'edit':
				funcion = this.edit;
				break;
			case 'add':
				funcion = this.add;
				break;
			case 'view':
				funcion = this.view;
				break;
			default:
				funcion = () => {
				};
		}
		
		return (
			<div>
				
				{this.props.componente ? (
					<Fragment>
						<span
							style={{cursor: 'pointer'}}
							children={this.props.componente}
							onClick={() => funcion()}
						/>
					</Fragment>
				) : (
					<BotonAccionAbrirModal
						id={this.state.id_comentario}
						tipo={this.state.tipo}
						onClick={() => funcion()}
					/>
				)}
				
				<Dialog open={this.state.modal.open} onClose={() => this.close()} PaperComponent={DraggableModal}
				        disableEscapeKeyDown disableBackdropClick maxWidth={'sm'} fullWidth={true} scroll={'paper'}
				        transition={<Slide direction="up"/>} aria-labelledby="scroll-dialog-title"
				>
					
					<DialogTitle>
						<TituloHeaderModal
							tipo={this.state.tipo}
							titulo={'Comentario'}
						/>
					</DialogTitle>
					
					<DialogContent>
						
						<Grid container spacing={1}>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<TextField
									className={'margin-0'}
									select
									fullWidth
									margin="dense"
									onChange={this.handleChange}
									disabled={this.state.tipo === 'view'}
									SelectProps={{
										native: true,
										MenuProps: {},
									}}
									
									helperText="Requerido"
									name="id_ruta"
									label="Selecciona la ruta"
									value={this.state.id_ruta}
								>
									<option key={0} value={''}>&nbsp;</option>
									{this.state.listar_ruta.map(option => (
										<option key={option.id_ruta} value={option.id_ruta}>
											{option.zona +' '+ option.ruta}
										</option>
									))}
								</TextField>
							
							</Grid>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<TextField
									multiline
									margin="dense"
									name="comentario"
									label="Comentario"
									type="text"
									fullWidth
									defaultValue={this.state.comentario}
									onChange={this.handleChange}
									disabled={this.state.tipo === 'view'}
								/>
							
							</Grid>
							
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								
								<FormGroup row className={'margin-3-L'}>
									<FormControlLabel
										control={
											<Checkbox
												type="checkbox"
												disabled={this.state.tipo === 'view'}
												onChange={this.handleChange}
												color="primary"
												name='activo'
												checked={this.state.activo}
												value="activo"
											/>
										}
										label={'Activo'}
									/>
								</FormGroup>
							
							</Grid>
						
						</Grid>
					
					</DialogContent>
					
					<Divider/>
					
					<DialogActions>
						
						<BotonAccionFooterModal
							id={this.state.id_comentario}
							tipo={this.state.tipo}
							close={this.close}
							save={this.save}
						/>
					
					</DialogActions>
				
				</Dialog>
			
			</div>
		);
	}
}

ModalMonitor.propTypes = {
	componente: PropTypes.element,
	tipo: PropTypes.string.isRequired,
	item: PropTypes.object.isRequired,
	RefreshList: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
};

export default ModalMonitor;
