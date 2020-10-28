import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
import {ReactLocalStorageService} from "../../../../settings/ReactLocalStorageService/ReactLocalStorageService";
import {PopupService} from "../../../../settings/PoPup/PoPup";
import {ZonaService} from "../../../../services/_Sis/ZonaService/ZonaService";
import ModalZona from "./ModalZona";
import {CONFIG} from "../../../../settings/Config/Config";

class ListaTabla extends Component {
	
	Usr = {};
	
	constructor() {
		super();
		this.Usr = ReactLocalStorageService.get('Usr') || {};
	}
	
	eliminar = (item) => {
		let msg = `¿Deseas eliminar la zona con id: ${item.id_zona}?`;
		PopupService.Confirm(['Cancelar', 'Eliminar'], 'warning', CONFIG.titulo_alert_confirm, msg).then((r) => {
			if (r.button === 'Eliminar') {
				ZonaService.Eliminar(item.id_zona).then((response) => {
					this.props.showSnackBars('success', response.mensaje);
					this.props.RefreshList();
				}).catch((error) => {
					this.props.showSnackBars('error', error.mensaje);
				});
			}
		});
	};
	
	render() {
		
		const {lista} = this.props;
		
		return (
			<Paper style={{overflowX: "auto"}}>
				<Table className={'desing-acresco'}>
					<TableHead>
						<TableRow>
							<TableCell component="th" align={'left'} className={'w-40-px padding-20-L padding-20-R'}>
								ID
							</TableCell>
							<TableCell component="th" align={'left'}>Zona</TableCell>
							<TableCell component="th" align={'left'}>Orientación</TableCell>
							<TableCell component="th" align={'center'}>Activo</TableCell>
							<TableCell component="th" align={'center'} className={'w-110-px'}>Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{lista.map((item, key) => (
							<TableRow key={key}>
								<TableCell align={'left'} className={'padding-20-L padding-20-R'}>
									{item.id_zona}
								</TableCell>
								<TableCell align={'left'}>
									{item.zona}
								</TableCell>
								<TableCell align={'left'}>{item.orientacion}</TableCell>
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
											<Tooltip TransitionComponent={Zoom} placement={"top"} title="Eliminar">
												<IconButton aria-label="Eliminar"
												            onClick={() => this.eliminar(item)}>
													<DeleteOutlined/>
												</IconButton>
											</Tooltip>
										</div>
										<div className={'v-center'}>
											<ModalZona
												tipo={'edit'}
												item={item}
												RefreshList={this.props.RefreshList}
												showSnackBars={this.props.showSnackBars}
											/>
										</div>
										<div className={'v-center'}>
											<ModalZona
												tipo={'view'}
												item={item}
												RefreshList={this.props.RefreshList}
												showSnackBars={this.props.showSnackBars}
											/>
										</div>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}

ListaTabla.propTypes = {
	lista: PropTypes.array.isRequired,
	RefreshList: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
};

export default ListaTabla;
