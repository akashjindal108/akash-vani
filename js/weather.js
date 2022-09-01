const time1 = document.getElementById("time");
const date1 = document.getElementById("date");
const timezone = document.getElementsByClassName("location");
const temperature = document.getElementsByClassName("temp");
const country1 = document.getElementsByClassName("country");
const curr_weather = document.getElementsByClassName("info");
const futureforcast = document.getElementsByClassName("future");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thrusday",
  "Friday",
  "Saturday",
  "Sunday",
];
const api = "757df01a3e3c9e43c7a15e82323c6621";
const mon = [
  "Jan",
  "Feb",
  "Mar",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setTimeout(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const min = time.getMinutes();
  const hours = time.getHours();
  const hoursin12 = hours >= 13 ? hours % 12 : hours;
  const ampm = hours >= 12 ? "pm" : "am";

  time1.innerHTML = hoursin12 + ":" + min + " " + ampm;
  date1.innerHTML = days[day] + "," + date + " " + mon[month];
}, 1000);
getweather();
function getweather() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${api}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.showeather(data);
        console.log(data);
      });
  });
}

function showeather(data) {
  let { humidity, wind_speed, sunrise, sunset, feels_like, temp } =
    data.current;
  let { icon, description } = data.current.weather[0];
  document.querySelector(".humid").innerHTML =
    "HUMIDITY  -  " + "  " + "   " + " " + " " + " " + humidity + " %";
  document.querySelector(".wind").innerHTML =
    "WIND - " + " " + wind_speed + " " + "km/hr";
  document.querySelector(".sunrise").innerHTML =
    "SUNRISE  -" + " " + window.moment(sunrise * 1000).format("HH:MM a");
  document.querySelector(".sunset").innerHTML =
    "SUNSET  -" + " " + window.moment(sunset * 1000).format("HH:MM a");
  document.querySelector(".feels").innerHTML =
    "FEELS LIKE  -" + " " + feels_like + "° C";
  document.querySelector(".temp").innerHTML = temp + "° C";
  document.querySelector(".location").innerHTML = data.timezone;
  document.querySelector(".icon").src =
    "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  document.querySelector(".desc").innerHTML = description;

  let str = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      document.querySelector(".tday").innerHTML = `
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="today-icon" class="w-icon">
        <div class="t-data">
            <div class="days">${window
              .moment(day.dt * 1000)
              .format("ddd")}</div>
            <div class="temper1">DAY - ${day.temp.day}&#176;C</div>
            <div class="temper1">NIGHT - ${day.temp.night}&#176;C</div>
        </div>
`;
    } else {
      str += `            
        <div class="future-items">
        <div class="days">${window.moment(day.dt * 1000).format("ddd")}</div>
        <img src="http://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@2x.png" alt="today-icon" class="w-icon">
        <div class="temper">DAY - ${day.temp.day}&#176;C</div>
        <div class="temper">NIGHT - ${day.temp.night}&#176;C</div>
        </div>`;
    }
  });
  document.querySelector(".future").innerHTML = str;
}
