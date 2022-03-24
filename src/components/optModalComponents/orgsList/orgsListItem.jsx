import React from 'react';

import {shortingString} from "../../../UI/shortingString/shortingString";

import classes from './orgsListItem.module.scss'

const OrgsListItem = ({org, onChoose}) => {
	
	return (
		<li className={classes['orgs__item']}>
			<div className={classes['orgs__item-data']}>
				<div className={classes['orgs__item-name']}>{shortingString(org.orgName, 33)}</div>
				{org.orgInn && <span className={classes['orgs__item-inn']}>ИНН {org.orgInn}</span>}
				{org.orgKpp && <span className={classes['orgs__item-kpp']}>КПП {org.orgKpp}</span>}
			</div>
			

			<button className={classes['orgs__item-btn']}  onClick={() => onChoose(org)}>Выбрать</button>
	
		</li>
	);
};

export default OrgsListItem;