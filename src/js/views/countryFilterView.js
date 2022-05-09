import View from "./view.js";

class CountryFilterView extends View {
	_parentElement = document.querySelector(".filters");
	_menu = document.querySelector(".region__select");
	showFilters = false;

	_generateFilterDropdown() {
		const markup = `<div class="filter border-style__input">
        <ul class="region__select">
        <li class="region__option filter__label">
            <span> Filter by Region</span
            ><svg
                class="icon filter__icon"
                xmlns="http://www.w3.org/2000/svg"
                class="ionicon"
                viewBox="0 0 512 512"
            >
                <title>Chevron Down</title>
                <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="48"
                    d="M112 184l144 144 144-144"
                />
            </svg>
        </li>
        ${
					this.showFilters
						? `<li class="region__option" data-region="all" selected>All</li><li class="region__option" data-region="africa" selected>Africa</li><li class="region__option" data-region="america">America</li><li class="region__option" data-region="asia">Asia</li><li class="region__option" data-region="europe">Europe</li><li class="region__option" data-region="oceania">Oceania</li>`
						: ``
				}
    </ul>
</div>`;

		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	addHandlerClick(handler) {
		this._parentElement.addEventListener("click", (el) => {
			if (!this.showFilters) {
				this.showFilters = true;
			} else {
				this.showFilters = false;
			}
			handler();
		});
	}

	handleFilterClick(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const target = e.target;
			e.target.value = target.dataset.region;
			handler(target.dataset.region);
		});
	}
}

export default new CountryFilterView();
