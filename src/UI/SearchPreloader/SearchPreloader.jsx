import React from 'react';

import classes from './searchPreloader.module.scss'

const SearchPreloader = () => {
	return (
		<div className={classes['opt-modal-preloader']}>
			<div className={classes['opt-modal-preloader__content']}>Поиск клиента в базе</div>
			<div className={classes['opt-modal-preloader__progress-bar']}/>
		</div>
	);
};

export default SearchPreloader;