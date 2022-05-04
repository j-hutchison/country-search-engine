import * as model from "./model.js";
import countryPageView from "./views/countryPageView.js";
import countryResultsView from "./views/countryResultsView.js";
import countryNavView from "./views/CountryNavView.js";

/**
 *
 */
const controlCountrySearch = async function () {
	try {
		const query = countryNavView.getSearchQuery();
		// console.log(query);

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
	await model.getCountryByName(countryName);
	countryResultsView.clear();
	countryNavView.clear();
	countryNavView.generatePageMarkup();
	countryPageView.generateMarkup(model.state.search.results);
};

const renderHomepage = async function () {
	countryResultsView.clear();
	countryNavView.clear();
	countryPageView.clear();

	countryNavView.generateSearchMarkup();
	await model.getCountryByName("");
	countryResultsView.generateMarkup(model.state.search.results);
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
};

init();
