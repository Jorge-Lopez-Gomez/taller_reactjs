import React, {Component, Fragment} from 'react';
import {ValidarTipoExpiracionDeToken} from "../../../settings/General/General";

class EventListenerClickDom extends Component {
	
	constructor() {
		super();
		this.EventListenerClickDom();
	}
	
	EventListenerClickDom = () => {
		document.addEventListener('click', function (event) {
			
			// event.preventDefault();
			
			ValidarTipoExpiracionDeToken();
			
		}, false);
	};
	
	
	render() {
		
		return (
			<Fragment/>
		);
	}
}

export default EventListenerClickDom;

