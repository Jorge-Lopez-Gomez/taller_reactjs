import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Home.css';
import logo_svg from '../../../assets/img/logo.png';

import IntegrationNotistack, {ShowSnackBarsNotistack} from "../../../settings/IntegrationNotistack/IntegrationNotistack";

// import Button from "@material-ui/core/Button";

class Home extends Component {
	
	constructor(props) {
		super(props);
	}
	
	showSnackBars = (type, message) => {
		ShowSnackBarsNotistack(this.props, type, message, null);
	};
	
	render() {
		
		const bg_logo_svg = {
			backgroundImage: `url(${logo_svg})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundAttachment: 'fixed',
			backgroundSize: '300px auto',
			opacity: '1',
		};
		
		return (
			<div className='Home ContaineViewComponet' style={bg_logo_svg}>
				<div className={'w-auto content-image vertical-inline'}>
					<div className={'w-100 v-center'}>
						{/*
						<Button onClick={() => this.showSnackBars('info', 'Bienvenidos a Acresco Integraciones!!')}>
							Show
						</Button>
						*/}
					</div>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
};

export default IntegrationNotistack(Home);
