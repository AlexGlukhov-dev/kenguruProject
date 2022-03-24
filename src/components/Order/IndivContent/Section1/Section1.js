import {useState} from 'react'

import {Tabs} from "../../../../UI/ordersUI/Tabs/Tabs";
import {IndivContent} from "./Indiv/indivContent";
import {UrContent} from "./Ur/UrContent";
import iconFl from "../../../../assets/images/iconFl.svg";
import iconUl from "../../../../assets/images/iconUl.svg";
import iconFldisabled from "../../../../assets/images/iconFldisabled.svg";
import iconUldisabled from "../../../../assets/images/iconUldisabled.svg";
import {useDispatch} from "react-redux";

export const Section1 = () => {
	const [disableTab, setDisabledTab] = useState( false )
	const disTab = () => setDisabledTab( prev => !prev );
	const dispatch = useDispatch()
	

	return <>
		<Tabs
			title1="Физическое лицо"
			title2="Юридическое лицо"
			content1={<IndivContent disTab={disTab}/>}
			content2={<UrContent/>}
			disTab={disableTab}
			iconTab1={iconFl}
			iconTab1Dis={iconFldisabled}
			iconTab2={iconUl}
			iconTab2Dis={iconUldisabled}
			dispatch={dispatch}
			name1='fiz'
			name2='ur'
		/>
	</>
}

