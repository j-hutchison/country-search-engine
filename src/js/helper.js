export const isEmpty = (str) => !str.trim().length;

//TODO Add function for switching between light/dark mode

export const formatNumber = function (numb) {
	var str = numb.toString().split(".");
	str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return str.join(".");
};
