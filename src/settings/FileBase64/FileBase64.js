import {FieldsJs, str_search} from '../General/General';
import {ReactLocalStorageService} from "../ReactLocalStorageService/ReactLocalStorageService";

export const FileBase64 = {
	Base64: (element, formatos, MegaByte) => {
		return new Promise((resolve, reject) => {
			let files = {};
			let archivos = element.files;
			let flag_error = false;
			let mensaje = "";
			if (archivos.length <= 0) {
				flag_error = true;
				mensaje = "No has seleccionado un archivos";
			} else {
				let type = null;
				if (!archivos[0].type) {
					if (archivos[0].name) {
						if (str_search(archivos[0].name, '.')) {
							let arc = archivos[0].name.split('.');
							type = "application/" + arc[arc.length - 1]; // Funcionalidad para los archivos .rar
						}
					}
				}
				files = {
					name: archivos[0].name,
					size: archivos[0].size,
					type: archivos[0].type || type,
					lastModified: archivos[0].lastModified,
					lastModifiedDate: archivos[0].lastModifiedDate,
					webkitRelativePath: archivos[0].webkitRelativePath
				};
				if (files.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
					files.type = "application/xlsx";
				}
				if (files.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
					files.type = "application/docx";
				}
				if (files.type === "text/plain") {
					files.type = "text/txt";
				}
				if (files.type === "image/svg+xml") {
					files.type = "image/svg";
				}
				if (FieldsJs.inArray(formatos, files.type) === false) {
					flag_error = true;
					mensaje = "El formato del archivo seleccionado no es válido";
				}
				if (!(MegaByte > 0)) {
					let Cfg = ReactLocalStorageService.get('Cfg') || {};
					if (Number(Cfg.archivo_maximo_megas) > 0) {
						MegaByte = Number(Cfg.archivo_maximo_megas); // Megas por default del webservice
					} else {
						MegaByte = 5.5; // Por default 5.5 megas
					}
				}
				let Byte = MegaByte * 1e+6;
				if (files.size > Byte) {
					flag_error = true;
					mensaje = "El tamaño máximo del archivo no debe ser mayor a " + Math.floor(MegaByte) + "MB, el tamaño del archivo que intenta seleccionar es de " + (Math.floor(files.size / 1e+6)) + "MB a " + (Math.ceil(files.size / 1e+6)) + "MB";
				}
			}
			if (flag_error === false) {
				let fileReader = new FileReader();
				fileReader.onabort = (r) => {
				};
				fileReader.onerror = (r) => {
				};
				fileReader.onload = (r) => {
					let response = {
						status: 200,
						mensaje: "Archivo seleccionado con éxito",
						name: files.name,
						size: files.size,
						type: files.type,
						formato: files.type.split("/")[1],
						lastModified: files.lastModified,
						lastModifiedDate: files.lastModifiedDate,
						webkitRelativePath: files.webkitRelativePath,
						base64: r.target.result,
						base64Tipo: r.target.result.split(",")[0],
						tipo: r.target.result.split(",")[0],
						archivo: r.target.result.split(",")[1]
					};
					console.log("FILE|=> onload(response): ", response);
					resolve(response);
				};
				fileReader.onloadstart = (r) => {
				};
				fileReader.onloadend = (r) => {
				};
				fileReader.onprogress = (r) => {
				};
				fileReader.readAsDataURL(archivos[0]);
			} else {
				if (document.getElementById(element.id)) {
					document.getElementById(element.id).value = "";
				}
				let error = {
					status: 400,
					mensaje: mensaje,
					name: files.name,
					size: files.size,
					type: files.type,
					formato: files.type.split("/")[1],
					lastModified: files.lastModified,
					lastModifiedDate: files.lastModifiedDate,
					webkitRelativePath: files.webkitRelativePath,
					base64: null,
					base64Tipo: null,
					tipo: null,
					archivo: null
				};
				console.log("FILE|=> onload(error): ", error);
				reject(error);
			}
		});
	}
};
