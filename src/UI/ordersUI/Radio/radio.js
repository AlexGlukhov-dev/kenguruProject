import React from 'react';

import classes from './radio.module.scss'

export const Radio = ({name, labelParams, id, handler, check, state}) => {

//console.log(state)
  return (
    <div className={classes['custom-radio-wrapper']}>
      <label className={classes['custom-radio']}>
        <input
          type="radio"
          className={classes['custom-radio-input']}
          name={name}
          value={id}
          // defaultChecked={check}
          onChange={handler}
          checked={state[name] === id}
        />
        <span className={classes['custom-radio-text']}>{labelParams[0]}</span>
      </label>
    
    </div>
  
  )
}