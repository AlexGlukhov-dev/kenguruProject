import React, {useState} from 'react'

import classes from './dropdown.module.scss'
import SimpleBarReact from "simplebar-react";

const Dropdown = ({ href, selected, setSelected, title, options }) => {
	const [isActive, setIsActive] = useState(false);
	const [shrink, setShrink] = useState(false);
	
	return (
		<div className={classes["dropdown"]}>
			<a
				href={href}
				className={`${classes["dropdown__btn"]} ${ isActive ? classes["dropdown-active"] : '' } ${shrink ? classes["dropdown__btn-shrink"] : ''}`}
				onClick={e => {
					setIsActive( !isActive )

				}}
			>
				<div style={{display: 'flex', flexDirection: 'column'}}>
				<div className={`${shrink ? classes['dropdown__btn-shrink-text'] : ''}`}>{title}</div>
				<div>{selected}</div>
				</div>
				{isActive ?
					<svg className={classes["dropdown-chevron-up"]} width="8" height="5" viewBox="0 0 8 5" fill="none"
							 xmlns="http://www.w3.org/2000/svg">
						<path
							d="M3.90025 1.35867e-07L-1.62086e-07 3.14596L1.01746 5L4 2.643L6.98254 5L8 3.14596L4.1197 1.16681e-07L3.90025 1.35867e-07Z"
							fill="#BFBFBF"/>
					</svg> :
					<svg className={classes["dropdown-chevron-down"]} width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.09975 5L8 1.85404L6.98254 0L4 2.357L1.01746 0L-1.90785e-07 1.85404L3.8803 5H4.09975Z"
									fill="#BFBFBF"/>
					</svg>
				}
			</a>
	
			{isActive && (
				<div className={classes["dropdown__content"]}>
					<SimpleBarReact
						className={'custom-scroll-container'}
						style={{ maxHeight: '100%' }}
						autoHide={false}
					>
					{options.map((option) => (
						<div
							className={classes["dropdown__item"]}
							onClick={() => {
								setSelected(option);
								setIsActive(false);
								setShrink(true);
							}}
							key={option}
						>
							{option}
						</div>
					))}
			</SimpleBarReact>
				</div>
			)}
		</div>
	);
};

export default Dropdown;