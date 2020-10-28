import {withRouter} from "react-router-dom";

class $State {
	go = (props, url, params) => {
		let pA = [];
		for (let x in params) {
			pA.push(params[x]);
		}
		let pS = pA.join('/');
		let g = '';
		if (url) {
			let u = '';
			if (pS) {
				u = '/' + url + '/' + pS
			} else {
				u = '/' + url
			}
			props.history.push(u);
		}
		return g;
	};
}

export default withRouter(new $State());
