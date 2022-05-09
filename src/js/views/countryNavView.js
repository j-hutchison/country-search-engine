import View from "./view.js";

class CountryNavView extends View {
	_parentElement = document.querySelector(".searchbar");

	/**
	 *
	 * @returns {string} the search query entered by the user into the search bar
	 */
	getSearchQuery() {
		const query = this._parentElement.querySelector(".search__field");
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

	addHandlerBackBtn(handler) {
		this._parentElement.addEventListener("click", function (e) {
			e.preventDefault();

			const target = e.target.closest(".back__btn");
			if (!target) return;
			handler();
		});
	}

	/**
	 *
	 */
	generateMarkup() {
		const markup = `<div><input
        type="text"
        class="search__field border-style__input"
        placeholder="Search for a country.."
    />
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon__search"
        viewBox="0 0 512 512"
    >
        <title>Search</title>
        <path
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
        />
        <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M338.29 338.29L448 448"
        />
    </svg></div>`;

		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	generatePageMarkup() {
		const markup = `<div class="btn back__btn">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon ionicon"
			viewBox="0 0 512 512"
		>
			<title>Arrow Back</title>
			<path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="48"
				d="M244 400L100 256l144-144M120 256h292"
			/>
		</svg>
		<span class="">Back</span>
	</div>`;
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}
}

export default new CountryNavView();
