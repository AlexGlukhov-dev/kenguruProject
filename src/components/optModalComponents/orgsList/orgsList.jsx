import React from 'react';
import SimpleBarReact from "simplebar-react";

import OrgsListItem from "./orgsListItem";

import classes from './orgsList.module.scss'
import "simplebar/src/simplebar.css";

const OrgsList = ({orgs, onChoose}) => {

	return (
		<div className={`${classes['opt-modal__orgs']} ${classes['orgs']}`}>
			<ul className={classes['orgs__items']}>
				<SimpleBarReact
					className={'custom-scroll-container'}
					style={{ maxHeight: 255 }}
					autoHide={false}
				>
					{orgs.map(org => <OrgsListItem key={org.id} org={org} onChoose={onChoose}/>)}
				</SimpleBarReact>
			</ul>
		</div>
	);
};

export default OrgsList;