class CountryResultsView {
	_parentElement = document.querySelector(".search");
	_tileGrid = document.querySelector(".tile__grid");

	/**
	 * addHandlerSearch
	 * @param {function} handler
	 * @description this function uses the publisher subscriber pattern to pass a function from the controller to the view
	 */
	addHandlerSearch(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}

	getSearchQuery() {
		const query = this._parentElement.querySelector(".search__field");
		return query.value;
	}

	generateMarkup(data) {
		//TODO add code to produce a new string with html to be rendered to the view
		const markup = data.map((el) => {
			return `<div class="country__tile">
            <img
                class="country__img"
                src="${el.flag}"
                alt="Image showing the flag of {country}"
            />
            <div class="country-content">
                <h2>${el.name}</h2>
                <span
                    ><strong class="country-data__label">Population:</strong
                    >${el.population}</span
                >
                <span
                    ><strong class="country-data__label">Region:</strong>${el.region}</span
                >
                <span
                    ><strong class="country-data__label">Capital:</strong>${el.capital}</span
                >
            </div>
        </div>`;
		});

		this._tileGrid.insertAdjacentHTML("afterbegin", markup);
	}
}

export default new CountryResultsView();
