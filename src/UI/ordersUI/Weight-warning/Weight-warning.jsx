
import classes from './weightWarning.module.scss'

import React from "react";

const WeightWarning = () => {
	
	return (
		<div className={classes['weight-warning']}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M11.7603 9.30371C7.47439 9.30371 4 12.7781 4 17.064C4 19.4349 5.06324 21.5575 6.73891 22.9809H16.7816C18.4573 21.5575 19.5205 19.4349 19.5205 17.064C19.5205 12.7781 16.0461 9.30371 11.7603 9.30371Z" stroke="#333333" strokeWidth="2"/>
				<path d="M4.5 14.5L3.53719 6.47658C3.25147 4.09557 5.11061 2 7.5087 2H15.6672C18.0021 2 19.8407 3.99152 19.6545 6.31898L19 14.5" stroke="#333333" strokeWidth="2"/>
				<path d="M8.13568 10.2167L7.76937 6.75715C7.70684 6.1665 8.16987 5.65186 8.76382 5.65186H14.7576C15.3516 5.65186 15.8146 6.16651 15.7521 6.75715L15.3857 10.2167" stroke="#333333" strokeWidth="2"/>
			</svg>
			<div className={classes['weight-warning__text']}>
				<span>Вес вашего заказа больше 12 кг. Рекомендуем приехать за ним на машине или&nbsp;</span>
				<span><a href="/">оформить доставку до дома</a></span>
			</div>
		</div>
	)
}

export default WeightWarning