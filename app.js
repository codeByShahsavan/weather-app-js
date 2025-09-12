

const BASE_URL="https://api.openweathermap.org/data/2.5"
const API_KEY="1b55d3b274c252c6ee79d90a31c0bafb"

const searchInput=document.querySelector("input")
const searchButton=document.querySelector("button")

const getCurrentWeatherByName=async(city)=>{
     const url=`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric"`
     const response=await fetch(url)
     const json=await response.json()
     return json

}

const searchHandler=async()=>{
     const cityName=searchInput.value

     if(!cityName){
        alert("Please enter city name")
     }
   const currentData=await getCurrentWeatherByName(cityName)
   console.log(currentData)
}

searchButton.addEventListener("click",searchHandler)