export const isEmpty = (str) => !str.trim().length;

export const formatNumber = function (numb) {
	var str = numb.toString().split(".");
	str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return str.join(".");
};
