import {withStyles} from "@material-ui/core";
import {green, red, orange, blue} from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

export const SuccessCheckbox = withStyles({
	root: {
		color: green[400],
		'&$checked': {
			color: green[600],
		},
	},
	checked: {},
})(props => <Checkbox {...props} />);

export const DangerCheckbox = withStyles({
	root: {
		color: red[400],
		'&$checked': {
			color: red[600],
		},
	},
	checked: {},
})(props => <Checkbox {...props} />);

export const WarningCheckbox = withStyles({
	root: {
		color: orange[400],
		'&$checked': {
			color: orange[600],
		},
	},
	checked: {},
})(props => <Checkbox {...props} />);

export const InfoCheckbox = withStyles({
	root: {
		color: blue[400],
		'&$checked': {
			color: blue[600],
		},
	},
	checked: {},
})(props => <Checkbox {...props} />);
