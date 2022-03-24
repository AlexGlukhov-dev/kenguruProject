import React from 'react'
import {useSelector} from "react-redux";
import SimpleBarReact from 'simplebar-react';

import {ChoosePlace} from "../ChoosePlace/ChoosePlace";
import logo  from '../../../assets/images/logo-shop.svg'
import classes from './ChooseShop.module.scss'
import {Button} from '../../../UI/ordersUI/Button/Button';
import Modal2 from "../../../UI/ordersUI/Modal2/Modal2";
import NewMap from "../NewMap/NewMap";
import {shopPoints} from '../NewMap/shopsPoints.js'
import kengIcon from "../NewMap/pin.png";

import 'simplebar/dist/simplebar.min.css';
import 'simplebar/dist/simplebar.min.css';
import ReceiveInfo from "../ReceiveInfo/ReceiveInfo";
// import MyMap from "../../Maps/MyMap";
// import {Modal} from '../../../UI/Modal/Modal'
// import {Input} from "../../../UI/Input";


export const ChooseShop = ({text, close, shops}) => {
	const order = useSelector(state => state.indivOrders.order)

	const goToPay= () => {}
	// const handleOutsideClick = e => {
	// 	if (e.target.classList.contains( classes.Modal )) {
	// 		close();
	// 	}
	// };

	// console.log(shopId)
	// const sendShop = (shopId) => {
	// 	// console.log(shopId);
	// 	close();
	// }
	
	
	// const chooseShopHandler = (e) => {
		// setChoosenShop(e.target.value)
		// console.log(e.target.value)
		// if(e.target.value) setDisabledBtn(false)
	// }
	
	return (
		<Modal2 /*onclick={handleOutsideClick}*/ onClose={close}>
			<div className={classes['order-placement__inner']}>
				
				
				<div className={classes['order-placement__info']}>
					<div className={classes['order-placement__info-header']}>
						<div
							className={classes['order-placement__back-btn']}
							onClick={close}>
							<svg className={classes['order-placement__back-arrow ']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M19 13H8.6L12.1 17L10.2 18L5 12.1V11.9L10.2 6L12.1 7L8.5 11H19C19.6 11 20 11.4 20 12C20 12.6 19.5 13 19 13Z" fill="#333333"/>
							</svg>
						</div>
						<h2 className={classes['order-placement__title']}>
							{text}
						</h2>
					</div>
					<div style={{overflow: 'hidden'}} className={classes['order-placement__items']}>
						
						<SimpleBarReact
							className={'order-placement-custom-scroll-container'}
							style={{ maxHeight: '100%' }}
							autoHide={false}
						>
					{shops.map(shop => <ChoosePlace
							key={shop.code}
							id={shop.code}
							address={[shop.address]}
							cost={shop.samovivozPrice}
							schedule={shop.schedule}
							phone={shop.phone}
							// date={`Можно забрать с ${shop.takeFrom}`}
							date={`Можно забрать с ${new Date(shop.takeFrom).toLocaleString("ru", {day: 'numeric',
		 month: 'numeric'})}`}
							name={'samovivozShop'}
							logo={logo}
						/>
					)}
				</SimpleBarReact>
					</div>
					<div className={classes['order-placement__info-footer']}>
						<div className={classes['submitBtn']}>
							<Button
								type={'primary'}
								text={!order.samovivozShop ? 'Выберите магазин' : 'Забрать отсюда бесплатно'}
								handler={()=> {goToPay();close()}}
								cl={classes['submit-shop-btn']}
								disabled={!order.samovivozShop}
							/>
						</div>
						{
							order.samovivozShop &&
							<ReceiveInfo date={order.samovivozDateKenguru} text={'Можно забрать'} />
						}
					</div>
				</div>
				<div className={classes['order-placement__map']}>
					<button className={`${classes['order-placement__close-btn']}`} onClick={close} >
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
							<g>
								<g>
									<path
										d="M9.696.304a1 1 0 0 1 0 1.414L6.414 5l3.282 3.282a1 1 0 1 1-1.414 1.414L5 6.414 1.718 9.696A1 1 0 1 1 .304 8.282L3.586 5 .304 1.718A1 1 0 0 1 1.718.304L5 3.586 8.282.304a1 1 0 0 1 1.414 0z"/>
								</g>
							</g>
						</svg>
				</button>
					{/*<MyMap />*/}
					<NewMap points={shopPoints} icon={kengIcon} clusterColor='Orange'/>
				</div>
			</div>
		</Modal2>
	)
};

