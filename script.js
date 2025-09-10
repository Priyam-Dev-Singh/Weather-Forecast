let bg = document.getElementById("bg");
let date = document.getElementById("date");
let time = document.getElementById("time");


let day = new Date().getDay();
let minutes= new Date().getMinutes();
let hr = new Date().getHours();
function daysletter(){
if(day==0) day="SUNDAY";
if(day==1) day="MONDAY";
if(day==2) day="TUESDAY";
if(day==3) day="WEDNESDAY";
if(day==4) day="THURSDAY";
if(day==5) day="FRIDAY";
if(day==6) day="SATURDAY";
}
daysletter();

date.innerHTML = `<p class="dt">${new Date().toLocaleDateString()}</p><p class="dt">${day}</p>`;
function Time(){
    time.innerHTML = `<p class="dt">${hr} : ${minutes} </p>`
    if(minutes==0) minutes="00";
    if(minutes<10) minutes=`0${minutes}`;
    if(hr==0) hr=`0`;
    if(hr<10) hr=`0${hr}`;
}
Time();
setInterval(Time(), 500);

let citites=["Delhi","Mumbai","Chennai","Kolkata","Bangalore","Hyderabad","Pune","Ahmedabad","Jaipur","Lucknow","Kanpur","Nagpur","Indore","Thane","Bhopal","Visakhapatnam","Patna","Vadodara","Ghaziabad","Ludhiana","Agra","Nashik"];

