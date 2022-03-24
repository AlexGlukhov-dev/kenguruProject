// import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearCartModalData, hideCartModal} from "../../redux/slices/cartModalSlice";

import Modal from "../../UI/Modal/Modal";
import CartModalContent from "./CartModalContent";
import {useStopScrollJump} from "../../hooks/useStopScrollJump";

import classes from './cartModal.module.scss'

const CartModal = () => {
	const dispatch = useDispatch()
	const cartData = useSelector(state => state.cartModal.cartModalData)
	const showCartModal = useSelector(state => state.cartModal.showCartModal)
	
	
	useStopScrollJump(showCartModal)
	
	const closeModal = () => {
			dispatch( hideCartModal() )
			dispatch( clearCartModalData())
	};
	
	const handleOutsideClick = e => {
		if (e.target.classList.contains( classes['modal'] )) {
			showCartModal && closeModal()
		}
	}
	
	return (
		<Modal className={classes['modal']} onClick={handleOutsideClick} >
			<div className={classes['modal-cart']}>
				<CartModalContent cartData={cartData}/>
			</div>
		</Modal>
	)
}

export default CartModal