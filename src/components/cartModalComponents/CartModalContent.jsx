// import PropTypes from 'prop-types'
import {useDispatch} from "react-redux";
import {hideCartModal} from '../../redux/slices/cartModalSlice'

import classes from './cartModalContent.module.scss'

const CartModalContent = ({cartData}) => {
	const dispatch = useDispatch()
	
	const {
		xmlid: sku,
		imageLink,
		amount,
		unitAmount,
		price,
		toCartLink
	} = cartData;

	return (<>
		<div className={classes['item__modal']}>
			<div className={classes['image']}>
				<img src={imageLink} alt="good"/>
			</div>
			<div className={classes['text']}>
				<div style={{display: 'flex'}}>
					<span><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29"><g><g><path fill="#8dc63f" d="M14.5 0c8.006 0 14.496 6.49 14.496 14.496S22.506 28.994 14.5 28.994C6.493 28.994.002 22.502.002 14.496S6.493-.001 14.5-.001z"/></g><g><path fill="#fff" d="M20.92 13.287l-1.526 1.526-4.578 4.577a1.519 1.519 0 0 1-1.08.448c-.42 0-.802-.17-1.078-.448l-3.052-3.05a1.526 1.526 0 1 1 2.158-2.158l1.973 1.973 3.499-3.499 1.526-1.527a1.525 1.525 0 1 1 2.158 2.158z"/></g></g></svg></span>
					<h2>Товар добавлен в корзину</h2>
				</div>
				<div className={classes['title']}/>
				<div className={classes['art']}>
					Артикул: {sku}
				</div>
				<div className={classes['props']}>
					<div className={classes['quantity']}>
						Количество: <span>{amount} {unitAmount}</span>
					</div>
					<div className={classes['summ']}>
						Стоимость: <span><span>{price}</span>	₽</span>
					</div>
				</div>
				<div className={classes['buttons']}>
					<a href={toCartLink} className={`${classes['main-btn']} ${classes['to-cart']}`}>
						<span>Перейти в корзину</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12">
							<g>
								<g>
									<path fill="#fff"
												d="M3.092 11.538A1.5 1.5 0 0 1 .97 9.416L4.387 6 .97 2.583A1.5 1.5 0 0 1 3.092.462l4.477 4.477a1.5 1.5 0 0 1 0 2.122z"/>
								</g>
							</g>
						</svg>
					</a>
					<button className={classes['continue']} onClick={() => dispatch(hideCartModal())}>Продолжить покупки</button>
				</div>
			</div>
		</div>
	</>)
};

export default CartModalContent;

// CartModalContent.propTypes = {
// 	cartData: PropTypes.shape( {
// 		imageLink: PropTypes.string.isRequired,
// 		amount: PropTypes.number.isRequired,
// 		unitAmount: PropTypes.string.isRequired,
// 		price: PropTypes.string.isRequired,
// 		toCartLink: PropTypes.string.isRequired,
// 	}).isRequired
// };

// CartModalContent.defaultProps = {
// 	cartData: []
// };