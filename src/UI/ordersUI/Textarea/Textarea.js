import React from 'react'

import classes from './textarea.module.scss'

export const Textarea = ({className, placeholder, name, state, inputHandler}) => {
	return <textarea
		className={`${classes['textarea']} ${className}`}
		name={name}
		placeholder={placeholder}
		value={state[name]}
		onChange={inputHandler}
	/>
}