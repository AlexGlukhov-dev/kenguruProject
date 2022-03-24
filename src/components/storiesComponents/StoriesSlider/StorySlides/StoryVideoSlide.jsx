import classes from "../storiesSlider.module.scss";

const StoryVideoSlide = ({title, thumb, type, viewed}) => {
	
	return (
		<article /*data-id={} data-section-id={}*/ className={`${classes['stories-slider__story']} ${classes['story']}`}
						 style={{backgroundImage: `url(${thumb})`}} data-href="story-video">
			{!viewed && <div className={classes['story__label']}/>}
			<div className={`${classes['story__category']} ${classes[`story__category--${type}`]}`}>{type === 'video' ? 'Видео' : 'Статья'}</div>
			<h3 className={classes['story__title']}>
				{title}
			</h3>
		</article>
	)
}

export default StoryVideoSlide;