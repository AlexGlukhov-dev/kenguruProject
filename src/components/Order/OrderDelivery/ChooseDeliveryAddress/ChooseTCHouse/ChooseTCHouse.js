import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {addData, clearInputField, inputHandler} from "../../../../../redux/slices/indivOrdersSlice";

import {Input} from "../../../../../UI/ordersUI/Input";
import Stepper from "../../../../../UI/ordersUI/Stepper/Stepper";
import Suggestions from "../../../../../UI/ordersUI/Suggestions/Suggestions";
import {Radio} from "../../../../../UI/ordersUI/Radio/radio";
import {checkNum} from "../../../../../utils/utils";

import cdekLogo from "../../../../../assets/images/cdek-logo.svg";
import boxberryLogo from "../../../../../assets/images/boxberry-logo.svg";
import 'simplebar/dist/simplebar.min.css';
import classes from '../ChooseHouse/chooseHouse.module.scss'

const ChooseTCHouse = () => {
	const order = useSelector( state => state.indivOrders.order )
	const dispatch = useDispatch()
	
	let validFlatInput = order.flatOrOffice.length > 0;
	
	const getValue = (value) => {
		value.trim() !== '' ? dispatch( addData( {key: 'deliveryAddress', value: value.trim()} ) )
			 : dispatch( inputHandler( {key: 'deliveryAddress', value: ''} ) )
	}
	
	return <>
		<div className={classes['chooseHouse__wrapper']}>
			<div className={classes['chooseHouse__content']}>
				<h5 className={classes['chooseHouse__title']}>Адрес</h5>
				<div className={classes['chooseHouse__addressInput']}>
					<Suggestions getValue={getValue} inpState={order} url={'./streets.json'}/>
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
				<div className={classes['chooseHouse__flatInputs']}>
					<div className={classes['chooseHouse__flatInputs-group']}>
						<Input
							type='text'
							name='flatOrOffice'
							value={order.flatOrOffice}
							handler={e => dispatch( inputHandler( {key: 'flatOrOffice', value: checkNum(e.target.value.trim())} ) )}
							label='Квартира или офис'
							clear={() => dispatch( clearInputField( {key: 'flatOrOffice', value: ''} ) )}
							maxWidth='171px'
							isValid={validFlatInput}
						/>
						<Stepper
							disabled={+order.floor === -5}
							label={'Этаж'}
							inpState={order}
							setInpState={dispatch}
							name='floor'
							value={order.floor}
							handler={e => dispatch( inputHandler( {key: 'floor', value: checkNum(e.target.value.trim())} ) )}
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
							handler={e => dispatch( inputHandler( {key: 'entrance', value: checkNum(e.target.value.trim())} ) )}
						/>
						<Input
							type='text'
							name='doorPhone'
							value={order.doorPhone}
							handler={e => dispatch( inputHandler( {key: 'doorPhone', value: checkNum(e.target.value.trim())} ) )}
							label='Домофон'
							clear={() => dispatch( clearInputField( {key: 'doorPhone', value: ''} ) )}
							maxWidth='171px'
						/>
					</div>
				</div>
				<div className={classes['divider']} />
				<div className={classes['chooseHouse__TC-group']}>
					<div className={classes['chooseHouse__TC-item']}>
						<Radio
							labelParams={[<img src={cdekLogo} alt="cdek-logo"/>]}
							name='deliveryTCname'
							handler={e => dispatch(inputHandler({key: 'deliveryTCname', value: e.target.value}))}
							// id={shopCode}
							id={'from_cdek'}
							state={order}
						/>
						<p className={classes['chooseHouse__TC-price']}>{order.pickupDeliveryPrice + ' ₽'}</p>
						<p className={classes['chooseHouse__TC-date']}>{`Доставим к ${order.deliveryTCDate}`}</p>
					</div>
					<div className={classes['chooseHouse__TC-item']}>
						<Radio
							labelParams={[<img src={boxberryLogo} alt="boxberry-logo"/>]}
							name='deliveryTCname'
							handler={e => dispatch(inputHandler({key: 'deliveryTCname', value: e.target.value}))}
							// id={shopCode}
							id={'from_boxberry'}
							state={order}
						/>
						<p className={classes['chooseHouse__TC-price']}>{order.pickupDeliveryPrice + ' ₽'}</p>
						<p className={classes['chooseHouse__TC-date']}>{`Доставим к ${order.deliveryTCDate}`}</p>
						{/*<img className={classes['receive-place__logo']} src={kengLogo} alt='logotype'/>*/}
					</div>
				</div>
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
	</div>
	</>
};

export default ChooseTCHouse;