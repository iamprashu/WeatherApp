async function getWeather() {
    const api_key = '590d3d1cccd20a35590c5df48b38bc16';
    const url = 
    'https://api.openweathermap.org/data/2.5/weather';
    let Searchquery = document.querySelector('#city-input').value || 'Indore';

    const searchUrl = `${url}?q=${Searchquery}&appid=${api_key}&units=metric`;


    console.log("Searching for:", Searchquery); // for debug

    let response = await fetch(searchUrl)
    const data = await response.json()
    if(data.cod == 404){
        alert('Please Check The City Name')
        location.reload();
    }
    const imageUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    console.log(data)

    let dataForm = {};

    dataForm.name = data.name;
    let timestamp = data.dt;
    let date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    dataForm.date = date.toLocaleString();
    dataForm.image = imageUrl;

    dataForm.temp = data.main.temp;

    let CitySunset = new Date((data.sys.sunset) * 1000);
    dataForm.sunset = CitySunset.toLocaleString();

    let CitySunRaise = new Date((data.sys.sunrise) * 1000);
    dataForm.sunrise = CitySunRaise.toLocaleString();
    dataForm.sunrise = dataForm.sunrise;

    let windSpeedMs = data.wind.speed;
    let windSpeedKmH = windSpeedMs * 3.6;
    dataForm.windSpeed = windSpeedKmH.toFixed(2);

    document.querySelector('#city-name').innerHTML = dataForm.name;
    document.querySelector('#date').innerHTML = dataForm.date;
    document.querySelector('#weather-icon').src = dataForm.image;
    document.querySelector('#temperature').innerHTML = `${dataForm.temp} <sup>°C</sup>`;
    // document.querySelector('#description').innerHTML = `More : ${dataForm.name} is having SunRaise at ${dataForm.sunrise} and Sunset at ${dataForm.sunset}`;
    document.querySelector('#wind-speed').innerHTML = `Wind Speed : ${dataForm.windSpeed} <sup>km/h</sup>`

    // after all data done making it displayed
    document.querySelector("#weather-info").classList.remove('d-none')

}
