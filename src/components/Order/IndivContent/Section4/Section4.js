import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {inputHandler} from "../../../../redux/slices/indivOrdersSlice";

import {Textarea} from "../../../../UI/ordersUI/Textarea/Textarea";

import classes from './section4.module.scss'

export const Section4 = () => {
	const order = useSelector(state => state.indivOrders.order)
	const dispatch = useDispatch()

	return (
		<Textarea
			placeholder={'Комментарий к заказу'}
			className={classes['leave-comment']}
			state={order}
			inputHandler={e => dispatch( inputHandler( {key: 'comments', value: e.target.value} ) )}
			name={'comments'}
		/>
	)
}