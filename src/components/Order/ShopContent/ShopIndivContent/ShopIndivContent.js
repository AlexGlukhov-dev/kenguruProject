import React, { useState } from 'react'

// import { Input } from '../../../UI/Input/Input'
import {Input} from '../../../../UI/ordersUI/Input'

import {Toggle} from '../../../../UI/ordersUI/Toggle/Toggle'
import {CheckBox} from '../../../../UI/ordersUI/Checkbox/CheckBox'

import classes from './ShopIndivContent.module.scss'
// import classes1 from '../../../UI/Input/Input.module.scss'

export const ShopIndivContent = () => {
	
	const [addPhone, setAddPhone] = useState(false)
	const [state, setState] = useState( {
			email: '',
			phone: '',
			secondPhone: '',
			name: '',
			secondName: ''
		});
	
	const clearInputField = (e) => {
		const inputName = e.target.getAttribute( 'data-forinput' );
		
		setState( prev => ({...prev, [inputName]: ''}) )
	}
	
	const inputHandler = (e) => {
		const {value, name} = e.target;
		
		setState( prev => ({...prev, [name]: value.trim()}) )
	}
	
	// const InputLabelParams = {
	// 	9: 'Введено 9 символов',
	// 	10: 'Введено 10 символов',
	// 	11: 'Введено 11 символов'
	// }
	
	return (
		
		<div className={classes.Content}>
			<Input
				type="phone"
				name="phone"
				value={state.phone}
				handler={inputHandler}
				label='Телефон'
				clear={clearInputField}
				minWidth='390px'
				max={11}
			/>
			{/*<Input*/}
			{/*	type='text'*/}
			{/*	placeholder='Телефон'*/}
			{/*	className={`${classes1.ContentInput} ${classes.First}`}*/}
			{/*	name="phone" />*/}
			{addPhone ? <Input
					type="phone"
					name="secondPhone"
					value={state.secondPhone}
					handler={inputHandler}
					label='Телефон'
					clear={clearInputField}
					minWidth='390px'
					max={11}
					autofocus
				/> :
				<div className={`${classes.Seven} ${classes.AddPhone}`} onClick={() => setAddPhone(true)}>
					<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd"
									d="M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5ZM17 8.5C17 13.1944 13.1944 17 8.5 17C3.80558 17 0 13.1944 0 8.5C0 3.80558 3.80558 0 8.5 0C13.1944 0 17 3.80558 17 8.5ZM7.85714 7.85714V4H9.14286V7.85714H13V9.14286H9.14286V13H7.85714V9.14286H4V7.85714H7.85714Z"/>
					</svg>
					<span>Добавить «запасной» телефон</span>
				</div>
			}
			{/*{showPhoneField ? <Input*/}
			{/*	type='text'*/}
			{/*	placeholder='Телефон'*/}
			{/*	className={`${classes1.ContentInput} ${classes.Seven}`}*/}
			{/*	name="phone"/> :*/}
			{/*	<div className={`${classes.Seven} ${classes.AddPhone}`} onClick={() => setPhone() }>*/}
			{/*		<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
			{/*		<path fillRule="evenodd" clipRule="evenodd" d="M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5ZM17 8.5C17 13.1944 13.1944 17 8.5 17C3.80558 17 0 13.1944 0 8.5C0 3.80558 3.80558 0 8.5 0C13.1944 0 17 3.80558 17 8.5ZM7.85714 7.85714V4H9.14286V7.85714H13V9.14286H9.14286V13H7.85714V9.14286H4V7.85714H7.85714Z" />*/}
			{/*		</svg>*/}
			{/*		<span>Добавить «запасной» телефон</span>*/}
			{/*	</div>*/}
			{/*}*/}
			<Input
				type="text"
				name="name"
				value={state.name}
				handler={inputHandler}
				label='Имя'
				clear={clearInputField}
				minWidth='390px'
			/>
			{/*<Input*/}
			{/*	type='text'*/}
			{/*	placeholder='Имя'*/}
			{/*	className={`${classes1.ContentInput} ${classes.Second}`}*/}
			{/*	name="Name" />*/}
			<Input
				type="Email"
				name="email"
				value={state.email}
				handler={inputHandler}
				label='Email'
				clear={clearInputField}
				minWidth='390px'
			/>
			{/*<Input*/}
			{/*	type='text'*/}
			{/*	placeholder='Email'*/}
			{/*	className={`${classes1.ContentInput} ${classes.Third}`}*/}
			{/*	name="Email" />*/}
			<Input
				type="text"
				name="secondName"
				value={state.secondName}
				handler={inputHandler}
				label='Фамилия'
				clear={clearInputField}
				minWidth='390px'
			/>
			{/*<Input*/}
			{/*	type='text'*/}
			{/*	placeholder='Фамилия'*/}
			{/*	className={`${classes1.ContentInput} ${classes.Fourth}`}*/}
			{/*	name="SecName" />*/}
			<div className={`${classes.Fifth}`}>
				<CheckBox labelText="Хочу получать письма об изменениях статуса заказа"/>
			</div>
			<div className={classes.Sixth}>
				<Toggle/>
			</div>
		
		</div>
	
	)
}