import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {ReactLocalStorageService} from "../../../../settings/ReactLocalStorageService/ReactLocalStorageService";
import Grid from "@material-ui/core/Grid";
import img_carrito from '../../../../assets/img/abasto.png';
import ModalComentario from "../../Comentario/Includes/ModalComentario";
import IconButton from "@material-ui/core/IconButton/index";
import Zoom from "@material-ui/core/Zoom/index";
import Tooltip from "@material-ui/core/Tooltip/index";
import {Sms} from '@material-ui/icons';
import {FieldsJs} from "../../../../settings/General/General";

class Monitor extends Component {
	
	Usr = {};
	
	constructor() {
		super();
		this.Usr = ReactLocalStorageService.get('Usr') || {};
	}
	
	render() {
		
		const {lista} = this.props;
		
		const carrito = {
			backgroundImage: `url(${img_carrito})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
			backgroundPosition: 'center center',
			opacity: '0.8',
			height: '70px',
			width: '150px'
		};
		
		return (
			<Grid container spacing={4}>
				
				
				{lista.map((item, key) => (
					<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<div align={'center'} style={{fontWeight: 'bold', fontSize: '20px'}}>
									{item.orientacion}
								</div>
							</Grid>
							
							
							{item.zonas.map((item2, key2) => (
									<Fragment>
										{
											item2.rutas.length > 0 ? (
												<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
													
													
													<div align={'left'} className={'px-18'} style={{fontWeight: 'bold'}}>
														{item2.zona}
													</div>
													
													{item2.rutas.map((item3, key3) => (
														<div className={'w-100 margin-10-T padding-10-B borde-punteado-danger-1 border-gray'}>
															
															<div className={'vertical-inline w-100'}>
																<div className={'v-center w-160-px'}>
																	<div style={carrito}></div>
																	<div align={'center'} className={'px-19'} style={{color: '#2b4ca0', fontWeight: 'bold', marginTop: '-15px'}}>
																		{item3.ruta}
																	</div>
																</div>
																<div className={'v-center w-100-160-px'}>
																	<div align={'left'} className={'w=100 margin-10-T px-16'}>
																		Comentario
																	</div>
																	<div align={'left'} className={'w=100 px-18 margin-10-T'} style={{fontWeight: 'bold'}}>
																		{item3.comentario}
																	</div>
																</div>
																{FieldsJs.inArray([1, 2, 3], this.Usr.id_cat_tipo_usuario) ? (
																	<div className={'v-center w-70-px'}>
																		<ModalComentario
																			tipo={'add'}
																			componente={
																				<Tooltip TransitionComponent={Zoom} placement={"top"} title="Agregar comentario">
																					<IconButton aria-label="Agregar comentario">
																						<Sms/>
																					</IconButton>
																				</Tooltip>
																			}
																			item={item3}
																			RefreshList={this.props.RefreshList}
																			showSnackBars={this.props.showSnackBars}
																		/>
																	</div>
																) : null}
															</div>
														</div>
													))}
												</Grid>
											) : null
										}
									</Fragment>
								
								)
							)}
						
						</Grid>
					</Grid>
				))}
			</Grid>
		)
	}
}

Monitor.propTypes = {
	lista: PropTypes.array.isRequired,
	RefreshList: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
};

export default Monitor;
