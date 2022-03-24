import classes from "../storiesSlider.module.scss";

const StorySlide = ({title, thumb, type, viewed, id, sectionid}) => {
	
	return (
		<article
			data-id={id}
			data-sectionid={sectionid}
			className={`${classes['stories-slider__story']} ${classes['story']}`}
			style={{backgroundImage: `url(${thumb})`}}>
			
			{!viewed && <div className={classes['story__label']}/>}
			<div
				className={`${classes['story__category']} ${classes[`story__category--${type}`]}`}>{type === 'video' ? 'Видео' : 'Статья'}</div>
			<h3 className={classes['story__title']}>
				{title}
			</h3>
		</article>
	)
}

export default StorySlide;