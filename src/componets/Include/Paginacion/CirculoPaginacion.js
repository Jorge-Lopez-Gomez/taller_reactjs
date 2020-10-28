import React from "react";
import PropTypes from 'prop-types';

class CirculoPaginacion extends React.Component {
	render() {
		return (
			<div style={{
				width: "100%",
				height: "36px",
				margin: "0px -5px",
			}}>
				{this.props.arr.map((value, index) => (
					<div key={index} style={{
						backgroundColor: (this.props.page === value.page ? "#3f51b5" : "lightgray"),
						color: (this.props.page === value.page ? "white" : "black"),
						borderRadius: "100%",
						cursor: "pointer",
						margin: "3px",
						width: "22px",
						height: "22px",
						float: "left",
						fontSize: "12px"
					}} onClick={() => {
						this.props.onClick({page: value.page})
					}} className={'vertical-inline ff-arial'}>
						<span className={'v-center w-100 text-center'}>
							{value.page}
						</span>
					</div>
				))}
			</div>
		);
	}
}

CirculoPaginacion.propTypes = {
	arr: PropTypes.array.isRequired,
	page: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};

export default CirculoPaginacion;
