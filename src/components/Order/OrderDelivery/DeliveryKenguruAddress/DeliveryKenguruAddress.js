import React, {useEffect, useReducer, useState} from 'react'
import {useSelector} from "react-redux";

import CustomScrollbars from '../../../../UI/ordersUI/CustomScrollBar/CustomScrollbars'
import NewMap from "../../NewMap/NewMap";
import {shopPoints} from '../../NewMap/shopsPoints.js'
import Modal2 from "../../../../UI/ordersUI/Modal2/Modal2";
import ChooseHouse from "../ChooseDeliveryAddress/ChooseHouse/ChooseHouse";
import DynamicBgBtn from "../../../../UI/ordersUI/DynamicBgBtn/DynamicBgBtn";

import kengIcon from "../../NewMap/pin.png";
import classes from './deliveryKenguruAddress.module.scss'
import ReceiveInfo from "../../ReceiveInfo/ReceiveInfo";
// import {Button} from '../../../UI/Button/Button';

const DeliveryKenguruAddress = ({title, close}) => {
	const order = useSelector( state => state.indivOrders.order )
	
	// ****** submit button behaviour ***************
	const [disabled, setDisabled] = useState(true)
	
	const getUrText = (text) => {
		return dispatch( {type: text} )
	}
	
	const reducer = (state, action) => {
		switch (action.type) {
			case "ENTER_STREET":
				return {...state, text: "Укажите улицу и дом", progress: "0%"};
			case "ENTER_FLAT_NUMBER":
				return {...state, text: "Укажите номер квартиры", progress: "10%"};
			case "ENTER_FLOOR_NUMBER":
				return {...state, text: "Укажите этаж", progress: "25%"};
			case "ENTER_ENTRANCE_NUMBER":
				return {...state, text: "Укажите подъезд", progress: "35%"};
			case "ENTER_DOORPHONE_NUMBER":
				return {...state, text: "Введите номер домофона", progress: "45%"};
			case "ENTER_DELIVERY_DATE":
				return {...state, text: "Укажите дату доставки", progress: "75%"};
			case "ENTER_DELIVERY_TIME":
				return {...state, text: "Укажите время доставки", progress: "90%"};
			case "DELIVERY":
				return {...state, text: `Доставить сюда за ${order.cartSum} ₽`, progress: "100%"};
			
			// case "PAY":
			// 	return {...state, text: "Перейти к оплате", progress: "100%"};
			// case "CHOOSE_PAYMENT":
			// 	return {...state, text: "Выберите способ оплаты", progress: "90%"};
			// case "LEAVE_COMMENT":
			// 	return {...state, text: "Оставьте комментарий", progress: "95%"};
			
			default:
				return state
		}
	}
	
	const [btnState, dispatch] = useReducer( reducer, {
		text: "Укажите улицу и дом",
		progress: "0%"
	} )
	
	useEffect( () => {
		if (order.privateHouse && order.deliveryToHouse === 'Доставить в дом') {
			if (order.deliveryAddress.length < 2) {
				getUrText( "ENTER_STREET" )
				setDisabled( true )
			} else if (!order.floor) {
				getUrText( "ENTER_FLOOR_NUMBER" )
				setDisabled( true )
			} else if (!order.deliveryDate) {
				getUrText( "ENTER_DELIVERY_DATE" )
				setDisabled( true )
			} else if (!order.deliveryTime  && !order.deliveryToTime) {
				getUrText( "ENTER_DELIVERY_TIME" )
				setDisabled( true )
			} else {
				getUrText( "DELIVERY" )
				setDisabled( false )
			}
		} else if ( order.privateHouse && order.deliveryToHouse === 'Привезти к дому') {
			if (order.deliveryAddress.length < 2) {
				getUrText( "ENTER_STREET" )
				setDisabled( true )
			} else if (!order.deliveryDate) {
				getUrText( "ENTER_DELIVERY_DATE" )
				setDisabled( true )
			} else if (!order.deliveryTime && !order.deliveryToTime) {
				getUrText( "ENTER_DELIVERY_TIME" )
				setDisabled( true )
			} else {
				getUrText( "DELIVERY" )
				setDisabled( false )
			}
		} else if (order.deliveryToFlat === 'Доставить до подъезда') {
			if (order.deliveryAddress.length < 2) {
				getUrText( "ENTER_STREET" )
				setDisabled( true )
			} else if (!order.entrance) {
				getUrText( "ENTER_ENTRANCE_NUMBER" )
				setDisabled( true )
			} else if (!order.deliveryDate) {
				getUrText( "ENTER_DELIVERY_DATE" )
				setDisabled( true )
			} else if (!order.deliveryTime && !order.deliveryToTime) {
				getUrText( "ENTER_DELIVERY_TIME" )
				setDisabled( true )
			} else {
				getUrText( "DELIVERY" )
				setDisabled( false )
			}
		} else {
			if (order.deliveryAddress.length < 2) {
				getUrText( "ENTER_STREET" )
				setDisabled( true )
			} else if (!order.flatOrOffice) {
				getUrText( "ENTER_FLAT_NUMBER" )
				setDisabled( true )
			} else if (!order.floor) {
				getUrText( "ENTER_FLOOR_NUMBER" )
				setDisabled( true )
			} else if (!order.entrance) {
				getUrText( "ENTER_ENTRANCE_NUMBER" )
				setDisabled( true )
				// }
				// else if (!order.doorPhone) {
				// 	getUrText( "ENTER_DOORPHONE_NUMBER" )
			} else if (!order.deliveryDate) {
				getUrText( "ENTER_DELIVERY_DATE" )
				setDisabled( true )
			} else if (!order.deliveryTime && !order.deliveryToTime) {
				getUrText( "ENTER_DELIVERY_TIME" )
				setDisabled( true )
			// } else if (order.deliveryToTime && order.hours && order.minutes) {
			// 	getUrText( "DELIVERY" )
			} else {
				getUrText( "DELIVERY" )
				setDisabled( false )
			}
		}
	}, [
		order.privateHouse,
		order.deliveryToHouse,
		order.deliveryAddress,
		order.deliveryToFlat,
		order.flatOrOffice,
		order.flatNumber,
		order.entrance,
		order.deliveryDate,
		order.deliveryTime,
		order.deliveryToTime,
		order.doorPhone,
		order.floor,
		order.hours,
		order.minutes
	] )
	
	// const releaseBtn = !!order.deliveryAddress
	// 	&& !!order.deliveryToFlat
	// 	&& !!order.entrance
	// 	&& !!order.deliveryDate
	// 	&& (!!order.deliveryTime || order.deliveryToTime)
	
	// ****** eof submit button behaviour ***************
	
	return (
		<Modal2 onClose={close}>
			<div className={classes['delivery-address__inner']}>
				<div className={classes['delivery-address__info']}>
					<div className={classes['delivery-address__info-header']}>
						<button
							className={classes['delivery-address__back-btn']}
							onClick={close}>
							<svg className={classes['delivery-address__back-arrow']} width="15" height="13" viewBox="0 0 15 13"
									 fill="none"
									 xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd"
											d="M13.99 5.03H3.54L7.07 1.02L5.19 0L0 5.89V6.11L5.19 12.02L7.07 11L3.58 7.03H13.99C14.54 7.03 14.99 6.58 14.99 6.03C14.99 5.48 14.54 5.03 13.99 5.03Z"
											fill="#333333"/>
							</svg>
						</button>
						<h2 className={classes['delivery-address__title']}>
							{title}
						</h2>
					</div>
					<div style={{overflow: 'hidden'}} className={classes['delivery-address__items']}>
						
						{/*<SimpleBarReact*/}
						{/*	className={'custom-scroll-container'}*/}
						{/*	style={{maxHeight: '100%'}}*/}
						{/*	autoHide={false}*/}
						{/*>*/}
						{/*<Scrollbars*/}
						{/*	style={{ height: '100%'}}*/}
						{/*	thumbSize={100}*/}
						{/*	renderThumbVertical={props => <div {...props} className={classes["thumb-vertical"]}/>}>*/}
						<CustomScrollbars style={{width: 500, height: 300}}>
							<ChooseHouse close={close}/>
						</CustomScrollbars>
						{/*</Scrollbars>*/}
						{/*</SimpleBarReact>*/}
					</div>
					{/*<div className={classes['submitBtn']}>*/}
					{/*	<Button*/}
					{/*		cl={classes['delivery__btn']}*/}
					{/*		type={'primary'}*/}
					{/*		text={btnState.text}*/}
					{/*		handler={() => {*/}
					{/*			close()*/}
					{/*		}}*/}
					{/*		disabled={!releaseBtn}*/}
					{/*	/>*/}
					{/*	{releaseBtn && <span className={classes['delivery-summary']}>*/}
					{/*			<span className={classes['delivery-summary__text']}>Доставим</span>*/}
					{/*			<span className={classes['delivery-summary__date']}>{order.deliveryDate}</span>*/}
					{/*	</span>*/}
					{/*	}*/}
					{/*</div>*/}
					<div className={classes['delivery-address__footer']}>
						<div className={classes['submitBtn']}>
							<DynamicBgBtn
								className={classes['submit-button']}
								width={"238px"}
								height={"40px"}
								onClick={close}
								progress={btnState.progress}
								disabled={disabled}
							>
								<span>{btnState.text}</span>
							</DynamicBgBtn>
						</div>
						{!disabled && <ReceiveInfo date={order.deliveryDate} text={'Доставим'}/>}
					</div>
					
				</div>
				<div className={classes['delivery-address__map']}>
					<button className={`${classes['delivery-address__close-btn']}`} onClick={close}>
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
							<g>
								<path
									d="M9.696.304a1 1 0 0 1 0 1.414L6.414 5l3.282 3.282a1 1 0 1 1-1.414 1.414L5 6.414 1.718 9.696A1 1 0 1 1 .304 8.282L3.586 5 .304 1.718A1 1 0 0 1 1.718.304L5 3.586 8.282.304a1 1 0 0 1 1.414 0z"/>
							</g>
						</svg>
					</button>
					{/*<MyMap />*/}
					<NewMap points={shopPoints} icon={kengIcon} clusterColor='Orange'/>
				</div>
			</div>
		</Modal2>
	)
};

export default DeliveryKenguruAddress;
