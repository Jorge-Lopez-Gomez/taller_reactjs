import React, {Component, Fragment} from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {FileBase64} from "../../../settings/FileBase64/FileBase64";
import {FieldsJs} from "../../../settings/General/General";
import ModalImage from "../ModalImage/ModalImage";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";


class BoxSelectFile extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			id: props.id ? props.id : 'id_file' + this.random_id() + this.random_id() + this.random_id(),
			archivo: '',
			formato: '',
			tipo: '',
		};
	}
	
	random_id = () => {
		var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
		var txt = "";
		for (let i = 0; i < 20; i++) txt += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
		return txt;
	};
	
	ClickInputFile = (id) => {
		document.getElementById(id).click();
	};
	
	FileBase64 = (e, id) => {
		let formatos = this.props.FormatAccepted || [];
		FileBase64.Base64(e.target, formatos, this.props.MegaByte || null).then((response) => {
			this.props.onChange(response);
		}).catch((error) => {
			this.props.showSnackBars('error', error.mensaje);
		});
	};
	
	render() {
		
		const clases = {
			root: 'w-100 borde-punteado-danger-2 margin--1 bg-ghostwhite',
			div01: 'vertical-inline w-100 h-100',
			div02: 'v-center padding-0-T padding-0-B w-100 padding-10',
			div03: 'text-center text-gray margin-5-T margin-0-B px-12',
		};
		
		let style = {};
		if (FieldsJs.isObject(this.props.style)) {
			style = this.props.style;
		} else {
			style.height = "100px";
		}
		style.opacity = (!!this.props.disabled ? 0.4 : 1);
		
		return (
			<Fragment>
				<div className={clases.root} style={style}>
					<div className={clases.div01}>
						<div className={clases.div02} align={'center'}>
							{this.props.item.archivo ? (
								<Fragment>
									<Tooltip TransitionComponent={Zoom} placement={"top"} title={'Ver documento'}>
										<Avatar style={{
											width: 40,
											height: 40,
											background: this.props.colorCircleIcon || '#3E3E3E',
											marginTop: '7px',
											marginBottom: '7px'
										}}>
											<div align={"center"}>
												<ModalImage
													tipo={'view'} desing={null}
													item={{
														base64: this.props.item.base64 || '',
														base64Tipo: this.props.item.base64Tipo || '',
														archivo: this.props.item.archivo || '',
														formato: this.props.item.formato || '',
													}}
												/>
											</div>
										</Avatar>
									</Tooltip>
									{this.props.button ? (
										<div className={'vertical-inline cursor-pointer'}
										     onClick={() => {
											     if (!!!this.props.disabled) {
												     this.ClickInputFile(this.state.id);
											     }
										     }}>
											<div className={'v-center'}>
												{this.props.button}
											</div>
										</div>
									) : (
										<div className={'w-100-px h-25-px b-r-30 vertical-inline cursor-pointer'}
										     style={{border: '1px solid black'}}
										     onClick={() => {
											     if (!!!this.props.disabled) {
												     this.ClickInputFile(this.state.id);
											     }
										     }}>
											<div className={'v-center w-100 text-center px-12 text-black'}>
												Cambiar
											</div>
										</div>
									)}
								</Fragment>
							) : (
								<Fragment>
									{this.props.button ? (
										<div className={'vertical-inline cursor-pointer'}
										     onClick={() => {
											     if (!!!this.props.disabled) {
												     this.ClickInputFile(this.state.id);
											     }
										     }}>
											<div className={'v-center'}>
												{this.props.button}
											</div>
										</div>
									) : (
										<div className={'w-100-px h-25-px b-r-30 vertical-inline cursor-pointer'}
										     style={{border: '1px solid black'}}
										     onClick={() => {
											     if (!!!this.props.disabled) {
												     this.ClickInputFile(this.state.id);
											     }
										     }}>
											<div className={'v-center w-100 text-center px-12 text-black'}>
												Seleccionar
											</div>
										</div>
									)}
								</Fragment>
							)}
							{this.props.label ? (
								<Typography component={'div'} className={clases.div03} style={{lineHeight: '12px'}}>
									{this.props.label}
								</Typography>
							) : ''}
						</div>
						<input
							type="file"
							id={this.state.id}
							onChange={(e) => this.FileBase64(e, this.state.id)}
							style={{display: "none"}}
							capture={"camera"}
						/>
					</div>
				</div>
			</Fragment>
		)
	}
}

BoxSelectFile.defaultProps = {
	FormatAccepted: [
		"image/jpeg",
		"image/png",
		"image/svg",
		"application/pdf",
		"application/xlsx",
		"application/docx",
		"text/txt",
		"text/csv",
		"application/rar",
		"application/zip",
	],
};

BoxSelectFile.propTypes = {
	id: PropTypes.number,
	label: PropTypes.element,
	button: PropTypes.element,
	item: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	style: PropTypes.object,
	MegaByte: PropTypes.number,
	FormatAccepted: PropTypes.arrayOf(
		PropTypes.oneOf([
			"image/jpeg",
			"image/png",
			"image/svg",
			"application/pdf",
			"application/xlsx",
			"application/docx",
			"text/txt",
			"text/csv",
			"application/rar",
			"application/zip",
		])
	),
};

export default BoxSelectFile;
