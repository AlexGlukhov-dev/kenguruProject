import ReactPlayer from 'react-player'

import classes from './storyVideo.module.scss'


const StoryVideo = ({slides, title, url}) => {
	
	return <>
		<section className={classes['storie-article']}>
		<h1 className={classes['storie-article__title-main']}>{title}</h1>
		<div className={classes['storie-article__player-wrapper']}>
			<ReactPlayer
				controls
				url={url}
				width='100%'
				height='100%'
			/>
		</div>
			{/*{slides.length ? <div className={classes['storie-article__show-more']}>Смотреть еще</div> : null}*/}
 			{/*<div className={classes['storie-article__show-more']}>Смотреть еще</div>*/}
	</section>
		</>
}

export default StoryVideo;