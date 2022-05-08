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
		borders: object.borders,
	};

	// get the currencies from the API as string
	const countryCurrencies = object.currencies;
	if (countryCurrencies) {
		countryObject.currencies = Object.entries(countryCurrencies)
			.map((val) => {
				return val[1].name;
			})
			.join(", ");
	}

	// get the country capital from API
	const countryCapital = object.capital;
	countryObject.capital = countryCapital
		? countryCapital.map((val) => val).join(", ")
		: "";

	const countryLanguages = object.languages;
	if (countryLanguages) {
		countryObject.languages = Object.entries(countryLanguages)
			.map((val) => {
				return val[1];
			})
			.join(", ");
	}

	const countryDomain = object.tld;
	if (countryDomain) {
		countryObject.domain = Object.entries(countryDomain)
			.map((val) => val[1])
			.join(", ");
	}

	const countryNames = object.name?.nativeName;
	if (countryNames) {
		countryObject.nativeName = Object.entries(countryNames)
			.map((val) => val[1].official)
			.join(", ");
	}

	return countryObject;
};

/**
 * @name getCountriesByRegion
 * @description function returns all countries belong to the region passed into the api call
 * @param {string} lowercase region name
 */
export const getCountriesByRegion = async function (region) {
	try {
		const data =
			region === "all"
				? await fetch(`${API_URL}all`)
				: await fetch(`${API_URL}region/${region}`);
		if (!data.ok)
			throw new Error(
				`An error occurred trying to return countries for the region: ${region}. Please try again.`
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
export const getCountryByName = async function (countryName, isClick) {
	try {
		console.log(countryName);
		if (isEmpty(countryName)) return await getAllCountries();

		const data = await fetch(`${API_URL}name/${countryName}`);
		console.log(data);
		if (!data.ok)
			throw `An error occurred returning results to your search criteria. Please try again`;
		const json = await data.json();

		//TODO can make this better?
		if (isClick) {
			state.country = json
				.filter((el) => el.name.common === countryName)
				.map((rec) => _createCountryObject(rec));
		} else {
			state.search.results = json
				.map((rec) => _createCountryObject(rec))
				.sort((a, b) => a.name.localeCompare(b.name));
		}
	} catch (err) {
		throw err;
	}
};

export const getCountryByCode = async function () {
	try {
		const currentCountry = state.country.at(0);
		console.log(currentCountry);

		const countryBorders = currentCountry.borders;
		console.log(countryBorders);
		if (!countryBorders) return;

		const codesString = countryBorders.map((val) => val).join(",");
		console.log(codesString);

		const data = await fetch(`${API_URL}alpha?codes=${codesString}`);
		console.log(data);
		if (!data.ok)
			throw `An error occurred returning results to your search criteria. Please try again`;
		const json = await data.json();

		//TODO can tidy this up?
		state.country[0].borders = json.map((country) => {
			return country.name?.common;
		});
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
