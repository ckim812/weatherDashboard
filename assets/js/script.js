let apiKey = "f09736215f8792d83b9ea278642c25cc";

let savedCities = [];

const init = async () => {
  city = document.querySelector("input").value; //define input into a variable
  if (!city) return; //exit function if no value is inputted

  // save cities into localStorage
  savedCities.push(city);
  console.log(savedCities);
  localStorage.setItem("savedCities", savedCities);

  //current weather and forecast weather APIs
  let currentURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city}`;
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

  let x = await fetch(currentURL).then((data) => data.json()); //fetch and convert current weather data to JSON

  let { list } = await fetch(forecastURL).then((data) => data.json()); //fetch and convert forecast weather data to JSON

  y = list;

  console.log(x);
  console.log(y);

  var currentTimeStamp = x.dt;
  var currentDateFormat = new Date(currentTimeStamp * 1000).toLocaleDateString(
    "en-us",
    { weekday: "long", year: "numeric", month: "short", day: "numeric" }
  );

  let displayWeather = (city) => {
    //print current weather
    document.querySelector(
      ".currentTitle"
    ).innerHTML = `<h2>${city}  ${currentDateFormat}</h2>`;
    document.querySelector(
      ".currentIcon"
    ).innerHTML = `<img src=http://openweathermap.org/img/wn/${x.weather[0].icon}.png></img>`;
    document.querySelector(".currentTemp").textContent =
      "Temperature: " + x.main.temp + " \u00B0F";
    document.querySelector(".currentWind").textContent =
      "Wind: " + x.wind.speed + " MPH";
    document.querySelector(".currentHumidity").textContent =
      "Humidity: " + x.main.humidity + " %";

    //loop to print 5-day forecast
    let z = 0;
    for (let i = 7; i < y.length; i += 8) {
      console.log(i);
      let date = new Date(y[i].dt * 1000).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      console.log(date);
      document.querySelector(
        `.forecast${z}Title`
      ).innerHTML = `<h7>${date}</h7>`;
      document.querySelector(
        `.forecast${z}Icon`
      ).innerHTML = `<img src=http://openweathermap.org/img/wn/${y[i].weather[0].icon}.png></img>`;
      document.querySelector(`.forecast${z}Temp`).textContent =
        "Temperature: " + y[i].main.temp + " \u00B0F";
      document.querySelector(`.forecast${z}Wind`).textContent =
        "Wind: " + y[i].wind.speed + " MPH";
      document.querySelector(`.forecast${z}Humidity`).textContent =
        "Humidity: " + y[i].main.humidity + " %";
      console.log(`.forecast${z}Title`);
      console.log(z);
      z++;
    }
  };

  displayWeather(city); //display current weather and 5-day forecast

  //clear all child elements from localStorage display list
  while (document.querySelector(".savedCities").firstChild) {
    document
      .querySelector(".savedCities")
      .removeChild(document.querySelector(".savedCities").firstChild);
  }

  // display all cities from localStorage
  for (let i = 0; i < savedCities.length; i++) {
    let node = document.createElement("li"); //create list element
    let nodeBtn = node.appendChild(document.createElement("button")); //create button element under list element
    nodeBtn.classList.add("savedCity" + i); //add class to created button
    console.log(savedCities[i]);
    nodeBtn.textContent = `${savedCities[i]}`; //add input text to button
    document.querySelector(".savedCities").appendChild(node); //display button in html
  }
  
};

for (let i = 0; i < savedCities.length; i++) {
  let a = document.getElementsByClassName(`${savedCities[i]}`);
  console.log(a);
  a      .addEventListener("click", displayWeather(savedCities[i])); //add click function to each button
}
//create function (or maybe use init) to display the data from localStorage
//add event listener to each created button to run function to display data from localStorage

document.querySelector("#searchBtn").addEventListener("click", init);
