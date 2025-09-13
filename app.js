

const BASE_URL="https://api.openweathermap.org/data/2.5"
const API_KEY="1b55d3b274c252c6ee79d90a31c0bafb"
const DAYS=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
const searchInput=document.querySelector("input")
const searchButton=document.querySelector("button")
const weatherContainer=document.getElementById("weather")
const forecastContainer=document.getElementById("forecast")
const locationIcon=document.getElementById("location")

const getCurrentWeatherByName=async(city)=>{
     const url=`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric"`
     const response=await fetch(url)
     const json=await response.json()
     return json

}
const getCurrentWeatherByCoordinates=async(lat,lon)=>{
     const url=`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric"`
     const response=await fetch(url)
     const json=await response.json()
     return json

}

const getForecastWeatherByName=async(city)=>{
     const url=`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric"`
     const response=await fetch(url)
     const json=await response.json()
     return json

}
const renderCurrentWeather=data=>{
    console.log(data)
    const weatherJsx=`
    <h1>${data.name},${data.sys.country}</h1>
    <div id="main">
    <img alt="weather icon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" />
    <span>${data.weather[0].main}</span>
    <p>${Math.round(data.main.temp/10)} ℃</p>
   
    </div>
     <div id="info">
     <p>Humidity:<span>${data.main.humidity} %</span></p>
     <p>Wind Speed:<span>${data.wind.speed} m/s</span></p>

    </div>

    `
    weatherContainer.innerHTML=weatherJsx
}
const getWeekDay=date=>{
    return DAYS[new Date(date*1000).getDay()]
}
const renderForecastWeather=(data)=>{
       data=data.list.filter(obj=>obj.dt_txt.endsWith("12:00:00"))
       data.forEach(i=>{
         const forecastJsx=`
         <div>
           <img alt="weather icon" src="http://openweathermap.org/img/w/${i.weather[0].icon}.png" />
           <h3>${getWeekDay(i.dt)}</h3>
           <p>${Math.round(i.main.temp/10)} ℃</p>
           <span>${i.weather[0].main}</span>
         </div>
         `
         forecastContainer.innerHTML+=forecastJsx
       }
       )
}

const searchHandler=async()=>{
     const cityName=searchInput.value

     if(!cityName){
        alert("Please enter city name")
     }

   const currentData=await getCurrentWeatherByName(cityName)
   renderCurrentWeather(currentData)

   const forecastData=await getForecastWeatherByName(cityName)
   renderForecastWeather(forecastData)
}
const positionCallback=async(position)=>{
    console.log(position)
    const{latitude,longitude}=position.coords
    const currentData=await getCurrentWeatherByCoordinates(latitude,longitude)
    renderCurrentWeather(currentData)
}
const errorCallback=(error)=>{
    console.log(error.message)
}
const locationHandler=()=>{
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(positionCallback,errorCallback)
   }else{
      alert("Your browser does not support geolocation")
   }
}

searchButton.addEventListener("click",searchHandler)
locationIcon.addEventListener("click",locationHandler)