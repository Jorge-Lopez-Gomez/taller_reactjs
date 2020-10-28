import React, {Component} from 'react';

import Button from '@material-ui/core/Button/index';
import TextField from '@material-ui/core/TextField/index';
import Dialog from '@material-ui/core/Dialog/index';
import DialogActions from '@material-ui/core/DialogActions/index';
import DialogContent from '@material-ui/core/DialogContent/index';
import DialogTitle from '@material-ui/core/DialogTitle/index';
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Checkbox from "@material-ui/core/Checkbox/index";
import FormGroup from "@material-ui/core/FormGroup/index";
import Slide from "@material-ui/core/Slide/index";
import DraggableModal from "../../../../Include/DraggableModal/DraggableModal";

class ModalTipoUsuario extends Component {
	
	
	render() {
		
		return (
			<div>
				
				<Dialog open={this.props.modal.open} onClose={() => this.props.closeModal()} disableEscapeKeyDown
				        disableBackdropClick maxWidth={'sm'} fullWidth={true} scroll={'paper'}
				        transition={<Slide direction="up"/>} aria-labelledby="scroll-dialog-title"
				        PaperComponent={DraggableModal}
				>
					
					<DialogTitle>
						{this.props.modal.title} tipo usuario
					</DialogTitle>
					
					<DialogContent>
						
						<article>
							
							<TextField
								autoFocus
								margin="dense"
								name="tipo_usuario"
								label="Tipo usuario"
								type="text"
								fullWidth
								defaultValue={this.props.form.tipo_usuario}
								onChange={this.props.handleChange}
								disabled={this.props.modal.tipo === 'view'}
							/>
							
							<TextField
								multiline
								margin="dense"
								name="descripcion"
								label="Descripción"
								type="text"
								fullWidth
								defaultValue={this.props.form.descripcion}
								onChange={this.props.handleChange}
								disabled={this.props.modal.tipo === 'view'}
							/>
							
							<FormGroup row className={'margin-3-L'}>
								<FormControlLabel
									control={
										<Checkbox type="checkbox" name='activo' checked={this.props.form.activo}
										          onChange={this.props.handleChange} value="activo" color="primary"
										          disabled={this.props.modal.tipo === 'view'}/>
									}
									label={'Activo'}
								/>
							</FormGroup>
						
						</article>
					
					</DialogContent>
					
					<DialogActions>
						
						<Button onClick={() => this.props.closeModal()} color="primary">
							{this.props.modal.tipo === 'view' ? 'Cerrar' : 'Cancelar'}
						</Button>
						
						{this.props.modal.tipo !== 'view' ? (
							<Button onClick={() => this.props.save()} color="primary">
								{this.props.form.id_cat_tipo_usuario > 0 ? 'Actualizar' : 'Agregar'}
							</Button>
						) : ''}
					
					</DialogActions>
				
				</Dialog>
			
			
			</div>
		);
	}
}

export default ModalTipoUsuario;
