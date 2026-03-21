
let btn = document.querySelector("button");
let bdy = document.querySelector("body");

function getWeatherImage(weather){
    let image = document.querySelector(".img");
    if (weather == "Clouds")
    {
        image.style.backgroundImage = "url(assets/cloudy.png)"
    }
     else if (weather == "Rain") {
        image.style.backgroundImage = "url('assets/rainy.png')";
    } 
     else if (weather == "clear") {
        image.style.backgroundImage = "url('assets/sun2.png')";
    } 
     else  {
        image.style.backgroundImage = "url('assets/sun2.png')";
    } 
}

function getBackgroundImage(sunRise,sunSet,present){
    let bccImg = document.querySelector(".setimg");
    if(present < sunRise){
        bccImg.style.backgroundImage = "url(assets/day.jpg)";
    }
   else if(present > sunRise && present <sunSet){
        bccImg.style.backgroundImage = "url(assets/noon.webp)";
    }
    else{
           bccImg.style.backgroundImage = "url(assets/night.jpeg)";
    }
}

async function getResult(){
    let city = document.querySelector("input").value.trim();
    const apiKey = "5f763b2e171f3e1be8db26e2bbbd1724";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    axios.get(url)
.then((res)=>{
    if(res.data.cod > 400)
    {
        let p = document.createElement('p');
        p.innerHTML = "<P>Something went wrong! Please try again...</P>";
        bdy.appendChild(p);
    }
    else{
        let ctyName = document.querySelector("h1");
        ctyName.innerText = res.data.name;
        console.log(res.data);
        let weather = res.data.weather[0].main;
        getWeatherImage(weather);
        let sunRise = res.data.sys.sunrise;
        let sunSet = res.data.sys.sunset;
        let present = Date.now();
        getBackgroundImage(sunRise,sunSet,present);
        document.querySelector(".txt-h").innerText = res.data.main.humidity + '%';
        document.querySelector(".txt-t").innerText = res.data.main.temp + "c";
        document.querySelector(".txt-w").innerText = res.data.wind.speed + " m/s";
       
        document.querySelector(".result").classList.remove("hidden");
    }
})
    .catch(err => {
        console.error(err);
        let p = document.createElement('p');
        p.textContent = "Unable to fetch data. Check your internet or city name.";
        bdy.appendChild(p);
    });
}
btn.addEventListener("click",getResult);