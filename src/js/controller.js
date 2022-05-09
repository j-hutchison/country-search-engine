import * as model from "./model.js";
import countryPageView from "./views/countryPageView.js";
import countryResultsView from "./views/countryResultsView.js";
import countryNavView from "./views/countryNavView.js";
import countryFilterView from "./views/countryFilterView.js";
import themeView from "./views/themeView.js";

/**
 *
 */
const controlCountrySearch = async function () {
	try {
		const query = countryNavView.getSearchQuery();

		await model.getCountryByName(query);

		countryResultsView.clear();
		countryResultsView.generateMarkup(model.state.search.results);
	} catch (err) {
		throw err;
	}
};

/**
 *
 * @param {string} countryName
 */
const controlCountryPage = async function (countryName) {
	await model.getCountryByName(countryName, true);
	await model.getCountryByCode();
	await countryResultsView.clear();

	countryNavView.clear();
	countryFilterView.clear();
	countryPageView.clear();

	countryNavView.generatePageMarkup();
	countryPageView.generateMarkup(model.state.country);
};

const renderHomepage = async function () {
	countryResultsView.clear();
	countryNavView.clear();
	countryFilterView.clear();
	countryPageView.clear();
	themeView.clear();

	themeView.generateMarkup(model.state.theme);
	countryNavView.generateMarkup();
	countryFilterView._generateFilterDropdown();

	await model.getCountryByName("");
	countryResultsView.generateMarkup(model.state.search.results);
};

const controlRegionFilters = function () {
	countryFilterView.clear();
	countryFilterView._generateFilterDropdown();
};

const controlRegionFilterClick = async function (filter) {
	if (!filter) return;
	countryResultsView.clear();

	await model.getCountriesByRegion(filter);
	countryResultsView.generateMarkup(model.state.search.results);
};

const controlTheme = function () {
	const newTheme = model.state.theme === "dark" ? "light" : "dark";
	model.state.theme = newTheme;
	themeView.clear();
	themeView.generateMarkup(newTheme);
	themeView.toggleTheme(newTheme);
};

/**
 *
 */
const init = async function () {
	// generate initial markup
	await renderHomepage();
	// add event listeners
	countryNavView.addHandlerSearch(controlCountrySearch);
	countryResultsView.addHandlerClick(controlCountryPage);
	countryNavView.addHandlerBackBtn(renderHomepage);
	countryFilterView.addHandlerClick(controlRegionFilters);
	countryFilterView.handleFilterClick(controlRegionFilterClick);
	countryPageView.addHandlerClick(controlCountryPage);
	themeView.addHandlerClick(controlTheme);
};

init();
