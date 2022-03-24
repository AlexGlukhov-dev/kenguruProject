import React from 'react'
import {useSelector} from "react-redux";

import {ChoosePlace} from "../ChoosePlace/ChoosePlace";
import SimpleBarReact from 'simplebar-react';
import logoCdek  from '../../../assets/images/cdek-logo.svg'
import logoBoxberry  from '../../../assets/images/boxberry-logo-76.svg'

// import {Modal} from '../../UI/Modal/Modal'
import Modal2 from '../../../UI/ordersUI/Modal2/Modal2'
import NewMap from "../NewMap/NewMap";
import {shopPoints} from '../NewMap/shopsPoints.js'
import pickupIcon from "../NewMap/logoCdek.png";
// import logoBoxberry  from '../../../assets/images/boxberry-logo.svg'

import classes from './ChoosePickup.module.scss'
// import logo from "../../../assets/images/logo-shop.svg";
import {Button} from "../../../UI/ordersUI/Button/Button";
import ReceiveInfo from "../ReceiveInfo/ReceiveInfo";
// import kengIcon from "../NewMap/pin.png";
// import IndivContext from "../../context/indivContext";
// import MyMap from "../../Maps/MyMap";

export const ChoosePickup = ({text, close, pickups}) => {
	const order = useSelector(state => state.indivOrders.order)

	const goToPay= () => {}

	
	// const handleOutsideClick = e => {
	// 	if (e.target.classList.contains( classes.Modal )) {
	// 		close();
	// 	}
	// };
	

	//TODO change classNames in ModalFunc component
	return (
		<Modal2 /*onclick={handleOutsideClick}*/ onClose={close}>
			<div className={classes['order-placement__inner']}>
				
				<div className={classes['order-placement__info']}>
					<div className={classes['order-placement__info-header']}>
						<div
							className={classes['order-placement__back-btn']}
							onClick={close}>
							<svg className={classes['order-placement__back-arrow']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M19 13H8.6L12.1 17L10.2 18L5 12.1V11.9L10.2 6L12.1 7L8.5 11H19C19.6 11 20 11.4 20 12C20 12.6 19.5 13 19 13Z" fill="#333333"/>
							</svg>
						</div>
						<h2 className={classes['order-placement__title']}>
							{text}
						</h2>
					</div>
					<div className={classes['order-placement__items']}>
						<SimpleBarReact
							className={'order-placement-custom-scroll-container'}
							style={{ maxHeight: '100%' }}
							autoHide={false}
						>
						{pickups.map(pickup => <ChoosePlace
							key={pickup.code}
							id={pickup.code}
							address={[pickup.address]}
							cost={pickup.samovivozPrice}
							schedule={pickup.schedule}
							phone={pickup.phone}
							// date={`Можно забрать с ${pickup.takeFrom}`}
							date={`Можно забрать с ${new Date(pickup.takeFrom).toLocaleString("ru", {day: 'numeric',
								month: 'numeric'})}`}
							// name={'pickup'}
							name={'samovivozPickup'}
							logo={pickup.name === 'CDEK' ? logoCdek : logoBoxberry }
							// inputHandler={inputHandler}
							state={order}
						/>)}
						</SimpleBarReact>
					</div>
					<div className={classes['order-placement__info-footer']}>
						<div className={classes['submitBtn']}>
						<Button
							type={'primary'}
							text={!order.samovivozPickup ? 'Выберите пункт выдачи' : 'Забрать отсюда бесплатно'}
							handler={() => {goToPay();close()}}
							cl={classes['submit-pickup-btn']}
							disabled={!order.samovivozPickup}
						/>
						</div>
						{
							order.samovivozPickup &&
							// <div className={classes['footer-info']}>
							// 	<p className={classes['footer-text']}>Можно забрать</p>
							// 	<p className={classes['footer-date']}>{order.samovivozDatePickup}</p>
							// </div>
							<ReceiveInfo text={'Можно забрать'} date={order.samovivozDatePickup} />
						}
					</div>
					
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
				</button>
					<NewMap points={shopPoints} icon={pickupIcon} clusterColor='Green'/>
				</div>
				
			</div>
		</Modal2>
	)
};

