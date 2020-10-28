import React, {Component, Fragment} from "react";
import logo_svg from "../../../assets/img/logo.png";

class LogoPageFull extends Component{
	render() {
		return (
			<Fragment>
				<div className={'w-100 margin-40-B margin-30-T'} align={'center'}>
					<img src={logo_svg} alt="logo_svg" className={'w-250-px h-auto'}/>
				</div>
			</Fragment>
		);
	}
}

export default LogoPageFull;
