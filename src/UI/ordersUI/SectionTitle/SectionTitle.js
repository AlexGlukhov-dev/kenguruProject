import React from 'react'
import classes from './sectionTitle.module.scss'

export const SectionTitle = ({sectionNumber, sectionTitle, active, span}) =>  {
	
	const sectionTitleClasses = [classes['section-title']];
	
	active && sectionTitleClasses.push(classes['active'])
	
	return <h2 className={sectionTitleClasses.join(' ')}>{`${sectionNumber} . ${sectionTitle} `}{span}</h2>
};