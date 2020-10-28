import React, {Component, Fragment} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer/index';
import Button from '@material-ui/core/Button/index';
import List from '@material-ui/core/List/index';
import Divider from '@material-ui/core/Divider/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Menu from '@material-ui/icons/Menu';
import {withRouter} from "react-router-dom";

import {CONFIG} from '../../../settings/Config/Config';
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import Icon from "@material-ui/core/Icon";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
/*
import Collapse from "@material-ui/core/Collapse";

import {ExpandLess, ExpandMore, Inbox, StarBorder} from '@material-ui/icons';
*/

import {PersonOutlined} from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";

import './Menu.css';

class DrawerMenu extends Component {
	
	Usr = {};
	menu = [];
	
	constructor() {
		super();
		
		this.state = {
			top: false,
			left: false,
			bottom: false,
			right: false,
			
			Usr: (ReactLocalStorageService.get('Usr') || {}),
			
			// open: false
		};
		
		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.renderSwitchIcon = this.renderSwitchIcon.bind(this);
		this.sideList = this.sideList.bind(this);
		this.go = this.go.bind(this);
	}
	
	toggleDrawer = (side, open) => () => {
		this.setState({...this.state, [side]: open});
	};
	
	renderSwitchIcon = (icono) => {
		return <Icon className={'px-22'}>{icono}</Icon>;
	};
	
	sideList = (tipo) => {
		
		let Usr = ReactLocalStorageService.get('Usr') || {};
		let menu = this.state.Usr.menu || [];
		let foto = '';
		
		if (Usr.foto) {
			foto = CONFIG.src + Usr.foto;
		} else {
			foto = CONFIG.foto_default;
		}
		
		const bg_foto = {
			backgroundColor: `white`,
			backgroundImage: `url(${foto})`,
		};
		
		let MENUS = (
			<div className={(tipo === 1 ? 'w-60-px' : 'w-300-px')}>
				{tipo === 1 ? (
					<Fragment>
						<div className={'padding-10-B padding-10-T'}>
							<div className={'w-50-px h-50-px card-1 b-r-100'}>
								<div className={'w-50-px h-50-px b-r-100 bg-img-contain-x-center-y-center'}
								     style={bg_foto}>
								</div>
							</div>
						</div>
					</Fragment>
				) : (
					<Fragment>
						<div style={{height: 0, width: '100%', top: '10px', position: 'relative', right: '10px'}} align={'right'}>
							<Tooltip TransitionComponent={Zoom} placement={"right"} title={'Ver perfil'}>
								<IconButton aria-label="Ver perfil" onClick={() => this.go('perfil')}>
									<PersonOutlined/>
								</IconButton>
							</Tooltip>
						</div>
						<div className={'w-auto h-auto padding-15'}>
							<div className={'row-flex'}>
								<div className={'w-100'} align={'center'}>
									<div className={'w-110-px h-110-px card-1 b-r-100'}>
										<div className={'w-110-px h-110-px b-r-100 bg-img-contain-x-center-y-center'}
										     style={bg_foto}>
										</div>
									</div>
								</div>
							</div>
							<div className={'row-flex'}>
								<div className={'w-100'}>
									<h2 className={'text-gray px-16 text-center margin-14-T margin-7-B'}>
										{Usr.nombre_completo || CONFIG.titulo_alert_confirm}
									</h2>
									{Usr.username ? (
										<h2 className={'text-gray px-14 text-center margin-7-T margin-7-B'}>
											{Usr.username}
										</h2>
									) : null}
									{Usr.tipo_usuario ? (
										<h3 className={'text-gray px-14 text-center margin-7-T margin-0-B'}>
											{Usr.tipo_usuario}
										</h3>
									) : null}
								</div>
							</div>
						</div>
					</Fragment>
				)}
				
				<Divider className={(tipo === 1 ? 'margin-10-T' : '')}/>
				
				{(menu || []).length > 0 ? (
					<List>
						{/*
						<ListItem button onClick={() => this.setState({open: !this.state.open})}>
							<ListItemIcon>
								<Inbox />
							</ListItemIcon>
							<ListItemText primary="Inbox" />
							{this.state.open ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={this.state.open} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button>
									<ListItemIcon>
										<StarBorder />
									</ListItemIcon>
									<ListItemText primary="Starred" />
								</ListItem>
							</List>
						</Collapse>
						*/}
						{menu && menu.map((item, index) => (
							<Tooltip key={index} TransitionComponent={Zoom} placement={"right"}
							         title={tipo === 1 ? item.sub_menu.sub_menu : ''}>
								<ListItem button onClick={() => this.go(item.sub_menu.ruta)} style={{
									justifyContent: tipo === 1 ? "center" : "",
									paddingTop: '6px',
									paddingBottom: '6px',
								}}>
									{tipo === 1 ? (
										<Fragment>
											<ListItemIcon style={{
												minWidth: '22px'
											}}>
												{this.renderSwitchIcon(item.sub_menu.icono)}
											</ListItemIcon>
										</Fragment>
									) : (
										<Fragment>
											<ListItemIcon>
												{this.renderSwitchIcon(item.sub_menu.icono)}
											</ListItemIcon>
											<ListItemText primary={item.sub_menu.sub_menu}/>
										</Fragment>
									)}
								</ListItem>
							</Tooltip>
						))}
					</List>
				) : (
					<List>
						<Tooltip TransitionComponent={Zoom} placement={"right"}
						         title={tipo === 1 ? 'Iniciar sesión' : ''}>
							<ListItem button onClick={() => this.go('login')} style={{
								justifyContent: tipo === 1 ? "center" : "",
								paddingTop: '6px',
								paddingBottom: '6px',
							}}>
								{tipo === 1 ? (
									<Fragment>
										<ListItemIcon style={{
											minWidth: '22px'
										}}>
											{this.renderSwitchIcon('input')}
										</ListItemIcon>
									</Fragment>
								) : (
									<Fragment>
										<ListItemIcon>
											{this.renderSwitchIcon('input')}
										</ListItemIcon>
										<ListItemText primary={'Iniciar sesión'}/>
									</Fragment>
								)}
							</ListItem>
						</Tooltip>
					</List>
				)}
			
			</div>
		);
		return MENUS;
	};
	
	go = (u) => {
		this.props.history.push('/' + u);
	};
	
	render() {
		
		let Cfg = ReactLocalStorageService.get('Cfg') || {};
		
		return (
			<div>
				
				<Button onClick={this.toggleDrawer('left', true)} className={'min-w-24-px'}><Menu
					className={'color-icon-menu'}/></Button>
				
				{Number(Cfg.tipo_menu > 0 ? Cfg.tipo_menu : CONFIG.menu) === 2 ? (
					<div className={'Menu-Shadow'} style={{
						position: "fixed",
						left: "0px",
						top: "60px",
						width: "70px",
						height: "calc(100vh - 60px)",
						backgroundColor: "ghostwhite",
					}}>
						{this.sideList(1)}
					</div>
				) : ''}
				
				<SwipeableDrawer open={this.state.left} onClose={this.toggleDrawer('left', false)}
				                 onOpen={this.toggleDrawer('left', true)}>
					
					<div tabIndex={0} role="button" onClick={this.toggleDrawer('left', false)}
					     onKeyDown={this.toggleDrawer('left', false)}>
						
						{this.sideList()}
					
					</div>
				
				</SwipeableDrawer>
			
			
			</div>
		);
	}
}

export default withRouter(DrawerMenu);
