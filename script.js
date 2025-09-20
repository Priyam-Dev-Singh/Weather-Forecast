let main = document.getElementById("main");
let bgimg = document.getElementById("bg");
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
let sunrise = document.getElementById("snrstime");
let sunset = document.getElementById("snsttime");

function fetchwthrbycity(cityName){
    let apikey = "3975abc645db6a3c1b100a44564bcb7b";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`;
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}&units=metric`;

    fetch(url)
    .then(Response=>Response.json())
    .then(data=>{
        //console.log(data);
        if(data.cod !== 200){
            city.innerHTML = `❌ Invalid city!`;
            return;
        }

        weatherupdate(data);
        animations(data);
        let latt = data.coord.lat;
        let long = data.coord.lon;
        //console.log(latt+" "+long);
        srchfetchcity(latt,long);
    })
    .catch(err=>console.log("error fetching weather: ",err))

    fetch(url2)
    .then(Response=>Response.json())
    .then(data=>{
        //console.log(data);
        changetable(data);
        
    })
    .catch(err=>console.log(`error fetching weather: `,err))
}

navigator.geolocation.getCurrentPosition(success,error);
function success(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apikey = "3975abc645db6a3c1b100a44564bcb7b";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    console.log("Latitude: ",lat,"Longitude: ",lon);

    function fetchwthr(){
    fetch(url)
    .then(Response=>Response.json())
    .then(data=>{
        console.log(data);
        animations(data);
        weatherupdate(data); 
    })
}    
fetchwthr();
setInterval(fetchwthr,600*1000);

function fetchfrcst(){
    fetch(url2)
    .then(Response=>Response.json())
    .then(data=>{
        //console.log(data);
        changetable(data);
        
    })
    .catch(err=>console.log(`error fetching forecast: `,err))
}
fetchfrcst();

   function fetchcity(lat,lon){
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res=>res.json())
    .then(data=>{
        //console.log(data);
        city.innerHTML=`${data.address.city_district}<br>${data.address.city}, ${data.address.country_code.toUpperCase()}`;
    })

    .catch(err=>console.log("error fetching weather: ",err))
}
fetchcity(lat,lon);

}
function error (err){
    console.log(`Error: `,err.message);
}

search.addEventListener("click", function(){
    let cityName= input.value.toLowerCase().trim();
    fetchwthrbycity(cityName);
} )

input.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        let cityName= input.value.toLowerCase().trim();
       fetchwthrbycity(cityName);
    }
})

function weatherupdate(data){
    temprn.innerHTML=`${Math.round(data.main.temp)}&deg;C`;
    tempmx.innerHTML=`MAX.<br>${Math.ceil(data.main.temp_max)}&deg;C`;
    tempmn.innerHTML=`MIN.<br>${Math.floor(data.main.temp_min)}&deg;C`;
    feelslike.innerHTML=`Feels like ${Math.round(data.main.feels_like)}&deg;C`;
    humid.innerHTML=`<img class="hicon" src="https://cdn-icons-png.flaticon.com/512/9342/9342300.png"> ${data.main.humidity}%`;
    wind.innerHTML=`<img class="hicon" src="https://cdn4.iconfinder.com/data/icons/weather-182/24/weather_forcast_wind_windy-512.png"> ${Math.round(data.wind.speed)}m/s`;
    let desc = data.weather[0].main;
    wtext.innerHTML=desc.charAt(0).toUpperCase()+desc.slice(1);
    let risedt = data.sys.sunrise;
    let setdt = data.sys.sunset;
    let sunrs = new Date(risedt*1000);
    let sunst = new Date(setdt*1000);
    sunrise.innerText = `${sunrs.getHours().toString().padStart(2,'0')}:${sunrs.getMinutes().toString().padStart(2,'0')}`;
    sunset.textContent = `${sunst.getHours().toString().padStart(2,'0')}:${sunst.getMinutes().toString().padStart(2,'0')}`;

}


function changetable(data){
        //console.log(data);
        let daycells = document.querySelectorAll("#wthrdays table .date");
        let wthrcells = document.querySelectorAll("#wthrdays table .wthrdesc");
        let ticons = document.querySelectorAll("#wthrdays table .ticons img");
        let thumid = document.querySelectorAll("#wthrdays table .thumid");
        let twspeed = document.querySelectorAll("#wthrdays table .twspeed");
        let ttmin = document.querySelectorAll("#wthrdays table .ttmin");
        let ttmax = document.querySelectorAll("#wthrdays table .ttmax");
        let tempmx = document.getElementById("tempmx");
        let tempmn = document.getElementById("tempmn");
        let tritime = document.querySelectorAll(".tritime");
        let tritemp = document.querySelectorAll(".tritemp");
        let trihrsimg = document.querySelectorAll(".trihrs img");

            let min= Infinity;
            let max = -Infinity;
       
         function maxmin (max,min,j,i){
            let p=i;
            for(let i=j ; i <= (j+7) ; i++){
            let tpmn= data.list[i].main.temp_min;
            let tpmx= data.list[i].main.temp_max; 

             if(i<=7){
                headmaxmin(max,min)}
                if(tpmn < min) min = tpmn;
                if(tpmx > max) max = tpmx;
                update(max,min,p);
        }
     }
        
        function update(max,min,p){
        ttmin[p].innerHTML = `${Math.round(min)}&deg;C`;
        ttmax[p].innerHTML = `${Math.round(max)}&deg;C`;
    }

    function headmaxmin(max,min) {
        tempmn.innerHTML = `${Math.round(min)}&deg;C`;
        tempmx.innerHTML = `${Math.round(max)}&deg;C`;
    }

    for(let i=0;i<4;i++){
        let temp = Math.round(data.list[i].main.temp);
        let iconcode = data.list[i].weather[0].icon;
        let tstamp = data.list[i].dt;
        let time = new Date(tstamp*1000);
        let hrs = time.getHours().toString().padStart(2,`0`);
        let minutes = time.getMinutes().toString().padStart(2,`0`);

        tritemp[i].innerHTML = `${temp}&deg;C`;
        
        trihrsimg[i].setAttribute("src",`https://openweathermap.org/img/wn/${iconcode}@2x.png`)
       
        tritime[i].textContent = `${hrs}:${minutes}`
    }

        for( let i=0 ; i < 4 ; i++){
            let j=(i+1)*8;
            let date = new Date(data.list[j].dt*1000);
            let options= {weekday:`short`,month:`short`,day:`numeric`};
            date=date.toLocaleDateString(`en-US`,options);
            daycells[i].textContent = date;

            let desc = data.list[j].weather[0].main;
            wthrcells[i].textContent = desc;
    
            let iconcode = data.list[j].weather[0].icon;
            let iconurl = `https://openweathermap.org/img/wn/${iconcode}@2x.png`;
            ticons[i].src = iconurl;

            thumid[i].textContent = data.list[j].main.humidity+`%`;

            twspeed[i].textContent = Math.round(data.list[j].wind.speed)+`m/s`;

            maxmin(max,min,j,i);
           
            maxmin(max,min,0,0);
        }
}

