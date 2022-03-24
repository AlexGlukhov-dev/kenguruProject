//********** checks Email validity **************************/
export 	const validEmail = email => {
	return /^[\w]{1}[\w-]*@[\w-]+\.[a-z]{2,4}$/i.test(email)
}

/****** finds min date *************************************/
export const minDate = (dates) => dates.reduce( (a, b) => a < b ? a : b )

/***** format date to dd.mm *******************************/
export const formatData = val => new Date( val ).toLocaleString( "ru", {day: 'numeric', month: 'numeric'} );

/***** checks input value for type number ***************/
export const checkNum = val => isNaN(val) ? '' : val

/******* finds min value in array **********************/
export const arrMinValue = (arr, key) => {
	let minVal;
	minVal = Math.min.apply( null, arr.map( item => item[key] ));
	
	return minVal
}
