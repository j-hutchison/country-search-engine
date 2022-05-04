class CountryResultsView {
	_parentElement = document.querySelector(".tile__grid");

	generateMarkup(data) {
		const markup = data
			.map((el) => {
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
			})
			.join("");

		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	addHandlerClick(handler) {
		this._parentElement.addEventListener("click", function (e) {
			e.preventDefault();
			const countryTile = e.target.closest(".country__tile");
			console.log(countryTile);
		});
	}

	//TODO Move into a parent view class
	clear() {
		this._parentElement.innerHTML = "";
	}
}

export default new CountryResultsView();
