import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {inputHandler, clearInputField} from "../../../../redux/slices/indivOrdersSlice";

import {Input} from '../../../../UI/ordersUI/Input'
import {validEmail} from "../../../../utils/utils";
import classes from './paymentSite.module.scss'


export const PaymentSite = () => {
	const order = useSelector(state => state.indivOrders.order)
	const dispatch = useDispatch()
	// const {state, inputHandler, clearInputField} = useContext(IndivContext)
	let validEmailInput = validEmail( order.paymentEmail );
	
	return <div className={classes['payment']}>
		<div className={classes['payment__input']}>
			<Input
				type="email"
				name="paymentEmail"
				// value={`${order.email ? order.email : order.paymentEmail}`}
				value={order.paymentEmail}
				handler={e => dispatch( inputHandler( {key: 'paymentEmail', value: e.target.value} ) )}
				label='E-mail'
				clear={() => dispatch( clearInputField( {key: 'paymentEmail', value: ''} ) )}
				// minWidth='390px'
				isValid={validEmailInput}
			/>
			<p className={classes['payment__warning']}>По закону мы обязаны отправить электронный чек на вашу почту</p>
		</div>
		<p className={classes['payment__comment']}>К оплате принимаются карты любых банков и платежных систем</p>
	</div>
}