import React, {useState, useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
	clearInputField,
	inputMaskHandler,
	inputHandler,
	checkBoxHandler,
	addData
} from '../../../../../redux/slices/indivOrdersSlice'
import axios from 'axios'

import {Input} from '../../../../../UI/ordersUI/Input'
import {CheckBox} from '../../../../../UI/ordersUI/Checkbox/CheckBox'
import {Toggle} from '../../../../../UI/ordersUI/Toggle/Toggle'
import InputM from "../../../../../UI/ordersUI/InputM/InputM";
import {validEmail} from "../../../../../utils/utils";

import classes from "./indivContent.module.scss";


export const IndivContent = ({disTab}) => {
	const order = useSelector( state => state.indivOrders.order )
	const dispatch = useDispatch()

	const [sendedSms, setSendedSms] = useState( false );
	const [counter, setCounter] = useState( 20 );
	const sms = useRef( null );
	console.log(sendedSms);
	//TODO change validPhoneInput variable to useState hook
	let validPhoneInput = order.phone.length === 18;
	let validNameInput = order.name.length > 2;
	let validLastNameInput = order.lastName.length > 2;
	let validEmailInput = validEmail( order.email );
	let validConsigneeNameInput = order.consigneeName.length > 2;
	let validConsigneeLastNameInput = order.consigneeLastName.length > 2;
	let validConsigneePhoneInput = order.consigneePhone.length === 18;
	
	const sendSMS = () => {
		try {
			axios.get( './DB/SMS_CODE.json' )
				.then( data => dispatch( addData( {key: 'rightCodeSms', value: data.data[0].smsCode} ) ) )
			// const response = axios.get( ' http://kengurutest.ru/rest_dev/SMS_CODE.json' )
			// 	.then( data => setState( prev => ({...prev, 'rightCodeSms': data.data[0].smsCode}) ) )
		} catch (error) {
			console.log( 'Ошибка сервера', error )
		}
		setSendedSms( true );
		disTab();
		sms.current.focus();
		let timer = setInterval( () => setCounter( prev => prev - 1 ), 1000 );
		setTimeout( () => {
			setSendedSms( false );
			disTab();
			clearInterval( timer );
			setCounter( 20 );
		}, 20000 )
	};
	
	const disableSmsBtn = () => {
		return order.phone.length < 18 || sendedSms;
	};
	
	let smsLabel = '';
	
	if (sendedSms) {
		smsLabel = 'SMS с кодом отправлена'
	}
	
	const [labelSmsInput, setLabelSmsInput] = useState( <span>Код из смс</span> )
	
	useEffect( () => {
		if (order.phone.length < 18) {
			setLabelSmsInput( <span>Код из смс</span> )
			dispatch( addData( {key: 'codeSms', value: ''} ) )
		}
		
		if (order.phone.length === 18
			&& order.codeSms.length === 4
			&& order.codeSms !== order.rightCodeSms) {
			setTimeout( () => {
				setLabelSmsInput( <span style={{color: 'red'}}>Неверный код</span> )
			}, 100 )
		} else {
			setLabelSmsInput( <span>Код из смс</span> )
		}
	}, [order.phone, order.codeSms, order.rightCodeSms, dispatch] )
	
	useEffect( () => {
		if (!order.takeByConsignee) {
			dispatch( addData( {key: 'consigneeName', value: ''} ) )
			dispatch( addData( {key: 'consigneePhone', value: ''} ) )
			dispatch( addData( {key: 'consigneeLastName', value: ''} ) )
		}
	}, [order.takeByConsignee, dispatch] )
	
	const phoneInputRef = useRef()
	
	useEffect( () => {
		phoneInputRef.current.focus()
	}, [] )

	return <>
		<div className={classes['contacts']}>
			<div className={classes['contacts-phone']}>
				<InputM
					ref={phoneInputRef}
					name='phone'
					type='tel'
					label='Телефон'
					value={order.phone}
					onChange={e => dispatch( inputMaskHandler( {key: 'phone', value: e.target.value} ) )}
					clear={() => dispatch( clearInputField( {key: 'name', value: ''} ) )}
					mask='+7 (999) 999-99-99'
					maskChar=''
					// minWidth='390px'
					addLabel={order.codeSms.length === 4 &&
					order.codeSms === order.rightCodeSms &&
					order.phone.length === 18 ? '' : smsLabel}
					isValid={validPhoneInput}
					//danger={state.codeSms.length === 4  & state.codeSms !== state.rightCodeSms & sendedSms}
					// disable={state.codeSms === state.rightCodeSms}
					//locked={sendedSms}
				/>
				{order.rightCodeSms && order.codeSms !== order.rightCodeSms && <div className={classes['send-SMS']}>
					
					<button
						className={classes.SmsButton}
						type="button"
						//{...(state.phone.length < 11 && {disabled: true})}
						disabled={disableSmsBtn()}
						onClick={() => sendSMS()}
					>{!sendedSms ? 'Отправить SMS' : <span>Повтор через&nbsp;<span
						style={{color: 'var(--color-primary)'}}>{counter < 10 ? '0' + counter : counter}</span></span>}
					</button>
					<div className={classes['input-sms']}>
						<Input
							type="text"
							name="codeSms"
							value={order.codeSms}
							handler={e => dispatch( inputHandler( {key: 'codeSms', value: e.target.value} ) )}
							// label='Код из SMS'
							label={labelSmsInput}
							clear={() => dispatch( clearInputField( {key: 'codeSms', value: ''} ) )}
							max={4}
							sms={order.phone.length}
							reference={sms}
							// className={'sms-input'}
						/>
					</div>
				</div>}
			</div>
			{
				validPhoneInput && order.codeSms === order.rightCodeSms &&
				<div className={classes['personal-info']}>
					<div className={classes['personal-info__name']}>
						<Input
							type="text"
							name="name"
							value={order.name}
							handler={e => dispatch( inputHandler( {key: 'name', value: e.target.value} ) )}
							label='Имя'
							clear={() => dispatch( clearInputField( {key: 'name', value: ''} ) )}
							// minWidth='390px'
							isValid={validNameInput}
						/>
						<Input
							type="text"
							name="lastName"
							value={order.lastName}
							handler={e => dispatch( inputHandler( {key: 'lastName', value: e.target.value} ) )}
							label='Фамилия'
							clear={() => dispatch( clearInputField( {key: 'lastName', value: ''} ) )}
							// minWidth='390px'
							isValid={validLastNameInput}
						/>
					</div>
					<div className={classes['personal-info__infoEmail']}>
						<Input
							type="email"
							name="email"
							value={order.email}
							handler={e => dispatch( inputHandler( {key: 'email', value: e.target.value} ) )}
							label='E-mail'
							clear={() => dispatch( clearInputField( {key: 'email', value: ''} ) )}
							// minWidth='390px'
							disabled={!order.receiveLetters}
							isValid={validEmailInput}
						/>
						<div className={classes['personal-info__getLetters']}>
							<CheckBox
								labelText="Хочу получать письма об изменениях статуса заказа"
								state={order}
								handler={(e) => dispatch( checkBoxHandler( {key: 'receiveLetters', value: e.target.checked} ) )}
								name={'receiveLetters'}
								val={order.receiveLetters}
							/>
							{!order.receiveLetters &&
							<p className={classes['personal-info__status']}>Статус заказа можно отслеживать в личном кабинете</p>}
						</div>
					</div>
					<div>
						<Toggle
							label='Заказ заберет другой человек'
							val={'Заказ заберет другой человек'}
							name={'takeByConsignee'}
							state={order}
							// handler={toggleHandler}
							handler={e => dispatch( checkBoxHandler( {key: 'takeByConsignee', value: e.target.checked} ) )}
						/>
					</div>
				</div>
			}
			{order.takeByConsignee && <div className={classes['consignee-info']}>
				<Input
					type="text"
					name="consigneeName"
					value={order.consigneeName}
					handler={e => dispatch( inputHandler( {key: 'consigneeName', value: e.target.value} ) )}
					label='Имя'
					clear={() => dispatch( clearInputField( {key: 'consigneeName', value: ''} ) )}
					// minWidth='390px'
					isValid={validConsigneeNameInput}
				/>
				<Input
					type="text"
					name="consigneeLastName"
					value={order.consigneeLastName}
					handler={e => dispatch( inputHandler( {key: 'consigneeLastName', value: e.target.value} ) )}
					label='Фамилия'
					clear={() => dispatch( clearInputField( {key: 'consigneeLastName', value: ''} ) )}
					// minWidth='390px'
					isValid={validConsigneeLastNameInput}
				/>
				<InputM
					name='consigneePhone'
					type='tel'
					label='Телефон'
					value={order.consigneePhone}
					onChange={e => dispatch( inputMaskHandler( {key: 'consigneePhone', value: e.target.value} ) )}
					clear={() => dispatch( clearInputField( {key: 'consigneePhone', value: ''} ) )}
					mask='+7 (999) 999-99-99'
					maskChar=''
					// minWidth='390px'
					isValid={validConsigneePhoneInput}
				/>
			</div>}
		</div>
	</>
};