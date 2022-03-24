import React, {useEffect} from 'react'
import {createPortal} from 'react-dom'
import PropTypes from 'prop-types'


import classes from './modal.module.scss'

export const Modal = ({children, onclick}) => {
	
	
	const root = document.createElement( 'div' );
	useEffect( () => {
		document.body.appendChild( root );
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.removeChild( root );
			document.body.style.overflow = 'auto';
		}
	} );
	
	return createPortal(
		<div className={classes.Modal} onClick={onclick}>
			{children}
		</div>,
		root
	)
};

Modal.propTypes = {
	children: PropTypes.node
};

Modal.defaultProps = {
	children: null
};