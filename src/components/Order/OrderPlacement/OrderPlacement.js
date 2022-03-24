import React from 'react'

import {Modal} from '../../../UI/ordersUI/Modal/Modal'
//import {ChoosePlace} from "../ChoosePlace/ChoosePlace";

import classes from './orderPlacement.module.scss'
import DeliveryKenguru from "../OrderDelivery/DeliveryKenguru/DeliveryKenguru";

export const OrderPlacement = ({text, close, inputHandler, state}) => {
	
	const handleOutsideClick = e => {
		if (e.target.classList.contains( classes.Modal )) {
			close();
		}
	};
	console.log(state)
	//TODO change classNames in ModalFunc component
	return (
		<Modal onclick={handleOutsideClick} onClose={close}>
			<div className={classes['order-placement__inner']}>
				
				<div className={classes['order-placement__info']}>
					<div className={classes['order-placement__info-header']}>
						<button
							className={classes['order-placement__back-btn']}
							onClick={close}>
							<svg className={classes['order-placement__back-arrow']} width="15" height="13" viewBox="0 0 15 13" fill="none"
									 xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd"
											d="M13.99 5.03H3.54L7.07 1.02L5.19 0L0 5.89V6.11L5.19 12.02L7.07 11L3.58 7.03H13.99C14.54 7.03 14.99 6.58 14.99 6.03C14.99 5.48 14.54 5.03 13.99 5.03Z"
											fill="#333333"/>
							</svg>
						</button>
						<h2 className={classes['order-placement__title']}>
							{text}
						</h2>
					</div>
					{/*<ChoosePlace*/}
					{/*	address={'ул. Куконковых, 104'}*/}
					{/*	cost={'Бесплатно'}*/}
					{/*	schedule={'Ежедневно с 8:00 до 20:00'}*/}
					{/*	phone={'8 915 832 60 77'}*/}
					{/*	date={'Можно забрать с 26.04'}*/}
					{/*	name={'pickup'}*/}
					{/*	inputHandler={inputHandler}*/}
					{/*	state={state}*/}
					{/*/>*/}
					{/*<ChoosePlace*/}
					{/*	address={'ул. Куконковых, 104'}*/}
					{/*	cost={'Бесплатно'}*/}
					{/*	schedule={'Ежедневно с 8:00 до 20:00'}*/}
					{/*	phone={'8 915 832 60 77'}*/}
					{/*	date={'Можно забрать с 26.04'}*/}
					{/*	name={'pickup'}*/}
					{/*	inputHandler={inputHandler}*/}
					{/*	state={state}*/}
					{/*/>*/}
					{/*<ChoosePlace*/}
					{/*	address={'ул. Куконковых, 104'}*/}
					{/*	cost={'Бесплатно'}*/}
					{/*	schedule={'Ежедневно с 8:00 до 20:00'}*/}
					{/*	phone={'8 915 832 60 77'}*/}
					{/*	date={'Можно забрать с 26.04'}*/}
					{/*	name={'pickup'}*/}
					{/*	inputHandler={inputHandler}*/}
					{/*	state={state}*/}
					{/*/>*/}
					<DeliveryKenguru />
				</div>
				
				<div className={classes['order-placement__map']}>
					<button className={`${classes['order-placement__close-btn']}`} onClick={close}>
					<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
						<g>
							<g>
								<path
									d="M9.696.304a1 1 0 0 1 0 1.414L6.414 5l3.282 3.282a1 1 0 1 1-1.414 1.414L5 6.414 1.718 9.696A1 1 0 1 1 .304 8.282L3.586 5 .304 1.718A1 1 0 0 1 1.718.304L5 3.586 8.282.304a1 1 0 0 1 1.414 0z"/>
							</g>
						</g>
					</svg>
				</button></div>
				
			</div>
		</Modal>
	)
};

