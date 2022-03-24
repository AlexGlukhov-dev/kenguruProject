import {useSelector} from "react-redux";
import PropTypes from 'prop-types'
import {useStopScrollJump} from "../../../hooks/useStopScrollJump";

import StoriesSlider from "../StoriesSlider/StoriesSlider";
import StoryArticle from "./StoryArticle";
import StoryVideo from "./StoryVideo";

import '../../../index.scss'
import 'swiper/swiper.min.css';
import classes from './storyModalContent.module.scss'

const StoryModalContent = ({scroll, onClose}) => {
	const {showStoryModal} = useSelector( state => state.storyModal )
	const storyData = useSelector(state => state.storyModal.storyModalData)
	
	
	// useEffect( () => {
	// 	const body = document.querySelector( 'body' );
	// 	let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	// 	body.style.overflow = 'hidden'
	// 	body.style.paddingRight = paddingOffset
	//
	// 	return () => {
	// 		body.style.overflow = 'auto';
	// 		body.removeAttribute('style')
	// 	}
	// }, [showStoryModal] );
	
	useStopScrollJump(showStoryModal)
	
	const { type, body, title } = storyData
	const slides = useSelector( state => state.storyModal.storyModalData.slides ) || []

	return (
		<>
			<button className={classes['story-close__btn']} onClick={onClose}>
				<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
					<g>
						<g>
							<path
								d="M9.696.304a1 1 0 0 1 0 1.414L6.414 5l3.282 3.282a1 1 0 1 1-1.414 1.414L5 6.414 1.718 9.696A1 1 0 1 1 .304 8.282L3.586 5 .304 1.718A1 1 0 0 1 1.718.304L5 3.586 8.282.304a1 1 0 0 1 1.414 0z"/>
						</g>
					</g>
				</svg>
			</button>
			<div className={'stories'}>
				{type === 'article' && <h1 className='centered margin_b30 advice-caption'>{title}</h1>}
				{type === 'article' && <StoryArticle body={body} />}
				{type === 'video' && <StoryVideo slides={slides} title={title} url={body}/>}
				{slides.length ? <div className={classes['storie-article__show-more']}>Смотреть еще</div> : null}
				{/*{type === 'article' && <div className={classes['storie-article__show-more']}>Смотреть еще</div>}*/}
				</div>
				{slides.length ? <StoriesSlider scroll={scroll} /> : null}
				{/*<StoriesSlider scroll={scroll} />*/}

		</>
	)
};

StoryModalContent.propTypes = {
	onClose: PropTypes.func.isRequired
};

export default StoryModalContent;

