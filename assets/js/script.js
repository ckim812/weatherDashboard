const init = async () => {
  city = document.querySelector("input").value; //define input into a variable

  if (!city) return;

  //current weather and forecast weather APIs
  let currentURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city}`;
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

  let x = await fetch(currentURL).then((data) => data.json()); //fetch and convert current weather data to JSON

  let { list } = await fetch(forecastURL).then((data) => data.json()); //fetch and convert forecast weather data to JSON

  y = list;

  console.log(x);
  console.log(y);

  var currentTimeStamp = x.dt;
  var currentDateFormat = new Date(currentTimeStamp * 1000);

  document.querySelector(
    ".currentTitle"
  ).innerHTML = `<h2>${city}  ${currentDateFormat}</h2>`;
  document.querySelector(".currentTemp").textContent =
    "Temperature: " + x.main.temp + " \u00B0F";
  document.querySelector(".currentWind").textContent =
    "Wind: " + x.wind.speed + " MPH";
  document.querySelector(".currentHumidity").textContent =
    "Humidity: " + x.main.humidity + " %";

  let z = 0;
  for (let i = 7; i < y.length; i += 8) {
    console.log(i);
    let date = new Date(y[i].dt * 1000);
    console.log(date);
    document.querySelector(
      `.forecast${z}Title`
    ).innerHTML = `<h7>${city}  ${date}</h7>`;
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

document.querySelector("button").addEventListener("click", init);
