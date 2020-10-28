import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import DivSvg from "../MiniComponents/DivSvg";
import img_lista_vacia from '../../../assets/img/logo.png'
import img_reportar from '../../../assets/img/icons/reportar.svg'
import img_red from '../../../assets/img/icons/red.svg'
import img_enterprise from '../../../assets/img/icons/enterprise.svg';
import Typography from "@material-ui/core/Typography";

class VistaVacia extends Component {
	render() {
		let image;
		switch (this.props.numero) {
			case 0:
				image = img_lista_vacia;
				break;
			case 1:
				image = img_reportar;
				break;
			case 2:
				image = img_red;
				break;
			case 3:
				image = img_enterprise;
				break;
			default:
				image = null;
		}
		if (this.props.image) {
			image = this.props.image;
		}
		return (
			<Fragment>
				<div className={'w-auto'} align={'center'} style={{padding: this.props.padding || '50px'}}>
					<DivSvg img={image} height={this.props.height || '150px'} width={this.props.width || '350px'}
					        opacity={true}/>
					{this.props.mensaje ? (
						<Typography className={'text-center px-16'} style={{opacity: 0.5, padding: (this.props.paddingText || "20px"), color: this.props.colorText || 'gray'}}>
							{this.props.mensaje}
						</Typography>
					) : ''}
				</div>
			</Fragment>
		);
	}
}


VistaVacia.propTypes = {
	numero: PropTypes.oneOfType([
		PropTypes.number.isRequired,
		PropTypes.oneOf([null]).isRequired,
	]),
	height: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	padding: PropTypes.string,
	paddingText: PropTypes.string,
	colorText: PropTypes.string,
	image: PropTypes.string,
	mensaje: PropTypes.string,
};
export default VistaVacia;
