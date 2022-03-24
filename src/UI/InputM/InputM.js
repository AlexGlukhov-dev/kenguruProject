import React from 'react';

import InputMask from 'react-input-mask'
import classes from "./input.module.scss";

const InputM = React.forwardRef( ({value, onChange, name, type, mask, maskChar, ...otherProps}, ref) => {
		const buttonTypes = [classes.InputClearBtn]
		const inputClasses = [classes.Input]
		
		otherProps.isValid && buttonTypes.push( classes.Valid )
		otherProps.locked && buttonTypes.push( classes.Locked )
		otherProps.danger && buttonTypes.push( classes.Danger )
		otherProps.className && inputClasses.push( classes.PostAddress )
		
		return <div className={classes.InputGroup} style={
			{
				minWidth: otherProps.minWidth,
				maxWidth: otherProps.maxWidth,
				height: otherProps.height
			}
		}>
			
			<InputMask
				mask={mask}
				maskChar={maskChar}
				value={value}
				onChange={onChange}
				disabled={otherProps.disable}
				
			>
				
				{() => <input
					ref={ref}
					name={name}
					type={type}
					className={inputClasses.join( ' ' )}
					maxLength={otherProps.max}
					onKeyPress={otherProps.onKeyPress}
					autoComplete='off'
					//{...(otherProps.disabled < 11 && {disabled: true})}
					{...(otherProps.disable && {disabled: true})}
					{...(otherProps.autofocus && {autoFocus: true})}
					// ref={otherProps.reference}
				/>}
			
			</InputMask>
			{otherProps.label ? (
				<label
					className={`${value.length ? classes.Shrink : ""} ${
						classes.Label
					}`}
				>
					<span>{otherProps.label}</span>
					{value.length === 9 && <span>Введен номер карты</span>}
					{value.length === 10 && <span>Введен ИНН организации</span>}
					{value.length === 12 && <span>Введен ИНН ИП</span>}
				</label>
			) : null}
			
			{
				value.length ? (
					<button
						className={buttonTypes.join( ' ' )}
						data-forinput={name}
						onClick={otherProps.clear}
						disabled={otherProps.isValid || otherProps.locked}>
					</button>) : null
			}
		</div>
	}
)

export default InputM;