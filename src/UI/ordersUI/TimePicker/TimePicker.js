import React, {useEffect, useState} from 'react';

import classes from './timePicker.module.scss'

const TimePicker = ({minHour = 8,
											maxHour = 20,
											inpState,
											setInpState,
											setSelected}) => {
	const [hours, setHours] = useState( 8 )
	const [minutes, setMinutes] = useState( 0 )
	const [isActive, setIsActive] = useState( false );
	const [shrink, setShrink] = useState( false );
	
	useEffect(() => {
		setHours(8)
		setMinutes(0)
		setSelected('')
	}, [inpState.deliveryToTime, setSelected])
	
	const hoursUp = () => {
		setHours( prev => +prev + 1 );
		setInpState(prev => ({...prev, hours: hours + 1}))
		if (inpState.hours > maxHour - 1) {
			setHours( minHour )
			setInpState(prev => ({...prev, hours: minHour}))
		}
	}
	
	const hoursDown = () => {
		setHours( prev => +prev - 1 );
		setInpState(prev => ({...prev, hours: hours - 1}))
		if (inpState.hours < minHour + 1) {
			setHours( maxHour )
			setInpState(prev => ({...prev, hours: maxHour}))
		}
	}
	
	const minutesUp = () => {
		if (inpState.minutes >= 55) {
			setMinutes( 0 );
			setInpState(prev => ({...prev, minutes: 0}))
			return
		}
		setMinutes( prev => round5(+prev + 5 ))
		setInpState(prev => ({...prev, minutes: round5(minutes + 5)}))
		
	}
	
	const minutesDown = () => {
		setMinutes( prev => round5(+prev - 5 ))
		setInpState(prev => ({...prev, minutes: round5(minutes - 5)}))
		if (minutes < 1) {
			setMinutes( 55 );
			setInpState(prev => ({...prev, minutes: 55}))
		}
	}
	
	const round5 = x => Math.floor(x/5)*5;
	
	const formatTime = time => {
		if (time < 10) {
			time = '0' + time;
		}
		return time;
	}
	
	const hoursHandler = e => {
		if (e.target.value > maxHour - 1) {
			e.target.value = minHour
		}
		
		setHours( e.target.value
			.toString()
			.replace( /^0+/, '' )
			.slice( 0, 2 ) )
		
		setInpState(prev => ({...prev, hours: e.target.value
				.toString()
				.replace( /^0+/, '' )
				.slice( 0, 2 )}))
	}
	
	const minutesHandler = e => {
		if (e.target.value > 59) {
			e.target.value = ''
		}
		
		setMinutes( e.target.value
			.toString()
			.replace( /^0+/, '' )
			.slice( 0, 2 ) )
		
		setInpState(prev => ({...prev, minutes: e.target.value
				.toString()
				.replace( /^0+/, '' )
				.slice( 0, 2 )}))
	}
	
	const onBlurHoursHandler = e => {
		if (e.target.value < minHour) {
			e.target.value = minHour
			setHours( e.target.value )
		}
	}
	
	const onBlurMinutesHandler = e => {
		if (e.target.value > 59) {
			e.target.value = '00'
		}
		setMinutes(round5(e.target.value))
		setInpState(prev => ({...prev, minutes: round5(e.target.value)}))
		setIsActive(false)
		setShrink(true)
	}
	
	const openStepper = (e) => {
		setIsActive( !isActive )
		// setSelectTime('');
	}
	
	return (<>
		{!isActive && <div
			className={`${classes["time-selector__btn"]} ${isActive ? classes["time-selector-active"] : ''} ${shrink ? classes["time-selector__btn-shrink"] : ''}`}
			onClick={openStepper}
		>
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<div className={`${shrink ? classes['time-selector__btn-shrink-text'] : ''}`}>Время доставки</div>
				{shrink && <div>{`${formatTime(+hours)} : ${formatTime(+minutes)}`}</div>}
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
		<div className={classes['time-picker']}>
			<div className={classes['hour']}>
				<button className={classes['hr-up']} onClick={hoursUp}>
					<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
						<g>
							<g>
								<path d="M3.904-.035L-.003 3.151 1.02 5.03l2.988-2.387 2.988 2.387 1.022-1.88-3.89-3.186z"/>
							</g>
						</g>
					</svg>
				</button>
				<input
					name={hours}
					type="number"
					className={classes['hr']}
					value={formatTime( hours )}
					onChange={hoursHandler}
					onBlur={onBlurHoursHandler}
				/>
				<button className={classes['hr-down']} onClick={hoursDown}>
					<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
						<g>
							<g>
								<path d="M3.904 5.003L-.003 1.818 1.02-.062l2.988 2.386L6.995-.063l1.022 1.88-3.89 3.186z"/>
							</g>
						</g>
					</svg>
				</button>
			</div>
			
			<div className={classes['separator']}>:</div>
			
			<div className={classes['minute']}>
				<button className={classes['min-up']} onClick={minutesUp}>
					<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
						<g>
							<g>
								<path d="M3.904-.035L-.003 3.151 1.02 5.03l2.988-2.387 2.988 2.387 1.022-1.88-3.89-3.186z"/>
							</g>
						</g>
					</svg>
				</button>
				<input
					type="number"
					name={minutes}
					className={classes['min']}
					value={formatTime( minutes) }
					onChange={minutesHandler}
					onBlur={onBlurMinutesHandler}
				/>
				<button className={classes['min-down']} onClick={minutesDown}>
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
	</>);
};

export default TimePicker;