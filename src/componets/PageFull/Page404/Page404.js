import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import login_background from '../../../assets/img/fondo-00.jpg';

import {Link, Redirect} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {ReactLocalStorageService} from '../../../settings/ReactLocalStorageService/ReactLocalStorageService';
import {VerificarTokenAccess} from "../../../services/_Sis/VerificarTokenAccess/VerificarTokenAccess";

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";
import LogoPageFull from "../../Include/MiniComponents/LogoPageFull";


class Page404 extends Component {
	
	state = {
		toLogIn: false,
		access: false
	};
	
	constructor() {
		super();
		
		const Usr = ReactLocalStorageService.get('Usr') || {};
		
		this.state = {
			toLogIn: false,
			access: null,
			Usr: Usr
		};
		
		this.handleChange = this.handleChange.bind(this);
		
		VerificarTokenAccess.Active().then((response) => {
			this.setState({
				access: 1
			});
		}).catch((error) => {
			this.setState({
				access: 0
			});
		})
	};
	
	showSnackBars(type, message) {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	handleChange(e) {
		const {value, name, checked, type} = e.target;
		this.setState({
			[name]: type === 'checkbox' ? checked : value
		});
	}
	
	render() {
		
		const bg_login = {
			backgroundImage: `url(${login_background})`
		};
		
		if (this.state.toLogIn === true) {
			return <Redirect to='/login'/>
		}
		
		return (
			<div className='Page404 bg-img-cover-x-center-y-center' style={bg_login}>
				<div className="row-flex h-100-vh bg-blue-login">
					<div className="w-100 v-center" align={'center'}>
						
						<div
							className="bg-white-transparent b-r-5 margin-10-L margin-10-R w-100-20-px max-w-400-px h-auto card-1 b-r-5">
							
							<div className="padding-20">
								
								<LogoPageFull/>
								
								<div className={'w-100 margin-20-B'}>
									<Typography variant="h4" gutterBottom>
										<span className={'text-gray px-40'}>404 | Not Found</span>
									</Typography>
								</div>
								
								<div className={'w-100 margin-10-T margin-10-B'}>
									
									{this.state.access === 1 ? (
										<Fragment>
											<Link to={'/home'}>inicio</Link>
										</Fragment>
									) : ''}
									
									{this.state.access === 0 ? (
										<Fragment>
											<Link to={'/login'}>login</Link>
										</Fragment>
									) : ''}
								</div>
							
							</div>
						
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Page404.propTypes = {
};

export default IntegrationNotistack(Page404);
