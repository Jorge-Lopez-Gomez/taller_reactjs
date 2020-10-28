import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {Calendar, DateRange, DefinedRange} from 'react-date-range';
import {defaultInputRanges, defaultStaticRanges} from './MDDefaultRanger';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Dialog from '@material-ui/core/Dialog/index';
import DialogContent from '@material-ui/core/DialogContent/index';

import * as rdrLocales from 'react-date-range/dist/locale';
import {DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import './MDDatePicker.css';
import Grid from "@material-ui/core/Grid";

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from "@material-ui/core/IconButton";

class MDDatePicker extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			modal: {
				open: false
			},
			date: null,
			startDate: null,
			endDate: null,
		};
	}
	
	openModal = () => {
		const {date, startDate, endDate} = this.props;
		this.setState({
			modal: {
				open: true
			},
			date: date || new Date(),
			startDate: startDate || new Date(),
			endDate: endDate || new Date(),
		});
	};
	
	closeModal = () => {
		this.setState({
			modal: {
				open: false
			},
		});
	};
	
	open = () => {
		this.openModal();
	};
	
	close = () => {
		this.closeModal();
	};
	
	clear = () => {
		this.closeModal();
		this.props.onChange({
			date: null,
			startDate: null,
			endDate: null,
		})
	};
	
	ok = () => {
		this.close();
		this.props.onChange({
			date: this.state.date,
			startDate: this.state.startDate,
			endDate: this.state.endDate,
		})
	};
	
	handleSelectDate = (date) => {
		this.setState({
			date: date || new Date(),
		});
	};
	
	handleSelectDateRange = (ranges) => {
		this.setState({
			startDate: ranges.selection.startDate || new Date(),
			endDate: ranges.selection.endDate || new Date(),
		});
	};
	
	render() {
		
		const date = this.state.date;
		
		const ranges = {
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			key: 'selection',
			color: '#3f51b5'
		};
		
		return (
			<Fragment>
				
				<div style={{cursor: "pointer"}} onClick={() => this.open()}>
					{this.props.component}
				</div>
				
				<Dialog fullWidth={false} maxWidth={'md'} open={this.state.modal.open} onClose={() => this.close()}
				        aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
					
					<DialogContent className={'MDDialogContent'} style={{padding: "0px", margin: "0px"}}>
						
						{this.props.type === "range" ? (
							<Fragment>
								<div className={'vertical-inline'}>
									<div className={'v-start'} style={{height: "385px", background: "white"}}>
										<DateRange
											locale={rdrLocales.es}
											onChange={this.handleSelectDateRange}
											showSelectionPreview={true}
											moveRangeOnFirstSelection={false}
											className={'PreviewArea'}
											months={2}
											ranges={[ranges]}
											rangeColors={['#3f51b5', '#3ecf8e', '#fed14c']}
											direction="horizontal"
										/>
									</div>
									<div className={'v-start'} style={{height: "385px", background: "#3f51b5"}}>
										<Grid container spacing={0} style={{height: "100%"}}>
											<Grid item xs={12} style={{height: "314px"}}>
												<DefinedRange
													locale={rdrLocales.es}
													ranges={[ranges]}
													inputRanges={defaultInputRanges}
													staticRanges={defaultStaticRanges}
													onChange={this.handleSelectDateRange}
													className={'centered'}
												/>
											</Grid>
											<Grid item xs={12} style={{height: "calc(100% - 314px)"}}>
												<div className={'w-100 h-100 vertical-inline'}>
													<div className={'v-end'}>
														<Grid container spacing={0}>
															<Grid item xs={2} style={{padding: "10px 8px"}}>
																<IconButton aria-label="delete" size="small"
																            onClick={() => this.clear()}>
																	<DeleteForeverOutlinedIcon fontSize="inherit"
																	                           className={'px-20'}
																	                           style={{color: "white"}}/>
																</IconButton>
															</Grid>
															<Grid item xs={5} style={{padding: "10px"}}>
																<Button
																	fullWidth
																	onClick={() => this.close()}
																	color="default"
																	variant={"contained"}
																>
																	Cerrar
																</Button>
															</Grid>
															<Grid item xs={5} style={{padding: "10px"}}>
																<Button
																	fullWidth
																	onClick={() => this.ok()}
																	color="default"
																	variant={"contained"}
																>
																	Aceptar
																</Button>
															</Grid>
														</Grid>
													</div>
												</div>
											
											</Grid>
										
										</Grid>
									</div>
								</div>
							</Fragment>
						) : null}
						
						{this.props.type === "date" ? (
							<Fragment>
								<div className={'vertical-inline'}>
									<div className={'v-start'} style={{height: "385px", background: "white"}}>
										<Grid container spacing={0}>
											<Grid item xs={12} style={{background: "#3f51b5", padding: "43px 0px"}}>
											
											</Grid>
											<Grid item xs={12}>
												<Calendar
													color={'#3f51b5'}
													// preview={{color: "#ddfffc"}}
													locale={rdrLocales.es}
													date={date}
													onChange={this.handleSelectDate}
												/>
											</Grid>
										</Grid>
									</div>
								</div>
							</Fragment>
						) : null}
					
					</DialogContent>
					
					{this.props.type === "date" ? (
						<DialogActions>
							<Button onClick={() => this.close()} color="primary">Cerrar</Button>
							<Button onClick={() => this.ok()} color="primary">Aceptar</Button>
						</DialogActions>
					) : null}
				
				</Dialog>
			
			</Fragment>
		);
	}
}


MDDatePicker.propTypes = {
	component: PropTypes.element.isRequired,
	date: PropTypes.instanceOf(Date),
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	type: PropTypes.oneOf(['date', 'range']).isRequired,
	onChange: PropTypes.func.isRequired,
};

export default MDDatePicker;
