import React, {useEffect, useReducer} from 'react'
import {useSelector} from "react-redux";

import NewMap from "../../NewMap/NewMap";
import {shopPoints} from '../../NewMap/shopsPoints.js'
import cdekIcon from "../../../../assets/images/cdek-logo.svg"
import Modal2 from "../../../../UI/ordersUI/Modal2/Modal2";
// import {Button} from '../../../UI/Button/Button';
import ChooseTCHouse from "../ChooseDeliveryAddress/ChooseTCHouse/ChooseTCHouse";

import classes from '../DeliveryKenguruAddress/deliveryKenguruAddress.module.scss'
import WarningField from "../../../../UI/ordersUI/WarningField/WarningField";
import DynamicBgBtn from "../../../../UI/ordersUI/DynamicBgBtn/DynamicBgBtn";
import ReceiveInfo from "../../ReceiveInfo/ReceiveInfo";


const DeliveryTCAddress = ({title, close}) => {
	const order = useSelector( state => state.indivOrders.order )
	
	// ****** submit button behaviour ***************
	
	const getUrText = (text) => {
		return dispatch( {type: text} )
	}
	
	const reducer = (state, action) => {
		switch (action.type) {
			case "ENTER_STREET":
				return {...state, text: "Укажите улицу и дом", progress: "0%"};
			case "ENTER_FLAT_NUMBER":
				return {...state, text: "Укажите номер квартиры", progress: "20%"};
			case "ENTER_ENTRANCE_NUMBER":
				return {...state, text: "Укажите подъезд", progress: "60%"};
			case "DELIVERY":
				return {...state, text: `Доставить сюда за ${order.cartSum} ₽`, progress: "100%"};
			case "ENTER_FLOOR_NUMBER":
				return {...state, text: "Укажите этаж", progress: "40%"};
			case "ENTER_DOORPHONE_NUMBER":
				return {...state, text: "Введите номер домофона", progress: "80%"};
			default:
				return state
		}
	}
	
	const [btnState, dispatch] = useReducer( reducer, {
		text: "Укажите улицу и дом",
		progress: "0%"
	} )
	
	useEffect( () => {
		if (order.deliveryAddress.length < 2) {
			getUrText( "ENTER_STREET" )
		} else if (!order.flatOrOffice) {
			getUrText( "ENTER_FLAT_NUMBER" )
		} else if (!order.floor) {
			getUrText( "ENTER_FLOOR_NUMBER" )
		} else if (!order.entrance) {
			getUrText( "ENTER_ENTRANCE_NUMBER" )
		}
		// else if (!order.doorPhone) {
		// 	getUrText( "ENTER_DOORPHONE_NUMBER" )
		// }
		else {
			getUrText( "DELIVERY" )
		}
	}, [
		order.deliveryAddress,
		order.flatOrOffice,
		order.entrance,
		order.floor,
		order.doorPhone
	] )
	
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
						<ChooseTCHouse/>
					</div>
					<WarningField cl={classes['submit__warning']} content={'Доставка оплачивается при получении'}/>
					<div	className={classes['delivery-address__footer']}>
						<div className={classes['submitBtn']}>
							<DynamicBgBtn
								className={classes['submit-button']}
								width={"238px"}
								height={"40px"}
								onClick={close}
								progress={btnState.progress}
								disabled={order.deliveryAddress.length < 2}
							>
								<span>{btnState.text}</span>
							</DynamicBgBtn>
						</div>
						{order.deliveryAddress.length > 2 && <ReceiveInfo
							date={order.deliveryTCDate}
							text={'Доставим'}
							showTime
							hours_from={order.deliveryTCHours_from}
							hours_until={order.deliveryTCHours_until}/>
						}
					</div>
				
					{
					// 	<div className={classes['submitBtn']}>
					// 	<Button
					// 		cl={classes['delivery__btn']}
					// 		type={'primary'}
					// 		text={btnState.text}
					// 		handler={() => {
					// 			close()
					// 		}}
					// 		disabled={order.deliveryAddress.length < 2}
					// 	/>
					// </div>
					}
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
					<NewMap points={shopPoints} icon={cdekIcon} clusterColor='Green'/>
				</div>
			
			</div>
		</Modal2>
	)
};


export default DeliveryTCAddress;
