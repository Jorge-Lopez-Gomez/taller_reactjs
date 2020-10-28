import React from 'react';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function DraggableModal(props) {
	return (
		<Draggable cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

export default DraggableModal;
