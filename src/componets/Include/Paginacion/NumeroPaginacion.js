import React from "react";
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

class NumeroPaginacion extends React.Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline/>
				<Pagination
					limit={1}
					offset={this.props.page - 1}
					total={this.props.arr.length}
					onClick={(e, offset) => this.props.onClick({page: offset + 1})}
				/>
			</MuiThemeProvider>
		);
	}
}

NumeroPaginacion.propTypes = {
	arr: PropTypes.array.isRequired,
	page: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};

export default NumeroPaginacion;
