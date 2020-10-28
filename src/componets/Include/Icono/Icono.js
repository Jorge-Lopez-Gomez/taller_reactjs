import React from 'react';

import './Icono.css';
import AddIconSvg from "../../../assets/img/icons/add.svg";
import ImageIconSvg from "../../../assets/img/icons/image.svg";
import SvgIconSvg from "../../../assets/img/icons/svg.svg";
import PdfIconSvg from "../../../assets/img/icons/pdf.svg";
import ExcelIconSvg from "../../../assets/img/icons/excel.svg";
import WordIconSvg from "../../../assets/img/icons/word.svg";
import CsvIconSvg from "../../../assets/img/icons/csv.svg";
import TextIconSvg from "../../../assets/img/icons/text.svg";
import RarIconSvg from "../../../assets/img/icons/rar.svg";
import ZipIconSvg from "../../../assets/img/icons/zip.svg";
import CancelIconSvg from "../../../assets/img/icons/cancel.svg";
import XmlIconSvg from "../../../assets/img/icons/xml.svg";

export const Icono = {
	get: (formato, w, h) => {
		let ICO = '';
		switch (formato) {
			case "add":
				ICO = (
					<img className={'v-center'} src={AddIconSvg} alt="add" width={w} height={h} style={{opacity: 0.7}}/>
				);
				break;
			case "jpeg":
				ICO = (
					<img className={'v-center'} src={ImageIconSvg} alt="jpeg" width={w} height={h}/>
				);
				break;
			case "png":
				ICO = (
					<img className={'v-center'} src={ImageIconSvg} alt="png" width={w} height={h}/>
				);
				break;
			case "svg":
				ICO = (
					<img className={'v-center'} src={SvgIconSvg} alt="svg" width={w} height={h}/>
				);
				break;
			case "pdf":
				ICO = (
					<img className={'v-center'} src={PdfIconSvg} alt="pdf" width={w} height={h}/>
				);
				break;
			case "xlsx":
				ICO = (
					<img className={'v-center'} src={ExcelIconSvg} alt="xlsx" width={w} height={h}/>
				);
				break;
			case "csv":
				ICO = (
					<img className={'v-center'} src={CsvIconSvg} alt="xlsx" width={w} height={h}/>
				);
				break;
			case "docx":
				ICO = (
					<img className={'v-center'} src={WordIconSvg} alt="docx" width={w} height={h}/>
				);
				break;
			case "txt":
				ICO = (
					<img className={'v-center'} src={TextIconSvg} alt="txt" width={w} height={h}/>
				);
				break;
			case "rar":
				ICO = (
					<img className={'v-center'} src={RarIconSvg} alt="rar" width={w} height={h}/>
				);
				break;
			case "zip":
				ICO = (
					<img className={'v-center'} src={ZipIconSvg} alt="zip" width={w} height={h}/>
				);
				break;
			case "xml":
				ICO = (
					<img className={'v-center'} src={XmlIconSvg} alt="zip" width={w} height={h}/>
				);
				break;
			default:
				ICO = (
					<img className={'v-center'} src={CancelIconSvg} alt="" width={w} height={h}/>
				);
		}
		return ICO;
	}
};
