import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import Paper from '@material-ui/core/Paper/index';

import IconButton from "@material-ui/core/IconButton";
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import ModalUsuarios from "./ModalUsuarios";
import {FieldsJs} from "../../../../settings/General/General";
import {ReactLocalStorageService} from '../../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

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
	
	Usr = {};
	
	constructor() {
		super();
		
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		
	}
	
	eliminar = (item) => {
		this.props.$BroadcastModalUsuarios({
			accion: 'delete',
			status: true,
			item: item
		});
	};
	
	render() {
		
		const {classes, lista} = this.props;
		
		return (
			<Paper className={classes.root}>
				<Table className={classes.table + ' desing-acresco'}>
					<TableHead>
						<TableRow>
							<TableCell component="th" align={'left'}>Nombre completo</TableCell>
							<TableCell component="th" align={'left'}>
								Usuario y Correo electrónico
							</TableCell>
							<TableCell component="th" align={'center'}>Teléfono</TableCell>
							<TableCell component="th" align={'center'}>Ultima sesión</TableCell>
							<TableCell component="th" align={'center'}>Recibir correo electrónico</TableCell>
							<TableCell component="th" align={'center'}>Activo</TableCell>
							<TableCell component="th" align={'center'} className={'w-110-px'}>Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							lista.map((item, key) => {
								return (
									<TableRow key={key}>
										
										<TableCell align={'left'}>
											{item.nombre} {item.apellido_paterno} {item.apellido_materno}<br/>
											<b>({item.tipo_usuario})</b>
										</TableCell>
										
										<TableCell align={'left'}>
											<div>
												<div>
													Usuario: {item.username}<br/>
												</div>
												<div>
													<Typography className={'px-12'}>
														Contraseña: {item.password || 'En proceso'}<br/><br/>
													</Typography>
												</div>
												<div>
													Correo electrónico: {item.correo_electronico}
												</div>
											</div>
										</TableCell>
										
										<TableCell align={'center'}>
											{item.telefono || 'Sin telefono'}
										</TableCell>
										
										<TableCell align={'center'}>
											{item.ultima_sesion}
										</TableCell>
										
										<TableCell align={'center'}>
											{item.sendmail === 1 ? (
												<div style={{
													width: "30px",
													color: "white",
													borderRadius: "3px",
													padding: "2px 10px",
													background: "darkgreen",
													display: "inline-grid",
												}}>Si</div>
											) : (
												<div style={{
													width: "30px",
													color: "white",
													borderRadius: "3px",
													padding: "2px 10px",
													background: "#901C30",
													display: "inline-grid",
												}}>No</div>
											)}
										</TableCell>
										
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
												{FieldsJs.inArray([1, 2], this.Usr.id_cat_tipo_usuario) ? (
													<div className={'v-center'}>
														<Tooltip TransitionComponent={Zoom} placement={"top"}
														         title="Eliminar">
															<IconButton aria-label="Eliminar"
															            onClick={() => this.eliminar(item)}><DeleteOutlined/></IconButton>
														</Tooltip>
													</div>
												) : ''}
												{FieldsJs.inArray([1, 2], this.Usr.id_cat_tipo_usuario) ? (
													<div className={'v-center'}>
														<ModalUsuarios id_usuario={item.id_usuario} tipo={'edit'}
														               item={item}
														               $BroadcastModalUsuarios={this.props.$BroadcastModalUsuarios}/>
													</div>
												) : ''}
												<div className={'v-center'}>
													<ModalUsuarios id_usuario={item.id_usuario} tipo={'view'}
													               item={item}
													               $BroadcastModalUsuarios={this.props.$BroadcastModalUsuarios}/>
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
	$BroadcastModalUsuarios: PropTypes.func.isRequired,
};

export default withStyles(styles)(ListaTabla);
