let a;
let date;
let time;
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};


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

let weather = {
    apikey: "757df01a3e3c9e43c7a15e82323c6621",
    fetchweather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=metric&appid="+ this.apikey)
        .then((response) => response.json())
        .then((data) => this.display(data));
    },
    display: function(data){
        const {name} = data;
        const { icon , description} = data.weather[0];
        const {temp , humidity } = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".temperature").innerHTML = " Temperature -> " + temp + "° C";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
        document.querySelector(".humidity").innerHTML = "Humidity - " + humidity + "%";
        document.querySelector(".cloud").innerHTML = "  " +  description;
        document.querySelector(".wind").innerHTML = " Wind - " + speed + " km/hr";

    },
    find: function (){
        this.fetchweather(document.querySelector(".search").value);
    }
};
document.querySelector(".btn").addEventListener("click",function (){
    weather.find();
});
document.querySelector(".search").addEventListener("keyup",function (event){
   if(event.key == "Enter") {weather.find();}
});