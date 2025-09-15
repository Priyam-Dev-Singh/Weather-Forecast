let bg = document.getElementById("bg");
let date = document.getElementById("date");
let time = document.getElementById("time");
let input = document.querySelector("#search input");
let search = document.querySelector("#searchicon i");
let weather = document.getElementById("weather");
let day = new Date().getDay();
let temprn = document.getElementById("temprn");
let tempmx = document.getElementById("tempmx");
let tempmn = document.getElementById("tempmn");
let feelslike = document.getElementById("feelslike");
let humid = document.getElementById("humid");
let wind = document.getElementById("wind");
let wtext = document.getElementById("wtext");
let city = document.getElementById("city");

navigator.geolocation.getCurrentPosition(success,error);
function success(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apikey = "3975abc645db6a3c1b100a44564bcb7b";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    console.log("Latitude: ",lat,"Longitude: ",lon);

    fetch(url)
    .then(Response=>Response.json())
    .then(data=>{console.log(data);
        weatherupdate(data);
        animations(data);
      
        
    })

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res=>res.json())
    .then(data=>{console.log(data.address);
        city.innerHTML=`${data.address.city}<br>${data.address.country}`;
    })
   
    .catch(err=>console.log("error fetching weather: ",err))
}
function error (err){
    console.log(`Error: `,err.message);
}

search.addEventListener("click", function(){
    let cityName= input.value.toLowerCase();
  
} )

input.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        let cityName= input.value.toLowerCase();
       
    }
})

function weatherupdate(data){
    temprn.innerHTML=`${Math.round(data.main.temp)}&deg;C`;
    tempmx.innerHTML=`MAX.<br>${Math.ceil(data.main.temp_max)}&deg;C`;
    tempmn.innerHTML=`MIN.<br>${Math.floor(data.main.temp_min)}&deg;C`;
    feelslike.innerHTML=`Feels like ${Math.round(data.main.feels_like)}&deg;C`;
    humid.innerHTML=`💧 ${data.main.humidity}%`;
    wind.innerHTML=`💨 ${Math.round(data.wind.speed)}m/s`;
    let desc = data.weather[0].main;
   wtext.innerHTML=desc.charAt(0).toUpperCase()+desc.slice(1);

}

function animations(data){
    let wthr = data.weather[0].main.toLowerCase();
    if(wthr===`clouds`){
        
    }
    if(wthr===`haze`||wthr===`mist`||wthr===`smoke`||wthr===`fog`||wthr===`dust`){
        
    }
    if(wthr===`rain`|| wthr===`drizzle`){
        
    }
    if(wthr===`clear`){
        
    }
    if(wthr===`snow`){

    }
    if(wthr===`tornado`||wthr===`squal`){
        
    }

}

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
    if(minutes>0&&minutes<10) minutes=`0${minutes}`;
    if(hr==0) hr=`00`;
    if(hr>0&&hr<10) hr=`0${hr}`;
    time.innerHTML = `<p class="dt">${hr} : ${minutes} </p>`
}
Time();
setInterval(Time,1000);





//<img src="https://i.pinimg.com/736x/b4/0e/fd/b40efdcf5f50db7c65b4927d084822bb.jpg" alt="">