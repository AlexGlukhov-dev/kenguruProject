import React from 'react';

import classes from './input.module.scss';

export const Input = React.forwardRef(({type, name, value, handler,...otherProps}, ref) => {
  const buttonTypes = [classes['input-clear-btn']]
  const inputClasses = [classes['input']]
	
  otherProps.isValid && buttonTypes.push(classes['valid'])
  otherProps.locked && buttonTypes.push(classes['locked'])
  otherProps.className && inputClasses.push(classes[otherProps.className])

  //**** var valid checking realisation ************
  // const isInvalid({isValid}) = () => {
  //   return !isValid
  // }
  //
  // if (isInvalid({isValid})) {
  //   classes.push(classes.Invalid)
  // }
//TODO fix || and && together usage warning for disabled attribute
  return (
    <div className={classes['input-group']} style={
      { minWidth: otherProps.minWidth,
        maxWidth: otherProps.maxWidth,
       height: otherProps.height}
    }>

        <input
          className={inputClasses.join(' ')}
          type={type || 'text'}
          name={name}
          value={value}
          onChange={handler}
          maxLength={otherProps.max}
          {...(otherProps.disabled && {disabled: true})}
          {...(otherProps.sms < 18 && {disabled: true})}
          {...(otherProps.locked && {disabled: true})}
          {...(otherProps.autofocus && {autoFocus: true})}
          ref={otherProps.reference}
          pattern={otherProps.pattern || null}
        />

      {otherProps.label ? (
        <label
          className={`${value.length ? classes['shrink'] : ""} ${
            classes['label']
          } ${otherProps.disabled ? classes['disabled'] : ""}`}
        >
            <span>{otherProps.label}</span>
          {/* <span>
            {value.length === 9 && 'Введен номер карты'}
            {value.length === 10 && 'Введен ИНН организации'}
            {value.length === 11 && 'Введен ИНН ИП'}
          </span> */}
          {/*<span>*/}
          {/*  {*/}
          {/*    otherProps.labelParams &&*/}
          {/*    (Object.keys(otherProps.labelParams)*/}
          {/*      .map(param => value.length === +param && otherProps.labelParams[param]))*/}
          {/*  }*/}
            {
                otherProps.addLabel
            }
          {/*</span>*/}
        </label>
      ) : null}

      {
        value.length ? (
        <button 
          className={buttonTypes.join(' ')}
          data-forinput={name}
          onClick={otherProps.clear}
          disabled={otherProps.isValid || otherProps.locked}>
        </button>) : null
      }
      {/*{otherProps.isValid }*/}
    </div>
  )
}
)