export const skl = (number, txt, cases = [1, 0, 1, 1, 1, 1]) => {
	return txt[
		number % 100 > 4 && number % 100 < 20
			? 1
			: cases[number % 10 < 5 ? number % 10 : 5]
		];
};

