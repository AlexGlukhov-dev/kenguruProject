import React from 'react';

import classes from './input.module.scss';
/*suggestions*/
export const Input = React.forwardRef(({type, name, value, onChange, clear,...otherProps}, ref) => {
  const buttonTypes = [classes.InputClearBtn]
  const inputClasses = [classes.Input]
  
  otherProps.isValid && buttonTypes.push(classes.Valid)
  otherProps.locked && buttonTypes.push(classes.Locked)
  otherProps.className && inputClasses.push(classes.PostAddress)
  
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
    <div className={classes.InputGroup} style={
      { minWidth: otherProps.minWidth,
        maxWidth: otherProps.maxWidth,
        height: otherProps.height}
    }>
      <input
        className={inputClasses.join(' ')}
        type={type || 'text'}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={otherProps.max}
        //{...(otherProps.disabled && {disabled: true})}
        {...(otherProps.disabled < 11 && {disabled: true})}
        {...(otherProps.locked && {disabled: true})}
        {...(otherProps.autofocus && {autoFocus: true})}
        placeholder={otherProps.placeholder || null}
        ref={ref}
        pattern={otherProps.pattern || null}
        {...otherProps}
      />
      {otherProps.label ? (
        <label
          className={`${value.length ? classes.Shrink : ""} ${
            classes.Label
          }`}
        >
          <span>{otherProps.label}</span>
          {/* <span>
            {value.length === 9 && 'Введен номер карты'}
            {value.length === 10 && 'Введен ИНН организации'}
            {value.length === 11 && 'Введен ИНН ИП'}
          </span> */}
          <span>
            {
              otherProps.labelParams &&
              (Object.keys(otherProps.labelParams)
                .map(param => value.length === +param && otherProps.labelParams[param]))
            }
            {
              otherProps.addLabel
            }
          </span>
        </label>
      ) : null}

      {
        value.length ? (
        <button 
          className={buttonTypes.join(' ')}
          data-forinput={name}
          onClick={clear}
          disabled={otherProps.isValid || otherProps.locked}>
        </button>) : null
      }
      {/*{otherProps.isValid }*/}
    </div>
  )
}
)