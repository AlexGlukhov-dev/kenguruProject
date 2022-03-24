import classes from "../storiesSlider.module.scss";

const StoryArticleSlide = ({title, thumb, type, viewed}) => {
	
	return (
		<article className={`${classes['stories-slider__story']} ${classes['story']}`}
						 style={{
							 backgroundImage: `url(${thumb})`
						 }}
						 data-href="story-article">
			{!viewed && <div className={classes['story__label']}/>}
			<div className={`${classes['story__category']} ${classes['story__category--article']}`}>{type}</div>
			<h3 className={classes['story__title']}>
				{title}
			</h3>
		</article>
	)
}

export default StoryArticleSlide;