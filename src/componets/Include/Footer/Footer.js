// Dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Assets
import './Footer.css';
import {CONFIG} from "../../../settings/Config/Config";

class Footer extends Component {
	
	static propTypes = {
		copyright: PropTypes.string
	};
	
	render() {
		
		const {copyright = `&copy; 2020 | ${CONFIG.titulo_alert_confirm} | Todos los derechos reservados`} = this.props;
		
		return (
			<footer className="Footer padding-30-L padding-30-R bg-black">
				<div className="row-flex w-100">
					<div className="w-100 h-50-px vertical-inline">
						
						<div className="w-100 v-center">
							<span className={'padding-0 margin-0 text-white'} dangerouslySetInnerHTML={{__html: copyright}}/>
						</div>
					
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;
