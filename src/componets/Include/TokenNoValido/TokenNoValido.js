import React, {Component, Fragment} from 'react';

import {PopupService} from '../../../settings/PoPup/PoPup';

import {withRouter} from "react-router-dom";
import WARNING_IMAGE from "../../../assets/img/icons/warning.svg";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import {CONFIG} from "../../../settings/Config/Config";

class TokenNoValido extends Component {
	
	constructor() {
		super();
		this.ToLogin = this.ToLogin.bind(this);
	}
	
	ToLogin = () => {
		PopupService.Confirm(['Cancelar', 'Aceptar'], 'warning', CONFIG.titulo_alert_confirm, '¿Deseas realizar el inicio de sesión?').then((r) => {
			if (r.button === 'Aceptar') {
				this.props.history.push("/login");
			}
		});
	};
	
	render() {
		return (
			<Fragment>
				<section className={'w-100 h-100 vertical-inline'}>
					
					<div className={'v-center w-100'} align={'center'}>
						
						<div className={'max-w-500-px w-100 card-0 padding-30'}>
							<Grid container direction="row" justify="center" alignItems="center" spacing={2}>
								
								<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
									<div className={'padding-30'}>
										<img src={WARNING_IMAGE} alt="error" width={'200px'} height={'auto'}/>
									</div>
								</Grid>
								
								<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
									<Typography variant={'h6'} className={'text-center'}>
										El token de autenticación ha expirado
									</Typography>
									<Divider className={'margin-15-T margin-15-B'}/>
									<Button onClick={this.ToLogin} color="primary">Iniciar sesion</Button>
								</Grid>
							
							</Grid>
						</div>
					
					</div>
				
				
				</section>
			</Fragment>
		);
		
	}
}

export default withRouter(TokenNoValido);
