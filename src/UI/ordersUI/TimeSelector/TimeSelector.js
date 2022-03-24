import React, { useState} from 'react'

import classes from './timeSelector.module.scss'

const TimeSelector = ({
												nameHours, nameMinutes, labelHours, labelMinutes, valueHours, valueMinutes, inpState, setInpState, handler,
												disabledUpHours, disabledDownHours, disabledUpMinutes, disabledDownMinutes, title, selectedHours, setSelectedHours,
	setSelectTime
											}) => {
	const [isActive, setIsActive] = useState( false );
	const [shrink] = useState( false );
	
	const stepperHandlerLeftPlus = e => {
		e.stopPropagation()
		
		setInpState( prev => ({...prev, [nameHours]: +inpState[nameHours] + 1}) )
	}
	
	const stepperHandlerLeftMinus = e => {
		e.stopPropagation()
		setInpState( prev => ({...prev, [nameHours]: +inpState[nameHours] - 1}) )
	}
	
	const stepperHandlerRightPlus = e => {
		e.stopPropagation()
		setInpState( prev => ({...prev, [nameMinutes]: +inpState[nameMinutes] + 1}))
		// console.log( +inpState[nameMinutes] )
	}
	
	const stepperHandlerRightMinus = e => {
		e.stopPropagation()
		setInpState( prev => ({...prev, [nameMinutes]: +inpState[nameMinutes] - 1}) )
	}
	
	const openStepper = (e) => {
		setIsActive( !isActive )
		setSelectTime('');
		
	}
	const addZero = val => {
		
		let st = val + ''
		return st.length === 1 ? `0${val}` : '' + val
	}
	

	return (
		<div className={classes['stepper-wrapper']}>
			{!isActive && <div
				className={`${classes["time-selector__btn"]} ${isActive ? classes["time-selector-active"] : ''} ${shrink ? classes["time-selector__btn-shrink"] : ''}`}
				onClick={openStepper}
			>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<div className={`${shrink ? classes['time-selector__btn-shrink-text'] : ''}`}>{title}</div>
					{shrink && <div>{`${addZero(+valueHours)} : ${addZero(+valueMinutes)}`}</div>}
				</div>
				{isActive ?
					<svg className={classes["time-selector-chevron-up"]} width="8" height="5" viewBox="0 0 8 5" fill="none"
							 xmlns="http://www.w3.org/2000/svg">
						<path
							d="M3.90025 1.35867e-07L-1.62086e-07 3.14596L1.01746 5L4 2.643L6.98254 5L8 3.14596L4.1197 1.16681e-07L3.90025 1.35867e-07Z"
							fill="#BFBFBF"/>
					</svg> :
					<svg className={classes["time-selector-chevron-down"]} width="8" height="5" viewBox="0 0 8 5" fill="none"
							 xmlns="http://www.w3.org/2000/svg">
						<path d="M4.09975 5L8 1.85404L6.98254 0L4 2.357L1.01746 0L-1.90785e-07 1.85404L3.8803 5H4.09975Z"
									fill="#BFBFBF"/>
					</svg>
				}
			</div>
			}
			
			{isActive && <div className={classes['stepper']}>
				<div className={classes['stepper__btns-hours']}>
					<button
						type='button'
						className={`${classes['stepper__btn']} ${classes['stepper__btn--down']} ${disabledUpHours ? classes['stepper__btn--disabled'] : ''} `}
						onClick={stepperHandlerLeftPlus}
						aria-label="Увеличить количество">
						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
							<g>
								<g>
									<path d="M3.904-.035L-.003 3.151 1.02 5.03l2.988-2.387 2.988 2.387 1.022-1.88-3.89-3.186z"/>
								</g>
							</g>
						</svg>
					</button>
					<button
						type='button'
						className={`${classes['stepper__btn']} ${classes['stepper__btn--down']} ${disabledDownHours ? classes['stepper__btn--disabled'] : ''} `}
						onClick={stepperHandlerLeftMinus}
						aria-label="Уменьшить количество">
						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
							<g>
								<g>
									<path d="M3.904 5.003L-.003 1.818 1.02-.062l2.988 2.386L6.995-.063l1.022 1.88-3.89 3.186z"/>
								</g>
							</g>
						</svg>
					</button>
				</div>
				<div className={`${classes['stepper__field']} ${classes['stepper__field-hours']}`}>
					<input
						className={`${classes['stepper__input']} ${classes['stepper__input-hours']}`}
						id={nameHours}
						type="text"
						disabled
						placeholder='8'
						name={nameHours}
						value={valueHours}
						onChange={handler}
						maxLength="2"
						pattern='[0-9]*'
					/>
					
					{/*<label className={`${inpState[nameHours] || inpState[nameHours] === 0 ? classes['stepper__text-hours-shrink'] : ''} ${classes['stepper__text-hours']}`}*/}
					{/*			 htmlFor={nameHours}>{labelHours}</label>*/}
				</div>
			</div>
			}
			{isActive && <div className={classes['stepper']}>
				<div className={`${classes['stepper__field']} ${classes['stepper__field-minutes']}`}>
					<input
						className={`${classes['stepper__input']} ${classes['stepper__input-minutes']}`}
						id={nameMinutes}
						type="text"
						disabled
						placeholder='00'
						name={nameMinutes}
						value={addZero(valueMinutes)}
						onInput={handler}
						maxLength="2"
						pattern='[0-9]*'
					/>
					{/*<label className={`${inpState[nameMinutes] || inpState[nameMinutes] === 0 ? classes['stepper__text-minutes-shrink'] : ''} ${classes['stepper__text-minutes']}`}*/}
					{/*			 htmlFor={nameMinutes}>{labelMinutes}</label>*/}
				</div>
				<div className={classes['stepper__btns']}>
					<button
						type='button'
						className={`${classes['stepper__btn']} ${classes['stepper__btn--down']} ${disabledUpMinutes ? classes['stepper__btn--disabled'] : ''} `}
						onClick={stepperHandlerRightPlus}
						aria-label="Увеличить количество">
						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
							<g>
								<g>
									<path d="M3.904-.035L-.003 3.151 1.02 5.03l2.988-2.387 2.988 2.387 1.022-1.88-3.89-3.186z"/>
								</g>
							</g>
						</svg>
					</button>
					<button
						type='button'
						className={`${classes['stepper__btn']} ${classes['stepper__btn--down']} ${disabledDownMinutes ? classes['stepper__btn--disabled'] : ''} `}
						onClick={stepperHandlerRightMinus}
						aria-label="Уменьшить количество">
						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
							<g>
								<g>
									<path d="M3.904 5.003L-.003 1.818 1.02-.062l2.988 2.386L6.995-.063l1.022 1.88-3.89 3.186z"/>
								</g>
							</g>
						</svg>
					</button>
				</div>
			</div>
			}
		</div>
	
	
	);
};

export default TimeSelector;