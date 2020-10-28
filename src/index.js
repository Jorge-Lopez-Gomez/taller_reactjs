import 'date-fns';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import AppRoutes from './routes';

import * as serviceWorker from './serviceWorker';

import './assets/css/style.css';
import './index.css';

import {CONFIG} from './settings/Config/Config';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";

render(
	<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
		<BrowserRouter basename={CONFIG.basename}>
			<AppRoutes/>
		</BrowserRouter>
	</MuiPickersUtilsProvider>,
	document.getElementById('root')
);

serviceWorker.unregister();

