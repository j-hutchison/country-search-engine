import { API_URL } from "./config.js";
import { isEmpty } from "./helper.js";

export const state = {
	country: {},
	search: {
		query: "",
		results: [],
	},
	filter: {
		query: "",
		results: [],
	},
};

/**
 * @name _createCountryObject
 * @description function returns the necessary country data to be displayed on the country card / page
 * @param {object}
 * @returns {object}
 */
const _createCountryObject = function (object) {
	const { png, svg } = object.flags;

	const countryObject = {
		name: object.name?.common,
		population: object.population,
		region: object.region,
		subRegion: object.subregion,
		flag: svg,
		countryCode: object.cca3,
	};

	//TODO Add code for getting languages
	//TODO Add code for getting domain
	//TODO Add code for getting nativename(?)
	// get the currencies from the API as string
	const countryCurrencies = object.currencies;
	if (countryCurrencies) {
		countryObject.currencies = Object.entries(countryCurrencies)
			.map((val) => {
				return val[1].name;
			})
			.join(",");
	}

	// get the country capital from API
	const countryCapital = object.capital;
	countryObject.capital = countryCapital
		? countryCapital.map((val) => val).join(",")
		: "";

	const countryLanguages = object.languages;
	const countryDomain = object.tld;
	const countryNames = object.name;

	return countryObject;
};

/**
 * @name getAllCountries
 * @description function returns all countries w/o any filters
 * @returns {[object]} - array of country objects to be returned
 */
export const getAllCountries = async function () {
	try {
		const data = await fetch(`${API_URL}all`);
		if (!data.ok)
			throw new Error(
				"An error occurred trying to return all countries. Please try again."
			);
		const json = await data.json();
		console.log(json);

		state.search.results = json
			.map((rec) => _createCountryObject(rec))
			.sort((a, b) => a.name.localeCompare(b.name));
	} catch (err) {
		console.error(err);
	}
};

/**
 * @name getCountryByRegion
 * @param region - string value for region used to filter countries
 * @returns {[object]} - array of country objects to be returned
 */

/**
 * @name getCountryByName
 * @param countryName - string value used to lookup countries that start with the input string
 * @returns {[object]} - array of country objects to be returned
 */
export const getCountryByName = async function (countryName) {
	try {
		console.log(countryName);
		if (isEmpty(countryName)) return await getAllCountries();

		const data = await fetch(`${API_URL}name/${countryName}`);
		console.log(data);
		if (!data.ok)
			throw `An error occurred returning results to your search criteria. Please try again`;
		const json = await data.json();

		state.search.results = json
			.map((rec) => _createCountryObject(rec))
			.sort((a, b) => a.name.localeCompare(b.name));

		console.log(json);
	} catch (err) {
		throw err;
	}
};

/**
 * @name init
 * @description performs the initial get request for all countries
 */
const init = async function () {
	console.log(`model initiated`);
	await getAllCountries();
};
init();
