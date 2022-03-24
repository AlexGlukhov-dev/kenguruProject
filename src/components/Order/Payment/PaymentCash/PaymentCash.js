import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {inputHandler} from "../../../../redux/slices/indivOrdersSlice";

import {Radio} from "../../../../UI/ordersUI/Radio/radio";
import classes from './paymentCash.module.scss'

export const PaymentCash = () => {
	const order = useSelector(state => state.indivOrders.order)
	const dispatch = useDispatch()
	// const {state, inputHandler} = useContext(IndivContext)

	return (
		<> {order.isDelivery &&
		<div className={classes['payment']}>
			<div className={classes['payment-card']}>
				<Radio
					labelParams={['Картой']}
					name='payment'
					id='Оплата картой'
					state={order}
					handler={e => dispatch( inputHandler( {key: 'payment', value: e.target.value} ) )}
				/>
				<p className={classes['available-cards']}>Visa, MasterCard, Maestro</p>
			</div>
			<div className={classes['payment-cash']}>
				<Radio
					labelParams={['Наличными']}
					name='payment'
					id='Оплата наличными'
					// check={true}
					state={order}
					handler={e => dispatch( inputHandler( {key: 'payment', value: e.target.value} ) )}
				/>
				<div className={classes['change']}>
					<span className={classes['change-text']}>Нужна сдача с  </span>
					<input
						name='change'
						className={classes['change-input']}
						type='text'
						placeholder='5000'
						maxLength={4}
						value={order.change}
						onChange={e => dispatch( inputHandler( {key: 'change', value: e.target.value} ) )}/>
					<span className={classes['change-currency']}>₽</span>
				</div>
			</div>
		</div>
		}
			{order.isSamovivoz && <p className={classes['payment-shop']}>Возможна оплата картой или наличными</p>}
	</>)
}