function animations(data){
    let wicon = document.getElementById("wthrlottie");
    let wthr = data.weather[0].main.toLowerCase();
    let hr = new Date().getHours();

    if(hr>=6||hr<18) {
        bgimg.style.backgroundImage=`url("https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg")`;
    }
    if(hr>=18||hr<6) {
        bgimg.style.backgroundImage=`url("https://i.pinimg.com/1200x/0c/92/9c/0c929cee580e5967664f57073d461921.jpg")`;
        main.style.color=`white`;
    }
    if(wthr===`clear`){
       if(hr>=6||hr<18) {
        wicon.setAttribute("src", "https://lottie.host/b97c57e4-18a1-4eb5-893c-bed5843afb46/5VF7DX1iB1.json" );
    }
       if(hr>=18||hr<6) {
        wicon.setAttribute("src", "https://lottie.host/4fbf083e-44b4-40f9-981e-11134754ff39/czUZas4g49.json" )
       };
    }
    if(wthr===`clouds`){
        wicon.setAttribute("src", "https://lottie.host/db019c10-2365-4724-baf8-76e3b8fc5731/Eo2h0Lk7Qn.json" );
        wicon.style.transform=`translateY(7px)`;
        if(hr>=6||hr<18) {
        bgimg.style.backgroundImage=`url("https://i.pinimg.com/1200x/1c/45/7b/1c457bb9ac6446abc31de99b0184c0d3.jpg")`;
        }
       if(hr>=18||hr<6) {
        bgimg.style.backgroundImage=`url("https://i.pinimg.com/736x/51/2e/d8/512ed8744388afbc6026314bf9758712.jpg")`;
       }
    } 
    if(wthr===`haze`||wthr===`mist`||wthr===`smoke`||wthr===`fog`||wthr===`dust`){
        if(hr>=6||hr<18) {
        wicon.setAttribute("src", "https://lottie.host/93ca4ab7-75e0-4f1f-a8e6-6c588fd95af6/uowBx1ugSp.json" );
        }
         if(hr>=18||hr<6) {
        wicon.setAttribute("src", "https://lottie.host/3538921c-1671-437e-acea-250ccaafdf13/XVU4Vhc8rw.json" );
       }
    }
    if(wthr===`rain`|| wthr===`drizzle`){
       bgimg.style.backgroundImage=`url("https://i.pinimg.com/736x/f3/64/ba/f364bade66f89cfde5537289a1494527.jpg")`;
       if(hr>=6||hr<18) wicon.setAttribute("src", "https://lottie.host/1fd92944-4519-4d93-9bb5-52c6fd60243c/76I9Vcd90H.json" );
       if(hr>=18||hr<6) wicon.setAttribute("src", "https://lottie.host/aa7ec0f0-b07e-4d31-8b85-65b4d33d1df2/xyn5PGqhlB.json" );
    }
    if(wthr===`snow`){
        wicon.setAttribute("src", "https://lottie.host/1830f8e2-b64a-4b77-90d8-1041ed79d912/RoMInbpUjt.json" );
    }
    if(wthr===`thunderstorm`||wthr===`squal`){
    bgimg.style.backgroundImage=`url("https://i.pinimg.com/1200x/08/51/47/08514789d432925c1c75ba58572307f7.jpg")`;
        wicon.setAttribute("src", "https://lottie.host/9cd0fe38-8f2a-4465-bf35-bd08a390e271/KXTVIU0ZAy.json" );
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
    let minutes= new Date().getMinutes().toString().padStart(2,`0`);
    let hr = new Date().getHours().toString().padStart(2,`0`);
    
    time.innerHTML = `<p class="dt">${hr} : ${minutes} </p>`
}
Time();
setInterval(Time,1000);


function srchfetchcity(lat,lon){
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res=>res.json())
    .then(data=>{
       // console.log(data);
        city.innerHTML=`${data.address.state_district||data.address.city_district}<br>${data.address.state||data.address.city}, ${data.address.country_code.toUpperCase()}`;
    })

    .catch(err=>console.log("error fetching weather: ",err))
}


