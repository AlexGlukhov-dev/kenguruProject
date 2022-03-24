import React, {useEffect, useState, useReducer} from 'react'
import axios from 'axios'

import {SectionTitle} from "../../UI/ordersUI/SectionTitle/SectionTitle";
import {Section1} from '../../components/Order/IndivContent/Section1/Section1'
import {Section2} from "../../components/Order/IndivContent/Section2/Section2";
import {Section3} from "../../components/Order/IndivContent/Section3/Section3";
import {Section4} from "../../components/Order/IndivContent/Section4/Section4";
import {validEmail} from "../../utils/utils";

// import classes from '../../styles/CommonStyles.module.scss'
import classes from './indivOrders.module.scss'
import Layout from "../../components/Order/Layout/Layout";
import SetPage from "../../components/SetPage/SetPage";
import SummaryBlock from "../../components/Order/SummaryBlock/SummaryBlock";
import InputM from "../../UI/ordersUI/InputM/InputM";
//import Suggestions from "../../UI/Suggestions/Suggestions";

export const IndivOrders = () => {
	const [shops, setShops] = useState( [
		{
			code: '37_01',
			address: 'Куконковых 104',
			cost: 'Бесплатно',
			schedule: 'Пн-Пт с 8 до 21 Сб-Вс с 8 до 20',
			shopPhone: '8 915 832 60 77',
			takeFrom: '2021/04/26'
		},
		{
			code: '37_02',
			address: 'Спартака 22',
			cost: 'Бесплатно',
			schedule: 'Пн-Вс с 8 до 21',
			shopPhone: '8 915 832 60 80',
			takeFrom: '2021/04/27'
		},
		{
			code: '37_03',
			address: 'Каравайковой 101',
			cost: 'Бесплатно',
			schedule: 'Пн-Пт с 8 до 21 Сб-Вс с 8 до 20',
			shopPhone: '8 915 832 60 90',
			takeFrom: '2021/03/28'
		},
		{
			code: '37_04',
			address: 'Куконковых 104',
			cost: 'Бесплатно',
			schedule: 'Пн-Пт с 8 до 21 Сб-Вс с 8 до 20',
			shopPhone: '8 915 832 60 77',
			takeFrom: '2021/04/26'
		},
		{
			code: '37_05',
			address: 'Спартака 22',
			cost: 'Бесплатно',
			schedule: 'Пн-Вс с 8 до 21',
			shopPhone: '8 915 832 60 80',
			takeFrom: '2021/04/27'
		},
		{
			code: '37_06',
			address: 'Каравайковой 101',
			cost: 'Бесплатно',
			schedule: 'Пн-Пт с 8 до 21 Сб-Вс с 8 до 20',
			shopPhone: '8 915 832 60 90',
			takeFrom: '2021/03/28'
		},
		{
			code: '37_07',
			address: 'Куконковых 104',
			cost: 'Бесплатно',
			schedule: 'Пн-Пт с 8 до 21 Сб-Вс с 8 до 20',
			shopPhone: '8 915 832 60 77',
			takeFrom: '2021/04/26'
		},
		{
			code: '37_08',
			address: 'Спартака 22',
			cost: 'Бесплатно',
			schedule: 'Пн-Вс с 8 до 21',
			shopPhone: '8 915 832 60 80',
			takeFrom: '2021/04/27'
		},
		{
			code: '37_09',
			address: 'Каравайковой 101',
			cost: 'Бесплатно',
			schedule: 'Пн-Пт с 8 до 21 Сб-Вс с 8 до 20',
			shopPhone: '8 915 832 60 90',
			takeFrom: '2021/03/28'
		},
	] );
	const [pickups, setPickups] = useState( [
		{
			code: '123',
			address: 'Громобоя, 16/50',
			cost: '100 ₽',
			schedule: 'Пн-Пт с 8 до 21 Сб-Вс с 8 до 20',
			pickupPhone: '8 915 832 60 77',
			takeFrom: '2021/04/20'
		},
		{
			code: '456',
			address: 'Велижская, 10',
			cost: '200 ₽',
			schedule: 'Пн-Вс с 8 до 21',
			pickupPhone: '8 915 832 60 80',
			takeFrom: '2021/04/01'
		},
		{
			code: '789',
			address: 'Лежневскя, 124',
			cost: '300 ₽',
			schedule: 'Пн-Пт с 8 до 21 Сб-Вс с 8 до 20',
			pickupPhone: '8 915 832 60 90',
			takeFrom: '2021/03/27'
		},
	] );
	const [disableTab, setDisabledTab] = useState( false );
	const [state, setState] = useState( {
		email: '',
		phone: '',
		codeSms: '',
		rightCodeSms: '500106',
		name: '',
		lastName: '',
		consigneeName: '',
		consigneeLastName: '',
		consigneePhone: '',
		change: '',
		paymentEmail: '',
		paymentCash: '',
		payment: '',
		samovivoz: 'from_Kenguru',
		samovivozShop: '',
		samovivozPickup: '',
		samovivozPlace: '',
		pickup: '',
		comments: '',
		receiveLetters: true,
		inn: '',
		kpp: '',
		validInn: false,
		orgName: '',
		orgAddress: '119146, город Москва, Комсомольский проспект, дом 25 корпус 3, помещение V ком.2',
		orgPostAddress: '',
		contactName: '',
		contactPhone: '',
		contactEmail: '',
		delivery: 'Доставка Кенгуру',
		takeByParts: '',
		loadIntoCar: '',
		takeByConsignee: '',
		addressesIsEqual: '',
		deliveryDates: ["23.08 Пн", "24.08 Вт", "25.08 Ср", "26.08 Чт", "27.08 Пт", "28.08 Сб", "29.08 Вс"],
		deliveryTimes: ["08:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "18:00", "19:00", "20:00"],
		orderWeight: '50',
		// deliveryStatusLetters: true,
		// privateHouse: '',
		deliveryAddress: '',
		// deliveryToTime: ''
	} );
	const [cartData, setCartData] = useState( {} );
	
	useEffect( () => {
		try {
			const response = axios.get( './DATA/CART_DATA.json' )
				.then( data => setCartData( data.data[0] ) )
		} catch (error) {
			console.log( error )
		}
	}, [] );
	
	useEffect( () => {
		if (!state.receiveLetters) setState( prev => ({...prev, 'email': ''}) )
	}, [state.receiveLetters] )
	
	useEffect( () => {
		state.addressesIsEqual
			? setState( prev => ({...prev, 'orgPostAddress': state.orgAddress}) )
			: setState( prev => ({...prev, 'orgPostAddress': ''}) )
	}, [state.addressesIsEqual, state.orgAddress] )
	
	console.log( state );

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
	
	const sendData = (data) => {
		setState( prev => ({...prev, ...data}) );
		
	};
	
	const clearInputField = e => {
		const inputName = e.target.getAttribute( 'data-forinput' );
		
		setState( prev => ({...prev, [inputName]: ''}) )
	};
	// const inputHandler = (e) => {
	// 	const {value, name} = e.target;
	// 	setState( prev => ({...prev, [name]: value.trim()}) )
	// };
	
	const inputHandler = e => {
		const target = e.target;
		const name = target.name;
		// const value = target.type === 'checkbox' ? target.checked : target.value.trim();
		// const value = target.type === 'checkbox' ? target.checked : target.validity.valid ? target.value.trim() : '';
		let value = ''
		// const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		switch (target.type) {
			case 'checkbox':
				value = target.checked
				break;
			case 'tel':
				target.validity.valid ? value = target.value.trim() : value = ''
				break;
			// case 'email': emailPattern.test(target.value.trim()) ? value = target.value.trim() : value = ''
			// 	break; //does't work with controlled input
			default:
				value = target.value
		}
		
		setState( prev => ({...prev, [name]: value}) )
	};
	
	const submitHandler = e => {
		e.preventDefault();
	};
	
	
	let section2Open;
	let section3Open = false;
	let section4Open = false;
	
	// state.receiveLetters ?  section2Open = state.phone.length === 18
	// 	&& state.name.length > 2
	// 	&& state.lastName.length > 2
	// 	&& validEmail(state.email)
	// 	: section2Open = state.phone.length === 18
	// 	&& state.name.length > 2
	// 	&& state.lastName.length > 2
	
	section2Open = state.receiveLetters ? state.phone.length === 18
		&& state.name.length > 2
		&& state.lastName.length > 2
		&& validEmail( state.email )
		: state.phone.length === 18
		&& state.name.length > 2
		&& state.lastName.length > 2
	
	const disTab = () => setDisabledTab( prev => !prev );
	
	const inputMaskHandler = e => {
		const {value, name} = e.target;
		if (value.indexOf( '8' ) === 4) return
		setState( prev => ({...prev, [name]: value}) )
	}
	
	/* summaryBtn behavior */

	const reducer = (state, action) => {
		switch (action.type) {
			case "enterPhone":
				return { ...state, text: "Введите телефон", progress: "0%" };
			case "enterSMS":
				return { ...state, text: "Введите код из SMS", progress: "10%" };
			case "enterName":
				return { ...state, text: "Введите имя", progress: "15%" };
			case "enterLastName":
				return { ...state, text: "Введите фамилию", progress: "20%" };
			case "enterEmail":
				return { ...state, text: "Введите Email", progress: "25%" };
			case "enterConsigneeName":
				return { ...state, text: "Введите Имя", progress: "30%" };
			case "enterConsigneeLastName":
				return { ...state, text: "Введите Фамилию", progress: "35%" };
			case "enterConsigneePhone":
				return { ...state, text: "Введите телефон", progress: "40%" };
			case "pay":
				return { ...state, text: "Оплатить", progress: "100%" };
			default:
				return state;
		}
	}
	
	const [btnState, dispatch] = useReducer(reducer, {
		text: "Введите телефон",
		progress: "0%"
	});
	
	const getText = (text) => {
		return dispatch({ type: text });
	};
	
	useEffect(() => {
		if (state.phone.length < 18) {
			getText("enterPhone");
			// return;
		} else if (state.codeSms !== state.rightCodeSms) {
			getText("enterSMS");
			// return;
		} else if (state.name.length < 2) {
			getText("enterName");
			// return;
		} else if (state.lastName.length < 2) {
			getText("enterLastName");
			// return;
		} else if (!!state.receiveLetters && !validEmail( state.email )) {
			getText( "enterEmail" );
		// return
			
		//  }
		// if (!!state.takeByConsignee) {
		// 	if (state.consigneeName.length < 2) {
		// 		getText( "enterConsigneeName" );
		// 	} else if ( state.consigneeLastName.length < 2) {
		// 		getText( "enterConsigneeLastName" );
		// 	} else if (state.consigneePhone.length < 18) {
		// 		getText( "enterConsigneePhone" );
		// 	}
		} else if (!!state.takeByConsignee) {
				if (state.consigneeName.length < 2) {
					getText( "enterConsigneeName" );
				} else if ( state.consigneeLastName.length < 2) {
					getText( "enterConsigneeLastName" );
				} else if (state.consigneePhone.length < 18) {
					getText( "enterConsigneePhone" );
				} else {
						getText("pay");
				}
		} else {
			getText("pay");
			// return
		}
	}, [state.phone, state.codeSms, state.name, state.lastName, state.receiveLetters, state.email, state.takeByConsignee,
			state.consigneeName, state.consigneeLastName, state.consigneePhone]);
	console.log(state.codeSms !== state.rightCodeSms)
	
	// const [summaryBtnText, setSummaryBtnText] = useState( prev => 'Введите телефон' )

	// const  summaryBtnText = useRef('Введите телефон' )
	//
	// useEffect( () => {
	// 		if (state.phone.length === 18) {
	// 			summaryBtnText.current = 'Введите смс'
	// 			// setSummaryBtnText( 'Введите смс' )
	// 		 } else {
	// 			//setSummaryBtnText( 'Введите телефон' )
	// 			summaryBtnText.current = 'Введите телефон'
	// 		}
	// 		// state.phone.length === 18 ? setSummaryBtnText( 'Введите смс' ) : setSummaryBtnText( 'Введите телефон' )
	//
	// 		if (state.codeSms.length === 4 && state.codeSms === state.rightCodeSms) {
	// 			console.log(summaryBtnText.current)
	// 			summaryBtnText.current = 'Введите имя'
	// 			console.log(summaryBtnText.current)
	// 			// setSummaryBtnText( 'Введите имя' )
	// 		}
	//
	// 		if (state.name.length > 2 ) {
	// 			// setSummaryBtnText( 'Введите фамилию' )
	// 			summaryBtnText.current = 'Введите фамилию'
	// 		}
	//
			// if (state.lastName.length > 2  && !!state.receiveLetters) {
			// 	// setSummaryBtnText( 'Введите Email' )
			// 	summaryBtnText.current = 'Введите Email'
			// }
			
			// if (!!state.takeByConsignee) {
			// 	setSummaryBtnText( 'Введите имя' )
			// 	if (state.consigneeName.length > 2 ) {
			// 		setSummaryBtnText( 'Введите фамилию' )
			// 	}
			// 	if (state.consigneeLastName.length > 2 ) {
			// 	setSummaryBtnText( 'Введите телефон' )
			// 	}
			// }
	// 	},
	// 	[
	// 		state.phone,
	// 		state.codeSms,
	// 		state.name,
	// 		state.lastName,
	// 		state.receiveLetters,
	// 		state.takeByConsignee,
	// 		state.consigneeName,
	// 		state.consigneeLastName
	// 		]
	// )
	// let summaryBtnText = 'Введите телефон',
	// 	 	summaryBtnProgress = '0%',
	// 				summaryBtnRelease = false;
	// if (state.phone.length === 18) {
	// 	summaryBtnText = 'Введите код из смс'
	// 	// setSummaryBtnText('Введите код из смс')
	// 	// summaryBtnProgress = '10%'
	// 	}
	// 		if (state.codeSms.length === 4 && state.codeSms === state.rightCodeSms) {
	// 			summaryBtnText = 'Укажите имя'
	// 			// setSummaryBtnText('Введите имя')
	// 			// summaryBtnProgress = '15%'
	// 		}
	// 		if (state.name.length > 2) {
	// 			summaryBtnText = 'Укажите фамилию'
	// 			// setSummaryBtnText('Укажите фамилию')
	// 			// summaryBtnProgress = '20%'
	// 		}
	//
	// 		if (state.lastName.length > 2) {
	// 			summaryBtnText = 'Укажите фамилию'
	// 			// setSummaryBtnText('Укажите Email')
	// 			// summaryBtnProgress = '20%'
	// 		}
	// 	if (state.lastName.length > 2 && state.receiveLetters) {
	// 		summaryBtnText = 'Введите Email'
	// 		// summaryBtnProgress = '25%'
	// 	}
	// 	if (state.takeByConsignee) {
	// 		summaryBtnText = 'Введите имя'
	// 		// summaryBtnProgress = '30%'
	// 	}
	// 	if (state.consigneeName) {
	// 		summaryBtnText = 'Введите фамилию'
	// 		// summaryBtnProgress = '35%'
	// 	}
	// 	if (state.consigneeLastName) {
	// 		summaryBtnText = 'Введите телефон'
	// 		// summaryBtnProgress = '40%'
	// 	}
	return <>
		{/*<button className={classes.BackToCart}>Вернуться в корзину</button>*/}
		<div className={classes['container']}>
			{/*<button className={classes.BackToCart}>Вернуться в корзину</button>*/}
			<div className={classes['wrapper']}>
				<Layout>
					<div className={classes['content-inner']}>
						<div className={classes['order-left']}>
							<form onSubmit={submitHandler}>
								<SectionTitle
									active
									sectionNumber={'1'}
									sectionTitle={'Контактные данные'}
								/>
								
								<Section1
									disTab={disTab}
									disableTab={disableTab}
									state={state}
									setState={setState}
									inputHandler={inputHandler}
									clearInputField={clearInputField}
									shops={shops}
									pickups={pickups}
									inputMaskHandler={inputMaskHandler}
								/>
								
								<SectionTitle
									active={section2Open}
									sectionNumber={'2'}
									sectionTitle={'Способы получения в Иваново'}
									span={<span>{'Изменить'}</span>}
								/>
								
								{section2Open && <Section2
									state={state}
									shops={shops}
									pickups={pickups}
									inputHandler={inputHandler}
									clearInputField={clearInputField}
									sendData={sendData}/>
								}
								
								<SectionTitle
									active={section3Open}
									sectionNumber={'3'}
									sectionTitle={'Способы оплаты'}
								/>
								
								{section3Open && <Section3
									state={state}
									setState={setState}
									inputHandler={inputHandler}
									clearInputField={clearInputField}
									/>}
								
								<SectionTitle
									active={section4Open}
									sectionNumber={'4'}
									sectionTitle={'Комментарий к заказу'}
								/>
								{section4Open && <Section4
									state={state}
									inputHandler={inputHandler}
									clearInputField={clearInputField}
								/>}
								
							</form>
						</div>
						<div className={classes['order-right']}>
							<SummaryBlock
								data={cartData}
								text={btnState.text}
								progress={btnState.progress}
								// disabled={!summaryBtnRelease}
							/>
						</div>
					</div>
				</Layout>
			</div>
		</div>
	</>
};