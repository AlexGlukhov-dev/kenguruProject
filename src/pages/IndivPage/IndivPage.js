import React, {useEffect, useReducer} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addData} from '../../redux/slices/indivOrdersSlice'

import {Section1} from '../../components/Order/IndivContent/Section1/Section1'
import {Section2} from "../../components/Order/IndivContent/Section2/Section2"
import {Section3} from "../../components/Order/IndivContent/Section3/Section3"
import {Section4} from "../../components/Order/IndivContent/Section4/Section4"
import SummaryBlock from "../../components/Order/SummaryBlock/SummaryBlock"
import {SectionTitle} from "../../UI/ordersUI/SectionTitle/SectionTitle"
import {validEmail} from "../../utils/utils"

import classes from './indivPage.module.scss'

export const IndivPage = () => {
	const order = useSelector(state => state.indivOrders.order)
	const dispatch = useDispatch()

	useEffect(() => {
	 	if (order.fiz && validEmail(order.email)) dispatch(addData({key: 'paymentEmail', value: order.email}))
		if (!order.fiz) dispatch(addData({key: 'paymentEmail', value: order.contactEmail}))
		if (order.ur && validEmail(order.contactEmail)) dispatch(addData({key: 'paymentEmail', value: order.contactEmail}))
		if (!order.ur) dispatch(addData({key: 'paymentEmail', value: order.email}))
	 }, [order.fiz, order.ur, order.email, order.contactEmail, dispatch])

	useEffect( () => {
		if (!order.receiveLetters) dispatch(addData({key: 'email', value: ''}))
	}, [order.receiveLetters, dispatch] )
	
	useEffect( () => {
		order.addressesIsEqual
			? dispatch(addData({key: 'orgPostAddress', value: order.orgAddress}))
			: dispatch(addData({key: 'orgPostAddress', value: ''}))
	}, [order.addressesIsEqual, order.orgAddress, dispatch] )


//**** Logic to send filtered data from state to backend - DON'T REMOVE - ****

// const sendDataToBackend = (state) => {
// 	const dataToBackend = {};
//
// 	for (const key in state) {
// 		if (state[key].toString().trim()) {
// 			dataToBackend[key] = state[key]
// 		}
// 	}
//
// 	return dataToBackend;
// };
//
// console.log(sendDataToBackend(state));
//*******************************************************************************//
	
	// const sendData = (data) => {
	// 	setState( prev => ({...prev, ...data}) )
	// };
	
	// const clearInputField = e => {
	// 	const inputName = e.target.getAttribute( 'data-forinput' )
	// 	dispatch(addData({key: [inputName], value: ''}))
	// 	// setState( prev => ({...prev, [inputName]: ''}) )
	// };
	
	// const inputHandler = e => {
	// 	const target = e.target;
	// 	const name = target.name;
	// 	let value = ''
	// 	// const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	// 	switch (target.type) {
	// 		case 'checkbox':
	// 			value = target.checked
	// 			break;
	// 		case 'tel':
	// 			target.validity.valid ? value = target.value.trim() : value = ''
	// 			break;
	// 		default:
	// 			value = target.value
	// 	}
	// 	dispatch(addData({key: [name], value}))
	// 	// setState( prev => ({...prev, [name]: value}) )
	// };
	
	const submitHandler = e => {
		e.preventDefault()
		// console.log('submitted')
	};
	
	
	// let section2Open,
	// 		section3Open
	// let section4Open = section3Open
	
	let section2Open = (order.fiz && (order.receiveLetters ? order.phone.length === 18
		&& order.name.length > 2
		&& order.lastName.length > 2
		&& validEmail( order.email )
		: order.phone.length === 18
		&& order.name.length > 2
		&& order.lastName.length > 2)
		)
	||
		(order.ur && (order.inn.length >=10
		&& order.contactName.length > 2
		&& order.contactPhone.length === 18
		&& validEmail(order.contactEmail)
	))
	
	let section3Open = (order.fiz && (order.receiveLetters ? order.phone.length === 18
		&& order.name.length > 2
		&& order.lastName.length > 2
		&& validEmail( order.email )
		: order.phone.length === 18
		&& order.name.length > 2
		&& order.lastName.length > 2
		&& (!!order.samovivozShop || !!order.samovivozPickup))
		)
	||
		(order.ur && (order.inn.length >=10
			&& order.contactName.length > 2
			&& order.contactPhone.length === 18
			&& validEmail(order.contactEmail)
			&& (!!order.samovivozShop || !!order.samovivozPickup)
		))
	
	
	// const goToPay = () => {
	// 	if (!order.paymentEmail) {
	// 		getText( "CHOOSE_PAYMENT" )
	// 	}	else {
	// 		getText("PAY")
	// 	}
	// }
	
	// /* summaryBtn behavior */
	
	const fizReducer = (state, action) => {
		switch (action.type) {
			case "ENTER_PHONE":
				return {...state, text: "Введите телефон", progress: "0%"};
			case "ENTER_SMS":
				return {...state, text: "Введите код из SMS", progress: "10%"};
			case "ENTER_NAME":
				return {...state, text: "Введите имя", progress: "15%"};
			case "ENTER_LAST_NAME":
				return {...state, text: "Введите фамилию", progress: "20%"};
			case "ENTER_EMAIL":
				return {...state, text: "Введите Email", progress: "25%"};
			case "ENTER_CONSIGNEE_NAME":
				return {...state, text: "Введите Имя", progress: "30%"};
			case "ENTER_CONSIGNEE_LASTNAME":
				return {...state, text: "Введите Фамилию", progress: "35%"};
			case "ENTER_CONSIGNEE_PHONE":
				return {...state, text: "Введите телефон", progress: "40%"};
			case "CHOOSE_PLACE":
				return {...state, text: "Выберите способ получения", progress: "45%"};
			case "PAY":
				return {...state, text: "Перейти к оплате", progress: "100%"};
			case "CHOOSE_PAYMENT":
				return {...state, text: "Укажите способ оплаты", progress: "90%"};
			case "LEAVE_COMMENT":
				return {...state, text: "Оставьте комментарий", progress: "95%"};
			default:
				return state
		}
	}

	const [btnFizState, fizDispatcher] = useReducer( fizReducer, {
		text: "Введите телефон",
		progress: "0%"
	} )

	const getFizText = (text) => {
			return fizDispatcher( {type: text} )
	};

	useEffect( () => {
		if (order.phone.length < 18) {
			getFizText( "ENTER_PHONE" )
			// return;
		} else if (order.codeSms !== order.rightCodeSms) {
			getFizText( "ENTER_SMS" )
			// return;
		} else if (order.name.length < 2) {
			getFizText( "ENTER_NAME" )
			// return;
		} else if (order.lastName.length < 2) {
			getFizText( "ENTER_LAST_NAME" )
			// return;
		} else if (!!order.receiveLetters && !validEmail( order.email )) {
			getFizText( "ENTER_EMAIL" )
		} else if (!!order.takeByConsignee) {
			if (order.consigneeName.length < 2) {
				getFizText( "ENTER_CONSIGNEE_NAME" )
			} else if (order.consigneeLastName.length < 2) {
				getFizText( "ENTER_CONSIGNEE_LASTNAME" )
			} else if (order.consigneePhone.length < 18) {
				getFizText( "ENTER_CONSIGNEE_PHONE" )
			}
			// else {
			// 	getText( "pay" )
			// }
			else if (!order.samovivozShop) {
				getFizText( "CHOOSE_PLACE" )
			}

			else if (!order.paymentEmail || !validEmail( order.paymentEmail )) {
				getFizText( "CHOOSE_PAYMENT" )
			}

			else {
				getFizText( "PAY" )
				// return
			}
		}

		else if (!order.samovivozShop) {
			getFizText( "CHOOSE_PLACE" )
		}

		else if (!order.paymentEmail || !validEmail( order.paymentEmail )) {
			getFizText( "CHOOSE_PAYMENT" )
		}	else {
			getFizText( "PAY" )
		}
	}, [
		order.phone,
		order.codeSms,
		order.rightCodeSms,
		order.name,
		order.lastName,
		order.receiveLetters,
		order.email,
		order.takeByConsignee,
		order.consigneeName,
		order.consigneeLastName,
		order.consigneePhone,
		order.samovivozShop,
		order.samovivozPickup,
		order.paymentEmail,
		order.paymentCash,
		order.payment
	] );
	
	const urReducer = (state, action) => {
		switch (action.type) {
			case "ENTER_INN":
				return {...state, text: "Введите ИНН", progress: "0%"};
			case "ENTER_POST_ADDRESS":
				return {...state, text: "Введите почтовый адресс", progress: "10%"};
			case "ENTER_FIO":
				return {...state, text: "Введите ФИО контактного лица", progress: "20%"};
			case "ENTER_PHONE":
				return {...state, text: "Введите телефон", progress: "30%"};
			case "ENTER_EMAIL":
				return {...state, text: "Введите Email", progress: "40%"};
			case "CHOOSE_PLACE":
				return {...state, text: "Выберите способ получения", progress: "45%"};
			case "PAY":
				return {...state, text: "Перейти к оплате", progress: "100%"};
			default:
				return state
		}
	}
	
	const [btnUrState, urDispatcher] = useReducer( urReducer, {
		text: "Введите ИНН",
		progress: "0%"
	} )
	
	const getUrText = (text) => {
		return urDispatcher( {type: text} )
	};
	
	useEffect( () => {
		if (order.inn.length < 10) {
			getUrText( "ENTER_INN" )
			// return;
		} else if (!order.orgPostAddress) {
			getUrText("ENTER_POST_ADDRESS")
		}else if (order.contactName.length < 2) {
			getUrText( "ENTER_FIO" )
			// return;
		} else if (order.contactPhone.length < 18) {
			getUrText( "ENTER_PHONE" )
			// return;
		} else if (!validEmail( order.contactEmail )) {
			getUrText( "ENTER_EMAIL" )
		} else if (!order.samovivozShop) {
			getUrText( "CHOOSE_PLACE" )
		}	else if (!order.paymentEmail || !validEmail( order.paymentEmail )) {
			getUrText( "CHOOSE_PAYMENT" )
		}	else {
			getUrText( "PAY" )
		}
	}, [
		order.inn,
		order.orgName,
		order.contactName,
		order.contactPhone,
		order.contactEmail,
		order.samovivozShop,
		order.paymentEmail,
		order.orgPostAddress
	] );
	
	const summaryBtnRelease = false
	
	return <>
		{/*<button className={classes.BackToCart}>Вернуться в корзину</button>*/}
		{/*<div className={classes['container']}>*/}
			{/*<button className={classes.BackToCart}>Вернуться в корзину</button>*/}
			{/*<div className={classes['wrapper']}>*/}
			
			<div className={classes['content-inner']}>
				<div className={classes['order-left']}>
					<form onSubmit={submitHandler}>
						<SectionTitle
							active
							sectionNumber={1}
							sectionTitle={'Контактные данные'}
						/>
						
						<Section1/>
						
						<SectionTitle
							active={section2Open}
							sectionNumber={2}
							sectionTitle={'Способы получения в Иваново'}
							span={<span>{'Изменить'}</span>}
						/>
						
						{section2Open && <Section2/>}
						
						<SectionTitle
							active={section3Open}
							sectionNumber={3}
							sectionTitle={'Способы оплаты'}
						/>
						
						{section3Open && <Section3/>}
						
						<SectionTitle
							active={section3Open}
							sectionNumber={4}
							sectionTitle={'Комментарий к заказу'}
						/>
						
						{section3Open && <Section4/>}
					
					</form>
				</div>
				<div className={classes['order-right']}>
					<SummaryBlock
						// data={cartData}
						text={order.fiz ? btnFizState.text : btnUrState.text}
						progress={order.fiz ? btnFizState.progress : btnUrState.progress}
						disabled={!summaryBtnRelease}
						submit={submitHandler}
						open={section2Open}
					/>
				</div>
			</div>
		{/*</div>*/}
		{/*</div>*/}
	</>
};