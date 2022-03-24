import Interweave from "interweave";
import PropTypes from 'prop-types'
import classes from './storyArticle.module.scss'
// import StoryModalContent from "./StoryModalContent";

const StoryArticle = ({body}) => {

	return <Interweave className={classes['article-wrapper']} content={body}/>
}

StoryArticle.propTypes = {
	body: PropTypes.string.isRequired
};

export default StoryArticle;
