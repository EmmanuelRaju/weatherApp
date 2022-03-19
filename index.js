
// sample lat-17.494067, lon-78.57382
let endpoint = "https://api.openweathermap.org/data/2.5/onecall?"
let lat
let lon
let weatherForm = document.getElementById('weatherForm')
let responseDiv = document.getElementById('apiResponseDiv')
let apiKey = "97d098cfb39a938191e2227f5bcb854c"
let units = "metric"
let excludedFields = "minutely,hourly"
let url = `${endpoint}&exclude=${excludedFields}&appid=${apiKey}&units=${units}`

let list = document.createElement('ul')

let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let dateConverter = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString()
}

let weekDayHandler = (timestamp) => {
    return new Date(timestamp * 1000).getDay()
}

let responseHandler = (data) => {
    let listItem = document.createElement('li')
    let text = document.createTextNode(`${weekDays[weekDayHandler(data.dt)]}----${dateConverter(data.dt)}----${data.temp.day || data.temp}`)
    listItem.appendChild(text)
    list.appendChild(listItem)
}

let formHandler = async (e) => {
    e.preventDefault()
    responseDiv.innerHTML = ""
    list.innerHTML = ""
    let data = new FormData(weatherForm)
    lat = data.get('lat')
    lon = data.get('lon')

    let apiResponse = await apiRequest(lat, lon)
    console.log("API Response", apiResponse);
    ({ current, daily } = apiResponse)
    responseHandler(current)
    daily.forEach((day) => {
        responseHandler(day)
    })
    responseDiv.appendChild(list)
}

let apiRequest = async (lat, lon) => {
    let response = await fetch(`${url}&lat=${lat}&lon=${lon}`)
    let body = await response.json()
    return body
}

weatherForm.addEventListener('submit', formHandler)




