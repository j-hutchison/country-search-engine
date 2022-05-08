import * as config from "../config.js";

const r = document.querySelector(":root");

class ThemeView {
	_parentElement = document.querySelector(".theme__btn");
	_darkTheme = document.querySelector(".dark");
	_lightTheme = document.querySelector(".light");

	addHandlerClick(handler) {
		this._parentElement.addEventListener("click", function (e) {
			handler();
		});
	}

	generateMarkup(theme) {
		const newTheme = theme === "dark" ? "light" : "dark";

		const themeLbl = newTheme[0].toUpperCase().concat(newTheme.slice(1));
		const markup = `<div class="theme__btn ${newTheme}">
        ${
					theme === "dark"
						? `<svg xmlns="http://www.w3.org/2000/svg" class="icon theme__icon" viewBox="0 0 512 512"><title>Sunny</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"/><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/></svg>`
						: `<svg
        class="icon theme__icon"
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon"
        viewBox="0 0 512 512"
    >
        <title>Moon</title>
        <path
            d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
        />
    </svg>`
				}
        <span class="theme__label">${themeLbl} Mode</span></div>`;

		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	toggleTheme(theme) {
		r.style.setProperty(
			"--bg-header",
			theme === "dark" ? config.darkHeaderBgColor : config.lightHeaderBgColor
		);
		r.style.setProperty(
			"--bg-main",
			theme === "dark" ? config.darkMainBgColor : config.lightMainBgColor
		);
		r.style.setProperty(
			"--txt-default-color",
			theme === "dark"
				? config.darkTextDefaultColor
				: config.lightTextDefaultColor
		);
		r.style.setProperty(
			"--heading-1-color",
			theme === "dark" ? config.darkHeading1Color : config.lightHeading1Color
		);
		r.style.setProperty(
			"--heading-2-color",
			theme === "dark" ? config.darkHeading2Color : config.lightHeading2Color
		);
		r.style.setProperty(
			"--bg-btn",
			theme === "dark" ? config.darkBtnColor : config.lightBtnColor
		);
		r.style.setProperty(
			"--bg-btnBack",
			theme === "dark" ? config.darkBtnColor : config.lightBtnColor
		);
		r.style.setProperty(
			"--txt-light",
			theme === "dark"
				? config.darkTextSecondaryColor
				: config.lightTextSecondaryColor
		);

		if (theme === "dark") {
			this._darkTheme.classList.remove("hidden");
			this._lightTheme.classList.add("hidden");
		} else {
			this._lightTheme.classList.remove("hidden");
			this._darkTheme.classList.add("hidden");
		}
	}

	//TODO Move into a parent view class
	clear() {
		this._parentElement.innerHTML = "";
	}
}

export default new ThemeView();
