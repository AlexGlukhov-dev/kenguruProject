import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";

import {checkNum} from "../../../../../utils/utils";
import {Toggle} from "../../../../../UI/ordersUI/Toggle/Toggle";
import {Radio} from "../../../../../UI/ordersUI/Radio/radio";
import {Input} from "../../../../../UI/ordersUI/Input";
import Dropdown from "../../../../../UI/ordersUI/Dropdown/Dropdown";
import WarningField from "../../../../../UI/ordersUI/WarningField/WarningField";
import Stepper from "../../../../../UI/ordersUI/Stepper/Stepper";
import Suggestions from "../../../../../UI/ordersUI/Suggestions/Suggestions";
import TimePicker from "../../../../../UI/ordersUI/TimePicker/TimePicker";

import 'simplebar/dist/simplebar.min.css';
import classes from './chooseHouse.module.scss'
import {addData, checkBoxHandler, clearInputField, inputHandler} from "../../../../../redux/slices/indivOrdersSlice";
// import {validEmail} from "../../../../utils/utils";
// import SimpleBarReact from "simplebar-react";
// import DynamicBgBtn from "../../../../UI/DynamicBgBtn/DynamicBgBtn";
//import ItemsList from "../../../../UI/ItemsList/ItemsList";
// import TimeSelector from "../../../../UI/TimeSelector/TimeSelector";
//import {Button} from "../../../../UI/Button/Button";
// import DateSelect from "../../../../UI/DateSelect/DateSelect";
// import IndivContext from "../../../../context/indivContext";

