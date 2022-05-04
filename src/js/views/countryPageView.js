class CountryPageView {
	_parentElement = document.querySelector(".country__page");

	generateMarkup(data) {
		console.log(data);
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
                            >TEST NAME</span
                        >
                        <span
                            ><strong class="country-data__label">Population:</strong
                            >${el.population}</span
                        >
                        <span
                            ><strong class="country-data__label">Region:</strong
                            >${el.region}</span
                        >
                        <span
                            ><strong class="country-data__label">Sub Region:</strong>${el.subRegion}</span
                        >
                        <span
                            ><strong class="country-data__label">Capital:</strong
                            >${el.capital}</span
                        >
                        <span
                            ><strong class="country-data__label">Top Level Domain:</strong
                            >TEST DOMAIN</span
                        >
                        <span
                            ><strong class="country-data__label">Currencies:</strong
                            >${el.currencies}</span
                        >
                        <span
                            ><strong class="country-data__label">Languages:</strong>TEST LANGUAGE</span
                        >
                    </div>
                    <div class="border-countries">
                        <span><strong>Border Countries:</strong></span>
                        <span class="tag">France</span>
                        <span class="tag">Germany</span>
                    </div>
                </div>
            </div>`;
			})
			.join("");

		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//TODO Move into a parent view class
	clear() {
		this._parentElement.innerHTML = "";
	}
}

export default new CountryPageView();
