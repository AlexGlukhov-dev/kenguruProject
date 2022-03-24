import React from 'react'
import {useDispatch} from "react-redux";

import {PaymentSite} from "../../Payment/PaymentSite/PaymentSite";
import {PaymentCash} from "../../Payment/PaymentCash/PaymentCash";

import {Tabs} from '../../../../UI/ordersUI/Tabs/Tabs'
import onlinePay from '../../../../assets/images/onlinePay.svg'
import onlinePayDisabled from '../../../../assets/images/onlinePayDisabled.svg'
import cashPay from '../../../../assets/images/cashPay.svg'
import cashPayDisabled from '../../../../assets/images/cashPayDisabled.svg'

export const Section3 = () => {
	const dispatch = useDispatch()
	
	return (
		<Tabs
			title1={'На сайте'}
			title2={'При получении'}
			content1={<PaymentSite />}
			content2={<PaymentCash />}
			iconTab1={onlinePay}
			iconTab1Dis={onlinePayDisabled}
			iconTab2={cashPay}
			iconTab2Dis={cashPayDisabled}
			dispatch={dispatch}
			name1='paymentOnSite'
			name2='paymentOnDelivery'
		/>
	)
}