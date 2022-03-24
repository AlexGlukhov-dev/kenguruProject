import {useDispatch, useSelector} from "react-redux";

import Modal from "../../../UI/Modal/Modal";


import {clearReserveModalData, hideReserveModal} from "../../../redux/slices/reserveModalSlice";
import ReserveTableItems from "../ReserveTable/ReserveTableItems/ReserveTableItems";
import ReserveItemsMobile from "../ReserveTable/ReserveTableItems/ReserveItemsMobile";

import classes from './reserveModal1.module.scss'

const ReserveModal1 = () => {
	const dispatch = useDispatch()
	const showReserveModal = useSelector(state => state.reserveModal.showReserveModal)
	const shops = useSelector( state => state.reserveModal.reserveModalData );
	
	const closeModal = () => {
		dispatch( hideReserveModal() )
		dispatch( clearReserveModalData())
	};
	
	const handleOutsideClick = e => {
		if (e.target.classList.contains( classes['modal'] )) {
			showReserveModal && closeModal()
		}
	}
	
	const skl = (number, txt, cases = [1, 0, 1, 1, 1, 1]) => {
		return txt[
			number % 100 > 4 && number % 100 < 20
				? 1
				: cases[number % 10 < 5 ? number % 10 : 5]
			];
	};
	
	let shop = skl( shops.length, ["магазине", "магазинах"] );
	return (
		<Modal className={classes['modal']} onClick={handleOutsideClick} >

				<div className={classes['reserve-modal']}>
					<button className={`${classes['reserve-modal__closeBtn']}`} onClick={closeModal}>
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
							<g>
								<g>
									<path
										d="M9.696.304a1 1 0 0 1 0 1.414L6.414 5l3.282 3.282a1 1 0 1 1-1.414 1.414L5 6.414 1.718 9.696A1 1 0 1 1 .304 8.282L3.586 5 .304 1.718A1 1 0 0 1 1.718.304L5 3.586 8.282.304a1 1 0 0 1 1.414 0z"/>
								</g>
							</g>
						</svg>
					</button>
					<h2 className={classes['reserve-modal__title']}>
						<span>
							<svg className={classes['reserve-modal__titleArrow']} width="15" height="13" viewBox="0 0 15 13" fill="none"
									 xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd"
											d="M13.99 5.03H3.54L7.07 1.02L5.19 0L0 5.89V6.11L5.19 12.02L7.07 11L3.58 7.03H13.99C14.54 7.03 14.99 6.58 14.99 6.03C14.99 5.48 14.54 5.03 13.99 5.03Z"
											fill="#333333"/>
							</svg>
						</span>
						<span>Товар в наличии в {shops.length} {shop} г. Иваново</span>
					</h2>
					<ReserveTableItems/>
					<ReserveItemsMobile/>
				</div>

		</Modal>
	)
}

export default ReserveModal1;