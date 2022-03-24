import React from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import classes from './layout.module.scss'

const layout = props => (
	<>
		<Header/>
		<main>
			<button className={classes.backToCartBtn}>Вернуться в корзину</button>
			{props.children}
		</main>
		<Footer/>
	</>
);

export default layout;