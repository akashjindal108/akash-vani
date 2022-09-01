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
setInterval(() => {
  const time = new Date();
  const date = time.getDate();
  const month = time.getMonth();
  const day = time.getDay();
  const min = time.getMinutes();
  const hours = time.getHours();
  const hours12hrs = hours > 12 ? hours % 12 : hours;
  const ampm = hours > 12 ? "PM" : "AM";

  document.getElementById("display-date").innerHTML =
    "DATE - " + days[day] + "," + date + "-" + mon[month];
  document.getElementById("display-time").innerHTML =
    "TIME - " + hours12hrs + ":" + min + " " + ampm;
}, 1000);

function getUpdate() {
  console.log("Updating List...");

  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;
  dead = document.getElementById("dead").value;
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc, dead]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc, dead]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }
  update();
}
let date;
function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
 let d = new Date();
 const ghanta = d.getHours();
 const minut = d.getMinutes();
 const hrs12 = ghanta > 12 ? ghanta % 12 : ghanta;
 const ap = ghanta > 12 ? "PM" :"AM";
 const din = d.getDate();
 const mahina = d.getMonth();
 
const time =mon[mahina]+","+ din +" -" +" "+hrs12+ ":" + minut+ " " +ap;

  let tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
          <tr>
          <td >${index + 1}</td>
          <td> ${time} </td>
          <td>${element[0]}</td>
          <td>${element[1]}</td> 
          <td> ${element[2]}</td>
          <td><button class="action" onclick="deleted(${index})">COMPLETE</button></td> 
          </tr>`;
  });
  tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getUpdate);
update();
document.getElementById("re").innerHTML = "  ";
function deleted(itemIndex) 
{
  console.log("Delete", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);

  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}
function clearStorage() 
{
  if (confirm("Do you areally want to clear?")) {
    console.log("Clearing the storage");
    localStorage.clear();
    update();
  }
}
