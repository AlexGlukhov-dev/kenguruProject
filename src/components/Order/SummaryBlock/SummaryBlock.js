import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addData} from "../../../redux/slices/indivOrdersSlice"
import axios from "axios"

import DynamicBgBtn from "../../../UI/ordersUI/DynamicBgBtn/DynamicBgBtn"
import {arrMinValue , minDate} from "../../../utils/utils"

import bonusIcon from '../../../assets/images/bonusIcon.png'
import classes from "./summaryBlock.module.scss"

const SummaryBlock = ({data, ...otherProps}) => {
	const [cartData, setCartData] = useState( [] )
	const order = useSelector( state => state.indivOrders.order )
	// const shops = useSelector(state => state.indivOrders.shops)
	const pickups = useSelector( state => state.indivOrders.pickups )
	const dispatch = useDispatch()
	
	useEffect( () => {
		try {
			axios.get( './DB/CART_DATA.json' )
				.then( data => setCartData( data.data[0] ) )
		} catch (error) {
			console.log( error )
		}
	}, [] );
	
	
	const {
		total_goods_amount,
		total_weight,
		total_volume,
		total_sum,
		bonuses,
		discount,
	} = cartData;
	
	const showSamovivozShopAddress = order.isSamovivoz && order.samovivoz === 'from_Kenguru' && order.samovivozShopAddress
	const showSamovivozPickupAddress = order.isSamovivoz && order.samovivoz === 'from_pickup' && order.samovivozPickupAddress
	const samovivozKenguru = order.isSamovivoz && order.samovivoz === 'from_Kenguru'
	const samovivozPickup = order.isSamovivoz && order.samovivoz === 'from_pickup'
	// const showSamovivozKenguruDate = order.isSamovivoz && order.samovivozShopAddress
	// const showSamovivozPickupDate = order.isDelivery && order.samovivozPickupAddress
	const addPickupSamovivozPrice = order.isSamovivoz && order.samovivoz === 'from_pickup' && order.pickup
	const showSamovivozPrice = samovivozPickup
	const deliveryKenguru = order.isDelivery && order.delivery === 'from_Kenguru'
	const deliveryPickup = order.isDelivery && order.delivery === 'from_Pickup'
	const showSamovivozDeliveryAddress = order.isDelivery && order.deliveryAddress
	const showReceiveDate = (order.isSamovivoz && (order.samovivozDateKenguru || order.samovivozDatePickup)) ||
		(order.isDelivery && order.delivery)
	const addLoadersServicePrice = order.isDelivery && order.delivery === 'from_Kenguru' && order.loadersService
	
	
	useEffect( () => {
		const addLoadIntoCarPrice = order.isSamovivoz && order.samovivoz === 'from_Kenguru' && order.loadIntoCar
		const addKenguruDeliveryPrice = order.isDelivery && order.delivery === 'from_Kenguru' && order.kenguruDeliveryPrice
		const addPickupDeliveryPrice = order.isDelivery && order.delivery === 'from_Pickup' && order.pickupDeliveryPrice
		
		let total_pay = total_sum
			+ (addLoadIntoCarPrice ? +order.loadItoCarPrice : 0)
			+ (addPickupSamovivozPrice ? +order.pickupDeliveryPrice : 0)
			+ (addKenguruDeliveryPrice ? +order.kenguruDeliveryPrice : 0)
			+ (addPickupDeliveryPrice ? +order.pickupDeliveryPrice : 0)
			+ (addPickupSamovivozPrice ? +order.pickupSamovivozPrice : 0)
			+ (addLoadersServicePrice ? +order.loadersService : 0)
			// + (order.pickupDeliveryPrice ? +order.pickupDeliveryPrice : 0)
			// - (subPickupDeliveryPrice ? +order.pickupDeliveryPrice : 0)
			- Number( discount )
		dispatch( addData( {key: 'cartSum', value: total_pay} ) )
	}, [
		order.loadIntoCar,
		order.loadItoCarPrice,
		order.pickupSamovivozPrice,
		order.kenguruDeliveryPrice,
		order.pickupDeliveryPrice,
		order.isSamovivoz,
		order.isDelivery,
		order.samovivoz,
		order.delivery,
		order.loadersService,
		addPickupSamovivozPrice,
		addLoadersServicePrice,
		discount,
		dispatch,
		total_sum
	] )
	
	// let total_pay = total_sum
	// 	+ (order.loadIntoCar ? order.loadItoCarPrice : 0)
	// 	+ (order.pickupDeliveryPrice ? +order.pickupDeliveryPrice : 0)
	// 	- (order.samovivoz === 'from_Kenguru' && order.pickupDeliveryPrice ? +order.pickupDeliveryPrice : 0)
	// 	- Number(discount)
	
	/* summaryBtn behavior */
	// useEffect(() => {
	// 	if (order.email) dispatch(addData({key: 'paymentEmail', value: order.email}))
	// }, [order.email, dispatch])
	//
	// const reducer = (state, action) => {
	// 	switch (action.type) {
	// 		case "ENTER_PHONE":
	// 			return {...state, text: "Введите телефон", progress: "0%"};
	// 		case "ENTER_SMS":
	// 			return {...state, text: "Введите код из SMS", progress: "10%"};
	// 		case "ENTER_NAME":
	// 			return {...state, text: "Введите имя", progress: "15%"};
	// 		case "ENTER_LAST_NAME":
	// 			return {...state, text: "Введите фамилию", progress: "20%"};
	// 		case "ENTER_EMAIL":
	// 			return {...state, text: "Введите Email", progress: "25%"};
	// 		case "ENTER_CONSIGNEE_NAME":
	// 			return {...state, text: "Введите Имя", progress: "30%"};
	// 		case "ENTER_CONSIGNEE_LASTNAME":
	// 			return {...state, text: "Введите Фамилию", progress: "35%"};
	// 		case "ENTER_CONSIGNEE_PHONE":
	// 			return {...state, text: "Введите телефон", progress: "40%"};
	// 		case "CHOOSE_PLACE":
	// 			return {...state, text: "Выберите способ получения", progress: "45%"};
	// 		case "PAY":
	// 			return {...state, text: "Перейти к оплате", progress: "100%"};
	// 		case "CHOOSE_PAYMENT":
	// 			return {...state, text: "Выберите способ оплаты", progress: "90%"};
	// 		case "leaveComment":
	// 			return {...state, text: "Оставьте комментарий", progress: "95%"};
	// 		default:
	// 			return state
	// 	}
	// }
	//
	// const [btnState, dispatcher] = useReducer( reducer, {
	// 	text: "Введите телефон",
	// 	progress: "0%"
	// } )
	//
	// const getText = (text) => {
	// 	return dispatcher( {type: text} )
	// };
	//
	// useEffect( () => {
	// 	if (order.phone.length < 18) {
	// 		getText( "ENTER_PHONE" )
	// 		// return;
	// 	} else if (order.codeSms !== order.rightCodeSms) {
	// 		getText( "ENTER_SMS" )
	// 		// return;
	// 	} else if (order.name.length < 2) {
	// 		getText( "ENTER_NAME" )
	// 		// return;
	// 	} else if (order.lastName.length < 2) {
	// 		getText( "ENTER_LAST_NAME" )
	// 		// return;
	// 	} else if (!!order.receiveLetters && !validEmail( order.email )) {
	// 		getText( "ENTER_EMAIL" )
	// 	} else if (!!order.takeByConsignee) {
	// 		if (order.consigneeName.length < 2) {
	// 			getText( "ENTER_CONSIGNEE_NAME" )
	// 		} else if (order.consigneeLastName.length < 2) {
	// 			getText( "ENTER_CONSIGNEE_LASTNAME" )
	// 		} else if (order.consigneePhone.length < 18) {
	// 			getText( "ENTER_CONSIGNEE_PHONE" )
	// 		}
	// 			// else {
	// 			// 	getText( "pay" )
	// 		// }
	// 		else if (!order.samovivozShop) {
	// 			getText( "CHOOSE_PLACE" )
	// 		}
	//
	// 		else if (!order.paymentEmail || !validEmail( order.paymentEmail )) {
	// 			getText( "CHOOSE_PAYMENT" )
	// 		}
	//
	// 		else {
	// 			getText( "PAY" )
	// 			// return
	// 		}
	// 	}
	//
	// 	else if (!order.samovivozShop) {
	// 		getText( "CHOOSE_PLACE" )
	// 	}
	//
	// 	else if (!order.paymentEmail || !validEmail( order.paymentEmail )) {
	// 		getText( "CHOOSE_PAYMENT" )
	// 	}
	// 		// else if (state.paymentEmail || state.payment) {
	// 		// 	getText( "leaveComment" )
	// 		// }
	// 		// else if (!state.comments ) {
	// 		// 	getText( "leaveComment" )
	// 	// }
	// 	else {
	// 		getText( "PAY" )
	// 		// return
	// 	}
	// 	// if (!!state.samovivozShop || !!state.samovivozPickup) {
	// 	//  getText( "choosePayment" )
	// 	// }
	// }, [
	// 	order.phone,
	// 	order.codeSms,
	// 	order.rightCodeSms,
	// 	order.name,
	// 	order.lastName,
	// 	order.receiveLetters,
	// 	order.email,
	// 	order.takeByConsignee,
	// 	order.consigneeName,
	// 	order.consigneeLastName,
	// 	order.consigneePhone,
	// 	order.samovivozShop,
	// 	order.samovivozPickup,
	// 	order.paymentEmail,
	// 	order.paymentCash,
	// 	order.payment
	// ] );
	
	const minPickupSamovivozPrice = arrMinValue( pickups, 'samovivozPrice' )
	// const pickupDates = (pickups.map(pickup => new Date(pickup.takeFrom)));
	// const pickupMinDate = pickups.length && minDate(pickupDates)
	
	const minKenguruDeliveryDate = minDate(order.deliveryKenguruDates)
	const minPickupDeliveryDate = minDate(order.deliveryPickupDates)
	
	return (
		<div className={classes['order-summary']}>
			<div className={classes['order-summary__top']}>
				<div className={classes['order-info']}>
					<div className={classes['order-info__text']}>Ваш заказ</div>
					<div className={classes['order-info__props']}>
						<span className={classes['order-info__prop']}>{total_goods_amount} товаров</span>
						<span className={classes['order-info__prop']}>{total_weight} кг</span>
						<span className={classes['order-info__prop']}>{total_volume} м<sup>3</sup></span>
					</div>
				</div>
				<div className={otherProps.open ? classes['order-items-money'] : ''}>
					<div className={classes['order-item']}>
						<span className={classes['order-item__text']}>Сумма заказа</span>
						<span className={classes['order-item__amount']}>{total_sum} ₽</span>
					</div>
					{discount && <div className={classes['order-item']}>
						<span className={classes['order-item__text']}>Скидка {order.isPromocode && ' с учетом промокода'}</span>
						<span className={classes['order-item__amount-accent']}>{-discount} ₽</span>
					</div>
					}
					{bonuses &&
						<div className={classes['order-item']}>
							<span className={classes['order-item__text']}>Бонусов к зачислению</span>
							<span className={`${classes['order-item__amount-primary']} ${classes['order-item__bonuses']}`}>
								<span>+{bonuses}</span>
								<img src={bonusIcon} alt='bonus icon'/>
						</span>
						</div>
					}
				</div>
				{otherProps.open && <>
					<div className={`${classes['order-item']}  ${classes['order-receiving']}`}>
						<span className={classes['order-item__text']}>
							{order.isSamovivoz && <>
								{samovivozKenguru && 'Самовывоз Кенгуру'}
								{samovivozPickup && `Самовывоз ${order.pickup || 'из пункта выдачи'}`}
							</>}
							{order.isDelivery && <>
								{deliveryKenguru && `Доставка Кенгуру ${order.loadersService && '+ грузчики'}`}
								{deliveryPickup && 'Доставка из пункта выдачи'}
							</>
							}
				</span>
						<span className={classes['order-item__amount']}>
						{order.isSamovivoz && <>
							{showSamovivozPrice ? `${order.pickupSamovivozPrice || 'от ' + minPickupSamovivozPrice} ₽` : `Бесплатно`}
						</>}
							{order.isDelivery && <>
								{deliveryKenguru ? order.kenguruDeliveryPrice ? order.kenguruDeliveryPrice + ' ₽' : 'от ' + order.minKenguruDeliveryPrice + ' ₽' : null}
								{deliveryPickup ? order.pickupDeliveryPrice ? order.pickupDeliveryPrice + ' ₽' : 'от ' + order.minPickupDeliveryPrice + ' ₽' : null}
							</>}
						</span>
					</div>

					{(showSamovivozShopAddress || showSamovivozPickupAddress || showSamovivozDeliveryAddress) &&
						<p className={classes['order-item__address']}>
							{showSamovivozShopAddress && order.samovivozShopAddress}
							{showSamovivozPickupAddress && order.samovivozPickupAddress}
							{showSamovivozDeliveryAddress && order.deliveryAddress}
						</p>}
					
					
					{deliveryPickup &&
						<p className={classes['order-item__pickup-message']}>
							Оплачивается при получении заказа и не входит в общую стоимость
						</p>}
					
					{showReceiveDate &&
						<div className={classes['order-item']}>
						<span className={classes['order-item__text']}>
							{order.isSamovivoz && 'Дата самовывоза'}
							{order.isDelivery && 'Дата доставки'}
						</span>
						<span className={classes['order-item__amount']}>
							{order.isSamovivoz && `c ${samovivozKenguru ? order.samovivozDateKenguru : order.samovivozDatePickup}`}
							{order.isDelivery && `c ${deliveryKenguru ? order.deliveryDate || minKenguruDeliveryDate : order.deliveryDate || minPickupDeliveryDate}`}
						</span>
						</div>}
					
					{samovivozKenguru && order.loadIntoCar &&
						<div className={classes['order-item']}>
							<span className={classes['order-item__text']}>Погрузка в машину</span>
							<span className={classes['order-item__amount']}>+{order.loadItoCarPrice} ₽</span>
						</div>}
					
					{addLoadersServicePrice &&
						<div className={classes['order-item']}>
							<span className={classes['order-item__text']}>Услуги грузчиков</span>
							<span className={classes['order-item__amount']}>+{order.loadersService} ₽</span>
						</div>}
				</>}
			
			</div>
			<div className={classes['order-summary__bottom']}>
				<div className={classes['order-total__sum']}>
					<span className={classes['order-total__sum-text']}>Итого к оплате</span>
					<span className={classes['order-total__sum-amount']}>{order.cartSum} ₽</span>
				</div>
				<div style={{textAlign: 'center'}}>
					<DynamicBgBtn
						// className={classes['order-summary__btn']}
						width={"100%"}
						height={"52px"}
						fontSize={"16px"}
						onClick={otherProps.submit}
						progress={otherProps.progress}
						disabled={otherProps.disabled}
					><span>{otherProps.text}</span>
					</DynamicBgBtn>
					<p className={classes['order-summary__caution']}>
						Нажимая на&nbsp;кнопку, я&nbsp;даю свое согласие на&nbsp;
						<a href="/" className={classes['order-summary__link']}>обработку персональных данных </a>
						и&nbsp;получение <a href="/" className={classes['order-summary__link']}>
						информационных рассылок</a> (в&nbsp;том числе информирование о&nbsp;статусах заказа)
					</p>
				</div>
			</div>
		</div>
	);
};

export default SummaryBlock;