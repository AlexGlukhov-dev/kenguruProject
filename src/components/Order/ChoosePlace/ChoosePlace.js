import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {inputHandler} from "../../../redux/slices/indivOrdersSlice";

import {Radio} from '../../../UI/ordersUI/Radio/radio'

import classes from './choosePlace.module.scss'

export const ChoosePlace =({id, name, address, cost, schedule, phone, date, logo}) => {
	const order = useSelector(state => state.indivOrders.order)
	const dispatch = useDispatch()

	return (
		<div className={classes['shop']}>
			<Radio
				labelParams={[address]}
				name={name}
				handler={e => dispatch( inputHandler( {key: name, value: e.target.value} ) )}
				id={id}
				state={order}/>
			{/*<input type='radio' name={name} value={id} onChange={inputHandler} />*/}
			{/*<input type='radio'onChange={inputHandler} value={id} checked={state.samovivozShop === id}/>*/}
			<img className={classes['shop__logo']} src={logo} alt='logo' />
			{/*<span className={classes['shop__address']}>{address}</span>*/}
			<span className={classes['shop__cost']}>{`${cost} ${cost !== 'Бесплатно' ? ' ₽' : ''}`} </span>
			<span className={classes['shop__schedule']}>{schedule}</span>
			<span className={classes['shop__phone']}>{phone}</span>
			<span className={classes['shop__date']}>{date}</span>
		</div>
	)
}