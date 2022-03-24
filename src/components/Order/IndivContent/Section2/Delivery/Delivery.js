import React from 'react'
import {useSelector} from "react-redux";

import DeliveryKenguru from "../../../OrderDelivery/DeliveryKenguru/DeliveryKenguru";
import DeliveryTC from "../../../OrderDelivery/DeliveryTC/DeliveryTC";
import {minDate} from '../../../../../utils/utils'

export const Delivery = () => {
	const order = useSelector(state => state.indivOrders.order)
	
	const minKenguruDeliveryDate = minDate(order.deliveryKenguruDates)
	const minPickupDeliveryDate = minDate(order.deliveryPickupDates)
	
	return <>
		<DeliveryKenguru
			label={['Доставка Кенгуру']}
			name='delivery'
			deliveryPrice={order.kenguruDeliveryPrice || order.minKenguruDeliveryPrice}
			action='Дата доставки с  '
			date={minKenguruDeliveryDate}
			btnType='secondary'
			btnTxt='Указать адрес'
			modalTitle='Укажите данные для доставки'
		/>
		<DeliveryTC
			label={['Доставка СДЭК или Боксберри']}
			name={'delivery'}
			deliveryPrice={order.pickupDeliveryPrice || order.minPickupDeliveryPrice}
			action={'Дата доставки с '}
			date={minPickupDeliveryDate}
			btnType={'secondary'}
			btnTxt={'Выбрать пункт выдачи'}
			modalTitle={'Укажите пункт выдачи'}
		/>
	</>
}
