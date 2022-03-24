import React from 'react';

import classes from './btnLink.module.scss';


export const BtnLink = ({text, href, type}) => {
	
const cl = [classes.BtnLink, classes[type] ]
	
	return <a className={cl.join(' ')} href={href}>
					{text}
				</a>
};