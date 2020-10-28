import React, {Fragment} from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import {Add, EditOutlined, EventNote, PictureAsPdf, SearchOutlined, Sync} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

export const BotonExportarListaPDF = ({onClick}) => {
	return (
		<Fab variant="extended" size="small" color="primary" style={{backgroundColor: "#8e1e32"}} onClick={onClick}>
			<PictureAsPdf style={{fontSize: 14, marginRight: 5}}/> PDF
		</Fab>
	);
};

export const BotonExportarListaExcel = ({onClick}) => {
	return (
		<Fab variant="extended" size="small" color="primary" style={{backgroundColor: "#006300"}} onClick={onClick}>
			<EventNote style={{fontSize: 14, marginRight: 5}}/> Excel
		</Fab>
	);
};

export const BotonActualizarLista = ({onClick}) => {
	return (
		<Fab variant="extended" size="small" color="primary" style={{backgroundColor: "#3f50b6"}} onClick={onClick}>
			<Sync style={{fontSize: 14, marginRight: 5}}/> Actualizar
		</Fab>
	);
};


export const CabeceraTituloPdfExcelLista = ({titulo, botonPDF, botonEXCEL, botonLISTA, marginTop, marginBottom}) => {
	return (
		<Grid container direction="row" justify="space-between" alignItems="center" spacing={2}
		      style={{marginTop: marginTop || 0, marginBottom: marginBottom || 10}}>
			<Grid item>
				<Typography variant={'h5'} className={'text-left'}>
					{titulo}
				</Typography>
			</Grid>
			<Grid item>
				<Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
					<Grid item>
						{botonPDF}
					</Grid>
					<Grid item>
						{botonEXCEL}
					</Grid>
					<Grid item>
						{botonLISTA}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export const BotonAccionAbrirModal = ({id, tipo, onClick}) => {
	
	var boton = '';
	
	if (id > 0) {
		if (tipo === 'edit') {
			boton = (
				<Tooltip TransitionComponent={Zoom} placement={"top"} title="Editar">
					<IconButton aria-label="Editar" onClick={onClick}>
						<EditOutlined/>
					</IconButton>
				</Tooltip>
			);
		} else if (tipo === 'view') {
			boton = (
				<Tooltip TransitionComponent={Zoom} placement={"top"} title="Detalles">
					<IconButton aria-label="Detalles" onClick={onClick}>
						<SearchOutlined/>
					</IconButton>
				</Tooltip>
			);
		}
	} else {
		boton = (
			<Zoom className={'btn-fixed-bottom-right cursor-pointer'} key={'inherit'} timeout={1500} in={true}
			      style={{transitionDelay: `${100}ms`}} unmountOnExit>
				<Fab color={'primary'} onClick={onClick}>
					<Add/>
				</Fab>
			</Zoom>
		);
	}
	
	return boton;
};


export const TituloHeaderModal = ({tipo, titulo}) => {
	let txt;
	switch (tipo) {
		case "new":
			txt = "Nuevo";
			break;
		case "add":
			txt = "Agregar";
			break;
		case "edit":
			txt = "Editar";
			break;
		case "view":
			txt = "Detalle";
			break;
		default:
			txt = ""
	}
	return (
		<Fragment>
			{txt} {titulo}
		</Fragment>
	);
};

export const BotonAccionFooterModal = ({id, tipo, close, save}) => {
	return (
		<Fragment>
			<Button onClick={close} color="primary">
				{tipo === 'view' ? 'Cerrar' : 'Cancelar'}
			</Button>
			{tipo !== 'view' ? (
				<Button onClick={save} color="primary">
					{id > 0 ? 'Actualizar' : 'Agregar'}
				</Button>
			) : ''}
		</Fragment>
	);
};
