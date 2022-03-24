import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {inputHandler} from "../../../../redux/slices/indivOrdersSlice";

import DeliveryKenguruAddress from "../DeliveryKenguruAddress/DeliveryKenguruAddress";
import {Radio} from "../../../../UI/ordersUI/Radio/radio";
import {Button} from "../../../../UI/ordersUI/Button/Button";
import classes from "../orderDeleviry.module.scss";

// import {useStopJump} from "../../../hooks/useStopJump";
//import {OrderPlacement} from "../../OrderPlacement/OrderPlacement";
// import ChooseDeliveryAddress from "../ChooseDeliveryAddress/ChooseDeliveryAddress";
// import IndivContext from "../../../context/indivContext";
// import {ChooseFromShop} from "../../ChooseShop/ChooseShop";
// import {Input} from "../../../UI/Input";
//import {ChooseFromShop} from "../../TakeFromShop/ChooseShop/ChooseShop";

const DeliveryKenguru = ({label, name, deliveryPrice, action, date, btnType, btnTxt, modalTitle}) => {
	const order = useSelector(state => state.indivOrders.order)
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState( false );
	
	const shopsModal = () => setShowModal( true );
	const closeShopsModal = () => setShowModal( false );
	
	// useStopJump(showModal)
	
	// useEffect( () => {
	// 	const body = document.querySelector( 'body' );
	// 	let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	// 	body.style.overflow = showModal ? 'hidden' : 'auto';
	// 	body.style.paddingRight = showModal ? paddingOffset  : '0px';
	// }, [showModal] );
	
	return <div className={classes.ReceiveSection}>
		<div className={classes.ReceiveSectionInner}>
			<Radio
				labelParams={label}
				name={name}
				// check={true}
				// value={'Доставка Кенгуру'}
				state={order}
				id={'from_Kenguru'}
				handler={e => dispatch( inputHandler( {key: name, value: e.target.value} ) )}
			/>
			<p className={classes.Delivery}>{deliveryPrice + ' ₽'}</p>
			<p className={classes.DeliveryDay}>{action}<span>{date}</span></p>
		</div>
		
		<Button type={btnType} text={btnTxt} handler={shopsModal} />
		
		{showModal && <DeliveryKenguruAddress
			title={modalTitle}
			close={closeShopsModal}
		/>}
		{/*{showModal && <ChooseDeliveryAddress*/}
		{/*	text={modalTitle}*/}
		{/*	close={closeShopsModal}*/}
		{/*/>}*/}
	</div>
};

export default DeliveryKenguru;