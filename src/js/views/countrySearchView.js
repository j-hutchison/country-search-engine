class CountrySearchView {
	_parentElement = document.querySelector(".search");

	/**
	 *
	 * @returns {string} the search query entered by the user into the search bar
	 */
	getSearchQuery() {
		const query = this._parentElement.querySelector(".search__field");
		//TODO validate is valid query string
		return query.value;
	}

	/**
	 * addHandlerSearch
	 * @param {function} handler
	 * @description this function uses the publisher subscriber pattern to pass a function from the controller to the view
	 */
	addHandlerSearch(handler) {
		this._parentElement.addEventListener("keyup", function (e) {
			handler();
		});
	}
}

export default new CountrySearchView();
