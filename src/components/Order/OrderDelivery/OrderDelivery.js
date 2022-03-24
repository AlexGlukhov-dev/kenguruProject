import React, {useState, useEffect} from 'react'

import classes from './orderDeleviry.module.scss'
import {Radio} from "../../../UI/ordersUI/Radio/radio";
import {Button} from "../../../UI/ordersUI/Button/Button";
import {OrderPlacement} from "../OrderPlacement/OrderPlacement";

export const OrderDelivery = ({label, name, deliveryPrice, action, date, btnType, btnTxt, modalTitle, inputHandler, state}) => {
	const [showModal, setShowModal] = useState( false );
	const shopsModal = () => setShowModal( true );
	const closeShopsModal = () => setShowModal( false );
	
	// useEffect( () => {
	// 	const body = document.querySelector( 'body' );
	// 	// let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	// 	body.style.overflow = showModal ? 'hidden' : 'auto';
	// 	body.style.paddingRight = showModal ? '17px'  : '0px';
	// }, [showModal] );
	
	
	return <div className={classes.ReceiveSection}>
		<div className={classes.ReceiveSectionInner}>
			<Radio
				labelParams={label}
				name={name}
				// check={true}
				value={'Доставка CDEK или Boxberry'}
				state={state}
			/>
			<p className={classes.Delivery}>{deliveryPrice}</p>
			<p className={classes.DeliveryDay}>{action}<span>{date}</span></p>
		</div>
		<Button type={btnType} text={btnTxt} handler={shopsModal} />
		{showModal && <OrderPlacement text={modalTitle} close={closeShopsModal} inputHandler={inputHandler} state={state} />}
	</div>
}