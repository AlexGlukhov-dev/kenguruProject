export const shortingString = (str, size) => {
	if (str.length > size) {
		return str = str.slice(0, size) + " ...\""
	} else {
		return str
	}
};