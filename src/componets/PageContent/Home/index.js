import React, {Component, Fragment} from 'react';

import Header from '../../Include/Header/Header';
import Footer from '../../Include/Footer/Footer';

import Home from './Home';
import './Home.css';

import {VerificarTokenAccess} from '../../../services/_Sis/VerificarTokenAccess/VerificarTokenAccess';
import {ReactLocalStorageService} from "../../../settings/ReactLocalStorageService/ReactLocalStorageService";
import TokenNoValido from "../../../componets/Include/TokenNoValido/TokenNoValido";
import {GetTipoMenu} from "../../../settings/General/General";

class HomeIndex extends Component {
	
	state = {
		access: false
	};
	
	constructor(props) {
		
		super(props);
		
		this.Usr = ReactLocalStorageService.get('Usr') || {};
		
		this.state = {
			access: null
		};
		
		VerificarTokenAccess.Active().then((response) => {
			this.setState({
				access: 1
			});
		}).catch((error) => {
			this.setState({
				access: 0
			});
		});
	}
	
	render() {
		return (
			<div className='HomeIndex'>
				
				<Header/>
				
				<div className={`Container ${GetTipoMenu()}`}>
					
					{this.state.access === 1 ? (
						
						<Fragment>
							
							<Home/>
							
							<Footer/>
						
						</Fragment>
					
					) : ''}
					
					{this.state.access === 0 ? (
						
						<Fragment>
							
							<TokenNoValido/>
						
						</Fragment>
					
					) : ''}
				
				</div>
			
			</div>
		);
	}
}

export default HomeIndex;
