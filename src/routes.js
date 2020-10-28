import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import App from './componets/App';
import LogInIndex from './componets/PageFull/LogIn';
import RegistroIndex from './componets/PageFull/Registro';
import RegistroDatosPersonalesIndex from './componets/PageFull/RegistroDatosPersonales';
import RecuperarIndex from './componets/PageFull/Recuperar';
import VerificarIndex from './componets/PageFull/Verificar';
import CambiarContrasenaIndex from './componets/PageFull/CambiarContrasena';
import CatalogosIndex from './componets/PageContent/Catalogos';
import SexoIndex from './componets/PageContent/Cat/Sexo';
import TipoUsuarioIndex from './componets/PageContent/Cat/TipoUsuario';
import MenuSubMenuIndex from './componets/PageContent/Cat/MenuSubMenu';
import RolesPermisosIndex from './componets/PageContent/Cat/RolesPermisos';
import UsuariosIndex from './componets/PageContent/Usuarios';
import HomeIndex from './componets/PageContent/Home';
import PerfilIndex from './componets/PageContent/Perfil';
import OrientacionIndex from './componets/PageContent/Orientacion';
import ZonaIndex from './componets/PageContent/Zona';
import RutaIndex from './componets/PageContent/Ruta';
import ComentarioIndex from './componets/PageContent/Comentario';
import MonitorIndex from './componets/PageContent/Monitor';

import Page404Index from './componets/PageFull/Page404';

import EventListenerClickDom from './componets/Include/EventListenerClickDom/EventListenerClickDom';

class AppRoutes extends Component {
	
	render() {
		return (
			<Fragment>
				<EventListenerClickDom/>
				<App>
					<Switch>
						<Route exact path="/login" component={LogInIndex}/>
						<Route exact path="/registro" component={RegistroIndex}/>
						<Route exact path="/registrodatospersonales" component={RegistroDatosPersonalesIndex}/>
						<Route exact path="/recuperar" component={RecuperarIndex}/>
						<Route exact path="/verificar" component={VerificarIndex}/>
						<Route exact path="/cambiarcontrasena" component={CambiarContrasenaIndex}/>
						<Route exact path="/catalogo" component={CatalogosIndex}/>
						<Route exact path="/genero" component={SexoIndex}/>
						<Route exact path="/tipousuario" component={TipoUsuarioIndex}/>
						<Route exact path="/menus" component={MenuSubMenuIndex}/>
						<Route exact path="/rolespermisos" component={RolesPermisosIndex}/>
						<Route exact path="/usuario" component={UsuariosIndex}/>
						<Route exact path="/home" component={HomeIndex}/>
						<Route exact path="/perfil" component={PerfilIndex}/>

						<Route exact path="/orientacion" component={OrientacionIndex}/>
						<Route exact path="/zona" component={ZonaIndex}/>
						<Route exact path="/ruta" component={RutaIndex}/>
						<Route exact path="/comentario" component={ComentarioIndex}/>
						<Route exact path="/monitor" component={MonitorIndex}/>
						
						<Route exact path="/" component={LogInIndex}/>
						<Route component={Page404Index}/>
					</Switch>
				</App>
			</Fragment>
		);
	}
}

export default AppRoutes;
