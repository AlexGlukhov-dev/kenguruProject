
// import {useEffect} from "react";

import {createPortal} from 'react-dom'
import PropTypes from 'prop-types'


const Modal = ({onClick, className, children}) => {

	const portalElement = document.getElementById('overlays')

	
	return createPortal(
		<div className={className} onClick={onClick}>
			{children}
		</div>,
		portalElement
	)
}

Modal.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string.isRequired
}

Modal.defaultProps = {
	children: null,
	className: 'modal'
}

export default Modal