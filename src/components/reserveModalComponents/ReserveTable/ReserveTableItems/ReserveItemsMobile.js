import React from 'react'

import ReserveItemMobile from "./ReserveItem/ReserveItemMobile";
import {useSelector} from "react-redux";

const ReserveItemsMobile = () => {
	
	const shops = useSelector( state => state.reserveModal.reserveModalData );
	
	return (shops && shops.map(shop => <ReserveItemMobile
										key={shop.id}
										address={shop.address}
										shedule={shop.schedule}
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
				)
	)
};

export default ReserveItemsMobile;
