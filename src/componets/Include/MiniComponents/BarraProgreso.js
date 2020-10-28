import React, {Component, Fragment} from "react";

export class BarraProgreso extends Component {
	
	render() {
		return (
			<Fragment>
				<div style={{
					width: '100%',
					height: '20px',
					backgroundColor: 'lightgray',
					borderRadius: '3px'
				}}>
					<div style={{
						height: '1px',
						width: '100%',
						textAlign: 'center',
						color: 'white',
						fontSize: '12px',
						textShadow: '1px 1px 2px black, 0 0 1em black, 0 0 0.2em black',
					}}>
						{this.props.progreso || 0}% {this.props.labelText || ''}
					</div>
					<div style={{
						height: '20px',
						backgroundColor: this.props.color || 'green',
						borderRadius: '3px',
						width: (this.props.progreso || 0) + "%"
					}}/>
				</div>
			</Fragment>
		);
	}
}
