import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableRow from '@material-ui/core/TableRow/index';
import Paper from '@material-ui/core/Paper/index';
import Icon from "@material-ui/core/Icon/index";
import Divider from "@material-ui/core/Divider/index";
import Grid from "@material-ui/core/Grid/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Checkbox from "@material-ui/core/Checkbox/index";
import FormGroup from "@material-ui/core/FormGroup/index";


const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(1) * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
});

class ListaTabla extends Component {
	
	render() {
		
		const {classes, lista} = this.props;
		
		// console.log(lista);
		
		return (
			<Paper className={classes.root}>
				<Table className={classes.table + ' desing-acresco'}>
					<TableBody>
						{lista.map((value, index) => {
							return (<Fragment key={index}>
								
								<TableRow>
									
									<TableCell align={'left'}>
										<div className={'vertical-inline'}>
											<Icon className={'px-24 v-center'}>{value.icono}</Icon>
											<b className={'v-center margin-20-L'}>{value.menu}</b>
										</div>
									</TableCell>
									
									<TableCell align={'center'}>
										{value.activo === 1 ? 'Activo' : 'Inactivo'}
									</TableCell>
									
									<TableCell align={'center'} className={'padding-1-L padding-1-R'}>
										<div className={'w-auto vertical-inline'}>
											<div className={'v-center w-100'} align={'right'}>
												<FormControlLabel className={'h-30-px'}
												                  control={
													                  <Checkbox type="checkbox" color="primary"
													                            checked={value.acceso_menu === 1}
													                            onChange={(e) => {
														                            this.props.updatePermisoMenu(e, value);
													                            }}
													                  />
												                  }
												                  label={'Permitir'}
												                  labelPlacement="start"
												/>
											</div>
										</div>
									</TableCell>
								
								</TableRow>
								
								<TableRow>
									<TableCell colSpan={3} align={'center'}>
										
										{value.sub_menu.length > 0 ? (<Fragment>
											
											{value.sub_menu.map((item, key) => {
												return (<Grid key={key} container spacing={0}>
													
													<Grid item xs={12} sm={4} md={3} lg={3} xl={2}
													      className={'padding-5'}>
														
														<div className={'w-auto h-auto card-0 padding-15'}>
															
															<div className={'text-center w-100'}>
																
																<Icon className={'px-18'}>{item.icono}</Icon>
																
																<br/>
																
																{item.icono || 'Sin icono'}<br/>
																
																<Divider className={'margin-10-T margin-10-B'}/>
																
																<b>Label: {item.sub_menu}</b><br/>
																
																Ruta: {item.ruta}<br/>
																
																<FormGroup row>
																	<FormControlLabel className={'h-30-px'}
																	                  control={
																		                  <Checkbox type="checkbox"
																		                            color="primary"
																		                            checked={item.acceso_sub_menu === 1}
																		                            onChange={(e) => {
																			                            this.props.updatePermisoSubMenu(e, item);
																		                            }}
																		                  />
																	                  }
																	                  label={'Permitir'}
																	                  labelPlacement="end"
																	/>
																</FormGroup>
															
															</div>
														
														</div>
													
													</Grid>
													
													<Grid item xs={12} sm={8} md={9} lg={9} xl={10}
													      className={'padding-5'}>
													
													</Grid>
												
												</Grid>)
											})}
										
										</Fragment>) : (<Fragment>
											
											<div>
												No se ha agregado un menu
											</div>
										
										</Fragment>)}
									
									</TableCell>
								</TableRow>
							</Fragment>)
						})}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}

ListaTabla.propTypes = {
	classes: PropTypes.object.isRequired,
	lista: PropTypes.array.isRequired,
	updatePermisoMenu: PropTypes.func.isRequired,
	updatePermisoSubMenu: PropTypes.func.isRequired,
};

export default withStyles(styles)(ListaTabla);
