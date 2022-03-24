import React from 'react';

import classes from './button.module.scss';


export const Button = ({type, text, handler, cl='', disabled}) => {
	
	const BtnClasses = [classes['btn'], cl];
	switch (type) {
		case 'secondary':
			BtnClasses.push( classes['btn-secondary'] );
			break;
		case 'primary':
			BtnClasses.push( classes['btn-primary'] );
			break;
		default:
			return null
	}
	
	return <button
		className={BtnClasses.join( ' ' )}
		{...(disabled && {disabled: true})}
		onClick={handler || null}
	>
		{text}
	</button>
};