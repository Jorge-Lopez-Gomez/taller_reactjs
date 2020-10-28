import React from 'react';

import {withStyles} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";

import Close from '@material-ui/icons/Close';

import {SnackbarProvider, withSnackbar} from 'notistack';

import {withRouter} from "react-router-dom";

import {ReactLocalStorageService} from "../ReactLocalStorageService/ReactLocalStorageService";



const styles = theme => ({
	margin: {
		margin: theme.spacing(1),
	},
});



export const ShowSnackBarsNotistack = (props, type, message, time) => {
	let Cfg = ReactLocalStorageService.get('Cfg') || {};
	if (!(time > 0)) {
		if (Number(Cfg.tiempo_toast) > 0) {
			time = Number(Cfg.tiempo_toast) * 1000;
		} else {
			time = 10000;
		}
	}
	props.enqueueSnackbar(message || 'Sin mensaje!', {
		variant: type || 'info',
		autoHideDuration: time || 10000,
		action: key => (
			<IconButton size={"small"} key="close" aria-label="close" color="inherit"
			            onClick={() => props.closeSnackbar(key)}>
				<Close/>
			</IconButton>
		),
	});
};



export const IntegrationNotistack = (SkComponente) => {
	let time = 0;
	let Cfg = ReactLocalStorageService.get('Cfg') || {};
	if (!(time > 0)) {
		if (Number(Cfg.tiempo_toast) > 0) {
			time = Number(Cfg.tiempo_toast) * 1000;
		} else {
			time = 10000;
		}
	}
	const SkView = withSnackbar(withRouter(SkComponente));
	return withStyles(styles)((props) => {
		const View = SkView;
		return (
			<SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top', horizontal: 'right'}} autoHideDuration={time || 10000}>
				<View {...props}/>
			</SnackbarProvider>
		);
	});
};

export default IntegrationNotistack;
