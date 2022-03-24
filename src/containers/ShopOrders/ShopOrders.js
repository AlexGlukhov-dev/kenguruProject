import React from 'react'

import { Tabs } from '../../UI/ordersUI/Tabs/Tabs'
import { ShopIndivContent } from '../../components/Order/ShopContent/ShopIndivContent/ShopIndivContent'
import { UrContent } from '../../components/Order/IndivContent/Section1/Ur/UrContent'

// import classes from "./shop.module.scss";
import classes from '../../styles/CommonStyles.module.scss'

export const ShopOrders = () => {
	// const [addPhone, setAddPhone] = useState(false)
	
	return (
		<>
			<button className={classes.BackToCart}>Вернуться в корзину</button>
			<h2 className={`${classes.Title}`}>1. Контактные данные</h2>
			<Tabs
				title1="Физическое лицо"
				title2="Юридическое лицо"
				content1={<ShopIndivContent /*showPhoneField={addPhone} setPhone={()=> setAddPhone(prev => !prev)}*//>}
				content2={<UrContent />}/>
		</>
	)
}
