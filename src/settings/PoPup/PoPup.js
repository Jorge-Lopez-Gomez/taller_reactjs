import swal from 'sweetalert';
import {FieldsJs} from "../General/General";

export const PopupService = {
	Confirm: (buttons, type, title, message, allowOutsideClick, allowEscapeKey, timer) => {
		return new Promise((resolve, reject) => {
			if (!FieldsJs.inArray(['warning', 'success', 'error', 'info'], type)) {
				type = '';
			}
			const setting = {
				title: (title || 'Confirm'),
				text: (message || '...'),
				icon: type,
				buttons: (buttons || ['Cancelar', 'Aceptar']),
				dangerMode: true,
				allowOutsideClick: (allowOutsideClick === true || allowOutsideClick === false) ? allowOutsideClick : true,
				allowEscapeKey: (allowEscapeKey === true || allowEscapeKey === false) ? allowEscapeKey : true,
				timer: timer || undefined,
			};
			swal(setting).then((r) => {
				if (r) {
					resolve({
						status: true,
						button: buttons[1],
						mensaje: 'Confirmado'
					});
				} else {
					resolve({
						status: false,
						button: buttons[0],
						mensaje: 'Cancelado'
					});
				}
			});
		});
	},
	Alert: (button, title, message, type) => {
		const setting = {
			title: (title || 'Alert'),
			text: (message || '...'),
			icon: (type || 'success'),
			button: (button || 'Aceptar')
		};
		swal(setting);
	}
};
