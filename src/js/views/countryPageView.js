import { formatNumber } from "../helper.js";
import View from "./view.js";

class CountryPageView extends View {
	_parentElement = document.querySelector(".country__page");

	generateMarkup(data) {
		const borderTagMarkup = data
			.map((el) => {
				return el.borders
					? `<div class="border-countries">
                 <span><strong>Border Countries:</strong></span>
                 ${el.borders
										.map(
											(country) =>
												`<span class="tag" data-country-name="${country}">${country}</span>`
										)
										.join("")}
             </div>`
					: ``;
			})
			.join("");

		const markup = data
			.map((el) => {
				return `<div class="grid countrypage__grid">
                <img
                    class="countrypage__img"
                    src="${el.flag}"
                    alt="Image showing the flag of {country}"
                />
                <div class="country__content">
                    <h1>${el.name}</h1>
                    <div class="grid countryinfro__grid">
                        <span
                            ><strong class="country-data__label">Native Name:</strong
                            >${el.nativeName}</span
                        >
                        <span
                            ><strong class="country-data__label">Population:</strong
                            >${formatNumber(el.population)}</span
                        >
                        <span
                            ><strong class="country-data__label">Region:</strong
                            >${el.region}</span
                        >
                        <span
                            ><strong class="country-data__label">Sub Region:</strong>${
															el.subRegion
														}</span
                        >
                        <span
                            ><strong class="country-data__label">Capital:</strong
                            >${el.capital}</span
                        >
                        <span
                            ><strong class="country-data__label">Top Level Domain:</strong
                            >${el.domain}</span
                        >
                        <span
                            ><strong class="country-data__label">Currencies:</strong
                            >${el.currencies}</span
                        >
                        <span
                            ><strong class="country-data__label">Languages:</strong>${
															el.languages
														}</span
                        >
                    </div>${borderTagMarkup}
                </div>
            </div>`;
			})
			.join("");

		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	addHandlerClick(handler) {
		this._parentElement.addEventListener("click", function (e) {
			e.preventDefault();
			const countryTag = e.target.closest(".tag");

			if (!countryTag) return;

			const countryClicked = countryTag.dataset.countryName;

			handler(countryClicked);
		});
	}
}

export default new CountryPageView();
