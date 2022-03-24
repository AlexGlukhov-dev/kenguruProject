import classes from './warning.module.scss'

const WarningField = ({content, cl=''}) => {
	
	return (
			<p className={`${classes['warning-field__text']} ${cl}`}>{content}</p>
	)
}

export default WarningField;