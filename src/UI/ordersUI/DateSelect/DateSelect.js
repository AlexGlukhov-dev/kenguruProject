import classes from './dateSelect.module.scss'

const DateSelect = ({title, handler}) => {
	
	const DAY_MILSEC = 24 * 60 * 60 * 1000;
	let today = new Date().getTime();
	const addZero = (item) => {
		if (item < 10) {
			return "0" + item;
		}
		return item;
	};
	const getDay = (date) => {
		let days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
		return (
			addZero(date.getDate()) +
			"." +
			addZero(date.getMonth()) +
			" " +
			days[date.getDay()]
		);
	};

	const dates = [];

	for (let i = 0; i < 7; i++) {
		let date = new Date(today + DAY_MILSEC * i);

		dates.push(getDay(date));
	}

	return (
		<div className="App">
			<select
				className={classes['select']}
				onChange={handler}
				name={'deliveryDate'}
			>
				<option>{title}</option>
				{dates.map( date => (
					<option
						className={classes['select__option']}
						key={date}
						value={date}
					>
						{date}
					</option>
				))}
			</select>
		</div>
	);
};

export default DateSelect;