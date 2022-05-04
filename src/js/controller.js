import * as model from "./model.js";
import countryResultsView from "./views/countryResultsView.js";
import countrySearchView from "./views/countrySearchView.js";

const controlCountrySearch = async function () {
	try {
		const query = countrySearchView.getSearchQuery();
		// console.log(query);

		await model.getCountryByName(query);

		countryResultsView.clear();
		countryResultsView.generateMarkup(model.state.search.results);
	} catch (err) {
		throw err;
	}
};

const controlCountryPage = async function () {
	console.log(`controlCountryPage`);
};

const init = function () {
	countrySearchView.addHandlerSearch(controlCountrySearch);
	countryResultsView.generateMarkup(model.state.search.results);
	countryResultsView.addHandlerClick();
};

await model.getAllCountries();
init();
