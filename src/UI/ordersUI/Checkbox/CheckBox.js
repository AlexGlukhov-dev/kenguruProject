import React from 'react'

import classes from './checkBox.module.scss'

export const CheckBox = ({labelText, name, val, state, handler}) => (
			<label className={classes['check']}>
				<input
					className={classes['check-input']}
					name={name}
					value={val}
					type="checkbox"
					checked={state[name]}
					onChange={handler}
					
				/>
				<span className={classes['checkbox']}/>
				<div className={classes['label-text']}>{labelText}</div>
			</label>
);