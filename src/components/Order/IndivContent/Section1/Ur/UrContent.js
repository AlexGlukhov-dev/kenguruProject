import React from 'react'
// import { PartySuggestions } from 'react-dadata';
import {useSelector, useDispatch} from 'react-redux'
import {
	clearInputField,
	inputMaskHandler,
	inputHandler,
	checkBoxHandler
} from '../../../../../redux/slices/indivOrdersSlice'

import {Toggle} from '../../../../../UI/ordersUI/Toggle/Toggle'
import {Input} from '../../../../../UI/ordersUI/Input'
import InputM from "../../../../../UI/ordersUI/InputM/InputM";
import InputInn from "../../../../../UI/ordersUI/InputInn/InputInn";
import {validEmail} from "../../../../../utils/utils";

// import "react-dadata/dist/react-dadata.css";
import classes from './UrContent.module.scss'

export const UrContent = () => {
	const order = useSelector( state => state.indivOrders.order )
	const dispatch = useDispatch()
	// const [value, setValue] = useState()

	const innInputLabelParams = {
		10: 'Введен ИНН организации',
		12: 'Введен ИНН ИП'
	}
	
	const kppInputLabelParams = {
		9: 'Введен КПП организации'
	}
	// function formatSelected(suggestion ) {
	// 	return suggestion.data.inn || "";
	// }
	return (
		<>
			<div className={classes['wrapper']}>
				{/*<Input*/}
				{/*	type="text"*/}
				{/*	name="inn"*/}
				{/*	value={state.inn}*/}
				{/*	handler={inputHandler}*/}
				{/*	label='ИНН'*/}
				{/*	clear={clearInputField}*/}
				{/*	width='390px'*/}
				{/*	max={11}*/}
				{/*	labelParams={InputLabelParams}*/}
				{/*/>*/}
				{/*<div>*/}
				<InputInn
					name='inn'
					type='text'
					label='ИНН'
					value={order.inn}
					onChange={e => dispatch( inputMaskHandler( {key: 'inn', value: e.target.value} ) )}
					clear={() => dispatch( clearInputField( {key: 'inn', value: ''} ) )}
					mask='999999999999'
					maskChar=''
					// minWidth='390px'
					labelParams={innInputLabelParams}
					isValid={order.inn.length === 10 || order.inn.length === 12}
				/>

				{/*<PartySuggestions*/}
				{/*formatSelected={formatSelected}*/}
				{/*count={3}*/}
				{/*minChars={2}*/}
				{/*token="bbeb04918d89fe8a50376a9f534094dd0fff373d"*/}
				{/*value={value}*/}
				{/*onChange={setValue} />*/}
				{/*</div>*/}
				{!order.validInn && <Input
					type="text"
					name="orgName"
					value={order.orgName}
					handler={e => dispatch( inputHandler( {key: 'orgName', value: e.target.value} ) )}
					label='Наименование организации / ИП'
					clear={() => dispatch( clearInputField( {key: 'orgName', value: ''} ) )}
					// width='390px'
					isValid
				/>}
				{!order.validInn && order.inn.length < 11	&&
				<InputInn
					name='kpp'
					type='text'
					label='КПП'
					value={order.kpp}
					onChange={e => dispatch( inputMaskHandler( {key: 'kpp', value: e.target.value} ) )}
					clear={() => dispatch( clearInputField( {key: 'kpp', value: ''} ) )}
					mask='999999999'
					maskChar=''
					labelParams={kppInputLabelParams}
					isValid={order.kpp.length === 9}
				/>
				}
			</div>
			<div className={classes['address']}>
				<Input
					type="text"
					name="orgAddress"
					value={order.orgAddress}
					handler={e => dispatch( inputHandler( {key: 'orgAddress', value: e.target.value} ) )}
					label='Юридический адрес организации'
					clear={() => dispatch( clearInputField( {key: 'orgAddress', value: ''} ) )}
					width='100%'
					maxWidth='100%'
					isValid
				/>
				<Toggle
					label='Почтовый адрес совпадает с юридическим'
					name='addressesIsEqual'
					val='Почтовый адрес совпадает с юридическим'
					state={order}
					handler={e => dispatch( checkBoxHandler( {key: 'addressesIsEqual', value: e.target.checked} ) )}
				/>
				
				<Input
					className={order.addressesIsEqual ? 'post-address' : ''}
					type="text"
					name="orgPostAddress"
					value={order.orgPostAddress}
					handler={e => dispatch( inputHandler( {key: 'orgPostAddress', value: e.target.value} ) )}
					label='Почтовый адрес организации'
					clear={() => dispatch( clearInputField( {key: 'orgPostAddress', value: ''} ) )}
					width='100%'
					maxWidth='100%'
					isValid
					locked={!!order.addressesIsEqual}
				/>
			</div>
			<div className={classes['contact-info']}>
				<Input
					type="text"
					name="contactName"
					value={order.contactName}
					handler={e => dispatch( inputHandler( {key: 'contactName', value: e.target.value} ) )}
					label='Имя'
					clear={() => dispatch( clearInputField( {key: 'contactName', value: ''} ) )}
					isValid={order.contactName.length > 2}
				/>
				<InputM
					name='contactPhone'
					type='tel'
					label='Телефон'
					value={order.contactPhone}
					onChange={e => dispatch( inputMaskHandler( {key: 'contactPhone', value: e.target.value} ) )}
					clear={() => dispatch( clearInputField( {key: 'contactPhone', value: ''} ) )}
					mask='+7 (999) 999-99-99'
					maskChar=''
					isValid={order.contactPhone.length === 18}
				/>
				<Input
					type="email"
					name="contactEmail"
					value={order.contactEmail}
					handler={e => dispatch( inputHandler( {key: 'contactEmail', value: e.target.value} ) )}
					label='E-mail'
					clear={() => dispatch( clearInputField( {key: 'contactEmail', value: ''} ) )}
					isValid={validEmail( order.contactEmail )}
				/>
			</div>
		</>
	)
}
