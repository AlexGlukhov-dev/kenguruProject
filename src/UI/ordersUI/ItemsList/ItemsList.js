import React, {useState, useMemo} from "react";

//import SimpleBarReact from "simplebar-react";

import classes from './itemsList.module.scss'


const ItemsList = ({items, value}) => {
	const [showList, setShowList] = useState( false )
	
	/*useEffect(() => {
		if (value.length >= 4 ) setShowList(true)
	 }, [value])*/
	const chooseStreet = (item) => {
			// setValue(item);
			setShowList(true);
		};
	
	const suggestions = useMemo(() => {
		if (!value) return items;
		return items.filter(item =>
			item.name.toLowerCase().includes(value.toLowerCase())
		);
	}, [items, value]);
	
	// const ims = items
	// 	.filter( item => item.name.toLowerCase().includes( value.trim().toLowerCase() ) )
	// 	.map( item => {
	// 		console.log(item)
	// 			if (item.length) {
	// 			return <li className={classes['items-list__item']} key={item.id}>{item.name}</li>
	// 			} else {
	// 			setShowList(false)
	// 			return null;
	// 			}
	// 		}
	// 	)
	
	return <div className={`${showList ? classes['items-list-hidden'] : ''}`}>
		<ul className={classes['items-list__items']}>
			{/*<SimpleBarReact*/}
			{/*	className={'custom-scroll-container'}*/}
			{/*	style={{ minHeight: '50px' }}>*/}
			{ suggestions.length
				?  suggestions.map(item => <li
					className={classes['items-list__item']}
					onClick={chooseStreet.bind(null, item)}
					key={item.id}>
					{item.name}
				</li>)
				: <li className={classes['items-list__item']}>Улица не найдена...</li>
			}
			
			{}
			{/*</SimpleBarReact>*/}
		</ul>
	</div>
}

export default ItemsList;