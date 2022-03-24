import React from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

import ReserveTableItem from './ReserveItem/ReserveTableItem'

import 'tippy.js/dist/tippy.css'
import classes from './ReserveTableItems.module.scss'
import {useSelector} from "react-redux";

const ReserveTableItems = () => {
	
	const shops = useSelector( state => state.reserveModal.reserveModalData );
	const isAllowed = useSelector( state => state.reserveModal.reserveModalData[0].isAllowed)
	
	return (
		<table className={classes['reserve-table']}>
			<thead>
			<tr>
				<td>Адрес магазина</td>
				<td>Наличие</td>
				{!!isAllowed && <td>Цена</td>}
				{!!isAllowed && <td className={classes["reserve-cell"]}>Время резерва 6 часов
					<span>
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
					</span>
				</td>}
			</tr>
			</thead>
			<tbody>
			{shops && shops.map( shop => <ReserveTableItem
					key={shop.id}
					address={shop.address}
					schedule={shop.schedule}
					amount={shop.amount}
					unitAmount={shop.unitAmount}
					price={shop.price}
					unitPrice={shop.unitPrice}
					reserve={shop.isInReserve}
					orderLink={shop.orderLink}
					xmlid={shop.xmlid}
					shop={shop.shop}
					isAuth={shop.isAuth}
					isAllowed={shop.isAllowed}
				/>
			)}
			</tbody>
		</table>
	)
};

export default ReserveTableItems;