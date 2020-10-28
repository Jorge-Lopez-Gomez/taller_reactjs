import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

class DivSvg extends Component {
	
	render() {
		const style = {
			backgroundImage: `url(${this.props.img})`,
			opacity: this.props.opacity ? 0.5 : 1,
			height: this.props.height,
			width: this.props.width
		};
		return (
			<Fragment>
				<div className={'b-r-7 bg-img-cover-x-center-y-center ' + (this.props.cursorPointer || '')}
				     style={style}
				     onClick={this.props.onClick}
				/>
			</Fragment>
		);
	}
}

DivSvg.propTypes = {
	img: PropTypes.any.isRequired,
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	opacity: PropTypes.bool,
	cursorPointer: PropTypes.bool,
	onClick: PropTypes.func,
};

export default DivSvg;
