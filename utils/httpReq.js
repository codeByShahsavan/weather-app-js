import { showModal } from "./modal.js"

const BASE_URL="https://api.openweathermap.org/data/2.5"
const API_KEY="1b55d3b274c252c6ee79d90a31c0bafb"

const getWeatherData=async(type,data)=>{
      let url=null
      switch (type) {
        case "current":
            if(typeof data==="string"){
                  url=`${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric"`
            }
            else{
                url=`${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric"`

            }
            break;
        case "forecast":
             if(typeof data==="string"){
                   url=`${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric"`

            }
            else{
                     url=`${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric"` 

            }
            break;
        default:
               url=`${BASE_URL}/weather?q=berlin&appid=${API_KEY}&units=metric"`
            break;
      }
      try {
     const response=await fetch(url)
     const json=await response.json()
    if(+json.cod===200){
           return json
    }else{
        showModal(json.message)
    }

        
      } catch (error) {
        showModal("An error occured when fetching data")
      }

}

export default getWeatherData