import React, {Component, Fragment} from 'react';
import agregar_producto_requerimiento_adicional from "../../../assets/img/icons/agregar-producto-atributo.svg";

class BtnMasAdd extends Component {
	render() {
		const btn_agregar_producto_requerimiento_adicional = {
			backgroundImage: `url(${agregar_producto_requerimiento_adicional})`,
			opacity: 1
		};
		return (
			<Fragment>
				<div className={'vertical-inline b-r-20 margin-5 bg-info cursor-pointer'}>
					<div className={'vertical-inline padding-3 padding-10-L padding-10-R v-center text-white'}>
						mas...
					</div>
					<div className={'vertical-inline padding-3 padding-5-R v-center text-white'}>
						<div
							className={'w-16-px h-16-px b-r-100 bg-img-cover-x-center-y-center v-center'}
							style={btn_agregar_producto_requerimiento_adicional}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default BtnMasAdd;
