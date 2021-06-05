
const API_KEY = "a3aef5040eb809f3fdd82cef7a238b8e";


let main = document.createElement("main");
document.body.appendChild(main);


let container = document.createElement("div");
container.classList.add("container");
main.appendChild(container);


let row = document.createElement("div");
row.classList.add("row");
container.appendChild(row);
let h1 = document.createElement("h1");
h1.classList.add("text-center", "col-12");
h1.innerText = "Weather App";
row.appendChild(h1);

function AddCountry(country) {
	try {
		
		let col = document.createElement("div");
		col.classList.add("col-lg-4", "col-sm-12", "country");

		row.appendChild(col);

		let card = document.createElement("div");
		card.classList.add("card", "text-center");

		let cardBody = document.createElement("div");
		cardBody.classList.add("card-body");

		let cardHeader = document.createElement("div");
		cardHeader.classList.add("card-header");

		card.appendChild(cardHeader);

		let img = document.createElement("img");
		img.classList.add("card-img-top", "img-fluid", "p-3");
		img.setAttribute("src", country.flag);
		card.appendChild(img);

		card.appendChild(cardBody);
		col.appendChild(card);

		cardHeader.innerText = country.name;

		let cardText = document.createElement("div");
		cardText.classList.add("card-text");
		cardBody.appendChild(cardText);

		let capt = document.createElement("div");
		let capital = "Capital: " + country.capital;
		capt.innerText = capital;
		cardText.appendChild(capt);

		let reg = document.createElement("div");
		let region = "Region: " + country.region;
		reg.innerText = region;
		cardText.appendChild(reg);

		let CountryC = document.createElement("div");
		let CountryCode = "Country Code: " + country.alpha3Code;
		CountryC.innerText = CountryCode;
		cardText.appendChild(CountryC);

		let weatherButton = document.createElement("button");
		weatherButton.classList.add("btn", "btn-primary");
		weatherButton.setAttribute("data-toggle", "modal");
		weatherButton.setAttribute("data-target", "#weatherModal");
		weatherButton.innerText = "Click for Weather";

	
		weatherButton.addEventListener("click", async function () {
			let response = await fetch(
				"https://api.openweathermap.org/data/2.5/weather?q=" +
					country.capital +
					"&appid=" +
					API_KEY
			);

			let weatherData = await response.json();

			alert(
				"Weather Data of " +
					country.capital +
					"\n" +
					"Current Temperature: " +
					(weatherData.main.temp - 273.15) +
					" Degree Celcius" +
					"\n" +
					"Condition:" +
					weatherData.weather[0].main +
					"\n" +
					"Humidity:" +
					weatherData.main.humidity +
					"\n" +
					"Wind Speed:" +
					weatherData.wind.speed
			);
		});

		cardBody.appendChild(weatherButton);
	} catch (e) {
		console.error(e.message);
	}
}


(async function () {
	try {
		let response = await fetch("https://restcountries.eu/rest/v2/all");

		let countries = await response.json();

		for (let i = 0; i < countries.length; i++) {
			AddCountry(countries[i]);
		}
	} catch (e) {
		console.log(e.message);
	}
})();