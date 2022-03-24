import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import {hideReserveModal} from "../../../../../redux/slices/reserveModalSlice"
import {fetchReserveAmount} from "../../../../../redux/slices/reserveModalSlice"

import PropTypes from 'prop-types'

import classes from './reserveTableItem.module.scss'

const ReserveTableItem = ({
														address,
														schedule,
														amount,
														unitAmount,
														price,
														reserve,
														orderLink,
														xmlid,
														shop,
														isAuth,
														isAllowed
													}) => {
	const [inReserve, setInReserve] = useState(reserve)
	const dispatch = useDispatch()
	
	const reserveHandler = e => {
		// setInReserve( true )
		
		if (isAuth && !inReserve) {
			
			const id = e.target.closest(`.${classes['reserve-btn']}`).getAttribute( 'data-xmlid' )
			const shop = e.target.closest(`.${classes['reserve-btn']}`).getAttribute( 'data-shop' )
			
			if (id && shop) {
				
				dispatch(fetchReserveAmount({id, shop}))
				setInReserve( true)
			}
		}
	}
	
	const authHandler = e => {
		dispatch( hideReserveModal() );
	}
	
	return (
		<tr className={`${classes['reserve-table__row']}`}>
			<td>
				<div>
					{address}
					<div>{schedule}</div>
				</div>
			</td>
			<td>{amount}&nbsp;{unitAmount}</td>
			{!!isAllowed && <td>{price}&nbsp;&#8381;</td>}
			{!!isAllowed && <td>
				<div className={`${classes['reserve-btn__wrapper']}`}>
					<span
						data-xmlid={xmlid}
						data-shop={shop}
						className={`${classes['main-btn']} ${classes['reserve-btn']}`}
						onClick={reserveHandler}>
						
							{!inReserve ?
								<span data-xmlid={xmlid} data-shop={shop} className={classes['reserve-btn__text']}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
											 viewBox="0 0 16 16">
										<path fill="#fff"
													d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-2 0c0-3.308-2.692-6-6-6S2 4.692 2 8s2.692 6 6 6 6-2.692 6-6zm-3 .99v.02a.99.99 0 0 1-.99.99H6.99A.99.99 0 0 1 6 9.01V5.99A.99.99 0 0 1 6.99 5h.02a.99.99 0 0 1 .99.99V7.5a.5.5 0 0 0 .5.5h1.51a.99.99 0 0 1 .99.99z"/>
							</svg>
									Зарезервировать
								</span> :
								<span>Товар в резерве</span>}
					</span>
					
					{!inReserve && !isAuth && <div className={classes['reserve-text']}>
					<span>
						для резерва необходимо
					</span>
						<br/>
						<button className={`reqauth ${classes['reserve-auth']}`} onClick={authHandler}>войти в личный кабинет</button>
					</div>
					}
					{inReserve &&
					<div className={classes['on-reserve']}>Не забудьте <a href={orderLink}>оформить резерв</a></div>}
				</div>
			</td>}
		</tr>
	)
}

export default ReserveTableItem;

ReserveTableItem.propTypes = {
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
}

ReserveTableItem.defaultProps = {
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
}