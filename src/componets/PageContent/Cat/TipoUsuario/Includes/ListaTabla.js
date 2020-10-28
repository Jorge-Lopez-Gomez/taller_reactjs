import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import Paper from '@material-ui/core/Paper/index';

import IconButton from "@material-ui/core/IconButton/index";
import Zoom from "@material-ui/core/Zoom/index";
import Tooltip from "@material-ui/core/Tooltip/index";
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlined from "@material-ui/icons/EditOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

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
							<TableCell component="th" align={'center'}
							           className={'w-40-px padding-20-L padding-20-R'}>ID</TableCell>
							<TableCell component="th" align={'left'}>Tipo usuario</TableCell>
							<TableCell component="th" align={'left'}>Descripción</TableCell>
							<TableCell component="th" align={'center'}>Activo</TableCell>
							<TableCell component="th" align={'center'} className={'w-110-px'}>Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							lista.map((item, key) => {
								return (
									<TableRow key={key}>
										<TableCell align={'center'}
										           className={'padding-20-L padding-20-R'}>{item.id_cat_tipo_usuario}</TableCell>
										<TableCell align={'left'}>{item.tipo_usuario}</TableCell>
										<TableCell align={'left'}>{item.descripcion}</TableCell>
										<TableCell align={'center'}>
											{item.activo === 1 ? (
												<div style={{
													width: "50px",
													color: "white",
													borderRadius: "3px",
													padding: "2px 10px",
													background: "darkgreen",
													display: "inline-grid",
												}}>Activo</div>
											) : (
												<div style={{
													width: "50px",
													color: "white",
													borderRadius: "3px",
													padding: "2px 10px",
													background: "#901C30",
													display: "inline-grid",
												}}>Inactivo</div>
											)}
										</TableCell>
										<TableCell align={'center'} className={'padding-5-L padding-5-R'}>
											
											<div className={'w-auto vertical-inline'}>
												<div className={'v-center'}>
													<Tooltip TransitionComponent={Zoom} placement={"top"}
													         title="Eliminar">
														<IconButton aria-label="Eliminar"
														            onClick={() => this.props.delete(item)}>
															<DeleteOutlined/>
														</IconButton>
													</Tooltip>
												</div>
												<div className={'v-center'}>
													<Tooltip TransitionComponent={Zoom} placement={"top"}
													         title="Editar">
														<IconButton aria-label="Editar"
														            onClick={() => this.props.edit(item)}>
															<EditOutlined/>
														</IconButton>
													</Tooltip>
												</div>
												<div className={'v-center'}>
													<Tooltip TransitionComponent={Zoom} placement={"top"}
													         title="Detalles">
														<IconButton aria-label="Detalles"
														            onClick={() => this.props.view(item)}>
															<SearchOutlined/>
														</IconButton>
													</Tooltip>
												</div>
											</div>
										
										</TableCell>
									</TableRow>
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
