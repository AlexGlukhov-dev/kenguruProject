import React from 'react'

import classes from './toggle.module.scss'

export const Toggle = ({label, name, val, state, handler}) => (
	
	<label className={classes['toggle-label']}>
		<input
			className={classes['toggle-input']}
			type="checkbox"
			name={name}
			// value={val}
			checked={state[name]}
			onChange={handler}
			
		
		/>
		<span className={classes['toggle-label-span']}>{label}</span>
	</label>
)