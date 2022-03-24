import {useRef, useCallback} from "react"
import {useSelector} from "react-redux"
import store from "../../../redux/store"
import {fetchStoryModalData} from "../../../redux/slices/storyModalSlice"
import {Swiper} from "swiper/react/swiper"
import {SwiperSlide} from 'swiper/react/swiper-slide'

import StorySlide from "./StorySlides/StorySlide"

import classes from './storiesSlider.module.scss'

// import {Navigation} from 'swiper';
//
// import storyImg1 from '../../../assets/images/story-1.jpg'
// import storyImg2 from '../../../assets/images/story-2.jpg'
// import storyImg3 from '../../../assets/images/story-3.jpg'
// import storyImg4 from '../../../assets/images/story-4.jpg'

// import StoryVideoSlide from "./StorySlides/StoryVideoSlide";
// import StoryArticleSlide from "./StorySlides/StoryArticleSlide";
// import {fetchStoryModalDataNew} from "../../../redux/slices/storyModalSlice-new";

const StoriesSlider = ({scroll}) => {
	const swiperRef = useRef( null )
	// const dispatch = useDispatch()
	const slides = useSelector( state => state.storyModal.storyModalData.slides ) || []
	
	const nextSlide = useCallback( () => {
		swiperRef.current?.swiper.slideNext();
	}, [swiperRef] );
	
	// const prevSlide = useCallback(() => {
	// 	swiperRef.current?.swiper.slidePrev();
	// }, [swiperRef]);
	
	const fetchStorie = (id, sectionid) => {
		const data = {id, sectionid}
		store.dispatch(fetchStoryModalData(data))
		scroll.current.scrollIntoView({block: "start", behavior: "smooth"})
	}
	
	return <>
		<div className={`${classes['stories-slider']}`}>
			<div className={`${classes['stories-slider__content']}`}>
				<Swiper
					ref={swiperRef}
					spaceBetween={10}
					slidesPerView={7}
					breakpoints={{
						1260: {
							slidesPerView: 7,
						},
						992: {
							slidesPerView: 6.5,
						},
						// when window width is >= 768px
						768: {
							// width: 768,
							slidesPerView: 4.5,
						},
						320: {
							slidesPerView: 2.3
						}
					}}
				>
					{slides.map( slide => <SwiperSlide
						onClick={() => {
							fetchStorie( slide.id, slide.sectionid )}
						}
						key={slide.id}>
						<StorySlide
							id={slide.id}
							sectionid={slide.sectionid}
							type={slide.type}
							title={slide.title}
							thumb={slide.thumb}
							viewed={slide.viewed}
						/>
					</SwiperSlide> )
					}
				</Swiper>
				
				{slides.length > 7 && <button onClick={nextSlide} className={`${classes['stories-next']}`}>
					<svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11">
						<g>
							<g>
								<path d="M6.937 5.348L2.59.015.023 1.41l3.258 4.078L.023 9.566l2.567 1.395 4.347-5.309z"/>
							</g>
						</g>
					</svg>
				</button>}
				{/*<div className={`${'swiper-pagination'} ${classes['pag-stories']}`}/>*/}
			</div>
		</div>
	</>
}

export default StoriesSlider;