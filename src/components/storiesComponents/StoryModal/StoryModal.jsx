import {useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {clearStoryModalData, hideStoryModal} from "../../../redux/slices/storyModalSlice"

import Modal from "../../../UI/Modal/Modal";
import StoryModalContent from "./StoryModalContent";

import classes from './storyModal.module.scss'

const StoryModal = () => {
	const dispatch = useDispatch()
	const showStoryModal = useSelector(state => state.storyModal.showStoryModal)
	// const slides = useSelector( state => state.storyModal.storyModalData.slides ) || []
	const scrollToTop = useRef(null)

	const closeModal = () => {
		dispatch( hideStoryModal() )
		dispatch( clearStoryModalData())
	};

	const handleOutsideClick = e => {
		if (e.target.classList.contains( classes['modal'] )) {
			showStoryModal && closeModal()
		}
	}
	
	return (
		<Modal className={classes['modal']} onClick={handleOutsideClick} >
			<div ref={scrollToTop} className={classes['story-modal__wrapper']}>
				<div className={`${classes['story-modal']} stories-modal`}>
					<StoryModalContent scroll={scrollToTop} onClose={closeModal}/>
				</div>
				<div className={classes['story-modal__space']}/>
			</div>
		</Modal>
	)
}

export default StoryModal
