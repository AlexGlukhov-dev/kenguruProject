import React, {useEffect, useState} from 'react'

import classes from './tabs.module.scss'
import {addData} from '../../../redux/slices/indivOrdersSlice'


export const Tabs = ({title1, title2, name1, name2, iconTab1, iconTab1Dis, iconTab2, iconTab2Dis, content1, content2, disTab, dispatch}) => {
	const [toggleState, setToggleState] = useState(1);
	// const [disabledTab, setDisabledTab] = useState(false)
	
	useEffect(() => {
				const body = document.querySelector('body')

			if (document.body.offsetHeight > window.innerHeight) {
				// "Скролл есть"
				body.style.marginLeft = 'calc(100vw - 100%)'
			} else {
				// "Скролла нет"
				body.removeAttribute('style')
			}

		return () => {
			body.removeAttribute('style')
		}
	}, [toggleState])
	// useEffect(() => {
	// 	const body = document.querySelector('body')
	// 	body.style.marginLeft = 'calc(100vw - 100%)'
	//
	// 	return () => {
	// 		body.style.marginLeft = ''
	// 	}
	//
	// }, [toggleState	])
	
	// useEffect( () => {
	// 	const body = document.querySelector( 'body' );
	// 	let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	// 	console.log(window.innerWidth, document.body.offsetWidth)
	// 	// body.style.overflow = toggleState ? 'hidden' : 'auto';
	// 	body.style.paddingRight = toggleState === 2 ? paddingOffset  : '0px';
	// }, [toggleState] );
	
	const toggleTab = (index) => {
		setToggleState(index)
	};
	
	// const disTab = () => {
	//
	// 	setDisabledTab(prev => !prev)
	// }
	
	return (
		<>
			<div className={classes['tabs']}>
				<button
					className={toggleState === 1 ? `${classes['tab']} ${classes['active']}` : classes['tab']}
					onClick={() => {
						toggleTab(1)
						dispatch(addData({key: [name1], value: true}))
						dispatch(addData({key: [name2], value: false}))
						// setState( prev => ({...prev, [name1]: true, [name2]: false}) )
					}}
				>
					<img src={toggleState === 1  ? iconTab1 : iconTab1Dis} alt='icon' />
					<span className={classes['tab-title']}>{title1}</span></button>
				<button
					className={toggleState === 2 ? `${classes['tab']} ${classes['active']}` : classes['tab']}
					onClick={() => {
						toggleTab(2)
						dispatch(addData({key: [name1], value: false}))
						dispatch(addData({key: [name2], value: true}))
						// setState( prev => ({...prev, [name1]: false, [name2]: true}) )
					}}
					{...(disTab && {disabled: true})}
				>
					<img src={toggleState === 2  ? iconTab2 : iconTab2Dis} alt='icon' />
					<span className={classes['tab-title']}>{title2}</span>
				</button>
			</div>
			
			<div className={classes['content-tab']}>
				{toggleState === 1 && content1}
				{toggleState === 2 && content2}
			</div>
		</>
	)
};
