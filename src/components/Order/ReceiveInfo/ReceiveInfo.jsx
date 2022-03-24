import React from 'react';
import classes from "./receiveInfo.module.scss";

const ReceiveInfo = ({text, date, hours_from = 8, hours_until = 20, showTime= false }) => {

	return (
		<div className={classes['receive-info']}>
			<p className={classes['receive-text']}>{text}</p>
			<span className={classes['receive-date']}>{date}</span>
			{showTime && <span className={classes['receive-time']}>{`с ${hours_from} до ${hours_until}`}</span>}
		</div>
	);
};

export default ReceiveInfo;