import { formatNumber } from "../helper.js";

class CountryResultsView {
	_parentElement = document.querySelector(".tile__grid");

	generateMarkup(data) {
		const markup = data
			.map((el) => {
				return `<div class="country__tile" data-country-name="${el.name}">
            <img
                class="country__img"
                src="${el.flag}"
                alt="Image showing the flag of {country}"
            />
            <div class="country-content">
                <h2>${el.name}</h2>
                <span
                    ><strong class="country-data__label">Population:</strong
                    >${formatNumber(el.population)}</span
                >
                <span
                    ><strong class="country-data__label">Region:</strong>${
											el.region
										}</span
                >
                <span
                    ><strong class="country-data__label">Capital:</strong>${
											el.capital
										}</span
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

			if (!countryTile) return;

			const countryClicked = countryTile.dataset.countryName;

			handler(countryClicked);
		});
	}

	//TODO Move into a parent view class
	clear() {
		this._parentElement.innerHTML = "";
	}
}

export default new CountryResultsView();
