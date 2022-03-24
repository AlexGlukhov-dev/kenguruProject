import React, {forwardRef} from 'react';

import InputMask from 'react-input-mask'
import classes from "../Input/input.module.scss";

const InputInn =forwardRef(({value, onChange, name, type, mask, maskChar, ...otherProps}, ref) => {
		const buttonTypes = [classes['input-clear-btn']]
		const inputClasses = [classes['input']]
		
		otherProps.isValid && buttonTypes.push( classes['valid'] )
		otherProps.locked && buttonTypes.push( classes['locked'] )
		otherProps.danger && buttonTypes.push( classes['danger'] )
		otherProps.className && inputClasses.push( classes[otherProps.className] )
		
		return <div className={classes['input-group']} style={
			{ minWidth: otherProps.minWidth,
				maxWidth: otherProps.maxWidth,
				height: otherProps.height
			}
		}>
			
			<InputMask
				mask={mask}
				maskChar={maskChar}
				value={value}
				onChange={onChange}
				disabled={otherProps.disable}>
				
				{() => <input
					ref={ref}
					name={name}
					type={type}
					className={inputClasses.join(' ')}
					maxLength={otherProps.max}
					//{...(otherProps.disabled < 11 && {disabled: true})}
					{...(otherProps.disable && {disabled: true})}
					{...(otherProps.autofocus && {autoFocus: true})}
					// ref={otherProps.reference}
				/>}
			
			</InputMask>
			{otherProps.label ? (
				<label
					className={`${value.length ? classes['shrink'] : ""} ${
						classes['label']
					}`}
				>
					<span>{otherProps.label}</span>
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
						onClick={otherProps.clear}
						disabled={otherProps.isValid || otherProps.locked}>
					</button>) : null
			}
		</div>
	}
)


export default InputInn;