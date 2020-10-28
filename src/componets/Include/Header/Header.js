import React, {Component, Fragment} from 'react';
import DrawerMenu from '../Menu/Menu';

import {PopupService} from '../../../settings/PoPup/PoPup';

import {withRouter} from "react-router-dom";

import './Header.css';
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import {CONFIG} from "../../../settings/Config/Config";
import Temporizador from '../Temporizador/Temporizador'
import {AccessTimeOutlined, ExitToAppOutlined, SyncOutlined} from '@material-ui/icons';
import {VerificarTokenAccess} from "../../../services/_Sis/VerificarTokenAccess/VerificarTokenAccess";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import {str_search} from "../../../settings/General/General";

class Header extends Component {
	
	constructor() {
		super();
	}
	
	LogOut = () => {
		PopupService.Confirm(['Cancelar', 'Aceptar'], 'warning', CONFIG.titulo_alert_confirm, '¿Estas seguro de cerrar sesión?').then((r) => {
			if (r.button === 'Aceptar') {
				let Usr = ReactLocalStorageService.get('Usr') || {};
				Usr.menu = null;
				Usr.token = null;
				Usr.token_expire = null;
				ReactLocalStorageService.set('Usr', Usr);
				ReactLocalStorageService.remove('UsrTemp');
				this.props.history.push("/login");
			}
		});
	};
	
	RefeshTime = () => {
		VerificarTokenAccess.Active();
	};
	
	IsLogged = () => {
		let Usr = ReactLocalStorageService.get('Usr') || {};
		return Usr.token && Usr.token_expire ? 1 : 0;
	};
	
	IsMonitor = () => {
		return str_search(window.location.pathname, 'monitor') ? 1 : 0
	};
	
	IsTokenClick = () => {
		let Usr = ReactLocalStorageService.get('Usr') || {};
		
		let user_token_time = Usr.user_token_time || {};
		
		return user_token_time.time_token_click > 0;
	};
	
	render() {
		
		let Usr = ReactLocalStorageService.get('Usr') || {};
		
		let foto = '';
		
		if (Usr.foto) {
			foto = CONFIG.src + Usr.foto;
		} else {
			foto = CONFIG.foto_default;
		}
		
		const bg_foto = {
			backgroundImage: `url(${foto})`,
			backgroundColor: `white`
		};
		
		return (
			<header className={'Header'}>
				<div className={'row-flex'} style={{height: "100%"}}>
					<div className={'w-100 vertical-inline'} style={{height: "100%"}}>
						<div className="v-center w-100">
							<Grid container spacing={1} direction="row" justify="center" alignItems="center">
								<Grid item xs={5} sm={5} md={5} lg={5} xl={5} align={'left'}>
									<div className={'vertical-inline'}>
										<div className={'v-center w-50-px'} align={"center"}>
											<DrawerMenu/>
										</div>
										<div className={'v-center'}>
											{Usr.nombre_completo ? (
												<Hidden smDown>
													<p className={'ff-arial margin-0 vertical-inline v-center px-16 w-100'}
													   style={{
														   padding: "0px"
													   }}>{Usr.nombre_completo}</p>
												</Hidden>
											) : null}
											{this.IsLogged() === 1 ? (
												<p className={'ff-arial margin-0 vertical-inline v-center px-11'}
												   style={{
													   background: "black",
													   padding: "3px 10px",
													   borderRadius: "15px",
													   lineHeight: "11px",
													   color: "white"
												   }}>{Usr.tipo_usuario}</p>
											) : null}
										
										</div>
									</div>
								</Grid>
								<Grid item xs={7} sm={7} md={7} lg={7} xl={7} align={'right'}>
									<ul className="Menu">
										{/*{this.IsMonitor() === 0 && this.IsLogged() === 1 ? (
											<Fragment>
												{!this.IsTokenClick() ? (
													<li className={'cursor-pointer vertical-inline v-center ff-arial'}>
														<SyncOutlined className={'text-icon-header px-25 cursor-pointer'}
														              onClick={this.RefeshTime}/>
													</li>
												) : null}
												<li className={'cursor-pointer vertical-inline v-center ff-arial'}>
													<Hidden smDown><AccessTimeOutlined
														className={'text-icon-header px-18 v-center margin-7-R'}/></Hidden><Temporizador/>
												</li>
											</Fragment>
										) : null}*/}
										{this.IsLogged() === 1 ? (
											<li className={'cursor-pointer vertical-inline v-center ff-arial'}
											    onClick={() => this.LogOut()}>
												<ExitToAppOutlined/><Hidden smDown><span
												style={{marginLeft: "5px"}}>Cerrar sesión</span></Hidden>
											</li>
										) : null}
										{Usr.username ? (
											<li className={'cursor-pointer vertical-inline v-center ff-arial'}>
												<Hidden smDown><span
													style={{marginRight: "5px"}}>{Usr.username}</span></Hidden>
											</li>
										) : null}
										<li className={'cursor-pointer vertical-inline v-center padding-0'}>
											<div className={'w-30-px h-30-px card-1 b-r-100 v-center'}>
												<div
													className={'w-30-px h-30-px b-r-100 bg-img-contain-x-center-y-center'}
													style={bg_foto}>
												</div>
											</div>
										</li>
									</ul>
								</Grid>
							</Grid>
						</div>
					</div>
				</div>
			</header>
		);
		
	}
}

export default withRouter(Header);
