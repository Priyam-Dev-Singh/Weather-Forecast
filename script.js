let bg = document.getElementById("bg");
let date = document.getElementById("date");
let time = document.getElementById("time");
let input = document.querySelector("#search input");
let search = document.querySelector("#searchicon i");
let weather = document.getElementById("weather");

let day = new Date().getDay();

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
    let minutes= new Date().getMinutes();
    let hr = new Date().getHours();
    if(minutes==0) minutes="00";
    if(minutes<10) minutes=`0${minutes}`;
    if(hr==0) hr=`00`;
    if(hr<10) hr=`0${hr}`;
    time.innerHTML = `<p class="dt">${hr} : ${minutes} </p>`
}
Time();
setInterval(Time,1000);

let cities=["delhi","mumbai","chennai","kolkata","bangalore","hyderabad","pune","ahmedabad","jaipur","lucknow","kanpur","nagpur","indore","thane","bhopal","visakhapatnam","patna","vadodara","ghaziabad","ludhiana","agra","nashik"];

search.addEventListener("click", function(){
    let cityName= input.value.toLowerCase();
   if(cities.includes(cityName)) 
    console.log(`city is found`);
    else console.log(`city is not found`);
} )

input.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        let cityName= input.value.toLowerCase();
        if(cities.includes(cityName)) 
        console.log(`city is found`);
        else console.log(`city is not found`);
    }
})

