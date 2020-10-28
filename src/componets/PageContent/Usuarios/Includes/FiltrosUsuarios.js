import React, {Component, Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import {HdrStrong, MailOutline, PersonOutlined, SearchOutlined, ViewList, ViewModule} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import {FieldsJs} from '../../../../settings/General/General';
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";
import {TipoUsuarioService} from "../../../../services/_Cat/TipoUsuarioService/TipoUsuarioService";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";


class FiltrosUsuarios extends Component {
	
	state = {};
	
	constructor() {
		super();
		this.state = {
			usuario: '',
			correo_electronico: '',
			id_cat_tipo_usuario: '',
			lista_tipo_usuario: [],
			activo: true,
		};
		
		this.ListaTipoUsuario();
	}
	
	ListaTipoUsuario = () => {
		TipoUsuarioService.Listar().then((response) => {
			this.setState({
				lista_tipo_usuario: response.data,
			});
		}).catch((error) => {
			this.setState({
				lista_tipo_usuario: []
			});
			this.showSnackBars('error', error.mensaje);
		});
	};
	
	handleChange = (e, variable, campo, date, input) => {
		FieldsJs.HandleChange(e, variable, campo, date, input, (r) => this.setState({
			[r.name]: r.value
		}));
		setTimeout(() => this.HandleFiltro());
	};
	
	HandleFiltro = () => {
		let filtro = {};
		
		filtro.usuario = this.state.usuario || null;
		filtro.correo_electronico = this.state.correo_electronico || null;
		filtro.id_cat_tipo_usuario = this.state.id_cat_tipo_usuario || null;
		filtro.activo = this.state.activo || null;
		
		this.props.HandleFiltro(filtro);
	};
	
	AplicarFiltro = () => {
		this.props.AplicarFiltros();
	};
	
	render() {
		return (
			<Fragment>
				<Grid container spacing={2} alignContent={"flex-end"} alignItems={"flex-end"}>
					
					<Grid item xs={6} sm={6} md={6} lg={3} xl={3} align={'left'}>
						<Grid container spacing={1} alignItems={"flex-end"}>
							<Grid item className={'w-30-px'}>
								<PersonOutlined className={'w-100 text-gray'}/>
							</Grid>
							<Grid item className={'w-100-30-px'}>
								<TextField
									type={'text'}
									fullWidth
									name="usuario"
									onChange={this.handleChange}
									label="Usuario"
									autoComplete={'off'}
									value={this.state.usuario}
								/>
							</Grid>
						</Grid>
					</Grid>
					
					<Grid item xs={6} sm={6} md={6} lg={3} xl={3} align={'left'}>
						<Grid container spacing={1} alignItems={"flex-end"}>
							<Grid item className={'w-30-px'}>
								<HdrStrong className={'w-100 text-gray'}/>
							</Grid>
							<Grid item className={'w-100-30-px'}>
								<TextField
									select
									fullWidth
									margin="none"
									onChange={this.handleChange}
									SelectProps={{
										native: true,
										MenuProps: {
											className: '',
										},
									}}
									
									name="id_cat_tipo_usuario"
									label="Tipo Usuario"
									value={this.state.id_cat_tipo_usuario}
								>
									<option key={0} value={''}>&nbsp;</option>
									{this.state.lista_tipo_usuario.map(option => (
										<option key={option.id_cat_tipo_usuario}
										        value={option.id_cat_tipo_usuario}>
											{option.tipo_usuario}
										</option>
									))}
								</TextField>
							</Grid>
						</Grid>
					</Grid>
					
					<Grid item xs={6} sm={6} md={6} lg={3} xl={3} align={'left'}>
						<Grid container spacing={1} alignItems={"flex-end"}>
							<Grid item className={'w-30-px'}>
								<MailOutline className={'w-100 text-gray'}/>
							</Grid>
							<Grid item className={'w-100-30-px'}>
								<TextField
									type={'text'}
									fullWidth
									name="correo_electronico"
									onChange={this.handleChange}
									label="Correo electrónico"
									autoComplete={'off'}
									value={this.state.correo_electronico}
								/>
							</Grid>
						</Grid>
					</Grid>
					
					<Grid item xs={6} sm={6} md={6} lg={2} xl={2} align={'left'}>
						<Grid container spacing={1} alignItems={"flex-end"}>
							<Grid item className={'w-30-px'}>
								<PersonOutlined className={'w-100 text-gray'}/>
							</Grid>
							<Grid item className={'w-100-30-px'}>
								<FormControl fullWidth>
									<InputLabel htmlFor="age-native-activo">Activo</InputLabel>
									<Select
										native
										value={this.state.activo}
										onChange={this.handleChange}
										inputProps={{
											name: 'activo',
											id: 'age-native-activo',
										}}
									>
										<option value={'all'}>Todos</option>
										<option value={1}>Activo</option>
										<option value={0}>Inactivo</option>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
					
					<Grid item xs={12} sm={12} md={6} lg={1} xl={1} align={'right'}>
						<Fab variant="extended" size="small" color="default" aria-label="Add"
						     onClick={this.AplicarFiltro}>
							<SearchOutlined className={'margin-5-R px-14'}/> Buscar
						</Fab>
					</Grid>
				
				</Grid>
			</Fragment>
		);
	}
}

FiltrosUsuarios.propTypes = {
	HandleFiltro: PropTypes.func.isRequired,
	AplicarFiltros: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
};

export default FiltrosUsuarios;
