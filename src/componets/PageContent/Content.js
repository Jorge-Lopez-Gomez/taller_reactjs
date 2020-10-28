import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Content.css';

class Content extends Component {
	static propTypes = {
		body: PropTypes.object.isRequired
	};
	
	render() {
		const {body} = this.props;
		
		return (
			<div className="Content">
				<div className={'h-100 w-100'}>
					{body}
				</div>
			</div>
		);
	}
}

export default Content;
