import React from 'react'



import classes from './stepper.module.scss'
import {addData} from "../../../redux/slices/indivOrdersSlice";


const Stepper = ({name, label, value, inpState, setInpState, handler, disabled, ref}) => {
	
	// const [value, setValue] = useState('')
	//const floor = useRef(null);
	
	const stepperHandlerPlus = (e) => {
		e.stopPropagation()
		// setInpState( prev => ({...prev, [name]: + inpState[name] + 1}) )
		setInpState(addData( {key: name, value: +inpState[name] + 1} ) )
		// floor.current.focus()
	}
	
	const stepperHandlerMinus = (e) => {
		e.stopPropagation()
		setInpState(addData( {key: name, value: +inpState[name] - 1} ) )
		// setInpState( prev => ({...prev, [name]: +inpState[name] - 1}) )
		// floor.current.focus()
	}
	
	return (
		<div className={classes['stepper']}>
			
			<div className={classes['stepper__field']}>
					<input
						className={classes['stepper__input']}
						id={name}
						type="text"
						name={name}
						value={value}
						onInput={handler}
						maxLength="2"
						pattern='[0-9]*'
					/>
					{/*<Input*/}
					{/*	type="text"*/}
					{/*	name={name}*/}
					{/*	value={value}*/}
					{/*	handler={handler}*/}
					{/*	label="Этаж"*/}
					{/*	// clear={clearInputField}*/}
					{/*	max={2}*/}
					{/*	// disabled={state.phone.length}*/}
					{/*	reference={floor}*/}
					{/*/>*/}
				{/*{console.log(inpState.floor)}*/}
						<label className={`${inpState[name] || inpState[name] === 0 ? classes['stepper__text-shrink'] : ''} ${classes['stepper__text']}`}
						htmlFor={name}>{label}</label>
				</div>
				<div className={classes['stepper__btns']}>
					<button
						type='button'
						className={`${classes['stepper__btn']} ${classes['stepper__btn--up']} ${classes['stepper__btn--up']}`}
						onClick={stepperHandlerPlus}
						aria-label="Увеличить количество">
						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
							<g>
								<g>
									<path d="M3.904-.035L-.003 3.151 1.02 5.03l2.988-2.387 2.988 2.387 1.022-1.88-3.89-3.186z" />
								</g>
							</g>
						</svg>
					</button>
					<button
						type='button'
						className={`${classes['stepper__btn']} ${classes['stepper__btn--down']} ${disabled ? classes['stepper__btn--disabled'] : ''} `}
						onClick={stepperHandlerMinus}
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
	)
}

export default Stepper;