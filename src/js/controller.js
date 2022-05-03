import * as model from "./model.js";
import countryResultsView from "./views/countryResultsView.js";

const controlCountrySearch = async function () {
	try {
		const query = countryResultsView.getSearchQuery();
		console.log(query);

		//TODO add call to the model to get countries fulfilling the query search

		countryResultsView.generateMarkup(model.state.search.results);
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	countryResultsView.addHandlerSearch(controlCountrySearch);
	countryResultsView.generateMarkup(model.state.search.results);
};

await model.getAllCountries();
init();
