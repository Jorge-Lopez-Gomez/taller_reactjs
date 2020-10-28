import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from "@material-ui/core/Grid";
import {FieldsJs} from "../../../settings/General/General";
import NumeroPaginacion from "./NumeroPaginacion";
import {ReactLocalStorageService} from "../../../settings/ReactLocalStorageService/ReactLocalStorageService";
import CirculoPaginacion from "./CirculoPaginacion";

class Paginacion extends Component {
	
	get_diseno_paginacion = () => {
		let pag;
		let box = Math.ceil(this.props.total / this.props.limit);
		let arr = [];
		for (let i = 0; i < box; i++) {
			arr.push({
				page: i + 1
			})
		}
		let Cfg = ReactLocalStorageService.get('Cfg') || {};
		switch (Cfg.diseno_paginacion) {
			case 1:
				pag = <CirculoPaginacion arr={arr} page={this.props.page} onClick={this.props.onClick}/>
				break;
			case 2:
				pag = <NumeroPaginacion arr={arr} page={this.props.page} onClick={this.props.onClick}/>
				
				break;
			default:
				pag = <CirculoPaginacion arr={arr} page={this.props.page} onClick={this.props.onClick}/>
		}
		return pag;
	};
	
	render() {
		let rangos = [5, 10, 15, 20];
		if (FieldsJs.Array(this.props.rangos)) {
			rangos = this.props.rangos;
		}
		return (
			<Fragment>
				<Grid container spacing={1} alignItems={"center"} alignContent={"center"}>
					<Grid item xs={12} sm={12} md={7} lg={8} xl={9} align={'left'}>
						{this.get_diseno_paginacion()}
					</Grid>
					<Grid item xs={12} sm={12} md={5} lg={4} xl={3} align={'right'}>
						<TablePagination
							variant={"head"}
							rowsPerPageOptions={rangos}
							component="div"
							count={this.props.total}
							rowsPerPage={this.props.limit}
							page={this.props.page - 1}
							labelRowsPerPage={'Filas por página'}
							labelDisplayedRows={({from, to, count}) => `${from}-${to} de ${count}`}
							backIconButtonProps={{
								'aria-label': 'siguiente',
							}}
							nextIconButtonProps={{
								'aria-label': 'anterior',
							}}
							onChangePage={(event, newPage) => {
								let page = newPage + 1;
								console.log(page);
								this.props.onClick({page: page})
							}}
							onChangeRowsPerPage={(e) => {
								let page = 1;
								let limit = +e.target.value;
								console.log(page, limit);
								this.props.onClick({page: page, limit: limit})
							}}
						/>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

Paginacion.propTypes = {
	total: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired,
	rangos: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Paginacion;
