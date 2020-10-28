import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import {FieldsJs} from "../../../settings/General/General";
import {NavigateNext} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";

import DivSvg from "../../Include/MiniComponents/DivSvg";

import sexo from '../../../assets/img/icon-catalogo/sexo.svg';
import menu_alta_modulo from '../../../assets/img/icon-catalogo/menu_alta_modulo.svg';
import usuarios_roles_y_permisos from '../../../assets/img/icon-catalogo/usuarios_roles_y_permisos.svg';
import tipo_de_usuarios from '../../../assets/img/icon-catalogo/tipo_de_usuarios.svg';


class Catalogos extends Component {
	
	
	permisos = (cat) => {
		
		const Usr = ReactLocalStorageService.get('Usr') || {};
		
		let permitido = false;
		
		switch (cat) {
			case 'cat_sexo':
				permitido = FieldsJs.inArray([1, 2], Usr.id_cat_tipo_usuario);
				break;
			case 'roles_permisos':
				permitido = FieldsJs.inArray([1], Usr.id_cat_tipo_usuario);
				break;
			case 'menu_submenu':
				permitido = FieldsJs.inArray([1], Usr.id_cat_tipo_usuario);
				break;
			default:
		}
		
		return permitido;
	};
	
	
	render() {
		
		const btn_text_icon = (
			<Fab variant="extended" size="small" color="default" className={'px-10'}
			     style={{marginTop: "10px", padding: "0px 15px", height: "25px"}}>
				Configurar <NavigateNext className={'px-14'}/>
			</Fab>
		);
		
		return (
			<div className='Catalogos ContaineViewComponet'>
				
				<div style={{width: "100%"}} align={'center'}>
					<Typography variant={'h6'} className={'margin-0-T margin-20-B vertical-inline v-center'} style={{
						color: 'white',
						backgroundColor: 'gray',
						borderRadius: '10px',
						padding: '5px 30px',
						lineHeight: "20px",
						fontSize: "20px",
					}}>
						Configura los catálogos que se usaran en el sistema
					</Typography>
				</div>
				
				<div className={'grid-20-150-px'}>
					
					<div className={'card bg-white padding-15'}>
						<div className={'row-flex h-100'}>
							<div className={'w-100 h-92'}>
								<div className={'w-100 h-100-31-px'} align={'center'}>
									<DivSvg img={tipo_de_usuarios} height={100} width={100}/>
									<Typography className={'margin-13-T margin-15-B px-16'}>
										Tipo de usuarios
									</Typography>
								</div>
								<div className={'w-100 h-30-px'}>
									<Link to={'/tipousuario'}>
										{btn_text_icon}
									</Link>
								</div>
							</div>
						</div>
					</div>
					
					{this.permisos('cat_sexo') ? (
						<div className={'card bg-white padding-15'}>
							<div className={'row-flex h-100'}>
								<div className={'w-100 h-92'}>
									<div className={'w-100 h-100-31-px'} align={'center'}>
										<DivSvg img={sexo} height={100} width={100}/>
										<Typography className={'margin-13-T margin-15-B px-16'}>
											Sexo
										</Typography>
									</div>
									<div className={'w-100 h-30-px'}>
										<Link to={'/genero'}>
											{btn_text_icon}
										</Link>
									</div>
								</div>
							</div>
						</div>
					) : ''}
					
					{this.permisos('menu_submenu') ? (
						<div className={'card bg-white padding-15'}>
							<div className={'row-flex h-100'}>
								<div className={'w-100 h-92'}>
									<div className={'w-100 h-100-31-px'} align={'center'}>
										<DivSvg img={menu_alta_modulo} height={100} width={100}/>
										<Typography className={'margin-13-T margin-15-B px-16'}>
											Menus (Alta de módulos)
										</Typography>
									</div>
									<div className={'w-100 h-30-px'}>
										<Link to={'/menus'}>
											{btn_text_icon}
										</Link>
									</div>
								</div>
							</div>
						</div>
					) : ''}
					
					{this.permisos('roles_permisos') ? (
						<div className={'card bg-white padding-15'}>
							<div className={'row-flex h-100'}>
								<div className={'w-100 h-92'}>
									<div className={'w-100 h-100-31-px'} align={'center'}>
										<DivSvg img={usuarios_roles_y_permisos} height={100} width={100}/>
										<Typography className={'margin-13-T margin-15-B px-16'}>
											Roles y permisos
										</Typography>
									</div>
									<div className={'w-100 h-30-px'}>
										<Link to={'/rolespermisos'}>
											{btn_text_icon}
										</Link>
									</div>
								</div>
							</div>
						</div>
					) : ''}
				
				</div>
			
			</div>
		);
	}
}

export default Catalogos;
