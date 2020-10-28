import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import Paper from '@material-ui/core/Paper/index';

import IconButton from "@material-ui/core/IconButton/index";
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import Zoom from "@material-ui/core/Zoom/index";
import Tooltip from "@material-ui/core/Tooltip/index";
import Icon from "@material-ui/core/Icon/index";
import Divider from "@material-ui/core/Divider/index";
import EditOutlined from "@material-ui/icons/EditOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Add from '@material-ui/icons/Add';

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
		
		return (
			<Paper className={classes.root}>
				<Table className={classes.table + ' desing-acresco'}>
					<TableHead>
						<TableRow>
							<TableCell component="th" align={'center'} className={'w-60-px'}>...</TableCell>
							<TableCell component="th" align={'center'}>Icono</TableCell>
							<TableCell component="th" align={'left'}>Menu</TableCell>
							<TableCell component="th" align={'center'}>Orden</TableCell>
							<TableCell component="th" align={'center'}>Activo</TableCell>
							<TableCell component="th" align={'center'} className={'w-110-px'}>Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{lista.map((value, index) => {
							return (
								<Fragment key={index}>
									<TableRow>
										<TableCell align={'center'} className={'padding-1-L padding-1-R'}>
											<div className={'w-auto vertical-inline'}>
												<div className={'v-center'}>
													<Tooltip TransitionComponent={Zoom} placement={"top"}
													         title="Agregar Sub Menu">
														<IconButton aria-label="Agregar Sub Menu"
														            onClick={() => this.props.addSubMenu(value.id_menu)}>
															<Add/>
														</IconButton>
													</Tooltip>
												</div>
											</div>
										</TableCell>
										<TableCell align={'center'}>
											<Icon className={'px-18'}>{value.icono}</Icon><br/>
											{value.icono || 'Sin icono'}
										</TableCell>
										<TableCell align={'left'}>
											<b>{value.menu}</b>
										</TableCell>
										<TableCell align={'center'}>
											<h3 className={'padding-0 margin-0'}>{value.orden}</h3>
										</TableCell>
										<TableCell align={'center'}>
											{value.activo === 1 ? 'Activo' : 'Inactivo'}
										</TableCell>
										<TableCell align={'center'} className={'padding-1-L padding-1-R'}>
											<div className={'w-auto vertical-inline'}>
												<div className={'v-center'}>
													<Tooltip TransitionComponent={Zoom} placement={"top"}
													         title="Eliminar">
														<IconButton aria-label="Eliminar"
														            onClick={() => this.props.deleteMenu(value)}>
															<DeleteOutlined/>
														</IconButton>
													</Tooltip>
												</div>
												<div className={'v-center'}>
													<Tooltip TransitionComponent={Zoom} placement={"top"}
													         title="Editar">
														<IconButton aria-label="Editar"
														            onClick={() => this.props.editMenu(value)}>
															<EditOutlined/>
														</IconButton>
													</Tooltip>
												</div>
												<div className={'v-center'}>
													<Tooltip TransitionComponent={Zoom} placement={"top"}
													         title="Detalles">
														<IconButton aria-label="Detalles"
														            onClick={() => this.props.viewMenu(value)}>
															<SearchOutlined/>
														</IconButton>
													</Tooltip>
												</div>
											</div>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell colSpan={6} align={'center'}>
											
											{value.sub_menu.length > 0 ? (
												<div className={'grid-10-300-px'}>
													{value.sub_menu.map((item, key) => {
														return (
															<div key={key}
															     className={'h-100-20-px w-100-20-px card-0 padding-10'}>
																<div className={'text-center w-100'}>
																	
																	<Icon className={'px-18'}>{item.icono}</Icon><br/>
																	
																	{item.icono || 'Sin icono'}<br/>
																	
																	<Divider className={'margin-10-T margin-10-B'}/>
																	
																	<b>Label: {item.sub_menu}</b><br/>
																	
																	Ruta: {item.ruta}<br/>
																	
																	<h3 className={'padding-0 margin-0'}>{item.orden}</h3>
																	<br/>
																
																</div>
																<div className={'text-center'}>
																	<div className={'w-auto vertical-inline'}>
																		<div className={'v-center'}>
																			<Tooltip TransitionComponent={Zoom}
																			         placement={"top"}
																			         title="Eliminar">
																				<IconButton aria-label="Eliminar"
																				            onClick={() => this.props.deleteSubMenu(item)}>
																					<DeleteOutlined/>
																				</IconButton>
																			</Tooltip>
																		</div>
																		<div className={'v-center'}>
																			<Tooltip TransitionComponent={Zoom}
																			         placement={"top"}
																			         title="Editar">
																				<IconButton aria-label="Editar"
																				            onClick={() => this.props.editSubMenu(item)}>
																					<EditOutlined/>
																				</IconButton>
																			</Tooltip>
																		</div>
																		<div className={'v-center'}>
																			<Tooltip TransitionComponent={Zoom}
																			         placement={"top"}
																			         title="Detalles">
																				<IconButton aria-label="Detalles"
																				            onClick={() => this.props.viewSubMenu(item)}>
																					<SearchOutlined/>
																				</IconButton>
																			</Tooltip>
																		</div>
																	</div>
																</div>
															</div>
														)
													})}
												</div>
											) : (
												<div>
													No se ha agregado un menu
												</div>
											)}
										
										</TableCell>
									</TableRow>
								</Fragment>
							)
						})
						}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}

ListaTabla.propTypes = {
	classes: PropTypes.object.isRequired,
	lista: PropTypes.array.isRequired,
};

export default withStyles(styles)(ListaTabla);
