import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {inputHandler} from "../../../../redux/slices/indivOrdersSlice";

import {Radio} from "../../../../UI/ordersUI/Radio/radio";
import {Button} from "../../../../UI/ordersUI/Button/Button";
import DeliveryTCAddress from "../DeliveryTCAddress/DeliveryTCAddress";

import classes from "../orderDeleviry.module.scss";

const DeliveryTC = ({label, name, deliveryPrice, action, date, btnType, btnTxt, modalTitle}) => {
	const order = useSelector(state => state.indivOrders.order)
	const dispatch = useDispatch()
	
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
				// value={'Доставка Кенгуру'}
				id={'from_Pickup'}
				state={order}
				handler={e => dispatch( inputHandler( {key: name, value: e.target.value} ) )}
			/>
			<p className={classes.Delivery}>{deliveryPrice + ' ₽'}</p>
			<p className={classes.DeliveryDay}>{action}<span>{date}</span></p>
		</div>
		<Button type={btnType} text={btnTxt} handler={shopsModal} />
		{showModal && <DeliveryTCAddress title={modalTitle} close={closeShopsModal} /*state={state} inputHandler={inputHandler}*//>}
	</div>
};

export default DeliveryTC;