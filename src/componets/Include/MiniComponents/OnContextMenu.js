import React, {Component, Fragment} from 'react';
import {ContextMenu, ContextMenuTrigger, MenuItem as ContextMenuItem} from "react-contextmenu";
import PropTypes from "prop-types";
import './MiniComponents.css';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {CONFIG} from "../../../settings/Config/Config";

class OnContextMenu extends Component {
	
	state = {};
	
	constructor() {
		super();
		this.state = {
			mouseX: null,
			mouseY: null,
		};
	}
	
	handleClick = event => {
		event.preventDefault();
		this.setState({
			mouseX: event.clientX - 2,
			mouseY: event.clientY - 4,
		});
	};
	
	handleClose = () => {
		this.setState({
			mouseX: null,
			mouseY: null,
		});
	};
	
	render() {
		return (
			<Fragment>
				
				{CONFIG.tipo_menu_contextual === 1 ? (
					<Fragment>
						<ContextMenuTrigger id={"some_unique_identifier_" + this.props.id}
						                    style={{cursor: 'context-menu'}}>
							{this.props.componente}
						</ContextMenuTrigger>
						
						<ContextMenu id={"some_unique_identifier_" + this.props.id} className={'card-2 bg-black'}>
							{this.props.itemsPopover.map((option, key) => (
								<ContextMenuItem key={key} data={option}
								                 onClick={(e, data) => this.props.onClick(data)}>
									<div className={'padding-10 cursor-pointer'}>
										{option.label}
									</div>
								</ContextMenuItem>
							))}
						</ContextMenu>
					</Fragment>
				) : (
					<div onContextMenu={this.handleClick} style={{cursor: 'context-menu'}}>
						<Typography style={{cursor: 'context-menu'}}>
							{this.props.componente}
						</Typography>
						<Menu
							keepMounted
							open={this.state.mouseY !== null}
							onClose={this.handleClose}
							anchorReference="anchorPosition"
							anchorPosition={
								this.state.mouseY !== null && this.state.mouseX !== null ? {
									top: this.state.mouseY,
									left: this.state.mouseX
								} : undefined
							}
						>
							{this.props.itemsPopover.map((option, key) => (
								<MenuItem key={key} onClick={() => {
									this.handleClose();
									this.props.onClick(option)
								}}>
									{option.label}
								</MenuItem>
							))}
						</Menu>
					</div>
				)}
			
			</Fragment>
		);
	}
}

OnContextMenu.propTypes = {
	componente: PropTypes.element.isRequired,
	id: PropTypes.string.isRequired,
	itemsPopover: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default OnContextMenu;
