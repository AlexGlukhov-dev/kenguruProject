import React from 'react';


import classes from './radio2.module.scss'
import {useRadioButtons} from "../../../hooks/useRadioButtons";

export const Radio2 = ({radioValue, name, labelParams}) => {
	const [value, props] = useRadioButtons(name);
	
	return (
		<div className={classes['radio-btn']}>
			<label className={classes['radio-label']}>
				<input
					className={classes['radio-input']}
					value={radioValue}
					checked={value === radioValue}
					{...props}
				/>
				<span className={classes['radio-text']}>{labelParams[0]}</span>
			</label>
		</div>
	
	)
}