const ChooseHouse = ({ close }) => {
	const order = useSelector(state => state.indivOrders.order)
	const dispatch = useDispatch()
	
	const [timeDate, setTimeDate] = useState( {
		deliveryDate: '',
		deliveryTime: '',
		hours: '8',
		minutes: '0',
	} );
	
 		// const changeBtnText = (btnText) => {
	// 	setBtnText( btnText )
	// }
	// let openBtn = order.deliveryAddress && order.entrance && order.deliveryDate && (order.deliveryTime || ((order.hours && order.minutes) || order.minutes === 0));
	
	let validFlatOrOfficeInput = order.flatOrOffice.length > 0
	
	const [selectDate, setSelectDate] = useState( '' );
	const [selectTime, setSelectTime] = useState( '' );
	// const [selectHours, setSelectHours] = useState( '' );
	// const [selectMinutes, setSelectMinutes] = useState( '' );
	// const [btnText, setBtnText] = useState( 'Укажите улицу и дом' )
	// const [btnProgress, setBtnProgress] = useState( '0%' )
	
	useEffect( () => {
		setTimeDate( prev => ({...prev, deliveryDate: selectDate}) );
		setTimeDate( prev => ({...prev, deliveryTime: selectTime}) );
		dispatch( addData( {key: 'deliveryDate', value: selectDate} ))
		dispatch( addData( {key: 'deliveryTime', value: selectTime} ))
		dispatch( addData( {key: 'hours', value: timeDate.hours} ))
		dispatch( addData( {key: 'minutes', value: timeDate.minutes} ))
		// dispatch(dispatch( addData( {key: 'deliveryDate', value: selectDate} ) ))
		// dispatch(dispatch( addData( {key: 'deliveryTime', value: selectTime} ) ))
		// dispatch(dispatch( addData( {key: 'hours', value: timeDate.hours} ) ))
		// dispatch(dispatch( addData( {key: 'minutes', value: timeDate.minutes} ) ))
		
	}, [selectDate, selectTime, timeDate.hours, timeDate.minutes, dispatch] );
	
	// useEffect(() => {
	// 	changeBtnText( 'Укажите улицу и дом' )
	// }, [])
	
	// useEffect( () => {
	//
	// 	if (inpState.deliveryAddress) {
	// 		if (!inpState.entrance) {
	// 			changeBtnText( 'Укажите подъезд' )
	// 			setBtnProgress( '25%' )
	// 		}
	// 	} else {
	// 		changeBtnText( 'Укажите улицу и дом' )
	// 		setBtnProgress( '0%' )
	// 	}
	// }, [inpState.deliveryAddress] )
	//
	// useEffect( () => {
	// 	// changeBtnText( 'Укажите подъезд' )
	// 	// setBtnProgress( '25%' )
	// 	if (inpState.entrance) {
	// 		if (!inpState.deliveryDate) {
	// 			changeBtnText( 'Укажите дату доставки ' )
	// 			setBtnProgress( '50%' )
	// 		} //else {
	// 		// 	changeBtnText( 'Укажите подъезд' )
	// 		// 	setBtnProgress( '50%' )
	// 		// }
	// 	}
	// }, [inpState.entrance, inpState.deliveryDate] )
	//
	// useEffect( () => {
	// 	if (inpState.deliveryDate) {
	// 		changeBtnText( 'Укажите время доставки ' )
	// 		setBtnProgress( '75%' )
	// 	}
	// }, [inpState.deliveryDate] )
	//
	// useEffect( () => {
	// 	if (inpState.deliveryTime) {
	// 		changeBtnText( 'Доставить сюда за 27 000 р ' )
	// 		setBtnProgress( '100%' )
	// 	}
	//
	// }, [inpState.deliveryToTime] )
	
	// useEffect( () => {
	// 	if (openBtn) {
	// 		changeBtnText( 'Доставить сюда за 27 000 р ' )
	// 		setBtnProgress( '100%' )
	// 	}
	// }, [
	// 	inpState.deliveryAddress,
	// 	inpState.entrance,
	// 	inpState.deliveryDate,
	// 	inpState.deliveryTime,
	// 	inpState.hours,
	// 	inpState.minutes,
	// 	openBtn
	// ] )
	
	// useEffect( () => {
	// 	// inpState.deliveryToTime && setInpState( prev => ({...prev, deliveryTime: ''}) )
	// 	if (inpState.deliveryAddress) {
	// 		changeBtnText( 'Укажите время доставки ' )
	// 		setBtnProgress( '75%' )
	// 	}
	// 	inpState.deliveryToTime ?
	// 		setInpState( prev => ({...prev, deliveryTime: ''}) )
	// 		: setInpState( prev => ({...prev, hours: '8', minutes: ''}) )
	// }, [inpState.deliveryToTime] )
	
	// const inpHandler = (e) => {
	// 	const target = e.target;
	// 	const name = target.name;
	// 	// const value = target.value.trim();
	// 	// const value = target.type === 'checkbox' ? target.checked : target.value.trim();
	// 	let value;
	// 	switch (target.type) {
	// 		case 'checkbox':
	// 			value = target.checked;
	// 			break;
	// 		case 'text':
	// 			value = target.validity.valid ? target.value : '';
	// 			break;
	// 		case 'radio':
	// 			value = target.value.trim();
	// 			break;
	// 		default:
	// 			target.value.trim()
	// 	}
	//
	// 	setInpState( prev => ({...prev, [name]: value}) );
	// 	//console.log(value)
	//
	// 	// if (inpState.deliveryAddress) {
	// 	// 	changeBtnText('Укажите подъезд')
	// 	// 	setBtnProgress('50%')
	// 	// }
	//
	//
	// };
	//const clearInp = e => {
	// const name = e.target.name;
	// setInpState(prev => ({...prev, [name]: ''}))
	
	//const inputName = e.target.getAttribute( 'data-forinput' );
	
	//setInpState( prev => ({...prev, [inputName]: ''}) )
	//;
	
	// const btnHandler = () => {
	// 	close();
	// 	sendData( inpState );
	//
	// };
	
	// const getValue = (value) => {
	// 	value !== '' ?
	// 		setInpState( prev => ({...prev, deliveryAddress: value}) )
	// 		: setInpState( prev => ({...prev, deliveryAddress: value}) )
	// }
	
	const getValue = value => {
		value.trim() !== '' ?	dispatch(addData( {key: 'deliveryAddress', value: value.trim()} ))
			: dispatch( inputHandler( {key: 'deliveryAddress', value: ''} ))
	}
	
	// const stepperHandlerPlus = (e) => {
	// 	e.stopPropagation()
	// 	setInpState( prev => ({...prev, floor: + inpState.floor + 1}) )
	// 	console.log( 'plus' )
	// 	floor.current.focus()
	// }
	//
	// const stepperHandlerMinus = (e) => {
	// 	e.stopPropagation()
	// 	setInpState( prev => ({...prev, floor: +inpState.floor - 1}) )
	// }
	
	return <>
		<div className={classes['chooseHouse__wrapper']}>
			<div className={classes['chooseHouse__content']}>
				{/*<SimpleBarReact*/}
				{/*	className={'custom-scroll-container'}*/}
				{/*	style={{maxHeight: '100%'}}*/}
				{/*	autoHide={false}>*/}
					<div className={classes['chooseHouse-btns']}>
						<div
							className={`${classes['chooseHouse-btns__toggleBtn']} ${classes['chooseHouse-btns__toggleBtn-active']}`}>
							<Toggle
								label={'У меня частный дом'}
								name={'privateHouse'}
								state={order}
								// handler={inpHandler}
								handler= {e => dispatch( checkBoxHandler( {key: 'privateHouse', value: e.target.checked} ) )}
							/>
						</div>
						{!order.privateHouse && <div className={classes['chooseHouse-btns__radioBtns']}>
							<div className={classes['chooseHouse-btns__radioBtn']}>
								<Radio
									name={'deliveryToFlat'}
									labelParams={['До подъезда']}
									id={'Доставить до подъезда'}
									handler={e => dispatch( inputHandler( {key: 'deliveryToFlat', value: e.target.value} ) )}
									// handler={inpHandler}
									state={order}
								
								/>
							</div>
							<div className={classes['chooseHouse-btns__radioBtn']}>
								<Radio
									name={'deliveryToFlat'}
									labelParams={['До квартиры']}
									id={'Доставить до квартиры'}
									handler={e => dispatch( inputHandler( {key: 'deliveryToFlat', value: e.target.value} ) )}
									// handler={inpHandler}
									state={order}
								/>
							</div>
						</div>}
						
						{order.privateHouse && <div className={classes['chooseHouse-btns__radioBtns']}>
							<div className={classes['chooseHouse-btns__radioBtn']}>
								<Radio
									name={'deliveryToHouse'}
									labelParams={['Привезти к дому']}
									id={'Привезти к дому'}
									handler={e => dispatch( inputHandler( {key: 'deliveryToHouse', value: e.target.value} ) )}
									state={order}/>
							</div>
							<div className={classes['chooseHouse-btns__radioBtn']}>
								<Radio
									name={'deliveryToHouse'}
									labelParams={['Доставить в дом']}
									id={'Доставить в дом'}
									handler={e => dispatch( inputHandler( {key: 'deliveryToHouse', value: e.target.value} ) )}
									state={order}
								/>
							</div>
						</div>}
					</div>
					
					{+order.orderWeight <= 15
						? <div className={classes['warning']}><WarningField content={'Обращаем внимание, что разгрузка не входит в стоимость доставки.'}/></div>
						:  <div className={classes['warning']}> <WarningField
							content={`Вес вашего заказа ${order.orderWeight} кг. Обращаем внимание, что разгрузка не входит в стоимость доставки.`}/></div>
					}
					{/*<p className={classes['chooseHouse__text']}>Разгрузка не входит в стоимость доставки</p>*/}
					<h5 className={classes['chooseHouse__title']}>Адрес</h5>
					<div className={classes['chooseHouse__addressInput']}>
						<Suggestions getValue={getValue} inpState={order} url={'./DB/STREETS_DATA.json'}/>
						{/*<Input*/}
						{/*	type="text"*/}
						{/*	name="deliveryAddress"*/}
						{/*	value={inpState.deliveryAddress}*/}
						{/*	handler={inpHandler}*/}
						{/*	label='Улица, дом'*/}
						{/*	clear={clearInp}*/}
						{/*	minWidth='358px'*/}
						{/*/>*/}
					</div>
					{/*type, name, value, handler*/}
					 {order.deliveryToFlat === "Доставить до квартиры" && !order.privateHouse &&
					<div className={classes['chooseHouse__flatInputs']}>
						<div className={classes['chooseHouse__flatInputs-group']}>
							<Input
								type='text'
								name='flatOrOffice'
								value={order.flatOrOffice}
								// handler={inpHandler}
								handler={e => dispatch( inputHandler( {key: 'flatOrOffice', value: checkNum(e.target.value.trim())} ) )}
								label='Квартира или офис'
								// clear={() => setInpState( prev => ({...prev, flatOrOffice: ''}) )}
								clear={() => dispatch( clearInputField( {key: 'flatOrOffice', value: ''} ) )}
								maxWidth='171px'
								isValid={validFlatOrOfficeInput}
							/>
							<Stepper
								disabled={+order.floor === -5}
								label={'Этаж'}
								inpState={order}
								// setInpState={setInpState}
								setInpState={dispatch}
								name='floor'
								value={order.floor}
								handler={e => dispatch( inputHandler( {key: 'floor', value: checkNum(e.target.value.trim())}))}
								// handler={inpHandler}
								// stepperHandlerPlus={stepperHandlerPlus}
								// stepperHandlerMinus={stepperHandlerMinus}
								// ref={floor}
							/>
						</div>
						<div className={classes['chooseHouse__flatInputs-group']}>
							<Stepper
								disabled={order.entrance === 1 || order.entrance === ''}
								label={'Подъезд'}
								inpState={order}
								setInpState={dispatch}
								name='entrance'
								value={order.entrance}
								handler={e => dispatch( inputHandler({key: 'entrance', value: checkNum(e.target.value.trim())}))}
								// handler={e => dispatch( inputHandler( {key: 'entrance', value: e.target.value.trim()} ) )}
								// handler={inpHandler}
							/>
							<Input
								type='text'
								name='doorPhone'
								value={order.doorPhone}
								// handler={inpHandler}
								handler={e => dispatch( inputHandler( {key: 'doorPhone', value: checkNum(e.target.value.trim())} ) )}
								label='Домофон'
								// clear={() => setInpState( prev => ({...prev, doorPhone: ''}) )}
								clear={() => dispatch( clearInputField( {key: 'doorPhone', value: ''} ) )}
								maxWidth='171px'
							/>
						</div>
						
						<div className={classes['chooseHouse-btns']}>
							<div
								className={`${classes['chooseHouse-btns__toggleBtn']} ${order.isElevator && classes['chooseHouse-btns__toggleBtn-active']}`}>
								<Toggle
									label={'В доме есть лифт'}
									name={'isElevator'}
									state={order}
									// handler={inpHandler}
									handler= {e => dispatch( checkBoxHandler( {key: 'isElevator', value: e.target.checked} ) )}
								/>
							</div>
							
							{order.isElevator && <div className={classes['chooseHouse-btns__radioBtns']}>
								<div className={classes['chooseHouse-btns__radioBtn']}>
									<Radio
										name={'typeOfElevator'}
										labelParams={['Пассажирский']}
										id={'Пассажирский'}
										// handler={inpHandler}
										handler={e => dispatch( inputHandler( {key: 'typeOfElevator', value: e.target.value} ) )}
										state={order}/>
								</div>
								<div className={classes['chooseHouse-btns__radioBtn']}>
									<Radio
										name={'typeOfElevator'}
										labelParams={['Грузовой']}
										id={'Грузовой'}
										// handler={inpHandler}
										handler={e => dispatch( inputHandler( {key: 'typeOfElevator', value: e.target.value} ) )}
										state={order}
									/>
								</div>
							</div>}
						</div>
					</div>
					}
					{order.deliveryToFlat === 'Доставить до подъезда' && !order.privateHouse && <div className={classes['chooseHouse__stepperBlock']}><Stepper
						disabled={order.entrance === 1 || order.entrance === ''}
						label={'Подъезд'}
						inpState={order}
						setInpState={dispatch}
						name='entrance'
						value={order.entrance}
						// handler={inpHandler}
						handler={e => dispatch( inputHandler( {key: 'entrance', value: e.target.value.trim()} ) )}
					/></div>}
					<div className={classes['chooseHouse__stepperBlock']}>
						{order.deliveryToHouse === 'Доставить в дом' && order.privateHouse && <Stepper
							disabled={+order.floor === -5}
							label={'Этаж'}
							inpState={order}
							setInpState={dispatch}
							name='floor'
							value={order.floor}
							handler={e => dispatch( inputHandler( {key: 'floor', value: typeof(e.target.value.trim()) === 'number' ? e.target.value.trim() : ''} ) )}
							// stepperHandlerPlus={stepperHandlerPlus}
							// stepperHandlerMinus={stepperHandlerMinus}
							// ref={floor}
						/>
						}
					</div>
					<h5 className={classes['chooseHouse__title']}>Дата и время</h5>
					<div className={classes['chooseHouse__deliveryToTime']}>
						<Toggle
							label={<span>Доставить ко времени <span style={{color: '#808080'}}>+500 ₽</span></span>}
							name={'deliveryToTime'}
							state={order}
							// handler={inpHandler}
							handler= {e => dispatch( checkBoxHandler( {key: 'deliveryToTime', value: e.target.checked} ) )}
						/>
						<p className={classes['chooseHouse__comment']}>Сможете указать конкретное время доставки</p>
					</div>
					<div className={classes['chooseHouse__params']}>
						<div className={classes['chooseHouse__day']}>
							{/*<DateSelect title={'Дата доставки'} handler={inpHandler} />*/}
							{/*<DateSelect title={'Время доставки'} handler={inpHandler}/>*/}
							<Dropdown
								href='#bottom-choose-house'
								// selected={order.deliveryDate}
								// setSelected={dispatch( addData( {key: 'deliveryDate', value:order.deliveryDate} ) )}
								selected={selectDate}
								setSelected={setSelectDate}
								title={'Дата доставки'}
								options={order.deliveryKenguruDates}/>
						</div>
						<div className={classes['chooseHouse__time']}>
							{!order.deliveryToTime
								?
								<Dropdown
									href='#bottom-choose-house'
									selected={selectTime}
									setSelected={setSelectTime}
									title={'Время доставки'}
									options={order.deliveryKenguruTimes}/>
								:
								<TimePicker
									maxHour={20}
									minHour={8}
									inpState={order}
									setSelected={setSelectTime}
									setInpState={setTimeDate}
								/>
							
								/*<TimeSelector
									title={'Время доставки'}
									setSelectTime={setSelectTime}
									selected={selectHours}
									setSelected={setSelectHours}
									disabledUpHours={inpState.hours === 19}
									disabledDownHours={inpState.hours <= 8 || inpState.hours === ''}
									disabledUpMinutes={inpState.minutes === 59}
									disabledDownMinutes={inpState.minutes === 0 || inpState.minutes === ''}
									labelHours={'Часы'}
									labelMinutes={'Минуты'}
									inpState={inpState}
									setInpState={setInpState}
									nameHours='hours'
									nameMinutes='minutes'
									valueHours={inpState.hours}
									valueMinutes={inpState.minutes}
									handler={inpHandler}
								/>*/
							}
						</div>
					</div>
				{/*</SimpleBarReact>*/}
			</div>
			{/*<div className={classes['submitBtn']}>*/}
			{/*	<DynamicBgBtn*/}
			{/*		className={classes['submit-button']}*/}
			{/*		width={"238px"}*/}
			{/*		height={"40px"}*/}
			{/*		onClick={btnHandler}*/}
			{/*		progress={btnProgress}*/}
			{/*		disabled={!openBtn}*/}
			{/*	>*/}
			{/*		<span>{btnText}</span>*/}
			{/*	</DynamicBgBtn>*/}
			{/*	{openBtn && <div className={classes['submit-info']}>*/}
			{/*		<p className={classes['submit-info__text']}>Доставим</p>*/}
			{/*		<p className={classes['submit-info__date']}>{inpState.deliveryDate}</p>*/}
			{/*	</div>}*/}
			{/*</div>*/}
			<div id="bottom-choose-house"/>
		</div>
	</>
};

export default ChooseHouse;