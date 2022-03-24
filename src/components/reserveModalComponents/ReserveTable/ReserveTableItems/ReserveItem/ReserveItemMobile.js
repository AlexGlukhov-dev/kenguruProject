import React, { useState} from 'react'
// import axios from 'axios'
import {useDispatch} from "react-redux";
import {hideReserveModal} from "../../../../../redux/slices/reserveModalSlice";
import {fetchReserveAmount} from "../../../../../redux/slices/reserveModalSlice";
import PropTypes from 'prop-types'
import Tippy from "@tippyjs/react";

import classes from './reserveItemMobile.module.scss'


const ReserveItemMobile = ({
														 address,
														 schedule,
														 amount,
														 unitAmount,
														 price,
														 orderLink,
														 reserve,
														 xmlid,
														 shop,
														 isAuth,
														 isAllowed
													 }) => {
	const [inReserve, setInReserve] = useState( reserve );
	const [show, setShow] = useState(false)
	const [showRezText, setShowRezText] = useState(false)
	
	const dispatch = useDispatch()
	
	const reserveHandler = e => {
		if (!isAuth) setShow(true)
		if(isAllowed) setShowRezText(true)
		
		if (isAuth && !inReserve) {
			
			const id = e.target.closest(`.${classes['reserve-btn']}`).getAttribute( 'data-xmlid' )
			const shop = e.target.closest(`.${classes['reserve-btn']}`).getAttribute( 'data-shop' )
			
			if (id && shop) {
				const data = {id, shop}
				dispatch(fetchReserveAmount(data))
				setInReserve( true )
			}
		}
	}
	
	const authHandler = e => {
		dispatch( hideReserveModal() );
		// e.stopPropagation()
	}
	
	return (
		<div className={classes['reserve-content']} style={!isAllowed ? {paddingBottom: '0'} : null}>
			<div className={classes['reserve-content__address']}>
				<div className={classes['title']}>Адрес магазина</div>
				{address}
				<div className={classes['table-schedule']}>{schedule}</div>
			</div>
			
			<div className={classes['reserve-content--center']}>
				<div className={classes['reserve-content__quantity']}>
					<div className={classes['title']}>Наличие</div>
					{amount}&nbsp;{unitAmount}
				</div>
				
				{isAllowed && <div className={classes['reserve-content__price']}>
					<div className={classes['title']}>Цена</div>
					{price}&nbsp;&#8381;
				</div>}
			
			</div>
			
			{isAllowed && <div className={classes['reserve-content__bottom']}>
				
				<div className={classes['title']}>
					<span>Время резерва 6 часов</span>
					<Tippy
						content={<span>Товар будет в резерве<br/>  в течение 6 часов</span>}
						animation='scale'
						placement={'top-end'}
					>
						<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="9" cy="10" r="8.5" fill="#F8F8F8" stroke="#D9D9D9"/>
							<path
								d="M7.96 11.808C7.96 11.4533 7.99267 11.15 8.058 10.898C8.13267 10.6367 8.254 10.3893 8.422 10.156C8.59933 9.92267 8.83733 9.68 9.136 9.428C9.5 9.12 9.78 8.86333 9.976 8.658C10.1813 8.45267 10.326 8.252 10.41 8.056C10.494 7.86 10.536 7.622 10.536 7.342C10.536 6.894 10.3913 6.54867 10.102 6.306C9.81267 6.06333 9.39267 5.942 8.842 5.942C8.38467 5.942 7.97867 6.00267 7.624 6.124C7.26933 6.236 6.92867 6.37133 6.602 6.53L6.168 5.55C6.54133 5.354 6.952 5.19067 7.4 5.06C7.85733 4.92933 8.366 4.864 8.926 4.864C9.81267 4.864 10.4987 5.08333 10.984 5.522C11.4693 5.96067 11.712 6.558 11.712 7.314C11.712 7.734 11.642 8.09333 11.502 8.392C11.3713 8.68133 11.18 8.952 10.928 9.204C10.6853 9.44667 10.396 9.708 10.06 9.988C9.752 10.2493 9.514 10.478 9.346 10.674C9.18733 10.87 9.08 11.066 9.024 11.262C8.968 11.4487 8.94 11.6773 8.94 11.948V12.186H7.96V11.808ZM7.638 14.244C7.638 13.8987 7.71733 13.656 7.876 13.516C8.044 13.376 8.254 13.306 8.506 13.306C8.73933 13.306 8.94 13.376 9.108 13.516C9.276 13.656 9.36 13.8987 9.36 14.244C9.36 14.58 9.276 14.8227 9.108 14.972C8.94 15.1213 8.73933 15.196 8.506 15.196C8.254 15.196 8.044 15.1213 7.876 14.972C7.71733 14.8227 7.638 14.58 7.638 14.244Z"
								fill="#999999"/>
						</svg>
					</Tippy>
				</div>
				
				<div className="TableReserve">
					<div className="TableButton">
						<div
							data-xmlid={xmlid}
							data-shop={shop}
							className={`${classes['main-btn']} ${classes['reserve-btn']}`}
							onClick={reserveHandler}>
							{!inReserve ? <>
									<svg data-xmlid={xmlid} data-shop={shop} xmlns="http://www.w3.org/2000/svg" width="16" height="16"
											 viewBox="0 0 16 16">
										<path data-xmlid={xmlid} data-shop={shop} fill="#fff"
													d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-2 0c0-3.308-2.692-6-6-6S2 4.692 2 8s2.692 6 6 6 6-2.692 6-6zm-3 .99v.02a.99.99 0 0 1-.99.99H6.99A.99.99 0 0 1 6 9.01V5.99A.99.99 0 0 1 6.99 5h.02a.99.99 0 0 1 .99.99V7.5a.5.5 0 0 0 .5.5h1.51a.99.99 0 0 1 .99.99z"/>
									</svg>
									<span data-xmlid={xmlid} data-shop={shop}>Зарезервировать</span>

								{!inReserve &&  !isAuth && <div className={`${classes['reserve-text']} ${show && classes['show']}`}>
									<div>
										Для резерва необходимо
									</div>
									<button className={`reqauth ${classes['reserve-auth']}`} onClick={authHandler}>войти в личный кабинет</button>
								</div>
								}
								
								{/*{inReserve && isAllowed &&*/}
								{/*<div className={classes['on-reserve']}>Не забудьте <a href={orderLink}>оформить резерв</a></div>*/}
								{/*}*/}
								</> :	<><span>Товар в резерве</span>
							{/*{inReserve && isAllowed &&*/}
								<div className={`${classes['on-reserve']} ${inReserve && isAllowed && classes['show']}`}>Не забудьте <a href={orderLink}>оформить резерв</a></div>
							{/*}*/}
							</>

							}
							
							{/*{!isAuth && goToLk && <div className={classes['reserve-text']}>*/}
							{/*		<div>*/}
							{/*			Для резерва необходимо*/}
							{/*		</div>*/}
							{/*	<button className={`reqauth ${classes['reserve-auth']}`} onClick={authHandler}>войти в личный кабинет</button>*/}
							{/*</div>}*/}
						</div>
						
						
						
					</div>
					
				</div>
			</div>}
		</div>
	)
};

export default ReserveItemMobile;

ReserveItemMobile.propTypes = {
	address: PropTypes.string.isRequired,
	schedule: PropTypes.string.isRequired,
	amount: PropTypes.oneOfType( [
		PropTypes.string.isRequired,
		PropTypes.number.isRequired,
	] ),
	unitAmount: PropTypes.string.isRequired,
	price: PropTypes.oneOfType( [
		PropTypes.string.isRequired,
		PropTypes.number.isRequired,
	] ),
	unitPrice: PropTypes.string.isRequired,
	reserve: PropTypes.bool.isRequired,
	xmlid: PropTypes.string.isRequired,
	authLink: PropTypes.string.isRequired,
	orderLink: PropTypes.string.isRequired,
	shop: PropTypes.string.isRequired,
	isAuth: PropTypes.bool.isRequired,
	isAllowed: PropTypes.bool.isRequired
};

ReserveItemMobile.defaultProps = {
	address: '',
	schedule: '',
	amount: '',
	unitAmount: '',
	price: '',
	unitPrice: '',
	reserve: false,
	xmlid: '',
	authLink: '',
	orderLink: '',
	shop: '',
	isAuth: false,
	isAllowed: true
};