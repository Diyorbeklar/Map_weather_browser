let svgElement = document.querySelector("svg")

svgElement.querySelectorAll("path").forEach( region => {
  region.addEventListener("click", e =>{
    svgElement.querySelectorAll("path").forEach (element => {
        element.classList.remove("active")
      })
    region.classList.add("active")
     
    let title =region.getAttribute("title")
    if (title !== null) {
     getWeather(title).then(weather => {
    console.log(title)
     console.log(weather)
 
         let min = weather.main.temp_min - 273;
         let max = weather.main.temp_max - 273;
         let icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
         document.querySelector("p").textContent = `Eng past harorat : ${Math.round(min)} °C \n Eng yuqori harorat : ${Math.round(max)} °C`
         document.querySelector("img").src = icon
  
      })
      .catch( function(e) {
          alert(e)
      })
    }
  })
    }
)

function getWeather (region) {
    return new Promise((resolve, reject) => {
        let response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${region}&APPID=e3040bcd6686712cccd8c6502de28899`)
        response.then(function(data) {
            data.json().then(function(weather) {
                if(weather.cod === 404) {
                    reject("Not found")
                } else {
                    resolve(weather)
                }
                 resolve(weather)
            })
        })   
    })
}

