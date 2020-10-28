import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import BG_1 from '../../../assets/img/modal/BG_1.svg';
import BG_2 from '../../../assets/img/modal/BG_2.svg';
import BG_3 from '../../../assets/img/modal/BG_3.svg';
import BG_4 from '../../../assets/img/modal/BG_4.svg';

import Typography from "@material-ui/core/Typography";

class ModalMessageConfirmation extends Component {
	
	constructor(props) {
		super(props);
	}
	
	bg = (bi, tipo) => {
		let b, position;
		switch (bi) {
			case 1:
				position = 'bg-svg-contain-x-left-y-top bg-modal-size-1';
				b = {
					backgroundImage: `url(${BG_1})`
				};
				break;
			case 2:
				position = 'bg-svg-contain-x-left-y-top bg-modal-size-1';
				b = {
					backgroundImage: `url(${BG_2})`
				};
				break;
			case 3:
				position = 'bg-svg-contain-x-left-y-bottom bg-modal-size-2';
				b = {
					backgroundImage: `url(${BG_3})`
				};
				break;
			case 4:
				position = 'bg-svg-contain-x-left-y-bottom bg-modal-size-2';
				b = {
					backgroundImage: `url(${BG_4})`
				};
				break;
			default:
				position = 'bg-svg-contain-x-left-y-top bg-modal-size-1';
				b = {
					backgroundImage: `url(${BG_1})`
				};
		}
		if (tipo === 1) {
			return b;
		} else if (tipo === 2) {
			return position;
		}
	};
	
	render() {
		
		const bg_modal = this.bg(this.props.modal.bg, 1);
		const bg_size = this.bg(this.props.modal.bg, 2);
		
		return (
			<div>
				
				<Dialog open={this.props.modal.open} onClose={() => this.props.closeModal()} disableEscapeKeyDown
				        disableBackdropClick maxWidth={'sm'} fullWidth={true} transition={<Slide direction="up"/>}>
					
					<div style={bg_modal} className={bg_size}>
						
						<DialogContent className={'h-250-px'}>
							
							<Typography variant="h3"
							            className={'px-30 text-right padding-150-L margin-50-B margin-30-T'}>
								{this.props.modal.title}
							</Typography>
							
							<Typography variant="h3"
							            className={'px-20 text-right padding-150-L margin-15-B margin-15-T'}>
								{this.props.modal.message}
							</Typography>
						
						</DialogContent>
						
						<DialogActions>
							<Button onClick={() => this.props.closeModal()}
							        color="primary">{this.props.modal.button}</Button>
							{/*<Grid container spacing={0}>*/}
							{/*	<Grid item className={'text-center'} xs={12} sm={12} md={12} lg={12} xl={12}>*/}
							{/*	</Grid>*/}
							{/*</Grid>*/}
						</DialogActions>
					
					</div>
				
				</Dialog>
			
			</div>
		);
	}
}

export default ModalMessageConfirmation;
