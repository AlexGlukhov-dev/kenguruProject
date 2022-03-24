import React, {useEffect} from 'react'

import classes from '../../components/TakeFromShop/takeFromShop.module.scss'
import {Radio} from "../../../UI/ordersUI/Radio/radio";
import {Button} from "../../../UI/ordersUI/Button/Button";
import {Toggle} from "../../../UI/ordersUI/Toggle/Toggle";


//import {ChooseFromShop} from "../../components/TakeFromShop/ChooseShop/ChooseShop";


export const GetFrom = ({children, showModal, shopsModal, setShowModal, label, name, deliveryPrice, action, date, btnType, btnTxt, modalTitle, state, shops, inputHandler}) => {
	//const [showModal, setShowModal] = useState( false );
	//const shopsModal = () => setShowModal( true );
	//const closeShopsModal = () => setShowModal( false );
	console.log(shops)
	useEffect( () => {
		const body = document.querySelector( 'body' );
		// let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
		body.style.overflow = showModal ? 'hidden' : 'auto';
		body.style.paddingRight = showModal ? '17px'  : '0px';
	}, [showModal] );
	
	
	const choosenShop = shops.filter(shop => shop.code === state.samovivozShop);
	const dates = (shops.map(shop => new Date(shop.takeFrom)));
	const minDate = dates.reduce( (a, b) => a < b ? a : b )
	const {code, address, cost, shopPhone, schedule, takeFrom=minDate} = choosenShop[0] || [];
	const date1 = new Date(takeFrom).toLocaleString("ru", {day: 'numeric', month: 'numeric'});
	
	return <div className={classes.ReceiveSection}>
		<div className={classes.ReceiveSectionInner}>
			{/*<Radio*/}
			{/*	labelParams={[address || 'Из магазинов Кенгуру']}*/}
			{/*	name={name}*/}
			{/*	checked={state.samovivoz === value}*/}
			{/*	// value={code}*/}
			{/*	 state={state}*/}
			{/*	// onChange={inputHandler}*/}
			{/*/>*/}
			<Radio
				labelParams={[address || 'Из магазинов Кенгуру']}
				name={name}
				handler={inputHandler}
				id={code}
				state={state}/>
			<p className={classes.Delivery}>{cost || 'Бесплатно'}</p>
			<p className={classes.Delivery}>{schedule}</p>
			<p className={classes.Delivery}>{shopPhone}</p>
			<p className={classes.DeliveryDay}>Можно забрать с <span>{date1 || minDate}</span></p>
			<div className={classes['toggle__group']}>
				<div className={classes['toggle__by-parts']}>
					<Toggle label={'Получить заказ частями по мере поступления в магазин'}/>
				</div>
				<div className={classes['toggle__loading']}>
					<Toggle label={<span>Погрузить товар в автомобиль <span style={{color: '#808080'}} >+100 ₽</span></span>}/>
				</div>
			</div>
			
			{/*<p className={classes.Delivery}>{deliveryPrice}</p>*/}
			{/*<p className={classes.DeliveryDay}>{action}<span>{date}</span></p>*/}
		</div>
		<Button type={btnType} text={btnTxt} handler={shopsModal} />
		{showModal && children}
	</div>
}