
const StoryVideo_old = ({title, src}) => {
	
	return (
		<section className="storie-article">
			<h1 className="storie-article__title-main">{title}</h1>
			<div className="video-responsive">
				<iframe title={`${title}/ Кенгуру"`}
								src={src}
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen=""
								width="100%"
								height="520"
								frameBorder="0">
				</iframe>
			</div>
			{/*<div style="clear:both" />*/}
		</section>
	)
}

export default StoryVideo_old;